import { convertWibWithManualOutput } from "@/api/ConvertToWib";
import { Link } from "@inertiajs/react";
import { Button, Dropdown, Table, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export const TableWithSearch = ({ columns, data }) => {
    // columns berupa [{uniq_name: "name_uniq", name: "Nama column"}]
    // data berupa [{nama_uniq: "value"}]
    // di head table akan merender maping column dengan name yang di tabmpilkan
    // sementara di body table akan merender maping data dengan value yang di ambil dari uniq_name column
    const theme = {
        root: {
            base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
            shadow: "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
            wrapper: "relative",
        },
        body: {
            base: "group/body",
            cell: {
                base: "group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-6 py-4",
            },
        },
        head: {
            base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
            cell: {
                base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3",
            },
        },
        row: {
            base: "group/row",
            hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
            striped:
                "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
        },
    };
    const [skeletonCount, setSkeletonCount] = useState(0);
    const [idTo, setIdTo] = useState(null);
    const [modalStatus, setModalStatus] = useState(false);

    useEffect(() => {
        const countOfSkeleton = () => {
            const screenHeight = window.innerHeight;
            const screenWidth = window.innerWidth;
            const isMobile = screenWidth <= 768; // Misalnya, jika lebar layar <= 768px, dianggap sebagai mode mobile
            const availableHeight = screenHeight - 175;

            // Menghitung berapa kali komponen dengan tinggi 42px dapat dirender
            let calculatedRenderCount = Math.floor(availableHeight / 42) - 1;

            // Mengurangi dua komponen jika berada dalam mode mobile
            if (isMobile) {
                calculatedRenderCount = Math.max(0, calculatedRenderCount - 2);
            }

            // Menyimpan hasil perhitungan ke dalam state
            setSkeletonCount(calculatedRenderCount);
        };
        countOfSkeleton();
    }, []);
    // useSignals();

    const onSure = async () => {
        setModalStatus(false);

        if (idTo === null) return;
        const id = idTo;
        setIdTo(null);
        try {
            const resp = await axios.delete(
                route("dashboard.api.delete-request", { id: id })
            );
            if ((resp.status = 200)) {
                addNotif({
                    title: "Data has been deleted successfully",
                    success: true,
                });
            } else {
                addNotif({
                    title: "Failed to delete data",
                    success: false,
                });
            }
        } catch (error) {
            console.error(error);
            addNotif({
                title: "Failed to delete data",
                success: false,
            });
        }
    };
    const onDeleteClick = (id) => {
        setModalStatus(true);
        setIdTo(id);
    };

    return (
        <>
            <div className="overflow-x-auto">
                {columns.length === 0 ? (
                    <div className="flex justify-center items-center text-3xl w-full h-full drop">
                        Tidak ada data
                    </div>
                ) : (
                    <Table hoverable theme={theme}>
                        <Table.Head>
                            <Table.HeadCell>No.</Table.HeadCell>
                            {columns.map((column, key) => (
                                <Table.HeadCell key={key}>
                                    {column.name}
                                </Table.HeadCell>
                            ))}
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {data.map((item, key) => {
                                return (
                                    <Table.Row
                                        key={key}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell>{key + 1}</Table.Cell>
                                        {columns.map((column, i) => {
                                            if (i === 0)
                                                return (
                                                    <Table.Cell
                                                        key={i}
                                                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                                    >
                                                        {item[column.uniq_name]}
                                                    </Table.Cell>
                                                );
                                            else if (column?.type === "date")
                                                return (
                                                    <Table.Cell key={i}>
                                                        {convertWibWithManualOutput(
                                                            item[
                                                                column.uniq_name
                                                            ]
                                                        )}
                                                    </Table.Cell>
                                                );
                                            else if (column?.type === "list")
                                                return (
                                                    <Table.Cell
                                                        key={i}
                                                        className=""
                                                    >
                                                        <div className="flex flex-row flex-wrap gap-1 justify-center items-center h-full">
                                                            {item[
                                                                column.uniq_name
                                                            ].map(
                                                                (item, key) => (
                                                                    <div
                                                                        key={
                                                                            key
                                                                        }
                                                                        className="bg-teal-600 text-gray-100 dark:bg-teal-600 text-[10px] py-[2px] px-2 rounded-xl uppercase"
                                                                    >
                                                                        {item}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </Table.Cell>
                                                );
                                            else if (column?.type === "link")
                                                return (
                                                    <Table.Cell key={i}>
                                                        <a
                                                            href={
                                                                "https://wa.me/62" +
                                                                item[
                                                                    column
                                                                        .uniq_name
                                                                ]
                                                            }
                                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                        >
                                                            0
                                                            {
                                                                item[
                                                                    column
                                                                        .uniq_name
                                                                ]
                                                            }
                                                        </a>
                                                    </Table.Cell>
                                                );
                                            else
                                                return (
                                                    <Table.Cell key={i}>
                                                        {item[column.uniq_name]}
                                                    </Table.Cell>
                                                );
                                        })}
                                        <Table.Cell>
                                            <Dropdown
                                                label="Action"
                                                placement="left-start"
                                            >
                                                <Dropdown.Item>
                                                    Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        onDeleteClick(item.id)
                                                    }
                                                >
                                                    Delete
                                                </Dropdown.Item>
                                            </Dropdown>
                                            {/* <Link
                                            href="#"
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                        >
                                            Edit
                                        </Link> */}
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            }) || (
                                <LoadingSkeleton
                                    totalRow={skeletonCount}
                                    columnTotal={columns.length}
                                />
                            )}
                        </Table.Body>
                    </Table>
                )}
            </div>
            <Modal
                show={modalStatus}
                size="md"
                onClose={() => setModalStatus(false)}
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this member with id
                            [{idTo}] ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={onSure}
                                disabled={idTo === null ? true : false}
                            >
                                {"Yes, I'm sure"}
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setModalStatus(false)}
                            >
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

const Skeleton = () => {
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        </div>
    );
};

const LoadingSkeleton = ({ totalRow, columnTotal }) => {
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
                    <Skeleton></Skeleton>
                </Table.Cell>
                <Table.Cell>
                    <Skeleton></Skeleton>
                </Table.Cell>
            </Table.Row>
        );
    });
};
