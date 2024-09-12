"use client";
import { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { aspectRatioOptions, creditFee, defaultValues, transformationTypes } from "@/constants/index";
import CustomField from "./CustomField";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils";
import MediaUploader from "./MediaUploader";
import TransformedImage from "./TransformedImage";
import { updateCredits } from "@/lib/actions/user.action";
import { getCldImageUrl } from "next-cloudinary";
import { addImage, updateImage } from "@/lib/actions/image.action";
import { useRouter } from "next/navigation";
import InsufficientCreditsModal from "./InsufficientCreditsModal";

export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
});

const TransformationForm = ({
    action,
    data = null,
    userId,
    type,
    creditBalance,
    config = null,
}: TransformationFormProps) => {
    const transformationType = transformationTypes[type];
    const [image, setImage] = useState(data);
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const [transformationConfig, setTransformationConfig] = useState(config);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const initialValues =
        data && action === "Update"
            ? {
                  title: data?.title,
                  aspectRatio: data?.aspectRatio,
                  color: data?.color,
                  prompt: data?.prompt,
                  publicId: data?.publicId,
              }
            : defaultValues;

    // <!-- Define form. -->
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });

    useEffect(() => {
        if (image && (type === "restore" || type === "removeBackground")) {
            setNewTransformation(transformationType.config);
        }
    }, [image, transformationType.config, type]);

    // <!-- Define a submit handler. -->
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        if (data || image) {
            const transformationUrl = getCldImageUrl({
                width: image?.width,
                height: image?.height,
                src: image?.publicId,
                ...transformationConfig,
            });

            const imageData = {
                title: values.title,
                publicId: image?.publicId,
                transformationType: type,
                width: image?.width,
                height: image?.height,
                config: transformationConfig,
                secureURL: image?.secureURL,
                transformationURL: transformationUrl,
                aspectRatio: values.aspectRatio,
                prompt: values.prompt,
                color: values.color,
            };

            if (action === "Add") {
                try {
                    const newImage = await addImage({ image: imageData, userId, path: "/" });

                    if (newImage) {
                        form.reset();
                        setImage(data);
                        router.push(`/transformations/${newImage._id}`);
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            if (action === "Update") {
                try {
                    const updatedImage = await updateImage({
                        image: { ...imageData, _id: data._id },
                        userId,
                        path: `/transformations/${data._id}`,
                    });

                    if (updatedImage) router.push(`/transformations/${updatedImage._id}`);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        setIsSubmitting(false);
    }

    const handleOnSelectField = (value: string, onChangeField: (value: string) => void) => {
        const imageSize = aspectRatioOptions[value as AspectRatioKey];
        console.log(imageSize);

        setImage({
            ...image,
            aspectRatio: imageSize.aspectRatio,
            width: imageSize.width,
            height: imageSize.height,
        });

        setNewTransformation(transformationType.config);
        return onChangeField(value);
    };

    const handleOnChange = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {
        debounce(() => {
            setNewTransformation((prevState: any) => ({
                ...prevState,
                [type]: { ...prevState?.[type], [fieldName === "prompt" ? "prompt" : "to"]: value },
            }));
        }, 1000)();
        return onChangeField(value);
    };

    // <!-- TODO: Update creditFee to something else -->
    const handleTransformation = async () => {
        setIsTransforming(true);
        setTransformationConfig(deepMergeObjects(newTransformation, transformationConfig));
        setNewTransformation(null);
        startTransition(async () => {
            await updateCredits(userId, creditFee);
        });
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}
                    <CustomField
                        control={form.control}
                        name="title"
                        formLabel="Image Title"
                        className="w-full"
                        render={({ field }) => <Input {...field} className="input-field" />}
                    />

                    {type === "fill" && (
                        <CustomField
                            control={form.control}
                            name="aspectRatio"
                            formLabel="Aspect Ratio"
                            className="w-full"
                            render={({ field }) => (
                                <Select onValueChange={(value) => handleOnSelectField(value, field.onChange)} value={field?.value}>
                                    <SelectTrigger className="select-field">
                                        <SelectValue placeholder="Select Size" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {Object.keys(aspectRatioOptions).map((key) => (
                                            <SelectItem
                                                key={key}
                                                value={key}
                                                className="py-3 cursor-pointer hover:bg-primary/10"
                                            >
                                                {aspectRatioOptions[key as AspectRatioKey].label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    )}

                    {(type === "remove" || type === "recolor") && (
                        <div>
                            <CustomField
                                control={form.control}
                                name="prompt"
                                formLabel={type === "remove" ? "Object to remove" : "Object to recolor"}
                                className="w-full"
                                render={({ field }) => (
                                    <Input
                                        value={field.value}
                                        className="input-field"
                                        onChange={(e) => handleOnChange("prompt", e.target.value, type, field.onChange)}
                                    />
                                )}
                            />
                        </div>
                    )}
                    {type === "recolor" && (
                        <CustomField
                            control={form.control}
                            name="color"
                            formLabel="Replacement color"
                            className="w-full"
                            render={({ field }) => (
                                <Input
                                    value={field.value}
                                    className="input-field"
                                    onChange={(e) => handleOnChange("color", e.target.value, "recolor", field.onChange)}
                                />
                            )}
                        />
                    )}

                    <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-4 md:grid-cols-2">
                        <CustomField
                            control={form.control}
                            name="publicId"
                            className="size-full flex flex-col"
                            render={({ field }) => (
                                <MediaUploader
                                    onValueChange={field.onChange}
                                    setImage={setImage}
                                    publicId={field.value}
                                    image={image}
                                    type={type}
                                />
                            )}
                        />

                        <TransformedImage
                            image={image}
                            type={type}
                            title={form.getValues().title}
                            isTransforming={isTransforming}
                            setIsTransforming={setIsTransforming}
                            transformationConfig={transformationConfig}
                        />
                    </div>

                    <div className="flex flex-col gap-y-4 pt-3">
                        <Button
                            type="submit"
                            className="text-white w-full h-12 rounded"
                            disabled={isTransforming || newTransformation === null}
                            onClick={handleTransformation}
                        >
                            {isTransforming ? "Transforming..." : "Apply Transformation"}
                        </Button>
                        <Button type="submit" className="text-white w-full h-12 rounded" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Save Image"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default TransformationForm;
