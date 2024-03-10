"use client";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";

// API
import { deleteUser, getUsers, validateLogin } from "@/utils/api";

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

const Users = () => {
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
      const response = await getUsers(currentPage, rowsPerPage, searchText);

      setData(response.users);
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

  const handleDeleteUser = async (id: string) => {
    if (confirm("Are you sure?")) {
      try {
        const response = await deleteUser(id);

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
          <h1 className="text-2xl font-medium">Users</h1>

          <Input
            type="search"
            value={searchText}
            onChange={onSearch}
            placeholder="Search...."
          />
        </div>

        <DataTable value={data} loading={isLoading}>
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column
            header="Role"
            body={(data) => <div>{data.role.toUpperCase()}</div>}
          />

          <Column
            header="Send Message"
            body={(data) => (
              <div>
                <Link href={`/dashboard/messages/${data._id}`}>
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
                <button
                  type="button"
                  className="w-[44px] h-[44px] rounded-full font-medium text-white flex items-center justify-center bg-red-500 border-red-500 transition hover:bg-red-600"
                  onClick={() => {
                    handleDeleteUser(data._id);
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

export default Users;
