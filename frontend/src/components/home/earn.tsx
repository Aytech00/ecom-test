// Next imports
import Image from "next/image";
import Link from "next/link";

// components
import Button from "../ui/button";

const Earn = () => {
  return (
    <div className="py-20 bg-gray-900">
      <div className="container">
        <div className="flex flex-col md:flex-row  md:items-center md:justify-between md:gap-28">
          <div className="mb-6 md:mb-0 md:w-[70%]">
            <h1 className="text-white  font-semibold  leading-loose text-3xl md:font-bold md:text-3xl">
              Earn Money by selling products with us
            </h1>
            <p className="text-gray-300 mt-5 leading-loose text-[15px] mb-10 text-justify">
              Lorem ipsum dolor sit amet onsectetur adipisicing elit. Rem
              aperiam officia hic veniam, nobis at voluptas odit placeat amet
              beatae aliquid neque vel culpa corrupti, perferendis ad nisi
              blanditiis sed cupiditate unde, animi iusto eius quibusdam. Quidem
              soluta quia officiis optio modi ex quis nemo in illo eius
              recusandae beatae at officia hic laudantium aliquid doloribus
              suscipit eveniet provident autem ipsum, odit vero. Quaerat iste
              itaque beatae possimus, vero voluptas saepe ex, eveniet adipisci
              nis.
            </p>

            <Link href="/register">
              <Button>Create Account</Button>
            </Link>
          </div>

          <div className=" w-full md:w-[40%] flex md:items-center justify-end">
            <Image
              src="/shop-illustration.svg"
              alt=""
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earn;
