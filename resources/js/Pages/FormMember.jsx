import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Head, useRemember } from "@inertiajs/react";
import dayjs from "dayjs";
import { Checkbox, Label, Spinner, Toast } from "flowbite-react";
import { useState } from "react";
import DatePicker from "tailwind-datepicker-react";

export default function FormMember({ programs }) {
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
            if (response.statusText === "OK") {
                addToast("success", "Your data has been successfully added.");
                setErrors({ ...defaultErrors });
            }
        } catch (error) {
            const responseData = error?.response?.data?.data;

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

    // useEffect(() => {
    //     console.log(toast.datas);
    //     console.log(toast.idLast);
    // }, [toast]);
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
                                                    <div className="text-gray-500 dark:text-gray-300">
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
                                <InputError
                                    message={errors.programs}
                                    className="mt-2"
                                />
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
