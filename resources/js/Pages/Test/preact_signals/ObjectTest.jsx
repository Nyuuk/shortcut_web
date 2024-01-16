import signalsComponents from "@/Pages/Dashboard/Components/signalsComponents";
import PengubahObject from "./PengubahObject";

export default function ObjectTest() {
    console.log("Rendering ObjectTest");
    return (
        <div>
            <p>{signalsComponents.test}</p>
            <PengubahObject />
        </div>
    );
}
