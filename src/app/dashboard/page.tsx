"use client";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import ProjectListItem from "@/components/custom/ProjectListItem";
import { Project } from "@/types/models";
import { Button } from "@/components/ui/button";
import { PlusIcon, RefreshCcwIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectTitleForm from "@/components/custom/ProjectTitleForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

// Fetch projects
const fetchProjects = async (userId: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/projects`, {
    params: { userId },
  });
  return res.data.data;
};

const updateProjects = async (projectId: string, newTitle: string) => {
  const res = await axios.put(`${process.env.NEXT_PUBLIC_API}/projects/projectDetails`, {
    id: projectId,
    title: newTitle,
  });
  return res.data;
};

const deleteProjects = async (projectId: string) => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_API}/projects/projectDetails`, {
    data: { id: projectId },
  });
  return res.data;
};

const createProject = async (title: string, userId: string) => {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/projects`, {
    title,
    userId,
  });
  return res.data;
};

const Dashboard = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  // Query setup
  const {
    data: projects,
    refetch,
    isFetching,
  } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(session!.user.id),
    enabled: !!session?.user?.id,
  });

  const updateMutation = useMutation({
    mutationFn: ({ projectId, title }: { projectId: string; title: string }) =>
      updateProjects(projectId, title),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (projectId: string) => deleteProjects(projectId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const createMutation = useMutation({
    mutationFn: (title: string) => createProject(title, session!.user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setOpen(false);
    },
  });

  return (
    <div className="w-full flex flex-col gap-4 p-10">
      <div className="flex justify-between items-center">
        {/* Create Project Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "cursor-pointer flex items-center justify-center gap-2 text-base font-medium rounded-xl border transition-all duration-100",
                "border-gray-300 text-black hover:border-red-500 hover:text-red-600 hover:bg-red-50",
                "dark:border-gray-700 dark:text-white dark:hover:border-red-600 dark:hover:text-red-500 dark:hover:bg-black"
              )}
            >
              <PlusIcon className="w-5 h-5" />
              Create Project
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                New Project
              </DialogTitle>
            </DialogHeader>

            <ProjectTitleForm
              onSubmit={(title) => createMutation.mutate(title)}
            />
          </DialogContent>
        </Dialog>

        {/* 🔁 Manual Fetch Button */}
        <Button
          onClick={() => refetch()}
          variant="outline"
          disabled={isFetching}
          className={cn(
            "cursor-pointer flex items-center justify-center gap-2 text-base font-medium rounded-xl border transition-all duration-100",
            "border-gray-300 text-black hover:border-red-500 hover:text-red-600 hover:bg-red-50",
            "dark:border-gray-700 dark:text-white dark:hover:border-red-600 dark:hover:text-red-500 dark:hover:bg-black"
          )}
        >
          <RefreshCcwIcon className={`w-5 h-5 ${isFetching ? "animate-spin" : ""}`} />
          {isFetching ? "Fetching..." : "Load Projects"}
        </Button>
      </div>

      {/* Project List */}
      <>
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <ProjectListItem
              key={project.id}
              projectId={project.id}
              title={project.title}
              onEdit={(id, newTitle) =>
                updateMutation.mutate({ projectId: id, title: newTitle })
              }
              onDelete={() => deleteMutation.mutate(project.id)}
            />
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            No projects to show.
          </div>
        )}
      </>
    </div>
  );
};

export default Dashboard;
