import { useState } from "react";

export default function Index() {
    const [data, setData] = useState("Default Value");
    console.log("Rendering Index");
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-xl">Data State : {data}</h1>
            <ChangeData
                title={"Rendering Component 1"}
                data={data}
                setData={setData}
            />
            <ChangeData
                title={"Rendering Component 2"}
                data={data}
                setData={setData}
            />
            <ChangeData
                title={"Rendering Component 3"}
                data={data}
                setData={setData}
            />
        </div>
    );
}

const ChangeData = ({ setData, title }) => {
    console.log(title);
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <button
                className="px-4 py-2 bg-gray-200"
                onClick={() =>
                    setData(
                        "Changed Value " +
                            `${title.split(" ")[1]} ${title.split(" ")[2]}`
                    )
                }
            >
                Change Data by Component {title.split(" ")[2]}
            </button>
        </div>
    );
};
