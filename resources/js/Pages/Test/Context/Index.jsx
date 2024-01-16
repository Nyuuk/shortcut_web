import { useState } from "react";
import { TestContext } from "./Context";
import { ComponentA } from "./ComponentA";
import { ComponentB } from "./ComponentB";

export default function Index({ children }) {
    const [data, setData] = useState("");
    return (
        <TestContext.Provider value={{ data, updateData: setData }}>
            <div className="w-full h-screen p-5">
                <div className="text-2xl w-full text-center">
                    Ini Data : <span className="font-bold">{data}</span>
                </div>
                <div className="flex flex-row w-full">
                    <ComponentA className={"w-[50%]"} />
                    <ComponentB className={"w-[50%]"} />
                </div>
                <div className="border-2 mt-2">{children}</div>
            </div>
        </TestContext.Provider>
    );
}
