"use client";
import { useEffect, useState } from "react";

// Next imports
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// API
import { validateLogin } from "@/utils/api";

// Toast
import { toast } from "react-toastify";

// Icons
import { FiShoppingCart } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { MdOutlineFavorite } from "react-icons/md";
import { useAuthContx } from "@/store/userContext";





// Components
import Search from "../../home/search";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [navIsActive, setNavIsActive] = useState<boolean>(false)
  const [user, setUser] = useState<userData | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  const {userData} = useAuthContx()

  useEffect(() => {
    // getUserData();

    JSON.parse(localStorage.getItem("cart") as string)?.length
      ? setCartCount(JSON.parse(localStorage.getItem("cart") as string)?.length)
      : null; // Cart Count
  }, [pathname]);

 useEffect(()=> {
    if (pathname && pathname == "/checkout" && !userData._id) {
      toast.error("Please login to place order");
      router.push("/login");
    }
 }, [pathname, userData])

    const handleNavToggle = ()=> {
    setNavIsActive( prev => !prev)
  }

  return (
    !pathname.includes("/dashboard") && (
      <header className="py-7 bg-gray-900 sticky top-0 z-50">
        <div className="container">
          <div className="flex md:items-center justify-between">
            <div>
              <Link href="/">
                <Image src="/logo-white.png" alt="" width={130} height={57} />
              </Link>
            </div>

            <ul
              className={`flex gap-y-6  md:gap-y-0 flex-col px-5 py-5 md:py-0 md:px-0 md:flex md:flex-row  md:gap-x-7 ${
                navIsActive
                  ? "block h-screen absolute w-full mt-7   top-[67px] z-10 right-0 backdrop-blur-sm bg-[#000000a5]  transition-all"
                  : "hidden"
              } `}
            >
              <Link
                onClick={() => setNavIsActive(false)}
                className="text-white"
                href="/"
              >
                Home
              </Link>
              {/* <span className="block text-white ">
                {user ? `Hello, ${user.name}` : ""}
              </span> */}

              <Link
                onClick={() => setNavIsActive(false)}
                href={
                  userData
                    ? userData?.role == "customer"
                      ? "/profile"
                      : "/dashboard"
                    : "/login"
                }
                className="text-left"
              >
                <span className="text-white font-medium flex items-center gap-2">
                  {userData ? "Account & Orders" : "Login"}
                </span>
              </Link>

              <span className=" text-white">
                {/* <MdOutlineFavorite /> */}
                <Link
                  onClick={() => setNavIsActive(false)}
                  className="text-white  ml-1"
                  href="/user/saved-items"
                >
                  Saved items
                </Link>
              </span>

              <Link
                onClick={() => setNavIsActive(false)}
                href="/cart"
                className="flex items-center gap-2 text-base text-white"
              >
                <FiShoppingCart className="text-xl" />
                <p>
                  Cart{" "}
                  <span className="text-primary text-sm">
                    (<span className="cartCount">{cartCount}</span>)
                  </span>
                </p>
              </Link>
            </ul>

            <div className="md:hidden">
              {navIsActive == false ? (
                <IoMenu
                  className=" text-white text-2xl"
                  onClick={handleNavToggle}
                />
              ) : (
                <LiaTimesSolid
                  className=" text-white font-semibold text-2xl"
                  onClick={handleNavToggle}
                />
              )}
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
