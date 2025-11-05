"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/store/NavigationContext";

const Home = () => {
  const { navigate } = useNavigation();

  return (
    <div className="flex flex-col items-center justify-center w-full bg-[url('/svgs/background.svg')] bg-repeat bg-contain">
      
      {/* Hero Section */}
      <div className="w-[75%] min-h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-red-400 text-center">
          Organize Your Tasks, Simplify Your Life
        </h1>
        <p className="text-center text-xl sm:text-2xl text-black dark:text-white">
          Build boards, add tasks, track progress — just like Trello, but made for your workflow. Boost productivity and collaborate effortlessly.
        </p>
        <Button
          className="bg-red-400 hover:bg-red-500 text-white font-bold text-2xl py-6 px-16 rounded-full"
          onClick={() => navigate("/login")}
        >
          Start Your Board
        </Button>
      </div>

      {/* Features / Benefits Section */}
      <div className="w-[75%] min-h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-red-400">
          Stay on Top of Your Projects
        </h1>
        <p className="text-center text-xl sm:text-2xl text-black dark:text-white">
          Create multiple boards, organize tasks into lists, and move them with ease. Perfect for teams or personal projects — manage everything in one place.
        </p>
        <img
          src="/image1.png"
          alt="Demo Image showing task boards and workflow"
          className="w-full max-w-[750px] object-contain rounded-xl"
        />
      </div>

      {/* CTA / Audience Section */}
      <div className="w-[75%] min-h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-red-400">
          Collaborate & Track Progress
        </h1>
        <p className="text-center text-xl sm:text-2xl text-black dark:text-white">
          Invite team members, assign tasks, and see updates in real-time. Our Trello-like system makes project management intuitive and visual.
        </p>
        <Button
          className="bg-red-400 hover:bg-red-500 text-white font-bold text-2xl py-6 px-16 rounded-full"
          onClick={() => navigate("/login")}
        >
          Create Your First Board
        </Button>
      </div>
    </div>
  );
};

export default Home;
