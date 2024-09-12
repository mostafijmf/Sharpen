import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.action";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Home | Sharpen",
    description: "",
};

const HomePage = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchQuery = (searchParams?.query as string) || "";

    const images = await getAllImages({ page, searchQuery });

    return (
        <div className="md:p-10 p-7">
            <section className="sm:flex sm:justify-center sm:items-center hidden h-80 flex-col gap-4 rounded-2xl border bg-primary p-10 shadow-inner relative">
                <h1 className="text-4xl font-semibold max-w-[500px] flex-wrap text-center text-white shadow-sm">
                    Unleash Your Creative Vision With Sharpen
                </h1>
                <span className="absolute bottom-5 right-5 text-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 14 14">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9.534a3 3 0 0 1-1.395-.692a3.193 3.193 0 0 1 1.887-5.59a.23.23 0 0 0 .21-.127a3.868 3.868 0 0 1 7.508.91a.25.25 0 0 0 .173.2a2.73 2.73 0 0 1-.173 5.35"></path>
                            <path d="M4.528 11.096c-.298-.052-.298-.48 0-.532A2.7 2.7 0 0 0 6.7 8.483l.02-.083c.065-.295.484-.297.551-.003l.022.096a2.71 2.71 0 0 0 2.18 2.069c.299.052.299.482 0 .534a2.71 2.71 0 0 0-2.18 2.069l-.022.096c-.067.294-.486.292-.55-.003l-.019-.082a2.7 2.7 0 0 0-2.173-2.081Z"></path>
                        </g>
                    </svg>
                </span>
                <span className="absolute top-1/2 -translate-y-1/2 -left-10 text-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width={350} height={350} viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M11.5 19.27q-.904 0-1.577-.578q-.673-.576-.846-1.423h1.039q.153.445.527.722q.374.278.857.278q.617 0 1.059-.441T13 16.769t-.441-1.058q-.442-.442-1.059-.442h-9v-1h9q1.039 0 1.77.731t.73 1.77t-.73 1.769t-1.77.73m-9-9.538v-1h13q.842 0 1.421-.579t.579-1.421t-.579-1.421t-1.421-.58q-.727 0-1.248.426q-.521.425-.675 1.075h-1.039q.173-1.09 1.003-1.796q.83-.704 1.959-.704q1.264 0 2.132.868t.868 2.132t-.868 2.132t-2.132.868zM19 17.46v-1.038q.65-.154 1.075-.675T20.5 14.5q0-.842-.579-1.421T18.5 12.5h-16v-1h16q1.264 0 2.132.868T21.5 14.5q0 1.129-.705 1.959T19 17.46"
                        ></path>
                    </svg>
                </span>

                <ul className="flex items-center justify-center gap-20 mt-10">
                    {navLinks.slice(0, 5).map((link) => (
                        <li key={link.label}>
                            <Link href={link.route} className={`flex flex-col justify-center items-center gap-2`}>
                                <div className="p-4 bg-white rounded-full text-primary">{link.icon}</div>
                                <p className="text-white">{link.label}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="sm:mt-12">
                <Collection hasSearch={true} images={images?.data} totalPages={images?.totalPage} page={page} />
            </section>
        </div>
    );
};

export default HomePage;
