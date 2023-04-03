import { useState } from "react";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { TbHome } from "react-icons/tb";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);

  const [formData, setFormData] = useState({
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
  });

  if (!auth || !auth.currentUser) {
    navigate("/signIn");
  }

  const { email, name } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onLogOut() {
    auth.signOut();
    navigate("/signIn");
  }

  async function onEdit() {
    try {
      if (auth.currentUser.displayName !== name) {
        const user = auth.currentUser;

        const fullName = name.split(" ");

        const firstName = fullName[0];
        const lastName = fullName[1];

        await updateProfile(auth.currentUser, { displayName: name });

        await updateDoc(doc(db, "users", user.uid), {
          FirstName: firstName,
          LastName: lastName,
          UserId: user.uid,
          Email: user.email,
        });

        toast.success("Sign up was successfull");
      }
    } catch (error) {
      toast.error(error.toString());
    }
  }

  return (
    <div className="bg-[#f0f8ed] h-full">
      <div className="max-w-[500px] mx-auto">
        <div className="flex flex-col  gap-6 px-2 pb-5">
          <div className="flex justify-center align-middle mt-3">
            <h1 className="text-4xl font-bold">My Profile</h1>
          </div>
          <div className="flex flex-col justify-center align-middle gap-3">
            <div className="flex justify-center align-middle">
              <input
                type="text"
                placeholder="Please Insert Name"
                className={`rounded-lg w-full bg-white ${
                  changeDetail && "bg-red-500 focus:bg-red-200"
                }`}
                value={name}
                disabled={!changeDetail}
                name="name"
                onChange={onChange}
              />
            </div>

            <div className="flex justify-center align-middle">
              <input
                type="text"
                placeholder="Please Insert Name"
                className="rounded-lg w-full bg-white"
                value={email}
                name="email"
                disabled
                onChange={onChange}
              />
            </div>
            <div className="flex">
              <div className="flex flex-1 gap-1">
                <p>Do want to change your name?</p>
                <span
                  onClick={() => {
                    changeDetail && onEdit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-orange-400 hover:text-orange-600 font-bold cursor-pointer"
                >
                  {changeDetail ? "Apply Change" : "Edit"}
                </span>
              </div>
              <div className="flex  flex-row-reverse gap-1">
                <span
                  onClick={onLogOut}
                  className="text-blue-400 hover:text-blue-600 font-bold cursor-pointer"
                >
                  Sign out
                </span>
              </div>
            </div>
          </div>
          <div className="flex align-middle justify-center">
            <button className="relative uppercase bg-blue-600 w-full p-3 rounded text-white font-bold">
              <TbHome className="absolute text-2xl top-3 left-10" />
              Sell Or Rent yout home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
