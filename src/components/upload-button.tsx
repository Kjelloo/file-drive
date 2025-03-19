"use client"

import type React from "react"
import {useRef, useState, useEffect} from "react"
import {Upload} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useSearchParams} from "next/navigation"
import {Progress} from "@/components/ui/progress"
import axios, { AxiosProgressEvent } from "axios"
import {DriveFile, DriveFolder} from "@/db"

export function UploadButton() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();
    const pathParam = searchParams.get("path") || "";
    const currentPath = pathParam ? pathParam.split("/") : [];
    const [items, setItems] = useState<(DriveFile | DriveFolder)[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`/api/drive?path=${pathParam || ''}`);
                const data = await response.json();
                if (response.ok) {
                    setItems([...data.folders, ...data.files]);
                }
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        };
        fetchItems();
    }, [pathParam]);

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
        
        // Find the current folder's ID from the items array
        const currentFolder = items.find(item => 
            !('url' in item) && item.name === currentPath[currentPath.length - 1]
        );
        formData.append('parentId', currentFolder?.id || '');

        try {
            await axios.post('/api/drive/upload', formData, {
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        const progress = (progressEvent.loaded / progressEvent.total) * 100;
                        setUploadProgress(progress);
                    }
                }
            });
            window.location.reload();
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
            <Button onClick={handleUploadClick} disabled={isUploading} className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4"/>
                {isUploading ? "Uploading..." : "Upload"}
            </Button>
            {isUploading && (
                <div className="mt-2 w-full">
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-1">
                        {Math.round(uploadProgress)}% complete
                    </p>
                </div>
            )}
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