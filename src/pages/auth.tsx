import Head from "next/head";
import Image from "next/image";
import { Formik, Form } from "formik";
import { useContext, useState } from "react";
import { TextFeild } from "src/components";
import { AuthContext } from 'src/context/auth.context';
import *as yup from 'yup';
import { useRouter } from "next/router";
import { useAuth } from "src/hooks/useAuth";
import { GetServerSideProps } from "next";

const Auth = () => {
  const [auth, setAuth] = useState<"signup" | "signin">("signin");
  const {error, isLoading, signIn, signUp, user,setIsLoading} = useAuth();


  const toggleAuth = (state: "signup" | "signin") => {
    setAuth(state);
  };

	  const onSubmit = async (formData: { email: string; password: string }) => {
		if (auth === 'signup') {
     
			signUp(formData.email, formData.password);
		} else {
			signIn(formData.email, formData.password);
		}
	};

      
  const validation=yup.object({
email:yup.string().email().required('Email is requried'),
password:yup.string().min(6,"6 minium charter").required('password is requried')
  })
  return (
    <div className=" relative flex h-screen w-screen flex-col items-center  md:justify-center  md:bg-transparent">
      <Head>
        <title>Auth</title>
        <meta
          name="description"
          content="For watching movies you should sign to app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={"https://rb.gy/p2hphi"}
        alt={"bg"}
        fill
        className="object-cover hidden sm:inline -z-10  opacity-60"
      />
         <Image
        src={"https://rb.gy/p2hphi"}
        alt={"bg"}
        fill
        className="object-cover md:hidden -z-10 opacity-20"
      />
      <Image
        src={"/logo.svg"}
        alt={"logo"}
        width={70}
        height={70}
        className=" absolute left-4 top-4  sm:!inline cursor-pointer object-contain"
      />
      <div className=" p-5 relative mt-24 space-y-8 rounded md:mx-14 w-full bg-black/75 py-10 md:mt-0 md:max-w-md ">
        <Formik initialValues={{ email:'', password: '' }} onSubmit={onSubmit} validationSchema={validation}>
          <Form className=" space-y-4">
        <h1 className=" text-4xl font-semibold py-4">
          {auth === "signin" ? "Sign In":"Sign Up"}
        </h1>
       {error && <p className="text-red-500 font-semibold text-center ">{error}</p>}
            <div className="space-y-4  ">
              <TextFeild name="email" placeholder="Email" type={'text'} />
              <TextFeild
                name="password"
                placeholder="Password"
                type={'password'}
              />
            </div>
         
              <button
                type="submit" disabled={isLoading}
                className={`w-full  bg-[#E10856] mt-4 py-3 font-semibold`}
              >
                {isLoading?'Loading..':auth ==='signin'? 'Sign In':'Sign Up'}
            
              </button>
         
          </Form>
        </Formik>
        {auth === "signin" ? (
          <div className="text-[gray]">
            Not yet account?
            <button
              type="button"
              className=" text-white hover:underline"
              onClick={() => toggleAuth("signup")}
            >
                Sign Up Now
           
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
               Sign In
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
export default Auth;
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const user_id = req.cookies.user_id;

	if (user_id) {
		return {
			redirect: { destination: '/', permanent: false },
		};
	}

	return {
		props: {},
	};
};
