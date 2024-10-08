const Layout = ({ children }: { children: React.ReactNode }) => {
    return <main className="grid place-items-center min-h-screen w-full">{children}</main>;
};

export default Layout;
