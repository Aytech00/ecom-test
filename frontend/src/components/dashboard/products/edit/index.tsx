"use client";
import { useEffect, useRef, useState } from "react";

// Next imports
import Image from "next/image";

// Datatable
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

// Components
import Input from "../../../ui/input";
import TextArea from "../../../ui/textarea";
import Button from "../../../ui/button";
import Select from "@/components/ui/select";
import Loader from "@/components/loader";

// API
import {
  getCategories,
  getProduct,
  updateProduct,
  uploadFile,
} from "@/utils/api";

// Toast
import { toast } from "react-toastify";

type CategoryData = {
  value: string;
  label: string;
};

type VariationData = {
  id: number;
  variation: string;
  price: string;
  quantity: string;
  image: string;
  imagePath?: string;
};

// Unit
const units = [
  { value: "piece", label: "piece" },
  { value: "kg", label: "kg" },
  { value: "set", label: "set" },
];

const EditProduct = ({ id }: { id: string }) => {
  const [isProductDataLoaded, setIsProductDataLoaded] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [mrpPrice, setMrpPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [weight, setWeight] = useState<string>("0.0");
  const [sku, setSku] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const imageRef = useRef<HTMLInputElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("piece");

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [variations, setVariations] = useState<VariationData[]>([]);

  const [variation, setVariation] = useState<string>("");
  const [variationPrice, setVariationPrice] = useState<string>("");
  const [variationQuantity, setVariationQuantity] = useState<string>("");
  const [variationImage, setVariationImage] = useState<any>(null);
  const variationImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Getting category information
    async function getCategoryData() {
      try {
        const response = await getCategories();

        const arr: CategoryData[] = [];
        response.map((item: { _id: string; name: string }) => {
          const obj: CategoryData = {
            value: item._id,
            label: item.name,
          };

          arr.push(obj);
        });

        setCategories(arr);
      } catch (error) {
        console.error(error);
      }
    }
    if (!categories.length) getCategoryData();

    // Getting product information
    async function getProductData() {
      try {
        const response = await getProduct(id);

        setIsProductDataLoaded(true);
        setName(response.name);
        setSlug(response.slug);
        setSelectedCategory(response.category?._id);
        setPrice(response.price);
        setMrpPrice(response.mrpPrice);
        setQuantity(response.quantity);
        setSelectedUnit(response.unit);
        setWeight(response.weight);
        setSku(response.sku);
        setDescription(response.description);
        setMetaTitle(response.metaTitle);
        setMetaDescription(response.metaDescription);
        setVariations(response.variations);
        setCurrentImage(response.image);
      } catch (error) {
        console.error(error);
      }
    }
    if (!isProductDataLoaded) getProductData();
  });

  // Add variation
  const handleAddVariation = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!variation) return toast.error("Variation text is required");
    if (!variationPrice) return toast.error("Variation price is required");
    if (!variationQuantity)
      return toast.error("Variation quantity is required");

    try {
      let formData = new FormData();
      formData.append("file", variationImage ? variationImage : null);

      const response = await uploadFile(formData);

      const obj: VariationData = {
        id: Math.floor(Math.random() * 999999 + 1),
        variation,
        price: variationPrice,
        quantity: variationQuantity,
        image: response.filename,
        imagePath: response.path,
      };

      setVariations((current) => [...current, obj]);

      setVariation("");
      setVariationPrice("");
      setVariationQuantity("");
      setVariationImage(null);
      if (variationImageRef.current) variationImageRef.current.value = "";
    } catch (error) {
      toast.error((error as any).response.data.error); // Handle error response
    }
  };

  // Remove variation
  const handleRemoveVariation = (id: number) => {
    setVariations((current) => current.filter((obj) => obj.id !== id));
  };

  // Add product
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name) {
      toast.error("Name is required");
      setIsLoading(false);
      return;
    }
    if (!slug) {
      toast.error("Slug is required");
      setIsLoading(false);
      return;
    }
    if (!price) {
      toast.error("Price is required");
      setIsLoading(false);
      return;
    }
    if (!quantity) {
      toast.error("Quantity is required");
      setIsLoading(false);
      return;
    }
    if (!slug) {
      toast.error("Slug is required");
      setIsLoading(false);
      return;
    }

    try {
      let formData = new FormData();

      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("category", selectedCategory);
      formData.append("price", price);
      formData.append("mrpPrice", mrpPrice);
      formData.append("quantity", quantity);
      formData.append("unit", selectedUnit);
      formData.append("weight", weight);
      formData.append("sku", sku);
      formData.append("description", description);
      formData.append("metaTitle", metaTitle);
      formData.append("metaDescription", metaDescription);
      formData.append("image", image ? image : currentImage);
      const newVariations = variations.map((obj: any) => {
        delete obj.id;
        delete obj.imagePath;
        return obj;
      });
      formData.append("variations", JSON.stringify(newVariations));

      const response = await updateProduct(formData, id);

      toast.success("Product updated successfully");
    } catch (error) {
      toast.error((error as any).response.data.error); // Handle error response
    }

    setIsLoading(false);
  };

  return isProductDataLoaded && id && categories ? (
    <>
      <div className="w-full mx-auto">
        <div className="bg-white p-5 rounded-md w-full">
          <h1 className="text-2xl font-medium">Edit Product</h1>

          <form className="mt-7" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <Input
                  type="text"
                  placeholder="Enter product name"
                  label="Product Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onBlur={(e) => {
                    if (!slug)
                      setSlug(
                        e.target.value
                          .replace(/[^A-Z0-9]+/gi, "-")
                          .toLowerCase()
                      );
                  }}
                />
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Enter product slug"
                  label="Product Slug"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                  }}
                  onBlur={(e) => {
                    setSlug(
                      e.target.value.replace(/[^A-Z0-9]+/gi, "-").toLowerCase()
                    );
                  }}
                />
              </div>

              <div>
                <Select
                  label="Category"
                  options={categories}
                  value={selectedCategory}
                  onChange={(value) => {
                    setSelectedCategory(value);
                  }}
                />
              </div>

              <div>
                <Input
                  type="file"
                  label="Product Image"
                  innerRef={imageRef}
                  onChange={(e) => {
                    setImage(e.target.files![0]);
                  }}
                />
                {currentImage && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_UPLOAD_FOLDER}/${currentImage}`}
                    alt=""
                    width={75}
                    height={75}
                    className="mt-1"
                  />
                )}
              </div>

              <div>
                <Input
                  type="number"
                  placeholder="Enter product price"
                  label="Product Price"
                  step="any"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              <div>
                <Input
                  type="number"
                  placeholder="Enter mrp price"
                  label="MRP Price"
                  step="any"
                  value={mrpPrice}
                  onChange={(e) => {
                    setMrpPrice(e.target.value);
                  }}
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="sm:col-span-3 col-span-2">
                  <Input
                    type="number"
                    placeholder="Enter product quantity"
                    label="Quantity"
                    step="any"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>

                <div className="sm:col-span-1 col-span-2">
                  <Select
                    label="Unit"
                    options={units}
                    value={selectedUnit}
                    onChange={(value) => {
                      setSelectedUnit(value);
                    }}
                  />
                </div>
              </div>

              <div>
                <Input
                  type="number"
                  placeholder="Enter weight in kg"
                  label="Weight (in kg)"
                  step="any"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Enter product sku"
                  label="Product SKU"
                  value={sku}
                  onChange={(e) => {
                    setSku(e.target.value);
                  }}
                />
              </div>

              <div className="col-span-2">
                <TextArea
                  placeholder="Enter product description"
                  label="Product Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>

              {/* Variation */}
              <div className="bg-primary/10 p-5 rounded col-span-2 space-y-5">
                <div className="grid grid-cols-6 gap-2">
                  <div className="sm:col-span-2">
                    <Input
                      type="text"
                      placeholder="Enter product variation"
                      label="Product Variation"
                      value={variation}
                      onChange={(e) => {
                        setVariation(e.target.value);
                      }}
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <Input
                      type="number"
                      placeholder="Enter price"
                      label="Variation Price"
                      step="any"
                      value={variationPrice}
                      onChange={(e) => {
                        setVariationPrice(e.target.value);
                      }}
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      label="Variation Quantity"
                      step="any"
                      value={variationQuantity}
                      onChange={(e) => {
                        setVariationQuantity(e.target.value);
                      }}
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-end justify-between gap-2">
                    <Input
                      type="file"
                      label="Variation Image"
                      innerRef={variationImageRef}
                      onChange={(e) => {
                        setVariationImage(e.target.files![0]);
                      }}
                    />
                    <Button
                      type="button"
                      className="mb-1"
                      onClick={handleAddVariation}
                    >
                      ADD
                    </Button>
                  </div>
                </div>

                <div className="card">
                  <DataTable value={variations} stripedRows>
                    <Column
                      header="Image"
                      body={(variation) =>
                        variation.image && (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_UPLOAD_FOLDER}/${variation.image}`}
                            alt=""
                            width={75}
                            height={75}
                          />
                        )
                      }
                    ></Column>
                    <Column field="variation" header="Variation"></Column>
                    <Column field="price" header="Price"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                    <Column
                      header="Remove"
                      body={(variation) => (
                        <Button
                          className="mb-1 bg-red-500"
                          type="button"
                          onClick={() => {
                            handleRemoveVariation(variation.id);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    ></Column>
                  </DataTable>
                </div>
              </div>
              {/* End variation */}

              <div>
                <Input
                  type="text"
                  placeholder="Enter meta title"
                  label="Meta Title"
                  value={metaTitle}
                  onChange={(e) => {
                    setMetaTitle(e.target.value);
                  }}
                />
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Enter meta description"
                  label="Meta Description"
                  value={metaDescription}
                  onChange={(e) => {
                    setMetaDescription(e.target.value);
                  }}
                />
              </div>
            </div>

            <Button isLoading={isLoading} disabled={isLoading}>
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default EditProduct;
