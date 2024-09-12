import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Sharpen",
    description: "AI-powered image editor",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider appearance={{ variables: { colorPrimary: "#1C385C" } }}>
            <html lang="en">
                <body className={cn(inter.variable)}>
                    {children}
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
