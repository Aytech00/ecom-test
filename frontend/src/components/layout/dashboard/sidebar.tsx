import { useState, useEffect } from "react";
// Next imports
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Icons
import {
  FaHome,
  FaArchive,
  FaUser,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { BiSolidLogOut, BiSolidMessageDetail } from "react-icons/bi";
import { validateLogin } from "@/utils/api";

interface NavLinkData {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<userData | null>(null);

  const [navLinks, setNavLinks] = useState([
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Profile",
      url: "/dashboard/profile",
      icon: <FaUser />,
    },
    {
      name: "Products",
      url: "/dashboard/products",
      icon: <FaArchive />,
    },
    {
      name: "Orders",
      url: "/dashboard/orders",
      icon: <FaShoppingCart />,
    },
    {
      name: "Messages",
      url: "/dashboard/messages",
      icon: <BiSolidMessageDetail />,
    },
  ]);

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await validateLogin();

        setUser(response);

        if (response?.role == "admin") {
          setNavLinks([
            {
              name: "Dashboard",
              url: "/dashboard",
              icon: <FaHome />,
            },
            {
              name: "Profile",
              url: "/dashboard/profile",
              icon: <FaUser />,
            },
            {
              name: "Users",
              url: "/dashboard/users",
              icon: <FaUsers />,
            },
            {
              name: "Products",
              url: "/dashboard/products",
              icon: <FaArchive />,
            },
            {
              name: "Orders",
              url: "/dashboard/orders",
              icon: <FaShoppingCart />,
            },
            {
              name: "Messages",
              url: "/dashboard/messages",
              icon: <BiSolidMessageDetail />,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (!user) getUserData();
  }, [pathname]);

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="flex flex-col lg:w-64 w-14 bg-gray-900 border-r pb-4 h-full">
      <div className="flex items-center justify-center py-7">
        {/* Logo */}
        <Link href="/dashboard">
          <Image src="/logo-white.png" alt="" width={130} height={57} />
        </Link>
      </div>

      <nav className="flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          {navLinks.map((item: NavLinkData, index: number) => (
            <li className="w-full h-full" key={index}>
              <Link
                href={item.url}
                className={`px-5 py-3 font-medium flex items-center gap-3 text-white ${
                  pathname == item.url && "bg-primary"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="lg:block hidden">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <ul>
          <li>
            <button
              onClick={handleLogout}
              type="button"
              className="px-5 py-3 font-medium flex items-center gap-3 text-white cursor-pointer"
            >
              <span className="text-xl ">
                <BiSolidLogOut    />
              </span>
              <span className="lg:block hidden ">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
