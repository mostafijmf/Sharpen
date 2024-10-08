"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { transformationTypes } from "@/constants";
import { Button } from "../ui/button";
import { IImage } from "@/database/models/imageModel";
import { formUrlQuery } from "@/lib/utils";
import Search from "./Search";
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious } from "../ui/pagination";

export const Collection = ({
    hasSearch = false,
    images,
    totalPages = 1,
    page,
}: {
    images: IImage[];
    totalPages?: number;
    page: number;
    hasSearch?: boolean;
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // PAGINATION HANDLER
    const onPageChange = (action: string) => {
        const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

        const newUrl = formUrlQuery({
            searchParams: searchParams.toString(),
            key: "page",
            value: pageValue,
        });

        router.push(newUrl, { scroll: false });
    };

    return (
        <>
            <div className="md:justify-between md:items-center mb-6 flex flex-col gap-5 md:flex-row">
                <h2 className="text-3xl font-bold md:text-4xl">Recent Edits</h2>
                {hasSearch && <Search />}
            </div>

            {images.length > 0 ? (
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {images?.map((image, i) => (
                        <Card key={i} image={image} />
                    ))}
                </ul>
            ) : (
                <div className="flex justify-center items-center h-60 w-full rounded-xl border shadow-inner bg-primary/5">
                    <p className="text-xl font-semibold">Empty List</p>
                </div>
            )}

            {totalPages > 1 && (
                <Pagination className="mt-10">
                    <PaginationContent className="flex w-full">
                        <Button
                            disabled={Number(page) <= 1}
                            className="collection-btn"
                            onClick={() => onPageChange("prev")}
                        >
                            <PaginationPrevious className="hover:bg-transparent hover:text-white" />
                        </Button>

                        <p className="flex justify-center items-center text-base font-medium w-fit flex-1">
                            {page} / {totalPages}
                        </p>

                        <Button
                            className="button w-32 bg-purple-gradient bg-cover text-white"
                            onClick={() => onPageChange("next")}
                            disabled={Number(page) >= totalPages}
                        >
                            <PaginationNext className="hover:bg-transparent hover:text-white" />
                        </Button>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
};

const Card = ({ image }: { image: IImage }) => {
    return (
        <li>
            <Link
                href={`/transformations/${image._id}`}
                className="flex flex-1 cursor-pointer flex-col gap-5 rounded-2xl border border-primary/50 bg-white p-4 shadow-lg shadow-primary/10 transition-all hover:shadow-primary/20"
            >
                <CldImage
                    src={image.publicId}
                    alt={image.title}
                    width={image.width}
                    height={image.height}
                    {...image.config}
                    loading="lazy"
                    className="h-52 w-full rounded-xl object-cover"
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                />
                <div className="flex justify-between items-center text-primary">
                    <p className="text-xl font-semibold mr-3 line-clamp-1">{image.title}</p>
                    <span className="inline-block size-6">
                        {transformationTypes[image.transformationType as TransformationTypeKey].icon}
                    </span>
                </div>
            </Link>
        </li>
    );
};
