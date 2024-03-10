import PopularProducts from "./popular-products";
import Earn from "./earn";
import LatestProducts from "./latest-products";
import Slider from "./slider";


const Home = () => {
  return (
    <>
      <Slider />
     
      <LatestProducts />
      <Earn />
      <PopularProducts />
    </>
  );
};

export default Home;
