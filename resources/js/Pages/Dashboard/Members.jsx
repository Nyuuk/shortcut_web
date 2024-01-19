import { AdminLayout } from "@/Layouts/Admin";
import {
    Button,
    Checkbox,
    Label,
    Modal,
    Spinner,
    Table,
    TextInput,
} from "flowbite-react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

export default function Members() {
    const [seacrhValue, setSearchValue] = useState({
        value: "",
        loading: false,
    });
    const [tableColumn, setTableColumn] = useState([]);
    const [searchBy, setSearchBy] = useState([]);

    const saveStateToCookie = () => {
        setTimeout(() => {
            Cookies.set(
                "fitur_table_and_search",
                JSON.stringify({ tableColumn, searchBy })
            );
        }, 500);
    };

    async function fetchData() {
        try {
            const resp = await axios.get(route("dashboard.api.get-members"));
            if (resp.status === 200) {
                setTableColumn(resp.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (tableColumn.length > 0 || searchBy.length > 0) {
            saveStateToCookie();
        }
    }, [tableColumn, searchBy]);

    return (
        <AdminLayout>
            <div className="flex flex-row gap-2 w-full justify-center items-center text-center text-gray-800/80 dark:text-gray-400/80 mb-3">
                <h1 className="tex-3xl uppercase">Members</h1>
                <div className="block w-full h-px border-[1px] rounded-md border-gray-800/50 dark:border-gray-300/50"></div>
            </div>
            <Container>
                <SearchInput
                    value={seacrhValue}
                    onChangeValue={setSearchValue}
                    className={"col-span-11"}
                />
                <ChangeTableColumn
                    tableColumn={{ tableColumn, setTableColumn }}
                    searchBy={{ searchBy, setSearchBy }}
                    className={"col-span-1"}
                />
                <T
                    className={"col-span-12"}
                    tableColumn={tableColumn}
                    dataBody={null}
                />
            </Container>
        </AdminLayout>
    );
}

const Container = ({ children }) => {
    return (
        <div className="text-xs md:text-base text-gray-800/80 dark:text-gray-400/80 w-full">
            <div className="grid grid-cols-12 gap-4 w-full">{children}</div>
        </div>
    );
};

const SearchInput = ({ value, onChangeValue, className }) => {
    return (
        <div className={"w-full relative " + className}>
            <TextInput
                id="search"
                type="text"
                icon={value.loading ? Spinner : FaSearch}
                placeholder="Search here 🙌"
                value={value.value}
                onChange={(e) =>
                    onChangeValue({ ...value, value: e.target.value })
                }
            />
            <IconContext.Provider value={{ size: "1.5em" }}>
                {value?.value.length > 0 && (
                    <span
                        className="absolute top-3 md:top-2 right-2 w-auto h-auto hover:cursor-pointer"
                        onClick={() => onChangeValue({ ...value, value: "" })}
                    >
                        <MdCancel />
                    </span>
                )}
            </IconContext.Provider>
        </div>
    );
};

const ChangeTableColumn = ({ ...props }) => {
    const { tableColumn, setTableColumn } = props.tableColumn;
    const { searchBy, setSearchBy } = props.searchBy;
    const { className } = props;
    const [openModal, setOpenModal] = useState(false);

    const valueChecked = {
        tableColumn: [
            "nama",
            "email",
            "no_wa",
            "alamat_ht",
            "programs",
            "period",
            "status_invoice",
        ],
        searchBy: [
            "nama",
            "email",
            "no_wa",
            "alamat_ht",
            "programs",
            "period",
            "status_invoice",
        ],
    };

    const valueColumn = [
        { label: "Name", id: "nama" },
        { label: "Email", id: "email" },
        { label: "WhatsApp Number", id: "no_wa" },
        { label: "Hometown Address", id: "alamat_ht" },
        { label: "Temporary Address", id: "alamat_st" },
        { label: "Programs Requested", id: "programs" },
        { label: "Programs Accepted", id: "programs_acc" },
        { label: "Period", id: "period" },
        { label: "Note", id: "catatan" },
        { label: "Payment Method", id: "payment_method" },
        { label: "Status Invoice", id: "status_invoice" },
        { label: "Created At", id: "created_at" },
        { label: "Updated At", id: "updated_at" },
    ];
    const onChangeCheckbook = (by = "tableColumn", target) => {
        const changeFunction = (val) => {
            if (by === "tableColumn") {
                if (tableColumn.includes(val)) {
                    setTableColumn(tableColumn.filter((item) => item !== val));
                } else {
                    setTableColumn([...tableColumn, val]);
                }
            } else {
                if (searchBy.includes(val)) {
                    setSearchBy(searchBy.filter((item) => item !== val));
                } else {
                    setSearchBy([...searchBy, val]);
                }
            }
        };

        changeFunction(target);
    };
    const ModalChangeCheckbook = ({ value, onChange }) => {
        const { valueColumn, tableColumn, searchBy, openModal } = value;
        const { onChangeCheckbook, setOpenModal } = onChange;
        return (
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Setting View</Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <div className="block">
                                <Label
                                    value="Columns : "
                                    htmlFor="columns"
                                    className="text-base uppercase "
                                />
                            </div>
                            <div
                                id="column"
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2"
                            >
                                {valueColumn.map((item, key) => {
                                    return (
                                        <div className="flex gap-2" key={key}>
                                            <Checkbox
                                                id={item.id + "_column"}
                                                onChange={() =>
                                                    onChangeCheckbook(
                                                        "tableColumn",
                                                        item.id
                                                    )
                                                }
                                                checked={tableColumn.includes(
                                                    item.id
                                                )}
                                            />
                                            <Label
                                                value={item.label}
                                                htmlFor={item.id + "_column"}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="block">
                                <Label
                                    value="Search By :"
                                    className="uppercase text-base"
                                    htmlFor="search_by"
                                />
                            </div>
                            <div
                                id="search_by"
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2"
                            >
                                {valueColumn.map((item, key) => {
                                    return (
                                        <div className="flex gap-2" key={key}>
                                            <Checkbox
                                                id={item.id + "_search_by"}
                                                onChange={() =>
                                                    onChangeCheckbook(
                                                        "searchBy",
                                                        item.id
                                                    )
                                                }
                                                checked={searchBy.includes(
                                                    item.id
                                                )}
                                            />
                                            <Label
                                                value={item.label}
                                                htmlFor={item.id + "_search_by"}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>
                        I accept
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const setCookiesToState = () => {
        const cookieData = Cookies.get("fitur_table_and_search") !== undefined;
        if (cookieData) {
            const data = JSON.parse(Cookies.get("fitur_table_and_search"));
            setTableColumn(data.tableColumn);
            setSearchBy(data.searchBy);
        } else {
            setTableColumn(valueChecked.tableColumn);
            setSearchBy(valueChecked.searchBy);
            Cookies.set("fitur_table_and_search", JSON.stringify(valueChecked));
        }
    };

    useEffect(() => {
        setCookiesToState();
    }, []);

    return (
        <>
            <Button
                color="gray"
                onClick={() => setOpenModal((prev) => !prev)}
                className={className}
            >
                <IoSettings />
            </Button>
            <ModalChangeCheckbook
                value={{ valueColumn, tableColumn, searchBy, openModal }}
                onChange={{ onChangeCheckbook, setOpenModal }}
            />
        </>
    );
};

const T = ({ className, tableColumn = [], dataBody = null }) => {
    const columnValueDefault = [
        {
            uniq_name: "nama",
            name: "Name",
        },
        {
            uniq_name: "email",
            name: "Email",
        },
        {
            uniq_name: "no_wa",
            name: "Whatsapp Num",
            type: "link",
            prefix_link: "https://wa.me/62",
        },
        {
            uniq_name: "alamat_ht",
            name: "Home Address",
        },
        {
            uniq_name: "alamat_st",
            name: "Temporary Address",
        },
        {
            uniq_name: "programs",
            name: "Requested Programs",
            type: "list",
        },
        {
            uniq_name: "programs_acc",
            name: "Accepted Programs",
            type: "list",
        },
        {
            uniq_name: "catatan",
            name: "Note",
        },
        {
            uniq_name: "period",
            name: "Period",
        },
        {
            uniq_name: "payment_method_id",
            name: "Payment Method",
        },
        {
            uniq_name: "status_invoice",
            name: "Status Invoice",
        },
        {
            uniq_name: "created_at",
            name: "Requested At",
            type: "date",
        },
        {
            uniq_name: "updated_at",
            name: "Updated At",
            type: "date",
        },
    ];

    return (
        <div className={"overflow-x-auto " + className}>
            <Table striped>
                <Table.Head>
                    {tableColumn.map((item, key) => {
                        const name = columnValueDefault.filter(
                            (i) => i.uniq_name === item
                        )[0]?.name;

                        return (
                            <Table.HeadCell key={key} className="capitalize">
                                {name}
                            </Table.HeadCell>
                        );
                    })}
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {dataBody === null ? (
                        <LoadingSkeleton columnTotal={tableColumn.length} />
                    ) : dataBody.length === 0 ? (
                        <div className="text-center">No Data</div>
                    ) : (
                        dataBody.map((item, key) => {
                            return (
                                <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={key}
                                >
                                    {tableColumn.map((column, i) => {
                                        if (i === 0)
                                            return (
                                                <Table.Cell
                                                    key={i}
                                                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                                >
                                                    {item[column]}
                                                </Table.Cell>
                                            );
                                        else if (column?.type === "date")
                                            return (
                                                <Table.Cell key={i}>
                                                    {convertWibWithManualOutput(
                                                        item[column]
                                                    )}
                                                </Table.Cell>
                                            );
                                        else if (column?.type === "list")
                                            return (
                                                <Table.Cell key={i}>
                                                    <div className="flex flex-row flex-wrap gap-1 h-full">
                                                        {item[column].map(
                                                            (item, i) => {
                                                                return (
                                                                    <div
                                                                        key={i}
                                                                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                                                                    >
                                                                        {item}
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </Table.Cell>
                                            );
                                        else
                                            return (
                                                <Table.Cell key={i}>
                                                    {item[column]}
                                                </Table.Cell>
                                            );
                                    })}
                                </Table.Row>
                            );
                        })
                    )}
                    {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {'Apple MacBook Pro 17"'}
                        </Table.Cell>
                        <Table.Cell>Sliver</Table.Cell>
                        <Table.Cell>Laptop</Table.Cell>
                        <Table.Cell>$2999</Table.Cell>
                        <Table.Cell>
                            <a
                                href="#"
                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            >
                                Edit
                            </a>
                        </Table.Cell>
                    </Table.Row> */}
                </Table.Body>
            </Table>
        </div>
    );
};

const LoadingSkeleton = ({ columnTotal }) => {
    const [totalRow, setTotalRow] = useState(1);
    const calculateTotalRow = () => {
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        const isMobile = screenWidth <= 768; // Misalnya, jika lebar layar <= 768px, dianggap sebagai mode mobile
        const availableHeight = screenHeight - 175;

        // Menghitung berapa kali komponen dengan tinggi 42px dapat dirender
        let calculatedRenderCount = Math.floor(availableHeight / 42) - 2;

        // Mengurangi dua komponen jika berada dalam mode mobile
        if (isMobile) {
            calculatedRenderCount = Math.max(0, calculatedRenderCount - 2);
        }

        // Menyimpan hasil perhitungan ke dalam state
        setTotalRow(calculatedRenderCount);
    };
    useEffect(() => {
        calculateTotalRow();
    }, []);
    return [...Array(totalRow)].map((_, index) => {
        return (
            <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
                {[...Array(columnTotal)].map((a, i) => {
                    return (
                        <Table.Cell key={i}>
                            <Skeleton className="w-full" />
                        </Table.Cell>
                    );
                })}
                <Table.Cell>
                    <Skeleton classNamewe="w-full" />
                </Table.Cell>
            </Table.Row>
        );
    });
};

const Skeleton = () => {
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        </div>
    );
};
