"use client"

import { File, FileText, FileImage, FileSpreadsheet, FileIcon as FilePresentation, Folder } from "lucide-react"

interface FileItemProps {
  file: {
    id: string
    name: string
    type: string
    size?: string
    modified: string
    items?: unknown[]
  }
  view: "grid" | "list"
  onFolderClick: (id: string, name: string) => void
}

export function FileItem({ file, view, onFolderClick }: FileItemProps) {
  const getFileIcon = (size: "small" | "large" = "large") => {
    const iconSize = size === "small" ? "h-5 w-5" : "h-10 w-10"

    switch (file.type) {
      case "folder":
        return <Folder className={`${iconSize} text-blue-500`} />
      case "pdf":
        return <FileText className={`${iconSize} text-red-500`} />
      case "docx":
        return <FileText className={`${iconSize} text-blue-600`} />
      case "xlsx":
        return <FileSpreadsheet className={`${iconSize} text-green-600`} />
      case "pptx":
        return <FilePresentation className={`${iconSize} text-orange-500`} />
      case "jpg":
      case "png":
        return <FileImage className={`${iconSize} text-purple-500`} />
      default:
        return <File className={`${iconSize} text-gray-500`} />
    }
  }

  const handleClick = () => {
    if (file.type === "folder") {
      onFolderClick(file.id, file.name)
    }
  }

  if (view === "grid") {
    return (
      <div
        className={`flex flex-col items-center rounded-lg border p-4 transition-colors hover:bg-accent/50 ${
          file.type === "folder" ? "cursor-pointer" : ""
        }`}
        onClick={handleClick}
      >
        {getFileIcon()}
        <div className="mt-2 text-center">
          <p className="font-medium line-clamp-1">{file.name}</p>
          <p className="text-xs text-muted-foreground">{file.modified}</p>
        </div>
      </div>
    )
  }

  return (
    <tr
      className={`border-b transition-colors hover:bg-accent/50 ${file.type === "folder" ? "cursor-pointer" : ""}`}
      onClick={handleClick}
    >
      <td className="flex items-center gap-2 px-4 py-3">
        {getFileIcon("small")}
        <span>{file.name}</span>
      </td>
      <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">{file.type.toUpperCase()}</td>
      <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">{file.size || "-"}</td>
      <td className="px-4 py-3 text-sm text-muted-foreground">{file.modified}</td>
    </tr>
  )
}

