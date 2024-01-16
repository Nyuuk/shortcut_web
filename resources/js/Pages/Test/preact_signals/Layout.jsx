import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";
import { testSignal } from "./signal";

export default function Layout({ children, text }) {
    console.log("Rendering Layout");
    return (
        <div className="p-5 items-center text-center">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl items-center">{text}</h1>
            </div>
            <div className="py-5 px-12 border-2 flex flex-col gap-2">
                {children}
            </div>
        </div>
    );
}

export const LayoutComponent = ({ children }) => {
    return <div className="py-5 px-12 border-2">{children}</div>;
};
