"use client";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { navLinks } from "@/constants";

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <aside className="hidden h-screen w-72 bg-white p-5 border-r lg:flex sticky top-0 left-0">
            <div className="size-full flex flex-col gap-4">
                <Link href="/" className="flex items-center gap-2 md:py-2 text-primary text-xl uppercase">
                    <Image src="/images/icons/sharpen-logo.png" alt="sharpen" width={30} height={30} quality={100} />
                    <b>Sharpen</b>
                </Link>
                <nav className="h-full flex-col justify-between md:flex md:gap-4">
                    <SignedIn>
                        <ul className="hidden w-full flex-col items-start gap-2 md:flex">
                            {navLinks.slice(0, 6).map((link) => {
                                const isActive = link.route === pathname;
                                return (
                                    <li
                                        key={link.label}
                                        className={`w-full whitespace-nowrap rounded-full bg-cover transition-all hover:shadow-inner group ${
                                            isActive ? "text-white bg-primary" : "text-gray-600 hover:bg-primary/10"
                                        }`}
                                    >
                                        <Link
                                            href={link.route}
                                            className={`text-base font-medium flex items-center size-full gap-2 p-3`}
                                        >
                                            {link.icon}
                                            &nbsp;{link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <ul className="hidden w-full flex-col items-start gap-2 md:flex">
                            {navLinks.slice(6).map((link) => {
                                const isActive = link.route === pathname;
                                return (
                                    <li
                                        key={link.label}
                                        className={`w-full whitespace-nowrap rounded-full bg-cover transition-all hover:shadow-inner group ${
                                            isActive ? "text-white bg-primary" : "text-gray-600 hover:bg-primary/10"
                                        }`}
                                    >
                                        <Link
                                            href={link.route}
                                            className={`text-base font-medium flex items-center size-full gap-2 p-3`}
                                        >
                                            {link.icon}
                                            &nbsp;{link.label}
                                        </Link>
                                    </li>
                                );
                            })}

                            <li className="p-3">
                                <UserButton />
                            </li>
                        </ul>
                    </SignedIn>

                    <SignedOut>
                        <Button asChild className="text-white rounded">
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    </SignedOut>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
