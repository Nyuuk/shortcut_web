import { AdminLayout } from "@/Layouts/Admin";
import { TableWithSearch } from "./Components/Table";
import { Pagination, TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { addNotif } from "./Components/Notification";

export default function NewMember() {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [valSearch, setValSearch] = useState();

    const columnWillRender = [
        {
            uniq_name: "nama",
            name: "Name",
        },
        // {
        //     uniq_name: "email",
        //     name: "Email",
        // },
        {
            uniq_name: "no_wa",
            name: "Whatsapp Num",
            type: "link",
        },
        // {
        //     uniq_name: "alamat_ht",
        //     name: "Home Address",
        // },
        {
            uniq_name: "alamat_st",
            name: "Temporary Address",
        },
        // {
        //     uniq_name: "catatan",
        //     name: "Note",
        // },
        // {
        //     uniq_name: "period",
        //     name: "Periods",
        // },
        {
            uniq_name: "programs",
            name: "Programs",
            type: "list",
        },
        {
            uniq_name: "created_at",
            name: "Requested At",
            type: "date",
        },
    ];

    const onPaginationClick = (page) => {
        setCurrentPage(page);
    };

    const fetchingData = async () => {
        setData([]);
        const notify = {
            title: "Data has been fetched successfully",
            success: true,
        };
        try {
            const params = {
                page: currentPage,
                perPage: perPage,
            };
            if (valSearch) {
                params["search"] = valSearch;
            }
            const resp = await axios.get(
                route("dashboard.api.get-requests", params)
            );
            if (resp.status === 200) {
                // console.log(resp.data.data);
                setData(resp.data.data.data);
                setCurrentPage(resp.data.data.current_page);
                setPerPage(resp.data.data.per_page);
                setTotalPage(resp.data.data.last_page);
                if (resp.data.data.data.length === 0) {
                    notify["title"] = "Data not found";
                    notify["success"] = false;
                } else {
                    notify["title"] = "Data has been fetched successfully";
                    notify["success"] = true;
                }
            } else {
                notify["title"] = "Failed to fetch data";
                notify["success"] = false;
            }
        } catch (error) {
            console.error(error);
            notify["title"] = "Failed to fetch data";
            notify["success"] = false;
        } finally {
            addNotif(notify);
        }
    };

    useEffect(() => {
        console.log([valSearch, currentPage, perPage, totalPage]);
        const getData = setTimeout(async () => {
            await fetchingData();
        }, 500);
        return () => clearTimeout(getData);
    }, [valSearch, currentPage, perPage]);

    return (
        <>
            <AdminLayout>
                <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                    <SearchComp
                        value={valSearch}
                        onChange={(e) => setValSearch(e.target.value)}
                    />
                    <Pag
                        className={"hidden md:block"}
                        total={totalPage}
                        currentPage={currentPage}
                        onPageChange={onPaginationClick}
                    />
                </div>
                <TableWithSearch columns={columnWillRender} data={data} />
                <Pag
                    className={"block md:hidden mt-4"}
                    layout="navigation"
                    total={totalPage}
                    currentPage={currentPage}
                    onPageChange={onPaginationClick}
                />
            </AdminLayout>
        </>
    );
}

export const SearchComp = ({ ...props }) => {
    const { className, value, onChange } = props;

    return (
        <div
            className={
                "w-full md:max-w-[calc(100vw-500px)] xl:max-w-md " +
                (className && className)
            }
        >
            <TextInput
                id="search"
                type="text"
                icon={FaSearch}
                placeholder="Search here"
                sizing={"md"}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};
const Pag = ({
    currentPage = 1,
    onPageChange = () => {},
    total = 10,
    className,
    ...props
}) => {
    const customTheme = {
        pages: {
            base: "inline-flex items-center -space-x-px",
        },
    };
    return (
        <div
            className={
                "flex overflow-x-auto justify-center items-center " + className
            }
        >
            <Pagination
                {...props}
                currentPage={currentPage}
                totalPages={total}
                onPageChange={onPageChange}
                showIcons
                theme={customTheme}
            />
        </div>
    );
};
