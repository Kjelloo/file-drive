"use client"

import type React from "react"
import {useRef, useState} from "react"
import {Upload} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useSearchParams} from "next/navigation"
import {Progress} from "@/components/ui/progress"
import axios, { AxiosProgressEvent } from "axios"
import {DriveFile} from "@/db"

interface UploadButtonProps {
    currentFolderId: string | null;
    onFileUploaded: (newFile: DriveFile) => void;
}

export function UploadButton({ currentFolderId, onFileUploaded }: UploadButtonProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();
    const pathParam = searchParams.get("path") || "";

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = ".png,.jpeg,.jpg,.gif,.pdf,.docx,.xlsx,.pptx,.txt,.zip,.rar,.7z";
            fileInputRef.current.click();
        }
    }

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', pathParam);
        formData.append('parentId', currentFolderId || '');

        try {
            const response = await axios.post('/api/drive/upload', formData, {
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        const progress = (progressEvent.loaded / progressEvent.total) * 100;
                        setUploadProgress(progress);
                    }
                }
            });
            
            if (response.data) {
                onFileUploaded(response.data);
            }
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)
        setUploadProgress(0)

        // Upload each file
        for (let i = 0; i < files.length; i++) {
            await uploadFile(files[i]);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <Button onClick={handleUploadClick} disabled={isUploading} className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4"/>
                    {isUploading ? "Uploading..." : "Upload"}
                </Button>
                <div className="mt-2 h-2 w-full">
                    {isUploading && (
                        <><Progress value={uploadProgress} className="w-full"/><p
                            className="text-sm text-muted-foreground mt-1">
                            {Math.round(uploadProgress)}% complete
                        </p></>
                    )}
                </div>
            </div>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                multiple
                disabled={isUploading}
            />
        </>
    )
}