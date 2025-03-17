"use client"

import type React from "react"
import {useState} from "react"
import {FolderPlus} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

interface FolderActionsProps {
    onCreateFolder: (name: string) => void
}

export function FolderActions({onCreateFolder}: FolderActionsProps) {
    const [folderName, setFolderName] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (folderName.trim()) {
            onCreateFolder(folderName.trim())
            setFolderName("")
            setIsOpen(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="outline">
                    <FolderPlus className="mr-2 h-4 w-4"/>
                    New Folder
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create new folder</DialogTitle>
                        <DialogDescription>Enter a name for your new folder.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Folder name</Label>
                            <Input
                                id="name"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                                placeholder="Untitled folder"
                                autoFocus
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

