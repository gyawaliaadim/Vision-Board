
import Sidebar from "@/components/custom/Sidebar";
import type { Metadata } from "next";

// lib/getServerSession.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`${process.env.NEXT_PUBLIC_HOST}/signin`);
    return null;
  }
  else {


    return (
      <div className="flex max-h-screen w-full">

        <Sidebar />
        <div className="overflow-y-auto flex w-full">

          {children}
        </div>

      </div>

    );
  }
}
