import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IContent } from "@/type/homeContent.type";

const CLOUDINARY_UPLOAD_PRESET = "ecom_preset";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbtskylxt/image/upload";

const contentSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  details: z.string().min(10, 'Details must be at least 10 characters'),
  arabicText: z.string().min(5, 'Arabic text must be at least 5 characters'),
  ref: z.string().optional(),
  isShowing: z.boolean(),
  publishDate: z.string(),
  status: z.string()
});


interface AddContentFormProps {
  onSubmit: (data: IContent, imageUrl?: string) => void;
  category?: string;
  arabicText?: boolean;
  arabicTextField?: boolean;
  refField?: boolean;
  ref?: boolean;
  requireImage?: boolean; 
  status?: 'published' | 'draft';
  defaultValues?: Omit<IContent, "image">;
}

const AddContentForm = ({ onSubmit, arabicTextField = false, refField = false, defaultValues, requireImage = false }: AddContentFormProps) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Omit<IContent, "image">>({defaultValues, resolver: zodResolver(contentSchema)});
  const [image, setImage] = useState<File | null>(null);
  const [, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image first!");
      return null;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setImageUrl(data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed! Please try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFormSubmit: SubmitHandler<Omit<IContent, "image">> = async (data) => {
    setIsSubmitting(true);
    try {
      let uploadedImageUrl = null;
    
      if (requireImage) {
        uploadedImageUrl = await uploadImage();
        if (!uploadedImageUrl && requireImage) {
          alert("Image upload is required!");
          return;
        }
      }

      await onSubmit({ ...data, image: uploadedImageUrl }, uploadedImageUrl);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
       <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
    {/* Title */}
    <div>
      <label className="text-lg font-medium">Title</label>
      <input {...register("title", { required: true })} placeholder="Title" className="w-full p-3 border border-gray-4 rounded-lg" />
      {errors.title && <p className="text-danger text-sm">{errors.title.message}</p>}
    </div>

    {/* status */}
    <div>
      <label className="text-lg font-medium">Status</label>
      <select {...register("status", { required: true })} className="w-full p-3 border border-gray-4 rounded-lg">
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>
      {errors.status && <p className="text-danger text-sm">{errors.status.message}</p>}
    </div>


    {/* Content (Rich Text Editor) */}
    <div>
      <label className="text-lg font-medium">Content</label>
      <Controller
        name="details"
        control={control}
        render={({ field }) => <ReactQuill {...field} theme="snow" className="h-60 rounded-lg p-3" />}
      />
      {errors.details && <p className="text-danger text-sm">{errors.details.message}</p>}
    </div>

    {/* Publish Date (Date Picker) */}
    <div className="pt-10">
      <label className="text-lg font-medium pr-4">Publish Date</label>
      <Controller
        name="publishDate"
        control={control}
        render={({ field }) => (
          <DatePicker selected={new Date(field.value)} onChange={(date: Date) => field.onChange(date?.toISOString())} 
            className="w-full p-3 border border-gray-4 rounded-lg" />
        )}
      />
       {errors.publishDate && <p className="text-danger text-sm">{errors.publishDate.message}</p>}
    </div>

    {/* Conditionally render image upload */}
    {requireImage && (
      <div>
        <label className="text-lg font-medium">Upload Image</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} 
          className="w-full p-3 border border-gray-4 rounded-lg" />
        {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
      </div>
    )}

    {/* Optional Fields */}
    {arabicTextField && (
      <div>
        <label className="text-lg font-medium">Arabic Text</label>
        <textarea {...register("arabicText")} placeholder="Arabic Text" className="w-full p-3 border border-gray-4 rounded-lg" />
        {errors.arabicText && <p className="text-danger text-sm">{errors.arabicText.message}</p>}
      </div>
    )}
    {refField && (
      <div>
        <label className="text-lg font-medium">Ref</label>
        <input {...register("ref")} placeholder="Ref" className="w-full p-3 border border-gray-4 rounded-lg" />
        {errors.ref && <p className="text-danger text-sm">{errors.ref.message}</p>}
      </div>
    )}

    {/* Submit Button */}
    <div className="flex justify-center">
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-1/2 p-3 rounded-lg text-white bg-primary hover:bg-secondary disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  </form>
    </div>
   
  );
};

export default AddContentForm;
