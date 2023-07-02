import Head from "next/head";
import Image from "next/image";

import { useState } from "react";

const Auth = () => {
  const [auth, setAuth] = useState<"signup" | "signin">("signin");
  const toggleAuth = (state: "signup" | "signin") => {
    setAuth(state);
  };
  return (
    <div className=" relative flex h-screen w-screen flex-col items-center md:justify-center bg-black  md:bg-transparent">
      <Head>
        <title>Auth</title>
        <meta
          name="description"
          content="For watching movies you should sign to app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src={'https://rb.gy/p2hphi'} alt={'bg'} fill className='object-cover -z-10 !hidden sm:!inline opacity-60' />
      <Image
        src={"/logo.svg"}
        alt={"logo"}
        width={70}
        height={70}
        className=" absolute left-4 top-4 cursor-pointer object-contain"
      />
      <form className=" p-5 relative mt-24 space-y-8 rounded md:mx-14 w-full bg-black/75 py-10 md:mt-0 md:max-w-md ">
        <h1  className=" text-4xl font-semibold py-4">{auth ==='signin'? 'Sign Up':'Sign In'}</h1>
        <div className="space-y-4  ">
          <label className=" inline-block w-full">
            <input type="text" placeholder="Email" className="input" />
          </label>
          <label className=" inline-block w-full">
            <input type="password" placeholder="Password" className="input" />
          </label>
        </div>
        {auth==='signup'?(
              <button
              type="button"
              className="w-full  bg-[#E10856] py-3 font-semibold"
            >
              Sign In
            </button>
        ):(
          <button
          type="button"
          className="w-full  bg-[#E10856] py-3 font-semibold"
        >
          Sign Up
        </button>
        )
        }
    

        {auth === "signin" ? (
          <div className="text-[gray]">
            Not yet account?
            <button
              type="button"
              className=" text-white hover:underline"
              onClick={() => toggleAuth("signup")}
            >
              Sign In
            </button>
          </div>
        ) : (
          <div className="text-[gray]">
            Already have account?
            <button
              type="button"
              className=" text-white hover:underline"
              onClick={() => toggleAuth("signin")}
            >
              Sign Up Now
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Auth;
