import { Metadata } from "next";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import { plans } from "@/constants";
import Checkout from "@/components/shared/Checkout";

export const metadata: Metadata = {
    title: "Buy Credits",
    description: "",
};

const CreditsPage = async () => {
    const { userId } = auth();
    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);

    return (
        <div className="md:p-10 p-7">
            <Header title="Buy Credits" subtitle="Choose a credit package that suits your needs!" />

            <section>
                <ul className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-9 xl:grid-cols-3">
                    {plans.map((plan) => (
                        <li
                            key={plan.name}
                            className="w-full rounded-2xl border border-primary/50 bg-white p-8 shadow-md lg:max-w-none"
                        >
                            <div className="flex justify-center items-center flex-col gap-3">
                                <div className="size-16 text-primary rounded-full grid place-items-center shadow-inner shadow-primary/10 bg-primary/5 border">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 32 32">
                                        <path
                                            fill="currentColor"
                                            d="M10.103 3.368A2 2 0 0 1 12 2h9a2 2 0 0 1 1.873 2.702L20.886 10H24a2 2 0 0 1 1.54 3.276L12.473 29.047c-1.706 2.058-5.016.365-4.346-2.222L10.415 18H8a2 2 0 0 1-1.897-2.633zM12 4L8 16h3.708a1 1 0 0 1 .968 1.251l-2.613 10.076c-.134.517.528.856.87.444L24 12h-4.557a1 1 0 0 1-.936-1.351L21 4z"
                                        ></path>
                                    </svg>
                                </div>
                                <p className="text-xl font-semibold mt-2 text-indigo-500">{plan.name}</p>
                                <p className="text-4xl font-bold sm:text-5xl text-primary my-2">${plan.price}</p>
                                <p className="">{plan.credits} Credits</p>
                            </div>

                            {/* Inclusions */}
                            <ul className="flex flex-col gap-5 py-9">
                                {plan.inclusions.map((inclusion) => (
                                    <li key={plan.name + inclusion.label} className="flex items-center gap-4">
                                        {inclusion.isIncluded ? (
                                            <div className="text-indigo-500">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                        d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M7.53 11.97a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l7-7a.75.75 0 0 0-1.06-1.06L10 14.44z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="text-red-600">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                                                        <circle cx={12} cy={12} r={10} opacity={0.5}></circle>
                                                        <path strokeLinecap="round" d="m14.5 9.5l-5 5m0-5l5 5"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        )}
                                        <p>{inclusion.label}</p>
                                    </li>
                                ))}
                            </ul>

                            {plan.name === "Free" ? (
                                <Button
                                    variant="outline"
                                    className="w-full rounded-full bg-primary/5 hover:bg-primary/10 bg-cover text-primary"
                                >
                                    Free Consumable
                                </Button>
                            ) : (
                                <SignedIn>
                                    <Checkout
                                        plan={plan.name}
                                        amount={plan.price}
                                        credits={plan.credits}
                                        buyerId={user._id}
                                    />
                                </SignedIn>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default CreditsPage;
