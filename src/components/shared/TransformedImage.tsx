"use client";
import { dataUrl, debounce, getImageSize } from "@/lib/utils";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { useState } from "react";

const TransformedImage = ({
    image,
    type,
    title,
    isTransforming,
    setIsTransforming,
    transformationConfig,
    hasDownload = false,
}: TransformedImageProps) => {
    const [loading, setLoading] = useState(false);

    // <!-- Download image -->
    const handleDownload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // <!-- Get the image url -->
        const url = getCldImageUrl({
            width: image?.width,
            height: image?.height,
            src: image?.publicId,
            ...transformationConfig,
        });
        if (!url) throw new Error("Resource URL not provided! You need to provide one");

        setLoading(true);

        // <!-- Fetch the image url to download -->
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            const blobURL = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobURL;
            if (title && title.length) a.download = `${title.replace(" ", "_")}.png`;
            document.body.appendChild(a);
            a.click();
        } catch (error) {
            console.log({ error });
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-primary">Transformed</h3>
                {hasDownload &&
                    (loading ? (
                        <div className="text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                                    opacity={0.5}
                                ></path>
                                <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                    <animateTransform
                                        attributeName="transform"
                                        dur="1s"
                                        from="0 12 12"
                                        repeatCount="indefinite"
                                        to="360 12 12"
                                        type="rotate"
                                    ></animateTransform>
                                </path>
                            </svg>
                        </div>
                    ) : (
                        <button className="flex items-center gap-2 px-2 text-primary" onClick={handleDownload}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 20 20">
                                <path
                                    fill="currentColor"
                                    d="M17 12v5H3v-5H1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z"
                                ></path>
                                <path fill="currentColor" d="M15 9h-4V1H9v8H5l5 6z"></path>
                            </svg>
                        </button>
                    ))}
            </div>
            {image?.publicId && transformationConfig ? (
                <div className="relative">
                    <CldImage
                        width={getImageSize(type, image, "width")}
                        height={getImageSize(type, image, "height")}
                        src={image?.publicId}
                        alt="image"
                        sizes={"(max-width: 767px) 100vw, 50vw"}
                        placeholder={dataUrl as PlaceholderValue}
                        className="h-fit min-h-72 w-full rounded-lg border border-dashed bg-primary/5 object-cover p-2"
                        onLoad={() => setIsTransforming && setIsTransforming(false)}
                        onError={() =>
                            debounce(() => {
                                setIsTransforming && setIsTransforming(false);
                            }, 8000)()
                        }
                        {...transformationConfig}
                    />
                    {isTransforming && (
                        <div className="flex justify-center items-center absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl border bg-primary/5">
                            <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                                    opacity={0.5}
                                ></path>
                                <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                    <animateTransform
                                        attributeName="transform"
                                        dur="1s"
                                        from="0 12 12"
                                        repeatCount="indefinite"
                                        to="360 12 12"
                                        type="rotate"
                                    ></animateTransform>
                                </path>
                            </svg>
                            <p className="text-primary text-base">Please wait...</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full min-h-72 cursor-pointer flex-col gap-5 rounded-2xl border border-dashed bg-primary/5 shadow-inner">
                    Transformed image
                </div>
            )}
        </div>
    );
};

export default TransformedImage;
