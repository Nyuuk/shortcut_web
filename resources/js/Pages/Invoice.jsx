import { convertWibWithManualOutput } from "@/api/ConvertToWib";
import { Head, router } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { useEffect } from "react";

export default function Invoice({ data }) {
    // data berupa array key
    // useEffect(() => {
    //     console.log(data);
    // }, []);

    const link = () => {
        const url = "https://wa.me/6285156803524";
        const query = new URLSearchParams({
            // text: `Hello, good morning, i'm *${data.invoice.request.nama}*. i want to join your course. this is my Inovoice Number : _\`\`\`${data.invoice.invoice_number}\`\`\`_`,
            text: `Hey there! 🌞 Good morning! 👋\n\nI'm *${data.invoice.request.nama}*. Excited to jump on board your amazing course! 🚀 Here's my Invoice Number:\n\n _\`\`\`${data.invoice.invoice_number}\`\`\`_ 📜\n\nLooking forward to being part of the learning journey! 🎉 Let me know if there's anything else you need.\n\nCheers! 🌟`,
        });
        return `${url}?${query.toString()}`;
    };
    return (
        <>
            <Head title={"Invoice " + data.invoice.request.nama} />
            <Container>
                {/* DETAIL INVOICE */}
                <DetailInvoice userRequest={data.invoice.request} />
                {/* TABLE */}
                {data.programs_acc.length > 0 ? (
                    <>
                        <TableInvoice
                            dataTable={data.programs_acc}
                            invoiceData={data.invoice}
                            paymentMethod={data.invoice.payment_method}
                            color="green"
                        />
                    </>
                ) : (
                    <TableInvoice
                        dataTable={data.programs}
                        invoiceData={data.invoice}
                        paymentMethod={data.invoice.payment_method}
                    />
                )}
                <ButtonLinkToWa link={link()} />
            </Container>
        </>
    );
}

const Container = ({ children }) => {
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto">
                <div className="border-l-[8px] bg-gray-300 border-blue-600 px-3 md:px-8 h-screen">
                    {/* HEADER */}
                    <div className="flex flex-row items-center justify-center gap-4 py-6">
                        <h1 className="text-2xl sm:text-3xl uppercase font-bold text-gray-800/70">
                            Invoice
                        </h1>
                        <div className="block w-full h-px border-[1px] rounded-md border-gray-800/50" />
                    </div>
                    <div className=" flex flex-col gap-4 h-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailInvoice = ({
    userRequest = { email: "", no_wa: "", nama: "" },
}) => {
    function formatPhoneNumber(phone) {
        const phoneNumber = "0" + phone;
        // Hapus karakter selain digit
        const cleaned = phoneNumber.replace(/\D/g, "");
        // Pisahkan nomor telepon dengan strip setiap 4 digit setelah awalan
        const parts = [];
        for (let i = 0; i < cleaned.length; i += 4) {
            parts.push(cleaned.substring(i, i + 4));
        }

        // Gabungkan bagian-bagian dengan strip dan kembalikan hasilnya
        return `${parts.join("-")}`;
    }

    return (
        <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2 text-gray-800/80">
                <h1 className="text-base sm:text-xl text-gray-800/70 font-semibold uppercase">
                    ShortCut Grammar Course
                </h1>
                <p className="text-sm">Kampung Inggris</p>
                <p className="text-sm">Pare,</p>
                <p className="text-sm">Kediri</p>
            </div>
            <div className="flex flex-col gap-2 text-gray-800/80 text-end">
                <h1 className="text-sm text-gray-800/70 ">
                    Akan dibayarkan oleh :
                </h1>
                <p className="text-base sm:text-xl font-semibold text-gray-800/70">
                    {userRequest.nama}
                </p>
                <p className="text-sm">{userRequest.email}</p>
                <p className="text-sm">
                    {formatPhoneNumber(userRequest.no_wa)}
                </p>
            </div>
        </div>
    );
};

const TableInvoice = ({
    dataTable = [],
    invoiceData = { created_at: "", invoice_number: "" },
    paymentMethod = { type: "", nama: "", atas_nama: "", no_rek: "" },
}) => {
    // dataTable berisi dari programs yang di ambil dari table requests

    const { type, name, atas_nama, no_rek } = paymentMethod;
    const { created_at, invoice_number, status } = invoiceData;
    let hargaTotal = 0;
    dataTable.forEach((item) => {
        hargaTotal += parseInt(item.harga);
    });
    return (
        <div className="grid gap-1 text-xs text-gray-800/70 items-center">
            <div
                className={
                    "grid grid-cols-10 text-start uppercase  border-gray-400 border-y-2 py-1 "
                }
            >
                <p>NO.</p>
                <p className="col-span-3">Product Name</p>
                <p className="col-span-4">Description</p>
                <p className="col-span-2">Price</p>
            </div>
            {dataTable.map((item, key) => {
                return (
                    <div className="grid grid-cols-10 text-start" key={key}>
                        <p>{key + 1}</p>
                        <p className="col-span-3 capitalize">{item.nama}</p>
                        <p className="col-span-4">{item.deskripsi}</p>
                        <p className="col-span-2">
                            Rp. {item.harga.toLocaleString("id-ID")}
                        </p>
                    </div>
                );
            })}
            <div className="border-y-2 border-gray-400 text-xs grid grid-cols-2">
                <>
                    <div className="flex flex-col">
                        <p className="text-gray-800/70">Invoice</p>
                        <p className="text-gray-800/70">Date</p>
                        <p className="text-gray-800/70">Total</p>
                    </div>
                    <div className="flex flex-col text-end">
                        <p className="text-gray-800/70">{invoice_number}</p>
                        <p className="text-gray-800/70">
                            {convertWibWithManualOutput(created_at)}
                        </p>
                        <p className="text-gray-800/70">
                            Rp. {hargaTotal.toLocaleString("id-ID")}
                        </p>
                    </div>
                </>
            </div>
            {/* Total Invoice */}
            <div className="text-xs text-gray-800/70">
                <div>
                    {type === "cash" ? (
                        <>
                            <p>
                                Payment Method :{" "}
                                <span className="font-bold uppercase">
                                    {type}
                                </span>
                            </p>
                            <p>
                                To :{" "}
                                <span className="font-bold uppercase">
                                    {name}
                                </span>
                            </p>
                        </>
                    ) : (
                        <>
                            <p>
                                Payment Method :{" "}
                                <span className="font-bold uppercase">
                                    {type}
                                </span>
                            </p>
                            <p>
                                Bank Name :{" "}
                                <span className="font-bold uppercase">
                                    {name}
                                </span>
                            </p>
                            <p>
                                Account Number :{" "}
                                <span className="font-bold ">{no_rek}</span>
                            </p>
                            <p>
                                Account Name :{" "}
                                <span className="font-bold uppercase">
                                    {atas_nama}
                                </span>
                            </p>
                        </>
                    )}
                    <p>
                        Status :{" "}
                        <span
                            className={
                                "font-bold uppercase " +
                                (status ? "text-blue-500" : "text-red-500")
                            }
                        >
                            {status ? "Paid" : "Unpaid"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

const ButtonLinkToWa = ({ link }) => {
    return (
        <Button color="success" href={link} as="a">
            Report to Admin
        </Button>
    );
};
