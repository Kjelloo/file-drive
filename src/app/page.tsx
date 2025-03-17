"use client"

import {useState} from "react"
import {useRouter, useSearchParams} from "next/navigation"
import Link from "next/link"
import {FileExplorer} from "@/components/file-explorer"
import {UploadButton} from "@/components/upload-button"
import {FolderActions} from "@/components/folder-actions"

// Mock data for files and folders
const initialFiles = [
    {
        id: "1",
        name: "Documents",
        type: "folder",
        items: [
            {id: "1-1", name: "Resume.pdf", type: "pdf", size: "2.5 MB", modified: "Mar 10, 2024"},
            {id: "1-2", name: "Project Plan.docx", type: "docx", size: "1.2 MB", modified: "Mar 12, 2024"},
        ],
        modified: "Mar 12, 2024",
    },
    {
        id: "2",
        name: "Images",
        type: "folder",
        items: [
            {id: "2-1", name: "Vacation.jpg", type: "jpg", size: "3.8 MB", modified: "Feb 28, 2024"},
            {id: "2-2", name: "Profile.png", type: "png", size: "1.5 MB", modified: "Mar 5, 2024"},
        ],
        modified: "Mar 5, 2024",
    },
    {id: "3", name: "Budget.xlsx", type: "xlsx", size: "1.8 MB", modified: "Mar 8, 2024"},
    {id: "4", name: "Presentation.pptx", type: "pptx", size: "4.2 MB", modified: "Mar 15, 2024"},
    {id: "5", name: "Notes.txt", type: "txt", size: "12 KB", modified: "Mar 16, 2024"},
]

export default function Home() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathParam = searchParams.get("path") || ""
    const currentPath = pathParam ? pathParam.split("/") : []

    const [files, setFiles] = useState(initialFiles)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    // Function to navigate into a folder
    const navigateToFolder = (folderId: string, folderName: string) => {
        const newPath = [...currentPath, folderName]
        router.push(`/?path=${newPath.join("/")}`)
    }

    // Helper function to find a folder in the nested structure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findFolderByPath = (path: string[], fileList: any[]): any => {
        if (path.length === 0) return {items: fileList}

        let currentFiles = fileList
        let currentFolder = null

        for (let i = 0; i < path.length; i++) {
            const folderName = path[i]
            currentFolder = currentFiles.find((file) => file.type === "folder" && file.name === folderName)

            if (!currentFolder || !currentFolder.items) {
                return null
            }

            if (i === path.length - 1) {
                return currentFolder
            }

            currentFiles = currentFolder.items
        }

        return null
    }

    // Function to create a new folder in the current location
    const createFolder = (name: string) => {
        const newFolder = {
            id: `folder-${Date.now()}`,
            name,
            type: "folder",
            items: [],
            modified: new Date().toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"}),
        }

        // Create a deep copy of the files array
        const newFiles = JSON.parse(JSON.stringify(files))

        if (currentPath.length === 0) {
            // Add to root level
            setFiles([...newFiles, newFolder])
        } else {
            // Find the current folder and add the new folder to its items
            const currentFolder = findFolderByPath(currentPath, newFiles)

            if (currentFolder && currentFolder.items) {
                currentFolder.items.push(newFolder)
                setFiles(newFiles)
            }
        }
    }

    // Get current files to display based on path
    const getCurrentFiles = () => {
        if (currentPath.length === 0) return files

        const currentFolder = findFolderByPath(currentPath, files)
        return currentFolder && currentFolder.items ? currentFolder.items : []
    }

    const displayedFiles = getCurrentFiles()

    // Build breadcrumb navigation
    const renderBreadcrumbs = () => {
        if (currentPath.length === 0) {
            return <h1 className="text-2xl font-bold">Drive</h1>
        }

        return (
            <div>
                <h1 className="text-2xl font-bold">{currentPath[currentPath.length - 1]}</h1>
                <div className="mt-1 flex items-center text-sm">
                    <Link href="/" className="text-blue-500 hover:underline">
                        My Drive
                    </Link>
                    {currentPath.slice(0, -1).map((folder, index) => {
                        const pathToHere = currentPath.slice(0, index + 1).join("/")
                        return (
                            <span key={index}>
                <span className="mx-1 text-muted-foreground">/</span>
                <Link href={`/?path=${pathToHere}`} className="text-blue-500 hover:underline">
                  {folder}
                </Link>
              </span>
                        )
                    })}
                    <span className="mx-1 text-muted-foreground">/</span>
                    <span className="text-muted-foreground">{currentPath[currentPath.length - 1]}</span>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="p-6">
                <div className="mb-6 h-12 flex items-center justify-between">
                    <div>
                        {renderBreadcrumbs()}
                    </div>
                    <div className="flex gap-2">
                        <FolderActions onCreateFolder={createFolder}/>
                        <UploadButton/>
                    </div>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        {displayedFiles.length} {displayedFiles.length === 1 ? "item" : "items"}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`rounded-md p-2 cursor-pointer ${viewMode === "grid" ? "bg-accent" : "hover:bg-muted"}`}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`rounded-md p-2 cursor-pointer ${viewMode === "list" ? "bg-accent" : "hover:bg-muted"}`}
                        >
                            List
                        </button>
                    </div>
                </div>

                <FileExplorer files={displayedFiles} viewMode={viewMode} onFolderClick={navigateToFolder}/>
            </div>
        </>
    )
}