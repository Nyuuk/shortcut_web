import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import signalsComponents from "./signalsComponents";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

export default function Notification() {
    if (!signalsComponents.hasOwnProperty("notifications"))
        signalsComponents["notifications"] = signal({ id: 0, data: [] });

    useSignals();
    return (
        <>
            <div className="top-[68px] right-0 absolute flex flex-col gap-1 px-2">
                {signalsComponents?.notifications?.value?.data.map(
                    (item, key) => {
                        const { title, success, Component } = item;
                        return item.defaultType ? (
                            <DefaultTheme key={key} data={item} />
                        ) : (
                            <Component key={key} />
                        );
                    }
                )}
            </div>
        </>
    );
}

const DefaultTheme = ({ data }) => {
    const { title, success } = data;
    const customTheme = {
        root: {
            base: "flex z-[51] gap-3 w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-700 dark:text-gray-200",
        },
    };
    return (
        <Toast theme={customTheme}>
            <div
                className={
                    success
                        ? "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-400 dark:bg-green-700 dark:text-green-200"
                        : "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                }
            >
                {success ? (
                    <HiCheck className="h-5 w-5" />
                ) : (
                    <HiX className="h-5 w-5" />
                )}
            </div>
            <div className="text-sm font-normal">{title}</div>
            <Toast.Toggle />
        </Toast>
    );
};

export const addNotif = (
    data = {
        title: "Item moved successfully",
        success: false,
        Component: () => <></>,
    },
    defaultType = true,
    timeOut = 5000
) => {
    // data.title must be type string
    // data.success must be type boolean
    // data.Component must be type function
    // if type not default then render data.Component
    // if type default then render DefaultTheme
    // if timeOut not set then set timeOut = 5000
    // make json data for add to signals
    const toData = {
        id: signalsComponents?.notifications?.value?.id,
        data: [...signalsComponents?.notifications?.value?.data],
    };
    const newData = { ...data, id: toData["id"] + 1, defaultType: defaultType };
    // add to signalsComponent['notification']
    toData["id"] = toData["id"] + 1;
    toData["data"].splice(0, 0, newData);
    // update signalsComponent['notification']
    signalsComponents.notifications.value = toData;
    // set timeout
    setTimeout(() => {
        signalsComponents.notifications.value = {
            ...signalsComponents.notifications.value,
            data: signalsComponents.notifications.value["data"].filter(
                (item) => item.id != toData["id"]
            ),
        };
    }, timeOut);
};
