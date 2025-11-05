import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, CheckIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input"; // Assuming you have shadcn Input
import { cn } from "@/lib/utils";
import { MouseEvent } from "react";
import { useNavigation } from "@/store/NavigationContext";

interface ProjectListItemProps {
  projectId: string;
  title: string;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({
  projectId,
  title,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const {navigate} =useNavigation();
  const handleOpenProject =(e:MouseEvent<HTMLDivElement>)=>{
    e.preventDefault()
    navigate(`/dashboard/projects/${projectId}`)
    
  }

  const handleSave = () => {
    onEdit(projectId, newTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(title);
    setIsEditing(false);
  };

  return (
    <div
      onClick={(e)=>handleOpenProject(e)}
      className={cn(
        "cursor-pointer w-full flex items-center justify-between p-4 border rounded-md transition-colors",
        "bg-white border-gray-200 hover:border-red-400 hover:bg-gray-50",
        "dark:bg-black dark:border-gray-700 dark:hover:border-red-600 dark:hover:bg-gray-900"
      )}
    >
      {/* Title or Edit Input */}
      <div className="flex-1">
        {isEditing ? (
          <Input
            value={newTitle}
            onChange={(e) =>  {
    e.stopPropagation(); setNewTitle(e.target.value)}}
            className="w-full text-lg font-medium text-gray-900 dark:text-gray-100"
            autoFocus
          />
        ) : (
          <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {title}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 ml-4">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={(e)=> {
    e.stopPropagation()
    handleSave()}}
              className="border-green-400 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <CheckIcon className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e)=> {
    e.stopPropagation(); 
    handleCancel()}}
              className="border-gray-400 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <XIcon className="w-5 h-5" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
    e.stopPropagation(); 
     setIsEditing(true)
              }}
              className={cn(
                "border-gray-300 cursor-pointer text-gray-700 hover:border-gray-400 hover:text-gray-500",
                "dark:border-gray-600 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:text-gray-400"
              )}
            >
              <PencilIcon className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
    e.stopPropagation();
     onDelete(projectId)}}
              className={cn(
                "border-gray-300 cursor-poin text-gray-700 hover:border-red-400 hover:text-red-500",
                "dark:border-gray-600 dark:text-gray-200 dark:hover:border-red-600 dark:hover:text-red-400"
              )}
            >
              <TrashIcon className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectListItem;
