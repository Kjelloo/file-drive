import {FileItem} from "./file-item"
import {DriveFile, DriveFolder} from "@/db";

type FileExplorerProps = {
    files: (DriveFile | DriveFolder)[];
    viewMode: "grid" | "list";
    onFolderClick: (id: string, name: string) => void;
    isLoading?: boolean;
}

function GridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="flex flex-col items-center rounded-lg border p-4 animate-pulse">
                    <div className="h-10 w-10 bg-muted rounded-full mb-2"/>
                    <div className="h-4 w-24 bg-muted rounded"/>
                </div>
            ))}
        </div>
    )
}

function ListSkeleton() {
    return (
        <div className="overflow-hidden rounded-lg border">
            <div className="w-full">
                <div className="border-b bg-muted/50">
                    <div className="grid grid-cols-4 gap-4 px-4 py-3">
                        <div className="h-4 bg-muted rounded"/>
                        <div className="h-4 bg-muted rounded"/>
                        <div className="h-4 bg-muted rounded"/>
                        <div className="h-4 bg-muted rounded"/>
                    </div>
                </div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="grid grid-cols-4 gap-4 px-4 py-3 border-b">
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-muted rounded"/>
                            <div className="h-4 w-24 bg-muted rounded"/>
                        </div>
                        <div className="h-4 w-16 bg-muted rounded"/>
                        <div className="h-4 w-16 bg-muted rounded"/>
                        <div className="h-4 w-32 bg-muted rounded"/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function FileExplorer({files, viewMode, onFolderClick, isLoading = false}: FileExplorerProps) {
    if (isLoading) {
        return viewMode === "grid" ? <GridSkeleton/> : <ListSkeleton/>;
    }

    if (files.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <p className="text-lg font-medium">No files or folders</p>
                <p className="text-sm text-muted-foreground">Upload files or create a new folder to get started</p>
            </div>
        )
    }

    return (
        <div className={viewMode === "grid" ? "grid-view" : "list-view"}>
            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {files.map((file) => (
                        <FileItem key={file.id} file={file} view="grid" onFolderClick={onFolderClick}/>
                    ))}
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b bg-muted/50">
                            <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">Type</th>
                            <th className="hidden px-4 py-3 text-left text-sm font-medium md:table-cell">Size</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Modified</th>
                        </tr>
                        </thead>
                        <tbody>
                        {files.map((file) => (
                            <FileItem key={file.id} file={file} view="list" onFolderClick={onFolderClick}/>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}