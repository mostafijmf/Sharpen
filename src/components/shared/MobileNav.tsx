"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { Button } from "../ui/button";

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <header className="flex items-center justify-between fixed h-16 w-full border-b bg-white p-5 lg:hidden">
            <Link href="/" className="flex items-center gap-2 md:py-2 text-primary text-xl uppercase">
                <Image src="/images/icons/sharpen-logo.png" alt="sharpen" width={30} height={30} quality={100} />
                <b>Sharpen</b>
            </Link>
            <nav className="flex items-center gap-3">
                <SignedIn>
                    <UserButton />
                    <Sheet>
                        <SheetTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 20 20">
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m6 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </SheetTrigger>
                        <SheetContent className="bg-white">
                            <>
                                <Link href="/" className="text-primary text-xl uppercase">
                                    <Image
                                        src="/images/icons/sharpen-logo.png"
                                        alt="sharpen"
                                        width={30}
                                        height={30}
                                        quality={100}
                                    />
                                </Link>
                                <ul className="w-full flex-col items-start gap-2 flex mt-10">
                                    {navLinks.map((link) => {
                                        const isActive = link.route === pathname;
                                        return (
                                            <li
                                                key={link.label}
                                                className={`w-full whitespace-nowrap rounded-full bg-cover transition-all hover:shadow-inner group ${
                                                    isActive
                                                        ? "text-white bg-primary"
                                                        : "text-gray-600 hover:bg-primary/10"
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
                            </>
                        </SheetContent>
                    </Sheet>
                </SignedIn>
                <SignedOut>
                    <Button asChild className="text-white rounded">
                        <Link href="/sign-in">Login</Link>
                    </Button>
                </SignedOut>
            </nav>
        </header>
    );
};

export default MobileNav;
