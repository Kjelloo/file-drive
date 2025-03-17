"use client"

import type React from "react"
import {useRef, useState} from "react"
import {Upload} from "lucide-react"
import {Button} from "@/components/ui/button"

export function UploadButton() {
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        // Simulate file upload
        setIsUploading(true)
        setTimeout(() => {
            setIsUploading(false)
            // Reset the input
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }, 2000)
    }

    return (
        <>
            <Button onClick={handleUploadClick} disabled={isUploading} className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4"/>
                {isUploading ? "Uploading..." : "Upload"}
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple/>
        </>
    )
}

