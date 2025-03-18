export type FileType = 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'txt' | 'jpg' | 'png';

export interface File {
    id: string;
    name: string;
    type: FileType;
    size: string;
    modified: Date;
    userId: string;
    path: string;
    parentId?: string;
    createdAt: Date;
    updatedAt: Date;
} 