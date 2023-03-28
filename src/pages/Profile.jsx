import { useState } from "react";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  if (!auth || !auth.currentUser) {
    navigate("/signIn");
  }

  const [formData, setFormData] = useState({
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
  });

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
                className="rounded-lg w-full bg-white"
                value={name}
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
                onChange={onChange}
              />
            </div>
            <div className="flex">
              <div className="flex flex-1 gap-1">
                <p>Do want to change your name?</p>
                <span className="text-orange-400 hover:text-orange-600 font-bold">
                  Edit
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
        </div>
      </div>
    </div>
  );
}
