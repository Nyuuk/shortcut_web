import signalsComponents from "@/Pages/Dashboard/Components/signalsComponents";
import { signal } from "@preact/signals-react";

export default function () {
    // signalsComponents["test"] = signal(0);
    setInterval(() => {
        signalsComponents.test.value = Math.random();
    }),
        500;
    return (
        <div>
            <h1 className="text-2xl">Component Pengubah</h1>
        </div>
    );
}
