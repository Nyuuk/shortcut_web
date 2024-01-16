import Bandage from "@/Components/Bandage";
import Notification, {
    addNotif,
} from "@/Pages/Dashboard/Components/Notification";
import signalsComponents from "@/Pages/Dashboard/Components/signalsComponents";
import convertToWIB from "@/api/ConvertToWib";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { DarkThemeToggle, Flowbite, Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMenu, HiMenuAlt2 } from "react-icons/hi";
// import type { CustomFlowbiteTheme } from "flowbite-react";

const linkAdmin = {
    one: [
        {
            name: "overview",
            path: route("dashboard"),
            icon: (
                <>
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </>
            ),
            iconViewbox: "0 0 20 20",
        },
    ],
    two: [
        {
            name: "new member",
            path: route("dashboard.new-member"),
            icon: (
                <>
                    <circle cx="12" cy="6" r="4"></circle>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.5 22C14.8501 22 14.0251 22 13.5126 21.4874C13 20.9749 13 20.1499 13 18.5C13 16.8501 13 16.0251 13.5126 15.5126C14.0251 15 14.8501 15 16.5 15C18.1499 15 18.9749 15 19.4874 15.5126C20 16.0251 20 16.8501 20 18.5C20 20.1499 20 20.9749 19.4874 21.4874C18.9749 22 18.1499 22 16.5 22ZM17.0833 16.9444C17.0833 16.6223 16.8222 16.3611 16.5 16.3611C16.1778 16.3611 15.9167 16.6223 15.9167 16.9444V17.9167H14.9444C14.6223 17.9167 14.3611 18.1778 14.3611 18.5C14.3611 18.8222 14.6223 19.0833 14.9444 19.0833H15.9167V20.0556C15.9167 20.3777 16.1778 20.6389 16.5 20.6389C16.8222 20.6389 17.0833 20.3777 17.0833 20.0556V19.0833H18.0556C18.3777 19.0833 18.6389 18.8222 18.6389 18.5C18.6389 18.1778 18.3777 17.9167 18.0556 17.9167H17.0833V16.9444Z"
                    ></path>
                    <path d="M15.6782 13.5028C15.2051 13.5085 14.7642 13.5258 14.3799 13.5774C13.737 13.6639 13.0334 13.8705 12.4519 14.4519C11.8705 15.0333 11.6639 15.737 11.5775 16.3799C11.4998 16.9576 11.4999 17.6635 11.5 18.414V18.586C11.4999 19.3365 11.4998 20.0424 11.5775 20.6201C11.6381 21.0712 11.7579 21.5522 12.0249 22C12.0166 22 12.0083 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C13.3262 13 14.577 13.1815 15.6782 13.5028Z"></path>
                </>
            ),
            iconViewbox: "0 0 24 24",
        },
        {
            name: "members",
            path: route("dashboard.members"),
            icon: (
                <>
                    <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                    <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                </>
            ),
            iconViewbox: "0 0 20 19",
        },
        {
            name: "programs",
            path: route("dashboard.programs"),
            icon: (
                <>
                    <path d="M5,22a4,4,0,0,0,3.858-3h6.284a4.043,4.043,0,1,0,2.789-4.837L14.816,8.836a4,4,0,1,0-5.63,0L6.078,14.166A3.961,3.961,0,0,0,5,14a4,4,0,0,0,0,8Zm14-6a2,2,0,1,1-2,2A2,2,0,0,1,19,16ZM12,4a2,2,0,1,1-2,2A2,2,0,0,1,12,4ZM10.922,9.834A3.961,3.961,0,0,0,12,10a3.909,3.909,0,0,0,1.082-.168l3.112,5.323A4,4,0,0,0,15.142,17H8.858a3.994,3.994,0,0,0-1.044-1.838ZM5,16a2,2,0,1,1-2,2A2,2,0,0,1,5,16Z"></path>
                </>
            ),
            iconViewbox: "0 0 24 24",
        },
    ],
    three: [
        {
            name: "my profile",
            path: route("dashboard.my-profile"),
            icon: (
                <>
                    <path d="M25.1,41H4a2,2,0,0,1-2-2V31.1l1-.6A25.6,25.6,0,0,1,16,27a26.7,26.7,0,0,1,7.5,1.1,21.2,21.2,0,0,0-.5,4.4A18.4,18.4,0,0,0,25.1,41Z"></path>
                    <path d="M16,23a9,9,0,1,0-9-9A9,9,0,0,0,16,23Z"></path>
                    <path d="M46,34.1V31.9L42.4,31l-.5-1.1,2-3.2-1.6-1.6-3.2,2L38,26.6,37.1,23H34.9L34,26.6l-1.1.5-3.2-2-1.6,1.6,2,3.2L29.6,31l-3.6.9v2.2l3.6.9.5,1.1-2,3.2,1.6,1.6,3.2-2,1.1.5.9,3.6h2.2l.9-3.6,1.1-.5,3.2,2,1.6-1.6-2-3.2.5-1.1ZM36,36a3,3,0,1,1,3-3A2.9,2.9,0,0,1,36,36Z"></path>
                </>
            ),
            iconViewbox: "0 0 48 48",
        },
        {
            name: "logout",
            path: route("logout"),
            method: "post",
            icon: (
                <>
                    <>
                        <path d="M22 6.62219V17.245C22 18.3579 21.2857 19.4708 20.1633 19.8754L15.0612 21.7977C14.7551 21.8988 14.449 22 14.0408 22C13.5306 22 12.9184 21.7977 12.4082 21.4942C12.2041 21.2918 11.898 21.0895 11.7959 20.8871H7.91837C6.38776 20.8871 5.06122 19.6731 5.06122 18.0544V17.0427C5.06122 16.638 5.36735 16.2333 5.87755 16.2333C6.38776 16.2333 6.69388 16.5368 6.69388 17.0427V18.0544C6.69388 18.7626 7.30612 19.2684 7.91837 19.2684H11.2857V4.69997H7.91837C7.20408 4.69997 6.69388 5.20582 6.69388 5.91401V6.9257C6.69388 7.33038 6.38776 7.73506 5.87755 7.73506C5.36735 7.73506 5.06122 7.33038 5.06122 6.9257V5.91401C5.06122 4.39646 6.28572 3.08125 7.91837 3.08125H11.7959C12 2.87891 12.2041 2.67657 12.4082 2.47423C13.2245 1.96838 14.1429 1.86721 15.0612 2.17072L20.1633 4.09295C21.1837 4.39646 22 5.50933 22 6.62219Z"></path>
                        <path d="M4.85714 14.8169C4.65306 14.8169 4.44898 14.7158 4.34694 14.6146L2.30612 12.5912C2.20408 12.49 2.20408 12.3889 2.10204 12.3889C2.10204 12.2877 2 12.1865 2 12.0854C2 11.9842 2 11.883 2.10204 11.7819C2.10204 11.6807 2.20408 11.5795 2.30612 11.5795L4.34694 9.55612C4.65306 9.25261 5.16327 9.25261 5.46939 9.55612C5.77551 9.85963 5.77551 10.3655 5.46939 10.669L4.7551 11.3772H8.93878C9.34694 11.3772 9.7551 11.6807 9.7551 12.1865C9.7551 12.6924 9.34694 12.7936 8.93878 12.7936H4.65306L5.36735 13.5017C5.67347 13.8052 5.67347 14.3111 5.36735 14.6146C5.26531 14.7158 5.06122 14.8169 4.85714 14.8169Z"></path>
                    </>
                </>
            ),
        },
    ],
};

