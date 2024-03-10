"use client";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";

// API
import { getOrders, updateOrderStatus } from "@/utils/api";

// Icons
import { BsEye } from "react-icons/bs";

// Next imports
import Link from "next/link";

// Components
import Button from "../ui/button";
import { toast } from "react-toastify";
import { log } from "util";

const Orders = () => {
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [currentPage, rowsPerPage]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getOrders(currentPage, rowsPerPage);
console.log(response);

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

  return (
    <div className="bg-white p-5 rounded-md">
      <div>
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
      
         
          {/* <Column
            header="Seller"
            body={(data) => (
              <div>
                <span className="block">{data?.seller?.name}</span>
                <span className="block text-sm">{data?.seller?.email}</span>

                <Link
                  href={`/profile/messages/${
                    data.seller._id
                  }?message=${encodeURI(
                    `👋 Hey there! Just wanted to drop a quick message to share my order ID with you: ${data.orderId}. If there are any updates or if you need any further information, please let me know. Thank you!`
                  )}`}
                >
                  <Button className="!py-1 !px-2 !text-[13.5px] mt-2">
                    Send Message
                  </Button>
                </Link>
              </div>
            )}
          /> */}
          <Column
            header="Action"
            body={(data) => (
              <div className="flex items-center gap-4">
                <Link href={`/order/${data.orderId}`}>
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
