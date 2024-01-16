import { LayoutComponent } from "./Layout";
import { testSignal } from "./signal";

export default function ComponentA() {
    console.log("Rendering Component A");

    return (
        <LayoutComponent>
            <h1 className="text-2xl">Component A</h1>
            <button
                className="bg-gray-200 py-2 px-4"
                onClick={() => (testSignal.value = "Component A")}
            >
                Change Signals
            </button>
        </LayoutComponent>
    );
}
