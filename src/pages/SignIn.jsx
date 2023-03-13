export default function SignIn() {
    return (
        <div className="flex flex-col max-w-[1200px] m-auto ">

            <section className="flex justify-center w-full mt-3 mb-3">
                <h1 className="text-black font-bold font-semibold font-siz text-2xl">Sign In</h1>
            </section>

            <section className="flex flex-1 flex-row justify-center items-center gap-2 w-full p-1 flex-wrap">

                <div className="flex  md:w-[50%] sm:w-[50%] lg:w-[50%]">
                    <img className="rounded-2xl" src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"/>
                </div>

                <form className="flex flex-1 flex-col  gap-2 justify-center items-center p-4">

                   <div className="w-full flex justify-center">
                       <input type="text" className="border focus-visible:outline-blue-500 rounded-md border-gray-400 bg-white w-full mx-auto "/>
                   </div>

                    <div className="w-full flex justify-center">
                        <input type="password" className="border focus-visible:outline-blue-500 rounded-md border-gray-400 w-full mx-auto bg-white"/>
                    </div>

                    <div className="flex flex-row">

                    </div>

                    <div>
                        <button className="btn ">login</button>
                    </div>
                </form>

            </section>
        </div>

    );
}