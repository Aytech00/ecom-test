
import Link from "next/link";

import { FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";
import Image from "next/image";


const FOOTERITEMS = [

  {
    id: 1,
    link: "",

  },
]


export default function Footer() {


  const cuurentDate = () => {
    return new Date().getFullYear();
  };



  return (
    <div className="bg-slate-900 ">
      <hr className="border-[#82929353]" />

      <div className="grid grid-cols-2    sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4    mx-auto gap-10 sm:gap-10 lg:gap-20 container  py-14">
        <div className="mb-1 sm:mb-3 md:mb-0 lg:mb-0 col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 ">
          <div className="mb-3">
            <Link href="/">
              <Image src="/logo-white.png" alt="" width={130} height={57} />
            </Link>
          </div>

          <p className="text-slate-200 leading-loose text-[14px] ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            quidem eligendi dolores molestiae sed.
          </p>
        </div>
        <div className="flex md:justify-start lg:justify-center">
          <ul className={"text-slate-300 text-[14px]"}>
            <li className="  hover:underline mb-3">
              <Link className="" href="/terms-and-conditions">
                Terms & Conditions
              </Link>
            </li>
            <li className="  hover:underline mb-3">
              <Link className="" href="/terms-and-conditions">
                Help
              </Link>
            </li>
            <li className="  hover:underline mb-3">
              <Link className="" href="/contact">
                Contact
              </Link>
            </li>
            <li className="  hover:underline mb-3">
              <Link className="" href="/terms-and-conditions">
                Terms & Conditions
              </Link>
            </li>

            <li className="  transition-all hover:underline">
              <Link className="" href="/shipping-delivery-policy">
                Shipping
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex md:justify-center">
          <ul className="text-slate-300 text-[14px]">
            <li className=" mb-3  hover:underline">
              <Link className="" href="/cancellation-and-refund-policy">
                Cancellation
              </Link>
            </li>
            <li className=" mb-3  hover:underline">
              <Link className="" href="/cancellation-and-refund-policy">
                Cancellation
              </Link>
            </li>
            <li className=" mb-3  hover:underline">
              <Link className="" href="/cancellation-and-refund-policy">
                Cancellation
              </Link>
            </li>
            <li className=" mb-3 hover:underline">
              <Link className="" href="/cancellation-and-refund-policy">
                Cancellation
              </Link>
            </li>
            <li className=" mb-3  hover:underline">
              <Link className="" href="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex  md:justify-center">
          <ul className="text-slate-300 text-[14px]">
            <li className=" mb-3 hover:text-[#61c1d1] hover:underline">
              <Link className="" href="/cancellation-and-refund-policy">
                Refund Policy
              </Link>
            </li>
            <li className=" mb-3 hover:text-[#61c1d1] hover:underline">
              <Link className="" href="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
            <li className=" mb-3 hover:text-[#61c1d1] hover:underline">
              <Link className="" href="/cancellation-and-refund-policy">
                Cancellation
              </Link>
            </li>
            <li className=" mb-3 hover:text-[#61c1d1] hover:underline">
              <Link className="" href="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex   ">
          <ul className="text-slate-300 text-[14px]">
            <li className=" mb-3  hover:underline">
              <Link className="" href="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
            <li className=" mb-3  hover:underline">
              <Link className="" href="/cancellation-and-refund-policy">
                Cancellation
              </Link>
            </li>
            <li className=" mb-3hover:underline">
              <Link className="" href="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-[#82929353]" />
      <div className="flex justify-between flex-col container  sm:flex-col md:flex-row lg:flex-row  items-center py-5">
        <p className="text-slate-300 text-sm mb-2 sm:mb-2 md:mb-0 lg:mb-0">
          © {cuurentDate()} lorem - All Rights Reserved.
        </p>
        <div className=" flex mt-3 md:flex text-lg gap-x-3 justify-center text-slate-400 ">
          <a
            className="hover:text-[#61c1d1]"
            href="https://twitter.com/ "
            target="_blank"
          >
            <FaTwitter className="" />
          </a>
          <a
            className="hover:text-[#61c1d1]"
            href=" https://www.instagram.com/ "
            target="_blank"
          >
            <FaInstagram className="" />
          </a>
        </div>
      </div>
    </div>
  );
}
