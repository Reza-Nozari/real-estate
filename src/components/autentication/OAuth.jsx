import {FcGoogle} from "@react-icons/all-files/fc/FcGoogle";
import {AiOutlineGoogle} from "@react-icons/all-files/ai/AiOutlineGoogle";

export const OAuth = () => {
    return (
        <div className="flex w-full ">
            <button className="flex items-center gap-1 justify-center w-full bg-red-500 text-white px-7 py-3 text-sm font-medium  rounded shadow-md hover:bg-red-700 transition duration-150 ">
                <FcGoogle className="text-xl bg-white rounded-2xl w-[25px] h-[25px]" />
                <span>Continiue With Google</span>
            </button>
        </div>
    );
}