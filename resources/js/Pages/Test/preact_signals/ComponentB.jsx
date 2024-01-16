import { LayoutComponent } from "./Layout";
import { testSignal } from "./signal";

export default function ComponentB() {
    console.log("Rendering Component B");
    return (
        <LayoutComponent>
            <h1 className="text-2xl">Component B</h1>
            <button
                className="bg-gray-200 py-2 px-4"
                onClick={() => (testSignal.value = "Component B")}
            >
                Change Signals
            </button>
        </LayoutComponent>
    );
}
