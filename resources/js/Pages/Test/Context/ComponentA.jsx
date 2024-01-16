import { useTestContext } from "./Context";

export const ComponentA = ({ className }) => {
    const { updateData } = useTestContext();
    return (
        <div className={"border-2 " + className}>
            <p>Component A</p>
            <button
                className="bg-gray-300 py-2 px-4"
                onClick={() => updateData("Component A")}
            >
                Update
            </button>
        </div>
    );
};
