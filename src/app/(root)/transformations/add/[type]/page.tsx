import { Metadata } from "next";
import { redirect } from "next/navigation";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

export const generateMetadata = async ({ params: { type } }: SearchParamProps): Promise<Metadata> => {
    const transformation = transformationTypes[type];

    return {
        title: transformation.title,
        description: transformation.subTitle,
    };
};

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
    const transformation = transformationTypes[type];
    const { userId } = auth();

    if (!userId) redirect("/sign-in");
    const user = await getUserById(userId);

    return (
        <div className="md:p-10 p-7">
            <div>
                <h2 className="md:text-4xl text-3xl font-bold">{transformation.title}</h2>
                <p className="text-base mt-4">{transformation.subTitle}</p>
            </div>
            <div className="mt-10">
                <TransformationForm
                    action="Add"
                    userId={user._id}
                    type={transformation.type as TransformationTypeKey}
                    creditBalance={user.creditBalance}
                />
            </div>
        </div>
    );
};

export default AddTransformationTypePage;
