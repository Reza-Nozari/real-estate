import { useState } from "react";
import { RiEyeFill } from "@react-icons/all-files/ri/RiEyeFill";
import { RiEyeOffFill } from "@react-icons/all-files/ri/RiEyeOffFill";
import { OAuth } from "../components/autentication/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const { email, password, firstName, lastName, confirmPassword } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function changeShowPassword() {
    setShowPassword(!showPassword);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentioal = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentioal.user;

      const fullname = firstName + " " + lastName;

      await updateProfile(auth.currentUser, { displayName: fullname });

      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col max-w-[1200px] m-auto ">
      <section className="flex justify-center w-full mt-3 mb-4">
        <h1 className="text-black font-bold font-semibold  text-2xl">
          Sign Up
        </h1>
      </section>

      <section className="flex flex-1 flex-row justify-center items-center gap-2 w-full p-1 flex-wrap">
        <div className="flex  md:w-[50%] sm:w-[50%] lg:w-[50%]">
          <img
            alt=""
            className="rounded-2xl"
            src="https://media.istockphoto.com/id/1455070607/fi/valokuva/tyhj%C3%A4-asuntolainahakemuslomake-jossa-on-talon-avain.jpg?s=612x612&w=is&k=20&c=XQUOiCWRMe9-WZtLQbNHwoeh228plHudyiSv0zhEwrw="
          />
        </div>

        <div className="flex flex-1 flex-col  gap-2 justify-center items-center p-4">
          <div className="w-full flex justify-center">
            <input
              type="text"
              placeholder="First Name"
              className="rounded w-full transition ease-in-out"
              value={firstName}
              name="firstName"
              onChange={onChange}
            />
          </div>

          <div className="w-full flex justify-center">
            <input
              type="text"
              placeholder="Last Name"
              className="rounded w-full transition ease-in-out"
              value={lastName}
              name="lastName"
              onChange={onChange}
            />
          </div>

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

          <div className="w-full flex justify-center relative ">
            <input
              type={showPassword ? "text" : "password"}
              className="rounded w-full transition ease-in-out"
              placeholder="Password"
              value={password}
              name="password"
              onChange={onChange}
            />

            <div onClick={changeShowPassword} className="cursor-pointer">
              {showPassword ? (
                <RiEyeOffFill className="absolute top-3 right-2" />
              ) : (
                <RiEyeFill className="absolute top-3 right-2" />
              )}
            </div>
          </div>

          <div className="w-full flex justify-center relative ">
            <input
              type={showPassword ? "text" : "password"}
              className="rounded w-full transition ease-in-out"
              placeholder="Confirm Password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={onChange}
            />

            <div onClick={changeShowPassword} className="cursor-pointer">
              {showPassword ? (
                <RiEyeOffFill className="absolute top-3 right-2" />
              ) : (
                <RiEyeFill className="absolute top-3 right-2" />
              )}
            </div>
          </div>

          <div className="flex w-full">
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 "
              onClick={onSubmit}
            >
              sign Up
            </button>
          </div>

          <OAuth />
        </div>
      </section>
    </div>
  );
}
