import Checkbox from "@/Components/Checkbox";
import TextInput from "@/Components/TextInput";
import { AdminLayout } from "@/Layouts/Admin";
import dayjs from "dayjs";
import { Button, Card, Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import { SvgCash, SvgDebit } from "../FormMember";
import axios from "axios";
import { addNotif } from "./Components/Notification";
import { router } from "@inertiajs/react";

export default function EditMember({ data }) {
    // useEffect(() => {
    //     console.log(data);
    // }, []);

    const themeCard = { root: { children: "flex h-full flex-col gap-4 p-6" } };
    return (
        <AdminLayout>
            <div className="grid md:grid-cols-2 gap-4">
                <PersonalData data={data} theme={themeCard} />
                <BeAbleToEdit data={data} theme={themeCard} />
            </div>
        </AdminLayout>
    );
}

const TextInputWithLabel = ({
    id = "hello",
    label = "helloworld",
    type = "text",
    placeholder = "",
    disable = false,
    value = "",
    onChange = () => {},
}) => {
    return (
        <div className="w-full">
            <div className="mb-2 block">
                <Label htmlFor={id} value={label} />
            </div>
            <TextInput
                id={id}
                type={type}
                placeholder={placeholder}
                disabled={disable}
                value={value}
                onChange={onChange}
                className="w-full"
            />
        </div>
    );
};

const ProgramsCheckboxs = ({
    onChangeValue = () => {},
    value = [],
    label = "Programs",
}) => {
    const [dataPrograms, setDataPrograms] = useState([]);

    const onChangeProgram = (target) => {
        const array = value;

        if (array.includes(Number(target))) {
            array.splice(array.indexOf(Number(target)), 1);
        } else {
            array.push(Number(target));
        }
        // console.log(array);

        onChangeValue(array);
    };

    const fetchData = async () => {
        try {
            const resp = await axios.get(route("dashboard.api.get-programs"));
            if (resp.status === 200) {
                setDataPrograms(resp.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-3">
            <div className="block">
                <Label
                    htmlFor="programs"
                    value={label}
                    className="md:text-base"
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                {dataPrograms.length === 0 ? (
                    <span className="text-red-500">Loading . . . </span>
                ) : (
                    dataPrograms.map((item) => (
                        <div
                            className="flex flex-row gap-2 items-center"
                            key={item.id}
                        >
                            <Checkbox
                                id={item.id}
                                value={item.id}
                                checked={value.includes(item.id)}
                                onChange={() => onChangeProgram(item.id)}
                            />
                            <Label htmlFor={item.id} className="capitalize">
                                {item.nama}
                            </Label>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const PickerData = ({ value, onChangeValue, disable = false }) => {
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
    return (
        <>
            <Label htmlFor="datepicker" value="Period" />
            <div className="relative">
                <DatePicker
                    options={options}
                    onChange={(e) => {
                        const formatedOuput = dayjs(e).format("MM/DD/YYYY");
                        onChangeValue(formatedOuput);
                    }}
                    show={datepicker}
                    setShow={(st) => setDatepicker(disable ? false : st)}
                    value={dayjs(value)}
                    id="datepicker"
                />
            </div>
        </>
    );
};

const PersonalData = ({ data, className, theme }) => {
    return (
        <Card className={" " + className} theme={theme}>
            <div className="flex flex-col gap-2 text-gray-700/70 dark:text-gray-100/60 justify-center">
                <h1 className="text-2xl text-center uppercase">
                    Personal Data
                </h1>
                <div className="block w-full border-2 border-gray-400/70 dark:border-gray-700/70 rounded-md"></div>
            </div>
            <div className="grid grid-cols-6 gap-y-3 text-gray-700/70 dark:text-gray-100/40 px-1 break-words">
                <span className="col-span-2">Nama</span>
                <span>:</span>
                <span className="col-span-3 text-gray-700/90 dark:text-gray-100/60">
                    {data.nama}
                </span>
                <span className="col-span-2">Email</span>
                <span>:</span>
                <span className="col-span-3 text-gray-700/90 dark:text-gray-100/60">
                    {data.email}
                </span>
                <span className="col-span-2">Whatsapp Number</span>
                <span>:</span>
                <span className="col-span-3 text-gray-700/90 dark:text-gray-100/60">
                    {data.no_wa}
                </span>
                <span className="col-span-2">Home Address</span>
                <span>:</span>
                <span className="col-span-3 text-gray-700/90 dark:text-gray-100/60">
                    {data.alamat_ht}
                </span>
                <span className="col-span-2">Temporary Address</span>
                <span>:</span>
                <span className="col-span-3 text-gray-700/90 dark:text-gray-100/60">
                    {data.alamat_st}
                </span>
                <span className="col-span-2">Period</span>
                <span>:</span>
                <span className="col-span-3 text-gray-700/90 dark:text-gray-100/60">
                    {data.period}
                </span>

                <span className="col-span-2">Asked Programs</span>
                <span>:</span>
                <span className="col-span-3 text-xs text-gray-700/90 dark:text-gray-100/60 flex flex-row gap-1 flex-wrap">
                    {data.programs.map((item, key) => {
                        return (
                            <span
                                key={key}
                                className="bg-cyan-600 px-2 py-1 rounded uppercase font-bold text-center items-center flex justify-center"
                            >
                                {item}
                            </span>
                        );
                    })}
                </span>
                <span className="col-span-2">Accepted Programs</span>
                <span>:</span>
                <span className="col-span-3 text-xs text-gray-700/90 dark:text-gray-100/60 flex flex-row gap-1 flex-wrap">
                    {data?.programs_acc_name ? (
                        data.programs_acc_name.map((item, key) => {
                            return (
                                <span
                                    key={key}
                                    className="bg-green-600 px-2 py-1 rounded uppercase font-bold text-center items-center flex justify-center"
                                >
                                    {item}
                                </span>
                            );
                        })
                    ) : (
                        <span className="text-base">No Accepted Programs</span>
                    )}
                </span>
                <span className="col-span-2">Invoice Status</span>
                <span>:</span>
                <span
                    className={
                        "col-span-3 " +
                        (data.invoice.status
                            ? "text-green-500"
                            : "text-red-500")
                    }
                >
                    {data.invoice.status ? "Paid" : "Unpaid"}
                </span>
                <span className="col-span-2">Invoice Number</span>
                <span>:</span>
                <span
                    className={
                        "col-span-3 text-gray-700/90 dark:text-gray-100/60 italic"
                    }
                >
                    {data.invoice.invoice_number}
                </span>
                <span className="col-span-2">Payment Method</span>
                <span>:</span>
                <span
                    className={
                        "col-span-3 text-gray-700/90 dark:text-gray-100/60 font-bold"
                    }
                >
                    {data.invoice.payment_method.name}
                </span>
                <span className="col-span-2">Note</span>
                <span>:</span>
                <span className="col-span-3 text-gray-700/90 dark:text-gray-100/60">
                    {data.catatan}
                </span>
            </div>
        </Card>
    );
};

const BeAbleToEdit = ({ data, theme, ...props }) => {
    const { className } = props;
    const [valueEdit, setValueEdit] = useState({
        programs: [...(data.programs_acc ?? data.programs_id)],
        payment_method_id: data.invoice.payment_method_id,
        status_invoice: data.invoice.status,
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.put(
                route("dashboard.api.put-request", { id: data.id }),
                valueEdit
            );
            if ((resp.status = 200)) {
                addNotif({
                    title: "Data has been updated successfully",
                    success: true,
                });
                router.visit(route("dashboard.edit-member", { id: data.id }), {
                    // replace: true,
                });
            } else {
                addNotif({
                    title: "Failed to update data",
                    success: false,
                });
            }
        } catch (error) {
            addNotif({
                title: "Failed to update data | check console and report to developer",
                success: false,
            });
            console.error(error);
        }
    };

    useEffect(() => {
        console.log(valueEdit);
    }, [valueEdit]);
    return (
        <>
            <Card className={className} theme={theme}>
                <div className="flex flex-col gap-2 text-gray-700/70 dark:text-gray-100/60 justify-center">
                    <h1 className="text-2xl text-center uppercase">
                        Be able to be edited
                    </h1>
                    <div className="block w-full border-2 border-gray-400/70 dark:border-gray-700/70 rounded-md"></div>
                </div>
                <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    <ProgramsCheckboxs
                        value={valueEdit.programs}
                        onChangeValue={(value) =>
                            setValueEdit({ ...valueEdit, programs: value })
                        }
                        label="Programs will be accepted"
                    />
                    <StatusInvoice
                        value={valueEdit.status_invoice}
                        changeValue={(e) =>
                            setValueEdit({
                                ...valueEdit,
                                status_invoice: JSON.parse(e),
                            })
                        }
                    />
                    <PaymentMethod
                        value={valueEdit.payment_method_id}
                        changeValue={(value) =>
                            setValueEdit({
                                ...valueEdit,
                                payment_method_id: value,
                            })
                        }
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Card>
        </>
    );
};

const PaymentMethod = ({ value = 1, changeValue = () => {} }) => {
    const [dataPayments, setDataPayments] = useState([]);
    const fetchData = async () => {
        try {
            const resp = await axios.get(
                route("dashboard.api.get-payment-methods")
            );
            if (resp.status === 200) {
                setDataPayments(resp.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="flex gap-2 flex-col">
                <div className="block">
                    <Label
                        value="Payment Method"
                        htmlFor="payment_method"
                        className="md:text-base"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    {dataPayments.map((item, key) => {
                        return (
                            <div
                                key={key}
                                className={
                                    "w-full py-2 px-3 rounded  hover:text-white hover:dark:font-bold hover:bg-cyan-700/70 " +
                                    (item.id === value
                                        ? "bg-cyan-700/70 font-bold text-white"
                                        : "dark:bg-gray-700 bg-gray-300 hover:cursor-pointer")
                                }
                                onClick={() => changeValue(item.id)}
                            >
                                <div className="flex flex-row items-center gap-3">
                                    <div className="block w-10 h-10 bg-gray-500 p-1 rounded">
                                        {item.type === "cash" ? (
                                            <SvgCash />
                                        ) : (
                                            <SvgDebit />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-700/90 dark:text-gray-100/60">
                                            {item.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

const StatusInvoice = ({ value = true, changeValue }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="block">
                <Label
                    htmlFor="status_invoice"
                    value="Status Invoice"
                    className="md:text-base"
                />
            </div>
            <Select
                id="status_invoice"
                required
                onChange={(e) => changeValue(e.target.value)}
                defaultValue={value}
            >
                <option value={false}>Unpaid</option>
                <option value={true}>Paid</option>
            </Select>
        </div>
    );
};
