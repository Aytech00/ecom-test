"use client";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";

// API
import { deleteProduct, getProducts, validateLogin } from "@/utils/api";

// Icons
import { BsFillPenFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

// Toast
import { toast } from "react-toastify";

// Next imports
import Link from "next/link";
import Image from "next/image";

// Components
import Input from "../../ui/input";
import Button from "../../ui/button";

const Products = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState<userData | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();

    async function getUserData() {
      try {
        const response = await validateLogin();

        setUser(response);
      } catch (error) {
        console.error(error);
      }
    }
    if (!user) getUserData();
  }, [currentPage, rowsPerPage, searchText]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts(currentPage, rowsPerPage, searchText);

      setData(response.data);
      setTotalRecords(response.totalRecords);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onPageChange = (event: any) => {
    setCurrentPage(event.page + 1);
    setRowsPerPage(event.rows);
  };

  const onSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure?")) {
      try {
        const response = await deleteProduct(id);

        toast.success(response.message);
        fetchData();
      } catch (error) {
        toast.error((error as any).response.data.error); // Handle error response
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-md">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-medium">Products</h1>

          <Input
            type="search"
            value={searchText}
            onChange={onSearch}
            placeholder="Search...."
          />

          <Link href="/dashboard/products/create">
            <Button>Add Product</Button>
          </Link>
        </div>

        <DataTable value={data} loading={isLoading}>
          <Column
            header="Image"
            body={(data) =>
              data.image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_UPLOAD_FOLDER}/${data.image}`}
                  alt=""
                  width={75}
                  height={75}
                />
              )
            }
          ></Column>
          <Column field="name" header="Name" />
          <Column
            header="Price"
            body={(data) =>
              data.price.toLocaleString("en-US", {
                minimumFractionDigits: 0,
              })
            }
          />
          <Column
            header="MRP Price"
            body={(data) =>
              data.mrpPrice.toLocaleString("en-US", {
                minimumFractionDigits: 0,
              })
            }
          />
          <Column
            header="Quantity"
            body={(data) => data.quantity + " " + data.unit}
          />
          {user?.role == "admin" && (
            <Column
              header="Seller"
              body={(data) => (
                <div>
                  <span className="block">{data.user.name}</span>
                  <span className="block text-sm">{data.user.email}</span>

                  <Link href={`/dashboard/messages/${data.user._id}`}>
                    <Button className="!py-1 !px-2 !text-[13.5px] mt-2">
                      Send Message
                    </Button>
                  </Link>
                </div>
              )}
            />
          )}
          <Column
            header="Action"
            body={(data) => (
              <div className="flex items-center gap-4">
                <Link href={`/dashboard/products/${data._id}`}>
                  <button
                    type="button"
                    className="w-[44px] h-[44px] rounded-full font-medium text-white flex items-center justify-center bg-blue-500 border-blue-500 transition hover:bg-blue-600"
                  >
                    <BsFillPenFill />
                  </button>
                </Link>
                <button
                  type="button"
                  className="w-[44px] h-[44px] rounded-full font-medium text-white flex items-center justify-center bg-red-500 border-red-500 transition hover:bg-red-600"
                  onClick={() => {
                    handleDeleteProduct(data._id);
                  }}
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          />
        </DataTable>

        <Paginator
          first={currentPage}
          rows={rowsPerPage}
          totalRecords={totalRecords}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Products;
