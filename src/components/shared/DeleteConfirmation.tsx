"use client";
import { useTransition } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { deleteImage } from "@/lib/actions/image.action";

const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
    const [isPending, startTransition] = useTransition();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild className="w-full rounded-full">
                <Button type="button" className="text-white w-full h-12 rounded bg-red-400 hover:bg-red-500" variant="destructive">
                    Delete Image
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="flex flex-col gap-10 bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this image?</AlertDialogTitle>
                    <AlertDialogDescription className="">
                        This will permanently delete this image
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="border bg-red-500 text-white hover:bg-red-600 rounded"
                        onClick={() =>
                            startTransition(async () => {
                                await deleteImage(imageId);
                            })
                        }
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteConfirmation;
