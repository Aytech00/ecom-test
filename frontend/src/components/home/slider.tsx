import Image from "next/image";
import Search from "./search";

const Slider = () => {
  return (
    <div className="relative h-[500px]  bg-cover bg-center bg-[url('/slider-img.jpg')]">
      <div className="w-full h-full  bg-slate-700/30 backdrop-brightness-50">
        <Search />
        {/* <Image
        src="/slider-img.jpg"
        alt=""
        width={1920}
        height={1080}
        className="h-[500px] w-full object-cover"
      /> */}
      </div>
    </div>
  );
};

export default Slider;
