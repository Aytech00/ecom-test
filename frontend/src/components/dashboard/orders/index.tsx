"use client";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";

// API
import { getOrders, validateLogin } from "@/utils/api";

// Icons
import { BsEye } from "react-icons/bs";

// Next imports
import Link from "next/link";

// Components
import Button from "../../ui/button";
import { stat } from "fs/promises";
import Modal from "@/components/modal";
import { toast } from "react-toastify";
import { log } from "util";


const Orders = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState<userData | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchData();

    async function getUserData() {
      try {
        const response = await validateLogin();
console.log(response);

        setUser(response);
      } catch (error) {
        console.error(error);
      }
    }
    if (!user) getUserData();
  }, [currentPage, rowsPerPage]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getOrders(currentPage, rowsPerPage);

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

  const handleModalToggle = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="">
      <div className="bg-white p-5 rounded-md">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-medium">Orders</h1>
        </div>

        <DataTable value={data} loading={isLoading}>
          <Column
            header="Order Id"
            body={(data) => <p>#{data.orderId}</p>}
          ></Column>
          <Column field="paymentMethod" header="Payment Method" />
          <Column
            header="Total"
            body={(data) => (
              <p>
                $
                {data.total.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                })}
              </p>
            )}
          />

       
            <Column
              header="Customer"
              body={(data) => (
                <div>
                  <span className="block">{data.customer.name}</span>
                  <span className="block text-sm">{data.customer.email}</span>

                  <Link href={`/dashboard/messages/${data.customer._id}`}>
                    <Button className="!py-1 !px-2 !text-[13.5px] mt-2">
                      Send Message
                    </Button>
                  </Link>
                </div>
              )}
            />
        
          
          <Column
            header="Action"
            body={(data) => (
              <div className="flex items-center gap-4">
                <Link href={`/dashboard/orders/${data.orderId}`}>
                  <button
                    type="button"
                    className="w-[44px] h-[44px] rounded-full font-medium text-white flex items-center justify-center bg-blue-500 border-blue-500 transition hover:bg-blue-600"
                  >
                    <BsEye />
                  </button>
                </Link>
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

export default Orders;
