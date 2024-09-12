import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Header from "@/components/shared/Header";
import { transformationTypes } from "@/constants";
import { getImageById } from "@/lib/actions/image.action";
import { getUserById } from "@/lib/actions/user.action";
import TransformationForm from "@/components/shared/TransformationForm";

const UpdatePage = async ({ params: { id } }: SearchParamProps) => {
    const { userId } = auth();

    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);
    const image = await getImageById(id);

    const transformation = transformationTypes[image.transformationType as TransformationTypeKey];

    return (
        <div className="md:p-10 p-7">
            <Header title={transformation.title} subtitle={transformation.subTitle} />

            <section className="mt-10">
                <TransformationForm
                    action="Update"
                    userId={user._id}
                    type={image.transformationType as TransformationTypeKey}
                    creditBalance={user.creditBalance}
                    config={image.config}
                    data={image}
                />
            </section>
        </div>
    );
};

export default UpdatePage;
