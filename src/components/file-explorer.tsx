import {FileItem} from "./file-item"
import {DriveFile} from "@/db";

interface FileExplorerProps {
    files: DriveFile[]
    viewMode: "grid" | "list"
    onFolderClick: (id: string, name: string) => void
}

export function FileExplorer({files, viewMode, onFolderClick}: FileExplorerProps) {
    if (files.length === 0) {
        return (
            <div
                className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
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