export const AdminLayout = ({ children }) => {
    const [statusAside, setStatusAside] = useState(false);
    const [layoutData, setLayoutData] = useState({
        user: {},
        countNotif: 0,
        data: [],
    });

    useEffect(() => {
        const fetchLayoutData = async () => {
            try {
                const resp = await axios.get(route("dashboard.api.layout"));
                setLayoutData(resp.data);
                // console.log(resp.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLayoutData();

        // return () => signals["statusAside"].dispose();
    }, []);

    useEffect(() => {
        signalsComponents.data.value = {
            ...signalsComponents.data.value,
            statusAside: statusAside,
            // statusAside: statusAside.toString(),
        };
    }, [statusAside]);

    // useEffect(() => console.log(statusAside), [statusAside]);
    return (
        <Flowbite>
            <Head title="Dashboard" />
            <AsideNav status={statusAside} />
            <NavigasiTop
                statusAside={statusAside}
                changeAside={() => setStatusAside((prev) => !prev)}
                dataLayout={layoutData}
            />
            <main
                className={
                    "p-4 bg-gray-200 dark:bg-gray-900 min-h-[calc(100vh-49px-0.5rem)]" +
                    (statusAside ? " lg:ml-[20%] md:ml-[30%] xl:ml-[15%]" : "")
                }
            >
                {children}
            </main>
            <Notification />
        </Flowbite>
    );
};

function NavigasiTop({ statusAside, changeAside, dataLayout }) {
    const [statusPopUp, setStatusPopUp] = useState({
        notif: false,
        apps: false,
        user: false,
    });

    // useEffect(() => console.log(dataLayout), [dataLayout]);
    return (
        <>
            <header className="antialiased">
                <nav
                    className={
                        "bg-white border-b-2 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 " +
                        (statusAside
                            ? "lg:ml-[20%] md:ml-[30%] xl:ml-[15%]"
                            : "")
                    }
                >
                    <div className="flex flex-wrap justify-between items-center">
                        {/* Nav Left */}
                        <div className="flex justify-start items-center">
                            <button
                                className="hidden md:block group p-2 mr-2 text-gray-600 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={changeAside}
                            >
                                <div className="w-[18px] h-[18px] group-hover:text-gray-900 group-hover:dark:text-white dark:text-gray-200 items-center">
                                    {statusAside ? <HiMenuAlt2 /> : <HiMenu />}
                                </div>
                                <span className="sr-only">Toggle sidebar</span>
                            </button>
                            {/* SHORTCUT */}
                            <div className="flex mr-4">
                                {!statusAside && (
                                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                        ShortCut
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Nav Right */}
                        <div className="flex items-center lg:order-2">
                            <DarkThemeToggle />
                            {/* <!-- Notifications --> */}
                            <div className="ml-1">
                                <button
                                    onClick={() =>
                                        setStatusPopUp((prev) => ({
                                            ...prev,
                                            notif: !statusPopUp.apps,
                                        }))
                                    }
                                    type="button"
                                    data-dropdown-toggle="notification-dropdown"
                                    className="relative p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                >
                                    {/* bandage */}
                                    <Bandage text={dataLayout.countNotif} />
                                    <span className="sr-only">
                                        View notifications
                                    </span>
                                    {/* <!-- Bell icon --> */}
                                    <SvgIcon
                                        className="w-5 h-5"
                                        iconViewbox="0 0 14 20"
                                    >
                                        <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                                    </SvgIcon>
                                </button>
                            </div>
                            {/* <!-- Manu --> */}
                            <div>
                                <button
                                    onClick={() =>
                                        setStatusPopUp((prev) => ({
                                            ...prev,
                                            apps: !statusPopUp.apps,
                                        }))
                                    }
                                    type="button"
                                    data-dropdown-toggle="apps-dropdown"
                                    className="md:hidden p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                >
                                    <span className="sr-only">Menu</span>
                                    {/* <!-- Icon --> */}
                                    <SvgIcon
                                        className="w-4 h-4"
                                        iconViewbox={"0 0 18 18"}
                                    >
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                    </SvgIcon>
                                </button>
                                {/* <!-- Dropdown menu Apps --> */}
                            </div>
                            {/* User */}
                            <div>
                                <button
                                    onClick={() =>
                                        setStatusPopUp((prev) => ({
                                            ...prev,
                                            user: !statusPopUp.user,
                                        }))
                                    }
                                    type="button"
                                    className="flex mx-2 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <div>
                                        <svg
                                            fill="#048BFD"
                                            width="32px"
                                            height="32px"
                                            viewBox="0 0 56 56"
                                            xmlns="http://www.w3.org/2000/svg"
                                            // stroke="#048BFD"
                                        >
                                            <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0"
                                            ></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                stroke="#CCCCCC"
                                                strokeWidth="0"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 14.5 C 32.4765 14.5 36.0390 18.4375 36.0390 23.1719 C 36.0390 28.2109 32.4999 32.0547 27.9999 32.0078 C 23.4765 31.9609 19.9609 28.2109 19.9609 23.1719 C 19.9140 18.4375 23.4999 14.5 27.9999 14.5 Z M 42.2499 41.8750 L 42.3202 42.1797 C 38.7109 46.0234 33.3671 48.2266 27.9999 48.2266 C 22.6093 48.2266 17.2655 46.0234 13.6562 42.1797 L 13.7265 41.8750 C 15.7655 39.0625 20.7812 35.9922 27.9999 35.9922 C 35.1952 35.9922 40.2343 39.0625 42.2499 41.8750 Z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    {/* <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"> */}
                                </button>
                                {/* <!-- Dropdown menu User --> */}
                            </div>
                        </div>
                    </div>
                </nav>
                {/* PopUp */}
                {statusPopUp.notif && (
                    <PopUpNotification
                        onClose={() =>
                            setStatusPopUp((prev) => ({
                                ...prev,
                                notif: !prev.notif,
                            }))
                        }
                        data={dataLayout.data}
                    />
                )}
                {statusPopUp.apps && (
                    <PopUpMenu
                        onClose={() =>
                            setStatusPopUp((prev) => ({
                                ...prev,
                                apps: !prev.apps,
                            }))
                        }
                    />
                )}
                {statusPopUp.user && (
                    <PopUpUser
                        onClose={() =>
                            setStatusPopUp((prev) => ({
                                ...prev,
                                user: !prev.user,
                            }))
                        }
                        data={dataLayout.user}
                    />
                )}
            </header>
        </>
    );
}

function AsideNav({ status }) {
    // useEffect(() => console.log(dataLayout), [dataLayout]);
    const currentPath = window.location.origin + window.location.pathname;

    return (
        <aside
            id="default-sidebar"
            className={
                (status ? "fixed " : "hidden ") +
                "top-0 left-0 z-40 lg:w-[20%] md:w-[30%] xl:w-[15%] h-screen transition-all duration-200 -translate-x-full sm:translate-x-0"
            }
            aria-label="Sidenav"
        >
            <div className="flex flex-col justify-between border-r border-gray-200 overflow-y-auto py-5 px-3 h-full bg-white  dark:bg-gray-800 dark:border-gray-700">
                <div className="">
                    <div className="self-center text-center text-2xl font-semibold whitespace-nowrap dark:text-white w-full">
                        <span>ShortCut</span>
                    </div>
                    {Object.keys(linkAdmin).map((item, key) => {
                        return (
                            <ul
                                key={key}
                                className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
                            >
                                {linkAdmin[item].map((it, key) => {
                                    const { name, icon, iconViewbox, path } =
                                        it;
                                    return (
                                        <li key={key} className="w-full">
                                            <Link
                                                href={path}
                                                className={
                                                    "relative w-full flex items-center p-2 text-base font-normal rounded-lg " +
                                                    (currentPath === path
                                                        ? "bg-gray-100 dark:bg-gray-700 hover:cursor-default"
                                                        : "hover:bg-gray-100 dark:hover:bg-gray-700 group")
                                                }
                                                method={it?.method || "get"}
                                                as="button"
                                            >
                                                <SvgIcon
                                                    iconViewbox={iconViewbox}
                                                    className={`w-6 h-6 ${
                                                        currentPath === path
                                                            ? "text-gray-700 dark:text-white"
                                                            : "text-gray-400"
                                                    } transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white`}
                                                >
                                                    {icon}
                                                </SvgIcon>
                                                {/* {icon} */}
                                                <span
                                                    className={
                                                        "ml-3 capitalize" +
                                                        (currentPath === path
                                                            ? " text-gray-700 dark:text-white"
                                                            : " text-gray-700/50 group-hover:text-gray-700 dark:text-gray-400 group-hover:dark:text-white")
                                                    }
                                                >
                                                    {name}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        );
                    })}
                </div>
                {/* footer */}
                <span className="items-center text-xs font-mono text-gray-900/40 text-center">
                    {/* copyright */}© 2024 Copyright: Adnan Khafabi
                </span>
            </div>
        </aside>
    );
}

function PopUp({ children, setClose }) {
    return (
        <div className="relative">
            <div
                className="absolute z-40 -top-14 w-full h-screen"
                onClick={setClose}
            ></div>
            <div className="absolute z-50 sm:top-0 sm:right-2 right-1 top-1">
                <div
                    className={
                        "relative overflow-x-hidden z-50 md:max-w-sm max-w-xs max-h-[calc(100vh-6rem)] text-base list-none bg-white rounded border-2 border-gray-200/60 divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700"
                    }
                    id="notification-dropdown"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function PopUpHeader({ children }) {
    return (
        <div className="sticky top-0 py-2 px-4 text-base font-semibold text-center text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            {children}
        </div>
    );
}

const PopUpNotification = ({ onClose, data }) => {
    return (
        <PopUp setClose={onClose}>
            <>
                {/* header */}
                <PopUpHeader>Notifications</PopUpHeader>
                {/* main */}
                <div>
                    {data.map((item, key) => {
                        return (
                            <div
                                key={key}
                                className="flex flex-col py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                            >
                                <div className="text-gray-500 font-normal text-sm dark:text-gray-400">
                                    New request member from:{" "}
                                    <span className="capitalize text-gray-800 font-semibold">
                                        {item.nama}
                                    </span>
                                    ,{" "}
                                    <span className="text-gray-800 font-semibold">
                                        {item.email}
                                    </span>
                                </div>
                                <span className="text-gray-500 font-semibold text-xs dark:text-gray-400">
                                    {convertToWIB(item.created_at)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </>
        </PopUp>
    );
};

const PopUpMenu = ({ onClose }) => {
    return (
        <PopUp setClose={onClose}>
            <PopUpHeader>Menu</PopUpHeader>
            <div className="grid grid-cols-3 gap-4 p-4">
                {Object.keys(linkAdmin).map((item, key) => {
                    return linkAdmin[item].map((it, key) => {
                        const { name, icon, iconViewbox, path } = it;
                        return (
                            <li key={key}>
                                <Link
                                    href={path}
                                    as="button"
                                    method={it?.method || "get"}
                                    className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                                >
                                    <SvgIcon
                                        iconViewbox={iconViewbox}
                                        className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                                    >
                                        {icon}
                                    </SvgIcon>
                                    {/* {icon} */}
                                    <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                        {name}
                                    </div>
                                </Link>
                            </li>
                        );
                    });
                })}
            </div>
        </PopUp>
    );
};
const PopUpUser = ({ onClose, data }) => {
    return (
        <PopUp setClose={onClose}>
            <div className="w-56 text-base list-none" id="dropdown">
                <div className="py-3 px-4">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white capitalize">
                        {data.name}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        {data.email}
                    </span>
                </div>
                <ul
                    className="py-1 text-gray-500 dark:text-gray-400"
                    aria-labelledby="dropdown"
                >
                    <li>
                        <a
                            href="#"
                            className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        >
                            My profile
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        >
                            Account settings
                        </a>
                    </li>
                </ul>

                <ul className="py-1 text-gray-500 dark:text-gray-400 space-y-2 border-t border-gray-200 dark:border-gray-700">
                    <li>
                        <Link
                            href={route("logout")}
                            className="group py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex flex-row items-center gap-x-2"
                        >
                            <SvgIcon>
                                <>
                                    <path d="M22 6.62219V17.245C22 18.3579 21.2857 19.4708 20.1633 19.8754L15.0612 21.7977C14.7551 21.8988 14.449 22 14.0408 22C13.5306 22 12.9184 21.7977 12.4082 21.4942C12.2041 21.2918 11.898 21.0895 11.7959 20.8871H7.91837C6.38776 20.8871 5.06122 19.6731 5.06122 18.0544V17.0427C5.06122 16.638 5.36735 16.2333 5.87755 16.2333C6.38776 16.2333 6.69388 16.5368 6.69388 17.0427V18.0544C6.69388 18.7626 7.30612 19.2684 7.91837 19.2684H11.2857V4.69997H7.91837C7.20408 4.69997 6.69388 5.20582 6.69388 5.91401V6.9257C6.69388 7.33038 6.38776 7.73506 5.87755 7.73506C5.36735 7.73506 5.06122 7.33038 5.06122 6.9257V5.91401C5.06122 4.39646 6.28572 3.08125 7.91837 3.08125H11.7959C12 2.87891 12.2041 2.67657 12.4082 2.47423C13.2245 1.96838 14.1429 1.86721 15.0612 2.17072L20.1633 4.09295C21.1837 4.39646 22 5.50933 22 6.62219Z"></path>
                                    <path d="M4.85714 14.8169C4.65306 14.8169 4.44898 14.7158 4.34694 14.6146L2.30612 12.5912C2.20408 12.49 2.20408 12.3889 2.10204 12.3889C2.10204 12.2877 2 12.1865 2 12.0854C2 11.9842 2 11.883 2.10204 11.7819C2.10204 11.6807 2.20408 11.5795 2.30612 11.5795L4.34694 9.55612C4.65306 9.25261 5.16327 9.25261 5.46939 9.55612C5.77551 9.85963 5.77551 10.3655 5.46939 10.669L4.7551 11.3772H8.93878C9.34694 11.3772 9.7551 11.6807 9.7551 12.1865C9.7551 12.6924 9.34694 12.7936 8.93878 12.7936H4.65306L5.36735 13.5017C5.67347 13.8052 5.67347 14.3111 5.36735 14.6146C5.26531 14.7158 5.06122 14.8169 4.85714 14.8169Z"></path>
                                </>
                            </SvgIcon>
                            Log Out
                        </Link>
                    </li>
                </ul>
            </div>
        </PopUp>
    );
};

export const SvgIcon = ({
    children,
    iconViewbox,
    className = null,
    width = null,
    height = null,
    style = {},
}) => {
    return (
        <svg
            aria-hidden="true"
            className={
                className
                    ? className
                    : `${width ? "" : "w-6"} ${
                          height ? "" : "h-6"
                      } text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`
            }
            style={{ width, height, ...style }}
            fill="currentColor"
            viewBox={iconViewbox}
            xmlns="http://www.w3.org/2000/svg"
        >
            {children}
        </svg>
    );
};
