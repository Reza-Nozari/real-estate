import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { setDoc } from "@firebase/firestore";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export const OAuth = () => {
  const navigate = useNavigate();

  async function onSignUpWithGoogle(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const docRef = doc(db, "users", user.uid);
      const documentResult = await getDoc(docRef);

      if (!documentResult.exists()) {
        const fullName = user.displayName.split(" ");

        await setDoc(docRef, {
          FirstName: fullName[0],
          LastName: fullName[1],
          Email: user.email,
          UserId: user.uid,
        });
      }

      toast.success("Sign up was successfull");

      navigate("/");
    } catch (error) {
      toast.error(error.toString(), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="flex w-full ">
      <ToastContainer />
      <button
        onClick={onSignUpWithGoogle}
        className="flex items-center gap-1 justify-center w-full bg-red-500 text-white px-7 py-3 text-sm font-medium  rounded shadow-md hover:bg-red-700 transition duration-150 "
      >
        <FcGoogle className="text-xl bg-white rounded-2xl w-[25px] h-[25px]" />
        <span>Continiue With Google</span>
      </button>
    </div>
  );
};
