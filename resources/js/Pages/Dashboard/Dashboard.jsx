import { AdminLayout, SvgIcon } from "@/Layouts/Admin";
import convertToWIB, { formatTimeAgo } from "@/api/ConvertToWib";
import { Head } from "@inertiajs/react";
import { IconContext } from "react-icons";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaCogs } from "react-icons/fa";

export default function Dashboard() {
    return (
        <>
            <AdminLayout>
                {/* <span>You're logged in!</span> */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CardBase
                        color="red"
                        title="Total members"
                        data="10"
                        icon={<HiMiniUserGroup />}
                        timeUTC={"2024-01-12T02:59:00Z"}
                    />
                    <CardBase
                        color="green"
                        title="Total new member requests"
                        data="20"
                        icon={<BsPersonFillAdd />}
                        timeUTC={"2024-01-12T04:15:21Z"}
                    />
                    <CardBase
                        color="blue"
                        title="Total programs"
                        data="20"
                        icon={<FaCogs />}
                        timeUTC={"2024-01-12T04:15:21Z"}
                    />
                </div>
                <div className="hidden">
                    <div className="border-t-red-600 text-red-800/80"></div>
                    <div className="border-t-green-600 text-green-800/80"></div>
                    <div className="border-t-blue-600 text-blue-800/80"></div>
                    <div className="border-t-yellow-600 text-yellow-800/80"></div>
                </div>
            </AdminLayout>
        </>
    );
}

const CardBase = ({ color, title, data, icon, timeUTC }) => {
    return (
        <div
            className={`group bg-white dark:bg-gray-800 border-t-[10px] border-t-${color}-600 border-0 shadow-md rounded-lg py-5 px-4 min-h-[155px]`}
        >
            <div className="w-full h-full flex flex-row justify-between">
                <div className="flex flex-col gap-4">
                    <span className="group-hover:text-gray-800/80 group-hover:dark:text-gray-300/80 transition-all duration-150 text-xs uppercase text-gray-800/50 dark:text-gray-300/70 font-semibold">
                        {title} :{" "}
                    </span>
                    <span
                        className={`group-hover:text-gray-800/80 group-hover:dark:text-gray-100 group-hover:text-2xl transition-all duration-150 text-lg text-gray-800/80 dark:text-gray-300 font-bold pl-2`}
                    >
                        {data}
                    </span>

                    <span className="text-xs text-gray-800/60 dark:text-gray-300/70 items-center text-left">
                        Last Update :{" "}
                        <span className="font-bold text-gray-800/75 dark:text-gray-200/70">
                            {timeUTC && formatTimeAgo(convertToWIB(timeUTC))}
                        </span>
                    </span>
                    {/* <span>{convertToWIB(timeUTC)}</span> */}
                </div>
                <div className="items-center text-center flex justify-center pr-4">
                    <div
                        className={`bg-${color}-600 text-white p-4 rounded-2xl transition-all duration-150 group-hover:scale-90 rotate-45 relative`}
                    >
                        <IconContext.Provider value={{ size: "2em" }}>
                            <div className="-rotate-45">{icon}</div>
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
        </div>
    );
};
