import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex">
            <Sidebar />
            <MobileNav />
            {children}
        </main>
    );
};

export default Layout;
