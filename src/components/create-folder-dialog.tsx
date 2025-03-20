import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateFolderDialogProps {
    currentFolderId: string | null;
    currentPath: string[];
    onFolderCreated: (newFolder: any) => void;
}

export function CreateFolderDialog({ currentFolderId, currentPath, onFolderCreated }: CreateFolderDialogProps) {
    const [open, setOpen] = useState(false)
    const [folderName, setFolderName] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleCreateFolder = async (folderName: string) => {
        const formData = new FormData();
        formData.append('folderName', folderName);

        if (currentFolderId) {
            formData.append('parentId', currentFolderId);
        }

        formData.append('path', currentPath.join("/"));

        try {
            const response = await fetch('/api/drive/folder', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                onFolderCreated(data);
                console.log('New folder created:', data);
            } else {
                console.error('Failed to create folder:', data.error);
                throw new Error(data.error || 'Failed to create folder');
            }
        } catch (error) {
            console.error('Error creating folder:', error);
            throw error;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!folderName.trim()) return

        setIsLoading(true)
        try {
            await handleCreateFolder(folderName)
            setFolderName("")
            setOpen(false)
        } catch (error) {
            console.error("Failed to create folder:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create folder</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create new folder</DialogTitle>
                        <DialogDescription>
                            Enter a name for your new folder.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                                className="col-span-3"
                                placeholder="Enter folder name"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading || !folderName.trim()}>
                            {isLoading ? "Creating..." : "Create folder"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
} 