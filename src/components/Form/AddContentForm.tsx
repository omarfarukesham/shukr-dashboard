import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AddContentFormProps, contentSchema, IContent } from '@/type/homeContent.type';
import { UploadToCloudinary } from '@/utils/uploadCloundaryImg';
import ReactQuill from 'react-quill';

const AddContentForm = ({
  onSubmit,
  category,
  arabicTextField = false,
  refField = false,
  defaultValues,
  requireImage = false
}: AddContentFormProps) => {
  // Form States
  const { register, handleSubmit, control, formState: { errors } } = useForm<IContent>({
    defaultValues,
    resolver: zodResolver(contentSchema)
  });
  
  // Upload States
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValues?.image ?? null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image Upload Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Image Upload Process
  const uploadImage = async () => {
    if (!image) {
      if (requireImage) {
        throw new Error("Image is required");
      }
      return null;
    }

    setUploading(true);
    try {
      const imageUrl = await UploadToCloudinary(image);
      return imageUrl;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Form Submit Handler

  const handleFormSubmit = async (formData: IContent) => {
    setIsSubmitting(true);
    try {
      let imageUrl = defaultValues?.image || null;
  
      // Only attempt upload if there's a new image
      if (image) {
        imageUrl = await uploadImage();
      } else if (requireImage && !imageUrl) {
        // If image is required but no image exists or uploaded
        throw new Error("Image is required");
      }
      
      await onSubmit({ 
        ...formData, 
        category: category as "duaOfTheDay" | "shukrInspiration" | "positiveThinking" | "jazakallahulKhair" | "shukrPosts" | "whatNew",
        image: imageUrl 
      });
    } catch (error) {
      console.error('Form submission failed:', error);
      throw error; 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6' >
        {/* Form Fields */}
        <div className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="text-lg font-medium">Title</label>
            <input {...register("title", { required: true })} placeholder="Title" className="w-full p-3 border border-gray-4 rounded-lg" />
            {errors.title && <p className="text-danger text-sm">{errors.title.message}</p>}
          </div>

          {/* Details Field */}
          <div>
            <label className="text-lg font-medium">Content</label>
            <Controller
              name="details"
              control={control}
              render={({ field }) => <ReactQuill {...field} theme="snow" className="h-60 rounded-lg p-3" />}
            />
            {errors.details && <p className="text-danger text-sm">{errors.details.message}</p>}
          </div>

          {/* Date Field */}
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

          {/* Status Field */}
          <div>
            <label className="text-lg font-medium">Status</label>
            <select {...register("status", { required: true })} className="w-full p-3 border border-gray-4 rounded-lg">
              <option className="bg-primary  text-white" value="published">Published</option>
              <option className="bg-primary  text-white" value="draft">Draft</option>
            </select>
            {errors.status && <p className="text-danger text-sm">{errors.status.message}</p>}
          </div>

          {/* Conditional Fields */}
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

          {/* Image Upload */}
          {requireImage && (
              <div>
                <label className="text-lg font-medium">Upload Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="w-full p-3 border border-gray-4 rounded-lg" 
                />
                {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
                {imagePreview && (
                  <div className="relative mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg" 
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute left-0 top-0 bg-danger text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className="w-full p-3 rounded bg-primary text-white disabled:opacity-50"
        >
          {(isSubmitting || uploading) ? 'Processing...' : 'Submit'}
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddContentForm;
