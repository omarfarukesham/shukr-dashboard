import { z } from "zod";

export type IContent = {
    title?: "",
    details?: "",
    arabicText?: "",
    ref?: "",
    isShowing: false,
    status: "published | draft",
    category?: "duaOfTheDay" | "shukrInspiration" | "positiveThinking" | "jazakallahulKhair" | "shukrPosts" | "whatNew" | "natureImg",
    publishDate: string,
    image?: string

  };

  export type HomeContentResponse = {
    data: {
      data: IContent[];
      message: string;
      success: boolean;
    };
  };


  export const contentSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').optional(),
    details: z.string().min(10, 'Details must be at least 10 characters').optional(),
    arabicText: z.string().min(5, 'Arabic text must be at least 5 characters').optional(),
    ref: z.string().optional(),
    isShowing: z.boolean(),
    publishDate: z.string(),
    status: z.string()
  });


  export interface AddContentFormProps {
    onSubmit: (data: IContent, imageUrl?: string) => void;
    category?: string;
    arabicText?: boolean;
    arabicTextField?: boolean;
    refField?: boolean;
    ref?: boolean;
    requireImage?: boolean; 
    status?: 'published' | 'draft';
    defaultValues?: IContent;
  }