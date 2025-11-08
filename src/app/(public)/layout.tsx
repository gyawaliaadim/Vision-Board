import Topbar from "@/components/custom/Topbar";
import Footer from "@/components/custom/Footer";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Vision Board',
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col  min-h-screen w-full ">
      <Topbar  />

      <div className="flex flex-col justify-center items-center h-full w-full">
       {children}
      <Footer/>
      </div>
      
    </div>

  );
}
