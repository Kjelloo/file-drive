"use client"

import {File, FileIcon as FilePresentation, FileImage, FileSpreadsheet, FileText, Folder} from "lucide-react"
import {DriveFile, DriveFolder} from "@/db";

type FileItemProps = {
    file: DriveFile | DriveFolder;
    view: "grid" | "list";
    onFolderClick: (id: string, name: string) => void;
}

export function FileItem({ file, view, onFolderClick}: FileItemProps) {
    const isFolder = !('url' in file);
    
    const getFileIcon = (size: "small" | "large" = "large") => {
        const iconSize = size === "small" ? "h-5 w-5" : "h-10 w-10"

        if (isFolder) {
            return <Folder className={`${iconSize} text-blue-500`}/>
        }

        if (file) {
            switch (file.type) {
                case "pdf":
                    return <FileText className={`${iconSize} text-red-500`}/>
                case "docx":
                    return <FileText className={`${iconSize} text-blue-600`}/>
                case "xlsx":
                    return <FileSpreadsheet className={`${iconSize} text-green-600`}/>
                case "pptx":
                    return <FilePresentation className={`${iconSize} text-orange-500`}/>
                case "jpg":
                case "png":
                    return <FileImage className={`${iconSize} text-purple-500`}/>
                default:
                    return <File className={`${iconSize} text-gray-500`}/>
            }
        }
    }

    const handleClick = () => {
        if (isFolder) {
            onFolderClick(file.id, file.name);
        }

        if (!isFolder) {
            window.open(file.url, "_blank");
        }
    }

    if (view === "grid") {
        return (
            <div
                className="flex flex-col items-center rounded-lg border p-4 transition-colors hover:bg-accent/50 cursor-pointer"
                onClick={handleClick}
            >
                {getFileIcon()}
                <div className="mt-2 text-center">
                    <p className="font-medium line-clamp-1">{file.name}</p>
                </div>
            </div>
        )
    }

    return (
        <tr
            className="border-b transition-colors hover:bg-accent/50 cursor-pointer"
            onClick={handleClick}
        >
            <td className="flex items-center gap-2 px-4 py-3">
                {getFileIcon("small")}
                <span>{file.name}</span>
            </td>
            <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">
                {!isFolder ? file.type.toUpperCase() : ''}
            </td>
            <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">
                {!isFolder ? file.size : "-"}
            </td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{file.modified?.toString().split('T')[0]}</td>
        </tr>
    )
}

