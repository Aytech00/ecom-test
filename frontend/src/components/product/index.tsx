import { useState, useEffect } from "react";

// Next imports
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// API
import { getProduct, updateProductViews } from "@/utils/api";

// Toast
import { toast } from "react-toastify";

// Components
import Loader from "../loader";
import Select from "../ui/select";
import Button from "../ui/button";
import Link from "next/link";

const Product = ({ slug }: { slug: string }) => {
	const router = useRouter();
	const pathname = usePathname();

	const [isViewsUpdated, setIsViewsUpdated] = useState<boolean>(false);
	const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);
	const [product, setProduct] = useState<productData | null>(null);
	const [variations, setVariations] = useState<selectBoxData[]>([]);
	const [selectedVariation, setSelectedVariation] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [image, setImage] = useState<string>("");

	useEffect(() => {
		if (!product) getProductData();
		updateViews();
		isProductAddedToCart("");
	}, [slug, product, pathname]);

	const getProductData = async () => {
		try {
			const response = await getProduct(slug);
			setProduct(response);
			setPrice(response.price);
			setImage(response.image);

			if (response.variations) {
				let arr: selectBoxData[] = [
					{
						value: "",
						label: "Select a option",
					},
				];

				response.variations.map((variation: productVariationData) => {
					arr = [...arr, { value: variation._id, label: variation.variation }];
				});

				setVariations(arr);
			}
		} catch (error) {
			setProduct(null);
		}
	};

	const updateViews = async () => {
		if (isViewsUpdated) return;

		try {
			const views = parseInt(product?.views as any) + 1;
			const response = await updateProductViews(views, product?._id as string);
			setIsViewsUpdated(true);
		} catch (error) {
			console.error((error as any).response.data.error); // Handle error response
		}
	};

	const handleChangeVariation = (value: string) => {
		setSelectedVariation(value);
		isProductAddedToCart(value);

		if (value == "") {
			setPrice(product?.price as string);
			setImage(product?.image as string);
			return;
		}

		let res: any = product?.variations.filter((item) => {
			return item._id == value;
		});

		if (res.length > 0) {
			setPrice(res[0]["price"]);
			res[0]["image"] ? setImage(res[0]["image"]) : setImage(product?.image as string);
		}
	};

	const handleAddToCart = () => {
		let arr: cartData[] = [];

		if (localStorage.getItem("cart")) {
			arr = JSON.parse(localStorage.getItem("cart") as string);
		}

		let name = product?.name;
		let image = product?.image;
		let price = product?.price;

		if (selectedVariation) {
			let variationRes: any = product?.variations.filter((item) => {
				return item._id == selectedVariation;
			});

			name = product?.name + " - " + variationRes[0].variation;
			image = variationRes[0].image;
			price = variationRes[0].price;
		}

		let Qantity: number = 1;
		arr = [
			...arr,
			{
				id: product?._id as string,
				status:product?.status as string,
				name: name as string,
				image: image as string,
				price: price as string,
				mrpPrice: product?.mrpPrice as string,
				quantity: Qantity,
				maximumQuantity: product?.quantity as number,
				unit: product?.unit as string,
				weight: product?.weight as number,
				variation: selectedVariation ? selectedVariation : "",
				userId: product?.userId as string,
			},
		];

		localStorage.setItem("cart", JSON.stringify(arr));
		setIsBtnDisabled(true);

		const cartCountElement = document.querySelectorAll(".cartCount");
		cartCountElement.forEach(function (element) {
			element.innerHTML = JSON.parse(localStorage.getItem("cart") as string)?.length;
		});

		toast.success("Product added to cart successfully");
		router.push("/cart");
	};

	function isProductAddedToCart(variation: string) {
		let arr: cartData[] = JSON.parse(localStorage.getItem("cart") as string);

		if (arr?.some((obj: any) => obj.id == product?._id) && arr?.some((obj: any) => obj.variation == variation)) {
			setIsBtnDisabled(true);
		} else {
			setIsBtnDisabled(false);
		}
	}

	return product ? (
		<section className="text-gray-600 overflow-hidden">
			<div className="container px-5 py-24 mx-auto">
				<div className="lg:w-4/5 mx-auto flex flex-wrap">
					<Image src={`${image}`} alt="" width={500} height={500} className="lg:w-1/3 w-full lg:h-auto h-64 object-cover object-center rounded bg-white p-4" />

					<div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
						{product.category && <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category.name}</h2>}

						<h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{product.name}</h1>

						<p className="leading-relaxed mb-6">{product.description}</p>

						{variations.length >= 1 && (
							<div className="mb-6">
								<Select
									label="Variations"
									options={variations}
									value={selectedVariation}
									onChange={(value) => {
										handleChangeVariation(value);
									}}
								/>
							</div>
						)}

						<div className="flex">
							<div className="flex items-center gap-2">
								<span className="title-font font-medium text-2xl text-gray-900">
									$
									{parseFloat(price).toLocaleString("en-US", {
										minimumFractionDigits: 0,
									})}
								</span>

								{product.mrpPrice && (
									<>
										~{" "}
										<s className="text-sm text-gray-500">
											$
											{parseFloat(product.mrpPrice).toLocaleString("en-US", {
												minimumFractionDigits: 0,
											})}
										</s>
									</>
								)}
							</div>

							<div className="flex items-start ml-auto gap-4">
								{product.quantity >= 1 && (
									<Button onClick={handleAddToCart} className="flex ml-auto" disabled={isBtnDisabled}>
										{isBtnDisabled ? "Added to Cart" : "Add to Cart"}
									</Button>
								)}

								<span className={`${product.quantity <= 5 ? "text-yellow-500" : product.quantity <= 3 ? "text-red-500" : "text-green-500"} mt-2 block font-medium`}>
									{product.quantity <= 0 ? "Out of Stock" : `${product.quantity} ${product.unit} Left`}
								</span>
							</div>
						</div>

						<Link href={"/profile/messages/" + product.userId} className="flex justify-end mt-10">
							<Button>Chat with seller</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	) : (
		<Loader />
	);
};

export default Product;
