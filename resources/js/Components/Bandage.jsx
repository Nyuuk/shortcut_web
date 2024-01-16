export default function Bandage({ className = "", text }) {
    return (
        <div
            className={
                "absolute bottom-[8px] left-[6px] text-[8px] rounded-full px-[2px] bg-red-600 text-white font-medium items-center text-center " +
                className
            }
        >
            {text}
        </div>
    );
}
