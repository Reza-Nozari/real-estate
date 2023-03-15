import {useState} from "react";
import {RiEyeFill} from "@react-icons/all-files/ri/RiEyeFill";
import {RiEyeOffFill} from "@react-icons/all-files/ri/RiEyeOffFill";
import {Link} from "react-router-dom";
import {OAuth} from "../components/autentication/OAuth";


export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email,password} =formData;

    function onChange (e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    function changeShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div className="flex flex-col max-w-[1200px] m-auto ">

            <section className="flex justify-center w-full mt-3 mb-4">
                <h1 className="text-black font-bold font-semibold  text-2xl">Sign In</h1>
            </section>

            <section className="flex flex-1 flex-row justify-center items-center gap-2 w-full p-1 flex-wrap">

                <div className="flex  md:w-[50%] sm:w-[50%] lg:w-[50%]">
                    <img className="rounded-2xl" src="https://media.istockphoto.com/id/1455070607/fi/valokuva/tyhj%C3%A4-asuntolainahakemuslomake-jossa-on-talon-avain.jpg?s=612x612&w=is&k=20&c=XQUOiCWRMe9-WZtLQbNHwoeh228plHudyiSv0zhEwrw="/>
                </div>

                <div className="flex flex-1 flex-col  gap-2 justify-center items-center p-4">

                   <div className="w-full flex justify-center">
                       <input type="text" placeholder="Email address"  className="rounded w-full transition ease-in-out" value={email} name="email" onChange={onChange}/>
                   </div>

                    <div className="w-full flex justify-center relative ">
                        <input type={showPassword?"text":"password"} className="rounded w-full transition ease-in-out" placeholder="Password" value={password} name="password" onChange={onChange}/>

                        <div onClick={changeShowPassword} className="cursor-pointer">
                            {showPassword? <RiEyeOffFill  className="absolute top-3 right-2"/>  : <RiEyeFill className="absolute top-3 right-2"/>}
                        </div>

                    </div>

                    <div className="flex flex-row gap-1 align-middle font-bold justify-between w-full">
                       <div className="flex flex-row gap-1">
                           <span className="text-gray-500">Don't have a account ?</span>
                           <Link to="/signOut" className="text-red-300 hover:text-red-500 cursor-pointer" >Register</Link>
                       </div>
                        <div>
                            <Link to="/forgotpassword" className="text-blue-300 hover:text-blue-500 cursor-pointer">Forgot password?</Link>
                        </div>
                    </div>

                    <div className="flex w-full">
                        <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ">sign in</button>
                    </div>
                    <div className="flex w-full gap-2  before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300  items-center">
                        <span className="text-center  font-bold ">OR</span>
                    </div>
                    <OAuth/>

                </div>

            </section>
        </div>

    );
}