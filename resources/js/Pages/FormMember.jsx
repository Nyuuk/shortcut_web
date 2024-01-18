import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Head, router, useRemember } from "@inertiajs/react";
import dayjs from "dayjs";
import { Checkbox, Label, Spinner, Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import DatePicker from "tailwind-datepicker-react";

export default function FormMember({ programs, payment_methods }) {
    // define Toast State
    const [toast, setToast] = useState({
        idLast: 0,
        datas: [],
    });

    // define Form Data
    const [data, onChangeData] = useRemember({
        nama: "",
        email: "",
        no_wa: "",
        alamat_ht: "",
        alamat_st: "",
        period: dayjs(new Date()).format("MM/DD/YYYY"),
        catatan: "",
        programs: [],
        payment_method_id: 3,
    });

    // define Error
    const defaultErrors = {
        nama: "",
        email: "",
        no_wa: "",
        alamat_ht: "",
        alamat_st: "",
        period: "",
        catatan: "",
        programs: "",
        payment_method_id: "",
    };
    const [errors, setErrors] = useState({
        ...defaultErrors,
    });

    // define processing for api submit
    const [processing, setProcessing] = useState(false);

    // define datepicker option and state
    const [datepicker, setDatepicker] = useState(false);
    const options = {
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        clearBtnText: "Clear",
        language: "id",
        disabledDates: [],
        weekDays: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
        inputNameProp: "period",
        inputIdProp: "period",
        inputPlaceholderProp: "Select Date of Period",
        inputDateFormatProp: {
            day: "numeric",
            month: "long",
            year: "numeric",
        },
        theme: {
            input: "text-sm",
        },
    };

    // function to change state form data easily
    const setData = (name, value) => {
        onChangeData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    // function if programs changed
    const onChangeProgram = (target) => {
        const array = data.programs;

        if (array.includes(Number(target))) {
            array.splice(array.indexOf(Number(target)), 1);
        } else {
            array.push(Number(target));
        }
        // console.log(array);

        setData("programs", array);
    };

    const addToast = (type, msg) => {
        setToast((prev) => ({
            ...prev,
            idLast: prev.idLast + 1,
            datas: [
                ...prev.datas,
                { id: prev.idLast + 1, type: type, msg: msg },
            ],
        }));

        setTimeout(() => {
            setToast((prev) => ({
                ...prev,
                idLast: prev.idLast - 1,
                datas: prev.datas.filter((data) => data.id !== prev.idLast),
            }));
        }, 4000);
    };

    // function for submit data form and validate data before it will be submited
    const submit = async () => {
        setProcessing(true);
        // validate which data no required
        const noRequired = ["alamat_ht", "alamat_st", "catatan", "period"];
        for (const key in data) {
            if (noRequired.includes(key)) {
                if (!data[key]) delete data[key];
            }
        }
        //
        try {
            const response = await axios.post(
                route("register-member.store"),
                data
            );
            // check response
            if (response.status === 200) {
                addToast("success", "Your data has been successfully added.");
                setErrors({ ...defaultErrors });
                router.visit(
                    route("invoice", {
                        inv: response.data.data.invoice.invoice_number,
                    }),
                    {
                        method: "get",
                        // replace: true,
                    }
                );
            }
            console.log(response.data);
        } catch (error) {
            const responseData = error?.response?.data?.data || error;

            if (
                responseData?.errors &&
                Object.keys(responseData.errors).length > 0
            ) {
                setErrors({ ...responseData.errors });
                addToast(
                    "error",
                    "Item has not been added | Please check the errors"
                );
            } else {
                console.error(responseData || error?.response);
                if (responseData)
                    addToast("error", error?.response?.data?.data);
                else
                    addToast(
                        "error",
                        "Error | Please check console and report to admin"
                    );
            }
        }
        setProcessing(false);
    };
    const getInvoiceValue = async () => {
        try {
            const response = await axios.get(route("get-value-invoice"));
            if (response.status === 200) {
                setData("invoice_number", response.data?.value);
            } else {
                console.log(response);
                addToast(
                    "error",
                    "Error | Please check console and report to admin"
                );
            }
        } catch (error) {
            console.error(error);
            // await getInvoiceValue();
            addToast(
                "error",
                "Error | Please check console and report to admin"
            );
        }
    };

    // useEffect(() => {
    //     console.log(toast.datas);
    //     console.log(toast.idLast);
    // }, [toast]);
    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    useEffect(() => {
        getInvoiceValue();
    }, []);
    return (
        <>
            <Head title="Register Member" />
            <div className="relative">
                <div className="flex flex-col gap-2 fixed top-2 right-2 z-50">
                    {toast.datas.length > 0 &&
                        toast.datas.map((item) => {
                            return (
                                <Toast
                                    key={item.id}
                                    className={`border-t-4 ${
                                        item.type === "error"
                                            ? "border-red-500"
                                            : "border-t-green-500"
                                    }`}
                                >
                                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                        {item.type === "error" ? (
                                            <FailIcon />
                                        ) : (
                                            <SuccIcon />
                                        )}
                                    </div>
                                    <div className="ml-3 text-sm font-normal">
                                        {item.msg}
                                    </div>
                                    <Toast.Toggle
                                        onDismiss={() =>
                                            setToast((prev) => ({
                                                ...prev,
                                                datas: prev.datas.filter(
                                                    (data) =>
                                                        data.id !== item.id
                                                ),
                                            }))
                                        }
                                    />
                                </Toast>
                            );
                        })}
                </div>
            </div>
            <div className="min-h-screen flex flex-col items-center pt-6 pb-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
                {/* Form Start */}
                <div className="px-3 sm:px-24 sm:py-12 md:px-36 lg:px-44 xl:px-[37rem] w-full">
                    <Card className="mb-3">
                        <h1 className="text-xl sm:text-2xl font-bold dark:text-gray-100 dark:text-opacity-90">
                            INFORMASI PRIBADI
                        </h1>
                        <p>
                            Hi kak, Mimin Cut disini! sebelum belajar bareng
                            kami, yuk isi lengkap data diri kamu dulu. Tentunya
                            hanya mimin yang tau.
                        </p>
                        <p>
                            <Bold>WAJIB</Bold> diisi lengkap trus dibaca
                            baik-baik ya sebelum Transfer (Meskipun kamu sudah
                            kabarin CS Online kami)
                        </p>
                    </Card>
                    {/* <form onSubmit={submit}> */}
                    <Card atas={false}>
                        {/* Email req */}
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className="font-bold text-base ml-1"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                placeholder="shortcut@shortcut.com"
                                // isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        {/* Full Name req */}
                        <div>
                            <InputLabel
                                htmlFor="nama"
                                value="Nama Lengkap"
                                className="font-bold text-base ml-1"
                            />

                            <TextInput
                                id="nama"
                                type="text"
                                name="nama"
                                value={data.nama}
                                className="mt-1 block w-full"
                                autoComplete="nama"
                                placeholder="Julius Johanes Azarya"
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.nama}
                                className="mt-2"
                            />
                        </div>
                        {/* No Whatsapp req */}
                        <div>
                            <InputLabel
                                htmlFor="no_wa"
                                value="No Whatsapp"
                                className="font-bold text-base ml-1"
                            />

                            <div className="flex flex-row gap-0">
                                <span className="mt-1 border-r-0 rounded-r-none items-center text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-lg rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    +62
                                </span>
                                <TextInput
                                    id="no_wa"
                                    type="text"
                                    name="no_wa"
                                    value={data.no_wa}
                                    className="mt-1 block w-full border-l-0 rounded-l-none"
                                    autoComplete="no_wa"
                                    // make pattern start width 08
                                    pattern="8[0-9]*"
                                    placeholder="85511112222"
                                    onChange={(e) => {
                                        // logic if target value not numeric
                                        if (!isNaN(e.target.value)) {
                                            setData("no_wa", e.target.value);
                                        }
                                    }}
                                />
                            </div>

                            <InputError
                                message={errors.no_wa}
                                className="mt-2"
                            />
                        </div>
                        {/* City */}
                        <div>
                            <InputLabel
                                htmlFor="alamat_ht"
                                value="Kota Asal"
                                className="font-bold text-base ml-1"
                            />

                            <TextInput
                                id="alamat_ht"
                                type="text"
                                name="alamat_ht"
                                value={data.alamat_ht}
                                className="mt-1 block w-full"
                                autoComplete="alamat_ht"
                                placeholder="Jakarta"
                                onChange={(e) =>
                                    setData("alamat_ht", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.alamat_ht}
                                className="mt-2"
                            />
                        </div>
                        {/* Address sementara */}
                        <div>
                            <InputLabel
                                htmlFor="alamat_st"
                                value="Alamat sementara di Pare"
                                className="font-bold text-base ml-1"
                            />
                            <TextInput
                                id="alamat_st"
                                type="text"
                                name="alamat_st"
                                value={data.alamat_st}
                                className="mt-1 block w-full"
                                autoComplete="alamat_st"
                                placeholder="Jl. Cipondoh No. 19, RT 001/RW 001, Cipondoh, Cipondoh, Tangerang, Banten 15146"
                                onChange={(e) =>
                                    setData("alamat_st", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.alamat_st}
                                className="mt-2"
                            />
                        </div>
                        {/* Periode */}
                        <div>
                            <label
                                htmlFor="period"
                                className="block text-gray-700 dark:text-gray-300 font-bold text-base ml-1 mb-1"
                            >
                                Pilih Periode
                            </label>
                            <div className="relative">
                                <DatePicker
                                    options={options}
                                    onChange={(e) => {
                                        const formatedOuput =
                                            dayjs(e).format("MM/DD/YYYY");
                                        setData("period", formatedOuput);
                                    }}
                                    show={datepicker}
                                    setShow={(st) => setDatepicker(st)}
                                    value={dayjs(data.period)}
                                />
                            </div>
                        </div>
                        {/* Program req */}
                        <div>
                            <span className="block text-gray-700 dark:text-gray-300 font-bold text-base ml-1 mb-1">
                                Pilih Program
                            </span>
                            <div className="w-full ml-2 flex flex-row flex-wrap gap-y-2">
                                {programs.length !== 0 ? (
                                    programs.map((program) => {
                                        if (program.is_active === false) return;
                                        if (program.is_ebook === true) return;
                                        return (
                                            <div
                                                className="flex gap-2 w-2/4"
                                                key={program.id}
                                            >
                                                <div className="flex h-5 items-center">
                                                    <Checkbox
                                                        id={program.id}
                                                        onChange={(e) =>
                                                            onChangeProgram(
                                                                e.target.id
                                                            )
                                                        }
                                                        defaultChecked={data.programs.includes(
                                                            program.id
                                                        )}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <Label htmlFor={program.id}>
                                                        {program.username.toUpperCase()}
                                                    </Label>
                                                    <div className="text-gray-500 dark:text-gray-300">
                                                        <span className="text-xs font-normal capitalize">
                                                            {program.nama}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <span className="text-red-500 text-sm text-center font-medium">
                                        I'm Sorry :( data not found. Please
                                        contact admin to report this issue
                                    </span>
                                )}
                                <InputError
                                    message={errors.programs}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        {/* Ebook */}
                        <div>
                            <span className="block text-gray-700 dark:text-gray-300 font-bold text-base ml-1 mb-1">
                                Ebook Pilihan{" "}
                                <span className="text-red-500 text-xs">
                                    (OPTIONAL)
                                </span>
                            </span>
                            <div className="w-full ml-2 flex flex-row flex-wrap gap-y-2">
                                {programs.length !== 0 ? (
                                    programs.map((program) => {
                                        if (program.is_active === false) return;
                                        if (program.is_ebook !== true) return;
                                        return (
                                            <div
                                                className="flex gap-2 w-full"
                                                key={program.id}
                                            >
                                                <div className="flex h-5 items-center">
                                                    <Checkbox
                                                        id={program.id}
                                                        onChange={(e) =>
                                                            onChangeProgram(
                                                                e.target.id
                                                            )
                                                        }
                                                        defaultChecked={data.programs.includes(
                                                            program.id
                                                        )}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <Label
                                                        htmlFor={program.id}
                                                        className="capitalize"
                                                    >
                                                        {program.nama}
                                                    </Label>
                                                    <div className="text-gray-500 dark:text-gray-300 pr-3">
                                                        <span className="text-xs font-normal capitalize">
                                                            {program.deskripsi}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <span className="text-red-500 text-sm text-center font-medium">
                                        I'm Sorry :( data not found. Please
                                        contact admin to report this issue
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Catatan */}
                        <div>
                            <label
                                htmlFor="catatan"
                                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                            >
                                Catatan
                            </label>
                            <textarea
                                id="catatan"
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write anything here ... :) if you want to request when time start of your program. you can write it here."
                                value={data.catatan}
                                onChange={(e) =>
                                    setData("catatan", e.target.value)
                                }
                            ></textarea>
                        </div>
                        {/* Payment Method */}
                        <div>
                            <span className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                                Payment Method
                            </span>
                            <div className="flex flex-row flex-wrap gap-1">
                                {payment_methods?.map((item, key) => {
                                    return (
                                        <div
                                            className={
                                                "w-full flex flex-row items-center gap-3 border-2 py-1 px-1 rounded-md shadow-sm" +
                                                (data.payment_method_id ===
                                                item.id
                                                    ? " bg-[#18466c] border-[#18466c] text-white"
                                                    : " border-[#18466c] text-[#18466c] hover:cursor-pointer hover:bg-[#18466c] group")
                                            }
                                            key={key}
                                            onClick={() =>
                                                setData(
                                                    "payment_method_id",
                                                    item.id
                                                )
                                            }
                                        >
                                            <div className="block w-10 h-10 bg-gray-500 p-1 rounded">
                                                {item.type === "cash" ? (
                                                    <SvgCash />
                                                ) : (
                                                    <SvgDebit />
                                                )}
                                            </div>
                                            <div className="flex flex-col font-serif">
                                                {item.type === "debit" ? (
                                                    <span
                                                        className={
                                                            "text-xs font-extralight" +
                                                            (data.payment_method_id ===
                                                            item.id
                                                                ? " text-gray-100/70"
                                                                : " group-hover:text-gray-100/70")
                                                        }
                                                    >
                                                        Transfer to :
                                                    </span>
                                                ) : (
                                                    <span
                                                        className={
                                                            "text-xs font-extralight" +
                                                            (data.payment_method_id ===
                                                            item.id
                                                                ? " text-gray-100/70"
                                                                : " group-hover:text-gray-100/70")
                                                        }
                                                    >
                                                        Cash to :
                                                    </span>
                                                )}
                                                <span
                                                    className={
                                                        "text-lg " +
                                                        (data.payment_method_id ===
                                                        item.id
                                                            ? " text-gray-100/90"
                                                            : " group-hover:text-gray-100/90")
                                                    }
                                                >
                                                    {item.name}
                                                </span>
                                            </div>
                                            <InputError
                                                message={
                                                    errors.payment_method_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Button submit */}
                        <button
                            className={`mt-4 w-full bg-[#18466c] px-4 py-2 rounded-lg text-gray-100 font-bold ${
                                processing
                                    ? "bg-[#18466c]/80"
                                    : "hover:bg-[#18466c]/80"
                            }`}
                            disabled={processing}
                            onClick={submit}
                        >
                            {processing ? (
                                <>
                                    <Spinner
                                        color="pink"
                                        aria-label="Loading"
                                    />
                                </>
                            ) : (
                                "Kirim Form"
                            )}
                        </button>
                    </Card>
                    {/* </form> */}
                </div>
            </div>
        </>
    );
}

const Card = ({ children, className = "", atas = true }) => {
    return (
        <div
            className={`flex flex-col gap-3 py-2 px-3 pb-3 w-full text-sm sm:text-base dark:bg-gray-100/30 dark:text-gray-100 dark:text-opacity-75 text-gray-800 rounded-lg shadow-md ${
                atas ? "border-t-[6px] border-t-[#5eacec]" : ""
            } border-[1px] border-gray-300/60 ${className}`}
        >
            {children}
        </div>
    );
};

const Bold = ({ children }) => {
    return (
        <b className="dark:text-gray-100 dark:text-opacity-90">{children}</b>
    );
};

function TextInput({ type = "text", className = "", ...props }) {
    return (
        <input
            {...props}
            type={type}
            className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " +
                className
            }
        />
    );
}

const SuccIcon = () => {
    return (
        <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 50 50"
            xmlSpace="preserve"
            width="64px"
            height="64px"
            fill="#000000"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <circle
                    style={{ fill: "#25AE88" }}
                    cx="25"
                    cy="25"
                    r="25"
                ></circle>{" "}
                <polyline
                    style={{
                        fill: "none",
                        stroke: "#FFFFFF",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeMiterlimit: 10,
                    }}
                    points=" 38,15 22,33 12,25 "
                ></polyline>{" "}
            </g>
        </svg>
    );
};

export const SvgCash = () => {
    return (
        <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            fill="#000000"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                    style={{ fill: "#FFD652" }}
                    d="M367.437,42.325c-21.302,0-38.574,17.273-38.574,38.574v-1.254V46.611 c0-21.302-17.273-38.574-38.574-38.574s-38.574,17.273-38.574,38.574v11.604v1.254c0-21.302-17.273-38.574-38.574-38.574 s-38.574,17.273-38.574,38.574v45.893v1.254c0-21.302-17.273-38.574-38.574-38.574s-38.574,17.273-38.574,38.574v397.348h308.595 V80.899C406.012,59.597,388.739,42.325,367.437,42.325z"
                ></path>{" "}
                <path
                    style={{ fill: "#FB9D46" }}
                    d="M97.416,92.534c-1.713,4.364,0,411.43,0,411.43h308.595V92.534H97.416z"
                ></path>{" "}
                <rect
                    x="45.984"
                    y="109.648"
                    style={{ fill: "#AFF078" }}
                    width="420.032"
                    height="214.302"
                ></rect>{" "}
                <g>
                    {" "}
                    <rect
                        x="45.984"
                        y="109.648"
                        style={{ fill: "#5AC779" }}
                        width="51.433"
                        height="214.302"
                    ></rect>{" "}
                    <circle
                        style={{ fill: "#5AC779" }}
                        cx="255.995"
                        cy="216.799"
                        r="85.721"
                    ></circle>{" "}
                </g>{" "}
                <path
                    style={{ fill: "#00A085" }}
                    d="M284.931,273.589c-47.343,0-85.721-38.378-85.721-85.721c0-16.256,4.526-31.454,12.385-44.406 c-24.767,15.029-41.315,42.25-41.315,73.336c0,47.343,38.378,85.721,85.721,85.721c31.087,0,58.307-16.548,73.336-41.315 C316.385,269.063,301.187,273.589,284.931,273.589z"
                ></path>{" "}
                <path
                    style={{ fill: "#FFD652" }}
                    d="M406.012,240.372c0-17.754-14.391-32.145-32.145-32.145h-17.144 c-17.754,0-32.145,14.391-32.145,32.145v83.578H204.567c-59.177,0-107.151,47.974-107.151,107.151l0,0v72.863h227.16h81.435V240.372 z"
                ></path>{" "}
                <path d="M466.016,101.611h-51.968V80.899c0-25.701-20.909-46.611-46.611-46.611c-11.674,0-22.36,4.314-30.547,11.432 C336.414,20.429,315.692,0,290.288,0c-19.106,0-35.565,11.555-42.752,28.045c-8.529-9.328-20.792-15.187-34.397-15.187 c-25.701,0-46.611,20.909-46.611,46.611v11.96c-8.186-7.114-18.867-11.424-30.538-11.424c-24.01,0-43.833,18.251-46.339,41.607 H45.984c-4.439,0-8.036,3.598-8.036,8.036V323.95c0,4.438,3.597,8.036,8.036,8.036H89.38v171.977c0,4.438,3.597,8.036,8.036,8.036 h205.73c4.439,0,8.036-3.598,8.036-8.036s-3.597-8.036-8.036-8.036H105.453v-64.826c0-54.652,44.462-99.115,99.115-99.115h120.009 c4.439,0,8.036-3.598,8.036-8.036v-83.578c0-13.294,10.816-24.109,24.109-24.109h17.144c13.293,0,24.109,10.815,24.109,24.109 v255.555h-56.254c-4.439,0-8.036,3.598-8.036,8.036s3.597,8.036,8.036,8.036h64.291c4.439,0,8.036-3.598,8.036-8.036V331.986h51.968 c4.439,0,8.036-3.598,8.036-8.036V109.648C474.052,105.21,470.455,101.611,466.016,101.611z M367.437,50.361 c16.839,0,30.538,13.699,30.538,30.538v20.712h-61.076V80.899C336.899,64.06,350.598,50.361,367.437,50.361z M259.75,46.611 c0-16.839,13.699-30.538,30.538-30.538c16.839,0,30.538,13.699,30.538,30.538v33.035v1.254v20.712H259.75V59.469v-1.254V46.611 L259.75,46.611z M135.991,76.077c15.134,0,27.725,11.069,30.121,25.534H105.87C108.265,87.146,120.857,76.077,135.991,76.077z M105.453,372.476v-40.49h40.49C129.295,341.871,115.337,355.828,105.453,372.476z M316.54,240.372v25.108 c-14.843,18.433-36.896,29.004-60.54,29.004c-42.836,0-77.685-34.849-77.685-77.685s34.849-77.685,77.685-77.685 c39.718,0,72.671,29.472,77.157,68.741C323.098,215.165,316.54,227.015,316.54,240.372z M457.98,315.914h-43.932v-9.67 c0.178,0.012,0.355,0.027,0.536,0.027H440.3c4.439,0,8.036-3.598,8.036-8.036s-3.597-8.036-8.036-8.036h-25.716 c-0.181,0-0.358,0.015-0.536,0.027v-49.852c0-22.157-18.025-40.182-40.182-40.182h-17.144c-2.848,0-5.625,0.302-8.308,0.869 c-3.48-20.561-13.722-39.405-29.298-53.592c-17.293-15.751-39.708-24.425-63.115-24.425c-51.698,0-93.757,42.059-93.757,93.757 s42.059,93.757,93.757,93.757c22.477,0,43.763-7.916,60.54-22.148v27.506H54.02V117.685h141.975c4.439,0,8.036-3.598,8.036-8.036 s-3.597-8.036-8.036-8.036h-13.394V59.469c0-16.839,13.699-30.538,30.538-30.538s30.538,13.699,30.538,30.538v42.143h-11.251 c-4.439,0-8.036,3.598-8.036,8.036c0,4.438,3.597,8.036,8.036,8.036H457.98L457.98,315.914L457.98,315.914z"></path>{" "}
                <path d="M371.723,151.972H440.3c4.439,0,8.036-3.598,8.036-8.036c0-4.438-3.597-8.036-8.036-8.036h-68.577 c-4.439,0-8.036,3.598-8.036,8.036C363.687,148.374,367.284,151.972,371.723,151.972z"></path>{" "}
                <path d="M440.3,170.188h-51.433c-4.439,0-8.036,3.598-8.036,8.036c0,4.438,3.597,8.036,8.036,8.036H440.3 c4.439,0,8.036-3.598,8.036-8.036C448.336,173.786,444.739,170.188,440.3,170.188z"></path>{" "}
                <path d="M71.7,151.972h68.577c4.439,0,8.036-3.598,8.036-8.036c0-4.438-3.597-8.036-8.036-8.036H71.7 c-4.439,0-8.036,3.598-8.036,8.036C63.664,148.374,67.261,151.972,71.7,151.972z"></path>{" "}
                <path d="M71.7,186.261h51.433c4.439,0,8.036-3.598,8.036-8.036c0-4.438-3.597-8.036-8.036-8.036H71.7 c-4.439,0-8.036,3.598-8.036,8.036C63.664,182.663,67.261,186.261,71.7,186.261z"></path>{" "}
                <path d="M97.416,290.197H71.7c-4.439,0-8.036,3.598-8.036,8.036s3.597,8.036,8.036,8.036h25.716c4.439,0,8.036-3.598,8.036-8.036 S101.856,290.197,97.416,290.197z"></path>{" "}
                <path d="M131.705,290.197c-4.439,0-8.036,3.598-8.036,8.036s3.597,8.036,8.036,8.036h25.716c4.439,0,8.036-3.598,8.036-8.036 s-3.597-8.036-8.036-8.036H131.705z"></path>{" "}
                <path d="M131.169,233.943c0-11.521-9.374-20.894-20.894-20.894s-20.894,9.374-20.894,20.894c0,11.521,9.374,20.894,20.894,20.894 S131.169,245.465,131.169,233.943z M110.275,238.765c-2.658,0-4.822-2.163-4.822-4.822c0-2.658,2.163-4.822,4.822-4.822 c2.658,0,4.822,2.163,4.822,4.822C115.096,236.601,112.933,238.765,110.275,238.765z"></path>{" "}
                <path d="M286.002,170.188h-21.966v-9.108c0-4.438-3.597-8.036-8.036-8.036c-4.439,0-8.036,3.598-8.036,8.036v9.108h-6.965 c-10.339,0-18.751,8.412-18.751,18.751v17.144c0,10.339,8.412,18.751,18.751,18.751h6.965v22.502h-21.966 c-4.439,0-8.036,3.598-8.036,8.036s3.597,8.036,8.036,8.036h21.966v9.108c0,4.438,3.597,8.036,8.036,8.036 c4.439,0,8.036-3.598,8.036-8.036v-9.108h6.965c10.339,0,18.751-8.412,18.751-18.751v-17.144c0-10.339-8.412-18.751-18.751-18.751 h-6.965v-22.502h21.966c4.439,0,8.036-3.598,8.036-8.036C294.039,173.786,290.442,170.188,286.002,170.188z M271.001,224.835 c1.478,0,2.679,1.202,2.679,2.679v17.144c0,1.477-1.201,2.679-2.679,2.679h-6.965v-22.502H271.001z M247.964,208.762h-6.965 c-1.478,0-2.679-1.202-2.679-2.679v-17.144c0-1.477,1.201-2.679,2.679-2.679h6.965V208.762z"></path>{" "}
            </g>
        </svg>
    );
};

export const SvgDebit = () => {
    return (
        <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            fill="#000000"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <polygon
                    style={{ fill: "#BADB82" }}
                    points="323.095,299.132 503.425,299.132 503.425,106.051 108.154,106.051 108.154,299.132 "
                ></polygon>{" "}
                <path
                    style={{ fill: "#F4C67D" }}
                    d="M270.348,236.594H30.962c-12.364,0-22.387,10.023-22.387,22.387V383.61 c0,12.364,10.023,22.387,22.387,22.387h239.386c12.364,0,22.387-10.023,22.387-22.387V258.981 C292.736,246.617,282.713,236.594,270.348,236.594z"
                ></path>{" "}
                <rect
                    x="8.575"
                    y="273.627"
                    style={{ fill: "#666666" }}
                    width="284.157"
                    height="40.073"
                ></rect>{" "}
                <path d="M270.348,227.994H30.962C13.889,227.994,0,241.884,0,258.957v124.629c0,17.073,13.889,30.962,30.962,30.962h194.172 c4.736,0,8.575-3.839,8.575-8.575s-3.839-8.575-8.575-8.575H30.962c-7.617,0-13.812-6.196-13.812-13.812v-61.331H284.16v61.331 c0,7.617-6.196,13.812-13.812,13.812h-16.632c-4.736,0-8.575,3.839-8.575,8.575s3.839,8.575,8.575,8.575h16.632 c17.073,0,30.962-13.889,30.962-30.962V258.957C301.31,241.884,287.421,227.994,270.348,227.994z M17.15,305.105v-22.924h51.353 c4.736,0,8.575-3.839,8.575-8.575c0-4.736-3.839-8.575-8.575-8.575H17.15v-6.074c0-7.617,6.196-13.812,13.812-13.812h239.386 c7.617,0,13.812,6.196,13.812,13.812v6.074H97.085c-4.736,0-8.575,3.839-8.575,8.575c0,4.736,3.839,8.575,8.575,8.575h187.077 v22.924H17.15z"></path>{" "}
                <path d="M108.154,214.779c4.736,0,8.575-3.839,8.575-8.575v-39.387c27.007-3.792,48.425-25.209,52.216-52.216h199.102 c4.736,0,8.575-3.839,8.575-8.575c0-4.736-3.839-8.575-8.575-8.575H108.154c-4.736,0-8.575,3.839-8.575,8.575v100.177 C99.579,210.94,103.419,214.779,108.154,214.779z M151.565,114.601c-3.457,17.535-17.302,31.379-34.836,34.836v-34.836H151.565z"></path>{" "}
                <path d="M503.425,97.452H396.63c-4.736,0-8.575,3.839-8.575,8.575c0,4.736,3.839,8.575,8.575,8.575h46.017 c3.791,27.006,25.203,48.423,52.204,52.216v71.5c-27.001,3.792-48.413,25.21-52.204,52.216H323.095 c-4.736,0-8.575,3.839-8.575,8.575s3.839,8.575,8.575,8.575h180.33c4.736,0,8.575-3.839,8.575-8.575V106.027 C512,101.291,508.161,97.452,503.425,97.452z M460.025,114.601h34.825v34.835C477.321,145.978,463.482,132.135,460.025,114.601z M460.025,290.533c3.456-17.534,17.296-31.378,34.825-34.836v34.836H460.025z"></path>{" "}
                <path d="M321.502,245.129c-4.653,0.88-7.712,5.366-6.831,10.019c0.779,4.115,4.375,6.982,8.416,6.982 c0.528,0,1.066-0.049,1.603-0.151c35.35-6.687,60.039-31.121,60.039-59.419c0-33.73-35.412-61.171-78.938-61.171 c-43.52,0-78.927,27.442-78.927,61.171c0,1.434,0.07,2.921,0.206,4.42c0.429,4.716,4.601,8.186,9.317,7.763 c4.716-0.429,8.192-4.601,7.763-9.317c-0.09-0.984-0.135-1.949-0.135-2.866c0-24.273,27.713-44.022,61.777-44.022 c34.07,0,61.789,19.748,61.789,44.022C367.578,222.493,348.631,239.998,321.502,245.129z"></path>{" "}
                <path d="M38.935,339.714c-4.736,0-8.575,3.839-8.575,8.575s3.839,8.575,8.575,8.575h54.646c4.736,0,8.575-3.839,8.575-8.575 s-3.839-8.575-8.575-8.575H38.935z"></path>{" "}
            </g>
        </svg>
    );
};

const FailIcon = () => {
    return (
        <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 50 50"
            xmlSpace="preserve"
            width="64px"
            height="64px"
            fill="#000000"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <circle
                    style={{ fill: "#D75A4A" }}
                    cx="25"
                    cy="25"
                    r="25"
                ></circle>{" "}
                <polyline
                    style={{
                        fill: "none",
                        stroke: "#FFFFFF",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeMiterlimit: 10,
                    }}
                    points="16,34 25,25 34,16 "
                ></polyline>{" "}
                <polyline
                    style={{
                        fill: "none",
                        stroke: "#FFFFFF",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeMiterlimit: 10,
                    }}
                    points="16,16 25,25 34,34 "
                ></polyline>{" "}
            </g>
        </svg>
    );
};
