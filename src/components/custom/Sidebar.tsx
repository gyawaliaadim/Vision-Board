"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FiHome, FiShoppingCart, FiSettings, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigation } from "@/store/NavigationContext";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import ToggleTheme from "./ToggleTheme";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(true);
  const { navigate } = useNavigation();
  const { data: session } = useSession();
  const userId = session?.user.id;
  const fetchUser = async () => {
    if (!userId) throw new Error("User ID required");
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/users`, {
      params: { id: userId },
    });
    if (!res.data.success) throw new Error("Failed to fetch user");
    return res.data.data;
  };

  if (!session?.user) return null;

  const { data: user, isLoading,  } = useQuery({
    queryKey: ["user", userId],
    queryFn: fetchUser,
    enabled: !!userId, // only run if userId exists
  });


  return (
    <aside
      className={`transition-all flex flex-col justify-between duration-300  bg-white dark:bg-black text-black dark:text-white border-r border-red-900/60 dark:border-red-500/10 ease-in ${open ? "w-64" : "w-16"} h-screen`}
  
    >
      <div>
      {/* Top Section */}
      <div className={clsx(`flex items-center px-3 py-3 h-14 shrink-0`,
        {
          'justify-between':open,
          'justify-center':!open
        }
      )}>
              {open &&
        <div className=" flex jsutify-center items-center pt-4 pb-4 cursor-pointer">
        <div className="flex items-center gap-2"
        onClick={()=>navigate('/')}>
              <Image
                src="/svgs/logo.svg"
                alt="Logo"
                width={30}
                height={30}
                className={`cursor-pointer ${status === "loading" ? "opacity-50 pointer-events-none" : ""}`}
                onClick={status === "loading" ? undefined : () => navigate("/")}
              />
       <div className="leading-5 text-lg font-semibold select-none">Vision Board</div>
          </div>
        </div>
       }

        <div className="flex items-center gap-2">
          <button
            aria-label={open ? "Close sidebar" : "Open sidebar"}
            onClick={() => setOpen(prev => !prev)}
            className="p-1 rounded-md cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/50"
          >
            {open ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="px-2 shrink-0">
        <ul className="space-y-1">
          <li className={clsx("flex justify-center items-center gap-2",
          {
            'justify-start':open,
            'justify-center':!open
          })
          }>
            <div className=" px-2">

<ToggleTheme padding={1} width={18} className={""}/>{open&&<> Theme</>}
            </div>

            </li>
          <li>
            <button
              onClick={() => navigate("/dashboard")}
              className={`flex items-center gap-3 rounded-md px-2 py-2 hover:bg-red-50 dark:hover:bg-red-900/50  w-full cursor-pointer ${open ? "" : "justify-center"}`}
            >
              <FiHome size={18} />
              {open && <span className="truncate">Dashboard</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/dashboard/rewards")}
              className={`flex items-center gap-3 rounded-md px-2 py-2 hover:bg-red-50 dark:hover:bg-red-900/50 cursor-pointer w-full ${open ? "" : "justify-center"}`}
            >
              <FiShoppingCart size={18} />
              {open && <span className="truncate">Rewards</span>}
            </button>
          </li>
          <li>
            <div className=" border-t my-2 border-red-600/10 dark:border-red-500/10" />
          </li>
          <li
  className={clsx(
    "flex items-center gap-2 p-4 m-2",
    "bg-linear-to-r from-[#374893] to-[#a94a79] text-white",
    "hover:scale-110 focus:shadow-[0_0_30px_rgba(200,110,180,0.9)] hover:shadow-[0_0_30px_rgba(200,110,180,0.9)]",
    "focus:brightness-110 hover:brightness-110",
    "transition-all duration-200 ease-out rounded-2xl",
    { 'justify-start': open, 'justify-center': !open },
    {"scale-110 brightness-110 duration-600":isLoading}
  )}
>
  {open && <span className="truncate">XP: {user?.xp ?? 0}</span>}
  {!open && <span>⭐</span>}
</li>

        </ul>
      </nav>

      </div>
      {/* Settings Section */}
      <div className="shrink-0 border-t border-red-600/10 w-full flex p-5 justify-center items-center dark:border-red-500/10">
           <div className="flex items-center space-x-3 p-3 border rounded-xl w-fit">
      <img
        src={session.user.image || `https://api.dicebear.com/9.x/thumbs/svg?seed=${session.user.id}`}
        alt={session.user.name || "User"}
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="font-medium text-sm">
        {session.user.name}
      </span>
    </div>
      </div>
    </aside>
  );
}
