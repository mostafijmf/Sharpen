"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useToast } from "@/hooks/use-toast";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    publicId: string;
    image: string;
    type: string;
};

const MediaUploader = ({ onValueChange, setImage, publicId, image, type }: MediaUploaderProps) => {
    const { toast } = useToast();

    const handleUploadSuccess = async (result: any) => {
        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url,
        }));
        onValueChange(result?.info?.public_id);

        toast({
            title: "Image uploaded successfully",
            description: "1 Credit was deducted from your account",
            duration: 5000,
            className: "bg-green-100 text-green-900",
        });
    };

    const handleUploadError = () => {
        toast({
            title: "Something went wrong while uploading",
            description: "Please try again",
            duration: 5000,
            className: "bg-red-100 text-red-900",
        });
    };

    return (
        <CldUploadWidget
            uploadPreset="jsm_sharpen"
            options={{
                multiple: false,
                resourceType: "image",
            }}
            onSuccess={handleUploadSuccess}
            onError={handleUploadError}
        >
            {({ open }) => (
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-semibold">Original</h3>
                    {publicId ? (
                        <div className="cursor-pointer overflow-hidden rounded-lg">
                            <CldImage
                                width={getImageSize(type, image, "width")}
                                height={getImageSize(type, image, "height")}
                                src={publicId}
                                alt="image"
                                sizes={"(max-width: 767px) 100vw, 50vw"}
                                placeholder={dataUrl as PlaceholderValue}
                                className="h-fit min-h-72 w-full rounded-lg border border-dashed bg-purple-100/20 object-cover p-2"
                            />
                        </div>
                    ) : (
                        <div
                            className="flex items-center justify-center h-72 cursor-pointer flex-col gap-5 rounded-2xl border border-dashed bg-primary/5 shadow-inner"
                            onClick={() => open()}
                        >
                            <div className="rounded-2xl bg-white p-4 shadow-sm shadow-primary/20 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm-6 4q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"
                                    ></path>
                                </svg>
                            </div>
                            <p>Click here to upload image</p>
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    );
};

export default MediaUploader;
