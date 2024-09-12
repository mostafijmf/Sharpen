const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => {
    return (
        <>
            <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
            {subtitle && <p className="mt-4">{subtitle}</p>}
        </>
    );
};

export default Header;
