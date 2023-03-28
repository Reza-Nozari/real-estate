import { useState } from "react";
import { Link } from "react-router-dom";
import { OAuth } from "../components/autentication/OAuth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function onForgotPassword(e) {
    try {
      const auth = getAuth();

      await sendPasswordResetEmail(auth, email);

      toast.success("Email was sent");

      navigate("/signIn");
    } catch (error) {
      toast.error(error.toString());
    }
  }

  return (
    <div className="flex flex-col max-w-[1200px] m-auto ">
      <ToastContainer />
      <section className="flex justify-center w-full mt-3 mb-4">
        <h1 className="text-black font-bold font-semibold  text-2xl">
          Sign In
        </h1>
      </section>

      <section className="flex flex-1 flex-row justify-center items-center gap-2 w-full p-1 flex-wrap">
        <div className="flex  md:w-[50%] sm:w-[50%] lg:w-[50%]">
          <img
            alt=""
            className="rounded-2xl"
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
          />
        </div>

        <div className="flex flex-1 flex-col  gap-2 justify-center items-center p-4">
          <div className="w-full flex justify-center">
            <input
              type="text"
              placeholder="Email address"
              className="rounded w-full transition ease-in-out"
              value={email}
              name="email"
              onChange={onChange}
            />
          </div>

          <div className="flex flex-row gap-1 align-middle font-bold justify-between w-full">
            <div className="flex flex-row gap-1">
              <span className="text-gray-500">Don't have a account ?</span>
              <Link
                to="/signUp"
                className="text-red-300 hover:text-red-500 cursor-pointer"
              >
                Register
              </Link>
            </div>
            <div>
              <Link
                to="/signIn"
                className="text-blue-300 hover:text-blue-500 cursor-pointer"
              >
                SignIn
              </Link>
            </div>
          </div>

          <div className="flex w-full">
            <button
              onClick={onForgotPassword}
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 "
            >
              Send Reset Password
            </button>
          </div>
          <div className="flex w-full gap-2  before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300  items-center">
            <span className="text-center  font-bold ">OR</span>
          </div>
          <OAuth />
        </div>
      </section>
    </div>
  );
}
