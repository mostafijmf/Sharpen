"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const Search = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query) {
                const newUrl = formUrlQuery({
                    searchParams: searchParams.toString(),
                    key: "query",
                    value: query,
                });

                router.push(newUrl, { scroll: false });
            } else {
                const newUrl = removeKeysFromQuery({
                    searchParams: searchParams.toString(),
                    keysToRemove: ["query"],
                });

                router.push(newUrl, { scroll: false });
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [router, searchParams, query]);

    return (
        <div className="flex items-center justify-between w-full rounded-xl bg-primary/5 border shadow-inner shadow-primary/10 md:max-w-96">
            <label htmlFor="search" className="inline-block px-3">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0"
                    ></path>
                </svg>
            </label>

            <Input
                id="search"
                className="border-0 bg-transparent w-full h-[50px] px-0 text-base font-medium focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
};

export default Search;
