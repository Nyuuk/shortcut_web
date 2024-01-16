import { useTestContext } from "./Context";
import Index from "./Index";

export default function AtasIndex() {
    const { data } = useTestContext();
    return (
        <Index>
            <h1>ini data dari atas : {data}</h1>
        </Index>
    );
}
