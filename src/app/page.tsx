"use client"

import {useState, useEffect} from "react"
import {useRouter, useSearchParams} from "next/navigation"
import Link from "next/link"
import {FileExplorer} from "@/components/file-explorer"
import {UploadButton} from "@/components/upload-button"
import {DriveFile, DriveFolder} from "@/db";
import {Button} from "@/components/ui/button";

type DriveItem = DriveFile | DriveFolder;

export default function Home() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathParam = searchParams.get("path") || ""
    const currentPath = pathParam ? pathParam.split("/") : []

    const [items, setItems] = useState<DriveItem[]>([])
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchDriveItems = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/drive?path=${pathParam || ''}`);
                const data = await response.json();
                
                if (response.ok) {
                    setItems([...data.folders, ...data.files]);
                    // Set current folder ID if we're in a folder
                    if (currentPath.length > 0) {
                        // Find the current folder by traversing the path
                        let currentFolder = null;
                        let currentPathSoFar = '';
                        
                        for (const folderName of currentPath) {
                            currentPathSoFar += (currentPathSoFar ? '/' : '') + folderName;
                            const folder = data.folders.find((f: DriveFolder) => 
                                f.name === folderName && f.path === currentPathSoFar
                            );
                            if (folder) {
                                currentFolder = folder;
                            }
                        }
                        
                        if (currentFolder) {
                            console.log('Setting current folder ID:', currentFolder.id);
                            setCurrentFolderId(currentFolder.id);
                        }
                    } else {
                        setCurrentFolderId(null);
                    }
                } else {
                    console.error('Failed to fetch drive items:', data.error);
                }
            } catch (error) {
                console.error('Failed to fetch drive items:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDriveItems();
    }, [pathParam]);

    const navigateToFolder = (folderId: string, folderName: string) => {
        console.log('Navigating to folder:', folderId);
        setCurrentFolderId(folderId);
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
                    <Link 
                        href="/" 
                        className="text-blue-500 hover:underline"
                        onClick={() => setCurrentFolderId(null)}
                    >
                        My Drive
                    </Link>
                    {currentPath.slice(0, -1).map((folder, index) => {
                        const pathToHere = currentPath.slice(0, index + 1).join("/")
                        const folderItem = items.find(item => 
                            !('url' in item) && 
                            item.name === folder && 
                            item.path === pathToHere
                        ) as DriveFolder;
                        return (
                            <span key={index}>
                                <span className="mx-1 text-muted-foreground">/</span>
                                <Link 
                                    href={`/?path=${pathToHere}`} 
                                    className="text-blue-500 hover:underline"
                                    onClick={() => {
                                        console.log('Setting folder ID from breadcrumb:', folderItem?.id);
                                        setCurrentFolderId(folderItem?.id || null);
                                    }}
                                >
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
                    <div className="flex items-center">
                        <div className="flex flex-col px-2">
                            <Button className="cursor-pointer" variant="outline">Create folder</Button>
                            <p className="h-4 text-muted-foreground"></p>
                        </div>
                        <div className="flex gap-2">
                            <UploadButton currentFolderId={currentFolderId}/>
                        </div>
                    </div>
                </div>

                <div className="mb-4 bg flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        {items.length} {items.length === 1 ? "item" : "items"}
                    </div>
                    <div className="flex outline-gray-200 outline-1 rounded-md">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`rounded-l-md px-2 py-1 cursor-pointer ${viewMode === "grid" ? "bg-accent" : "hover:bg-muted"}`}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`rounded-r-md px-2 py-1 cursor-pointer ${viewMode === "list" ? "bg-accent" : "hover:bg-muted"}`}
                        >
                            List
                        </button>
                    </div>
                </div>

                <FileExplorer 
                    files={items}
                    viewMode={viewMode}
                    onFolderClick={navigateToFolder}
                    isLoading={isLoading}
                />
            </div>
        </>
    )
}