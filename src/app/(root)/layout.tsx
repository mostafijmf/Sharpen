import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex">
            <Sidebar />
            <MobileNav />
            <div className="lg:mt-0 mt-16 w-full lg:max-w-7xl pb-10">{children}</div>
        </main>
    );
};

export default Layout;
