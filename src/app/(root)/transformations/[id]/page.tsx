import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.action";
import { getImageSize } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
    const { userId } = auth();
    if (!userId) redirect("/sign-in");

    const image = await getImageById(id);

    return (
        <div className="md:p-10 p-7">
            <Header title={image.title} />

            <section className="mt-5 flex flex-wrap gap-4">
                <div className="text-sm font-medium md:text-base md:font-medium flex gap-2">
                    <p className="text-primary">Transformation:</p>
                    <p className="capitalize text-indigo-500">{image.transformationType}</p>
                </div>

                {image.prompt && (
                    <>
                        <p className="hidden md:block">&#x25CF;</p>
                        <div className="p-14-medium md:p-16-medium flex gap-2 ">
                            <p className="text-primary">Prompt:</p>
                            <p className=" capitalize text-indigo-500">{image.prompt}</p>
                        </div>
                    </>
                )}

                {image.color && (
                    <>
                        <p className="hidden md:block">&#x25CF;</p>
                        <div className="text-sm font-medium md:text-base md:font-medium flex gap-2">
                            <p className="text-primary">Color:</p>
                            <p className=" capitalize text-indigo-500">{image.color}</p>
                        </div>
                    </>
                )}

                {image.aspectRatio && (
                    <>
                        <p className="hidden md:block">&#x25CF;</p>
                        <div className="text-sm font-medium md:text-base md:font-medium flex gap-2">
                            <p className="text-primary">Aspect Ratio:</p>
                            <p className=" capitalize text-indigo-500">{image.aspectRatio}</p>
                        </div>
                    </>
                )}
            </section>

            <section className="mt-10 border-t border-primary/20">
                <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-8 md:grid-cols-2">
                    {/* <!-- MEDIA UPLOADER --> */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-semibold text-primary">Original</h3>
                        <Image
                            width={getImageSize(image.transformationType, image, "width")}
                            height={getImageSize(image.transformationType, image, "height")}
                            src={image.secureURL}
                            alt="image"
                            className="h-fit min-h-72 w-full rounded-lg border border-dashed bg-primary/5 object-cover p-2"
                        />
                    </div>

                    {/* TRANSFORMED IMAGE */}
                    <TransformedImage
                        image={image}
                        type={image.transformationType}
                        title={image.title}
                        isTransforming={false}
                        transformationConfig={image.config}
                        hasDownload={true}
                    />
                </div>

                {userId === image.author.clerkId && (
                    <div className="mt-4 space-y-4">
                        <Button asChild type="button" className="text-white w-full h-12 rounded">
                            <Link href={`/transformations/${image._id}/update`}>Update Image</Link>
                        </Button>

                        <DeleteConfirmation imageId={image._id} />
                    </div>
                )}
            </section>
        </div>
    );
};

export default ImageDetails;
