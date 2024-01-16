import { AdminLayout } from "@/Layouts/Admin";
import {
    Button,
    Card,
    Checkbox,
    Label,
    Modal,
    TextInput,
    Textarea,
} from "flowbite-react";
import { MdOutlineAdd } from "react-icons/md";
import { SearchComp } from "./NewMember";
import signalsComponents from "./Components/signalsComponents";
import { addNotif } from "./Components/Notification";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { effect, signal } from "@preact/signals-react";

const refresh = signal(false);

export default function Programs() {
    const [status, setStatus] = useState(false);
    const [data, setData] = useState([]);

    console.log("Programs rendered");
    const fetchingData = async () => {
        try {
            const resp = await axios.get(route("dashboard.api.get-programs"));
            console.log(resp.data.data);
            signalsComponents.data.value = {
                ...signalsComponents.data.value,
                data: resp.data.data,
            };

            setData(resp.data.data);

            if (resp.data.data.length === 0)
                addNotif({
                    title: "No data found",
                    success: false,
                });
            else
                addNotif(
                    {
                        title: "Data has been fetched successfully",
                        success: true,
                    },
                    true,
                    1000
                );
        } catch (error) {
            addNotif({
                title: "Failed to fetch data",
                success: false,
            });
            console.error(error);
        }
    };

    const changeModal = (id) => {
        setStatus((prev) => !prev);
        signalsComponents.data.value = {
            ...signalsComponents.data.value,
            id: id,
        };
    };

    const onCloseModal = () => {
        setStatus((prev) => !prev);
        signalsComponents.data.value = {
            ...signalsComponents.data.value,
            id: null,
        };
    };

    useEffect(() => {
        fetchingData();
    }, []);

    effect(() => {
        if (refresh.value) {
            fetchingData();
            refresh.value = false;
        }
    });

    return (
        <>
            <AdminLayout>
                <h1 className="text-xl text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1">
                    Programs
                </h1>
                <div className="flex flex-row flex-wrap justify-between text-center items-center gap-2">
                    <SearchComp />
                    <Button
                        color="blue"
                        outline
                        onClick={() => setStatus((prev) => !prev)}
                    >
                        <MdOutlineAdd className="mr-2 h-6 w-6" />
                        New Program
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-4 transition-all duration-300">
                    {/* <FormWillRender
                        id={1}
                    /> */}
                    {data?.map((item, key) => {
                        return (
                            <FormWillRender
                                key={key}
                                // uniqName={item.username}
                                data={item}
                                changeModal={() => changeModal(item.id)}
                            />
                        );
                    })}
                </div>
                <Modal show={status} size="md" popup onClose={onCloseModal}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <T1 />
                        </div>
                    </Modal.Body>
                </Modal>
            </AdminLayout>
        </>
    );
}

