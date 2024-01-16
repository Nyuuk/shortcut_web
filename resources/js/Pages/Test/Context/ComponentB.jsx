import { useTestContext } from "./Context";

export const ComponentB = ({ className }) => {
    const { updateData } = useTestContext();
    return (
        <div className={"border-2 " + className}>
            <p>Component B</p>
            <button
                className="bg-gray-300 py-2 px-4"
                onClick={() => updateData("Component B")}
            >
                Update
            </button>
        </div>
    );
};
