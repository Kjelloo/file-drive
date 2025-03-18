export interface Folder {
    id: string;
    name: string;
    modified: Date;
    userId: string;
    path: string;
    parentId?: string;
    createdAt: Date;
    updatedAt: Date;
} 