const FormWillRender = ({ data, changeModal }) => {
    const { username, nama, harga, deskripsi, is_active } = data;
    const [wantToDelete, setWantToDelete] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const onSubmitDelete = async () => {
        try {
            const resp = await axios.delete(
                route("dashboard.api.delete-program", { id: data.id })
            );
            addNotif({
                title: "Data has been deleted successfully",
                success: true,
            });
            setWantToDelete(false);
        } catch (error) {
            addNotif({
                title: "Failed to delete data",
                success: false,
            });
            console.error(error);
        } finally {
            // signalsComponents.data.value = {
            //     ...signalsComponents.data.value,
            //     refresh: true,
            // };

            refresh.value = true;
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const maxLength = 29;
    const displayText = isExpanded ? deskripsi : deskripsi.slice(0, maxLength);
    return (
        <>
            <Card
                theme={{
                    root: {
                        children:
                            "flex h-full flex-col justify-center gap-4 p-6",
                    },
                }}
                className={isExpanded ? "row-span-2" : ""}
            >
                <div className={"flex flex-col mb-1 "}>
                    <h1 className="uppercase text-lg text-gray-750 dark:text-gray-100 text-center mb-2">
                        {username || "New Program"}
                    </h1>
                    <div className="w-full text-sm text-gray-600 dark:text-gray-400 grid grid-cols-5 grid-flow-dense gap-1">
                        <span className="col-span-2">Name of program</span>{" "}
                        <span className="col-span-1">:</span>
                        <span className="capitalize col-span-2 text-gray-800 dark:text-gray-200">
                            {nama}
                        </span>
                        <span className="col-span-2">Harga</span>
                        <span className="col-span-1">:</span>
                        <span className="col-span-2 text-gray-800 dark:text-gray-200">
                            {harga}
                        </span>
                        <span className="col-span-2">Is Active</span>
                        <span className="col-span-1">:</span>
                        {/* <span className="col-span-2 text-gray-800 dark:text-gray-200"> */}
                        {is_active === true ? (
                            <span className="col-span-2 text-green-500">
                                True
                            </span>
                        ) : (
                            <span className="col-span-2 text-red-500">
                                False
                            </span>
                        )}
                        {/* </span> */}
                        <span className="col-span-2">Deskripsi</span>
                        <span className="col-span-1">:</span>
                        <span className="col-span-2 text-gray-800 dark:text-gray-200">
                            {displayText}{" "}
                            {deskripsi.length > maxLength && (
                                <button
                                    onClick={toggleExpand}
                                    className="text-blue-500"
                                >
                                    {isExpanded ? "Read less" : ". . ."}
                                </button>
                            )}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button color="green" onClick={changeModal}>
                        Edit
                    </Button>
                    <Button
                        color="red"
                        onClick={() => setWantToDelete(true)}
                        outline
                    >
                        Delete
                    </Button>
                </div>
            </Card>
            {wantToDelete && (
                <Modal
                    show={wantToDelete}
                    size="md"
                    onClose={() => setWantToDelete(false)}
                    popup
                >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this program
                                {" ["}
                                <span className="font-bold uppercase text-gray-600 dark:text-gray-200">
                                    {username}
                                </span>
                                ] ?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button
                                    color="failure"
                                    onClick={onSubmitDelete}
                                >
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button
                                    color="gray"
                                    onClick={() => setWantToDelete(false)}
                                >
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

const T1 = () => {
    console.log("T1 rendered");
    const [dataToSend, setDataToSend] = useState({ is_active: false });
    const onChangeMod = (e, mode) => {
        // console.log(e);
        // signalsComponents.data.value = {
        //     ...signalsComponents.data.value,
        //     dataWillSend: {
        //         ...signalsComponents.data.value?.dataWillSend,
        //         [mode]: e,
        //     },
        // };
        setDataToSend((prev) => ({ ...prev, [mode]: e }));
    };
    const submit = async (e) => {
        e.preventDefault();
        try {
            // const data = signalsComponents.data.value?.dataWillSend;
            const data = dataToSend;
            // signalsComponents.data.value = {
            //     ...signalsComponents.data.value,
            //     dataWillSend: {},
            // };
            // setData ke dafault agar button isProccessing
            setDataToSend({});

            // deteksi jika update atau tambah
            let resp;
            if (!dataToSend?.id)
                resp = await axios.post(
                    route("dashboard.api.new-program"),
                    data
                );
            else
                resp = await axios.put(
                    route("dashboard.api.update-program"),
                    data
                );

            if (resp.status === 200)
                if (!dataToSend?.id)
                    addNotif(
                        {
                            title: "Data has been added successfully",
                            success: true,
                        },
                        true,
                        2000
                    );
                else
                    addNotif(
                        {
                            title: "Data has been updated successfully",
                            success: true,
                        },
                        true,
                        2000
                    );
            console.log(resp);
        } catch (error) {
            // deteksi update atau tidak
            if (!dataToSend?.id)
                addNotif(
                    { title: "Data has not been added", success: false },
                    true
                );
            else
                addNotif(
                    { title: "Data has not been updated", success: false },
                    true
                );
            console.log(error);
        } finally {
            // setData agar button terdisable
            setDataToSend({ is_active: false });
            // set null to id signal
            signalsComponents.data.value = {
                ...signalsComponents.data.value,
                id: null,
            };
            // deleteObjectFromSignalObject("data", id);

            refresh.value = true;
        }
    };
    const getDataById = () => {
        if (!signalsComponents.data.value?.id) {
            setDataToSend({ is_active: false });
            return;
        }
        setDataToSend(
            signalsComponents.data.value.data?.filter(
                (k) => k.id === signalsComponents.data.value.id
            )[0]
        );
    };

    useEffect(() => {
        getDataById();
    }, []);

    return (
        <form className="flex max-w-md flex-col gap-4" onSubmit={submit}>
            {/* name */}
            <div>
                <div className="mb-2 block">
                    <Label
                        value="Name of program"
                        className="text-gray-500 dark:text-gray-300"
                    />
                </div>
                <TextInput
                    type="text"
                    placeholder="Super Grammar 1"
                    required
                    value={dataToSend?.nama}
                    onChange={(e) => onChangeMod(e.target.value, "nama")}
                />
            </div>
            {/* Uniq name */}
            <div>
                <div className="mb-2 block">
                    <Label
                        value="Program's unique name"
                        className="text-gray-500 dark:text-gray-300"
                    />
                </div>
                <TextInput
                    type="text"
                    placeholder="sg1"
                    required
                    pattern="[a-z0-9]*"
                    onChange={(e) => onChangeMod(e.target.value, "username")}
                    value={dataToSend?.username}
                />
            </div>
            {/* harga */}
            <div>
                <div className="mb-2 block">
                    <Label
                        value="Price"
                        className="text-gray-500 dark:text-gray-300"
                    />
                </div>
                <TextInput
                    type="text"
                    placeholder="75000"
                    pattern="[0-9]*"
                    required
                    onChange={(e) => onChangeMod(e.target.value, "harga")}
                    value={dataToSend?.harga}
                />
            </div>
            {/* deskripsi */}
            <div>
                <div className="mb-2 block">
                    <Label
                        value="Description"
                        className="text-gray-500 dark:text-gray-300"
                    />
                </div>
                <Textarea
                    type="text"
                    placeholder="Leave a description here"
                    rows={4}
                    onChange={(e) => onChangeMod(e.target.value, "deskripsi")}
                    value={dataToSend?.deskripsi}
                />
            </div>
            {/* Active */}
            <div className="flex gap-2">
                <div className="flex h-5 items-center">
                    <Checkbox
                        id="shipping"
                        onChange={(e) =>
                            onChangeMod(e.target.checked, "is_active")
                        }
                        checked={dataToSend?.is_active}
                    />
                </div>
                <div className="flex flex-col">
                    <Label
                        htmlFor="shipping"
                        className="text-gray-500 dark:text-gray-300"
                    >
                        Active
                    </Label>
                    <div className="text-gray-500 dark:text-gray-300">
                        <span className="text-xs font-normal">
                            Check it, if this program is active
                        </span>
                    </div>
                </div>
            </div>
            <Button
                type="submit"
                outline
                isProcessing={
                    Object.keys(dataToSend).length === 0 ? true : false
                }
                disabled={Object.keys(dataToSend).length >= 5 ? false : true}
            >
                Submit
            </Button>
        </form>
    );
};
