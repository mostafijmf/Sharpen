import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to Sharpen",
};

const SignInPage = () => {
    return <SignIn />;
};

export default SignInPage;
