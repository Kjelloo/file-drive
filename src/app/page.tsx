"use client"

import {useState, useEffect} from "react"
import {useRouter, useSearchParams} from "next/navigation"
import Link from "next/link"
import {FileExplorer} from "@/components/file-explorer"
import {UploadButton} from "@/components/upload-button"
import {DriveFile, DriveFolder} from "@/db";

type DriveItem = DriveFile | DriveFolder;

export default function Home() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathParam = searchParams.get("path") || ""
    const currentPath = pathParam ? pathParam.split("/") : []

    const [items, setItems] = useState<DriveItem[]>([])
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    useEffect(() => {
        const fetchDriveItems = async () => {
            try {
                const response = await fetch(`/api/drive?path=${pathParam || ''}`);
                const data = await response.json();
                
                if (response.ok) {
                    setItems([...data.folders, ...data.files]);
                } else {
                    console.error('Failed to fetch drive items:', data.error);
                }
            } catch (error) {
                console.error('Failed to fetch drive items:', error);
            }
        };
        fetchDriveItems();
    }, [pathParam]);

    const navigateToFolder = (folderId: string, folderName: string) => {
        const newPath = [...currentPath, folderName]
        router.push(`/?path=${newPath.join("/")}`);
    }

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
                        <UploadButton/>
                    </div>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        {items.length} {items.length === 1 ? "item" : "items"}
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

                <FileExplorer files={items}
                              viewMode={viewMode}
                              onFolderClick={navigateToFolder}/>
            </div>
        </>
    )
}