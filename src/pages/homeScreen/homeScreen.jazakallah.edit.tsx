import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface Post {
  title: string;
  details: string;
  isShowing: boolean;
  category: string;
  status: string;
  publishDate: string;
  image: string;
}
import { useGetContentItemQuery, useUpdateContentItemMutation } from "@/feature/homescreen/homeSlice";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

// const CLOUDINARY_UPLOAD_PRESET = "ecom_preset";
// const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbtskylxt/image/upload";
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;


const JazakallahEditPage = () => {
    const navigation = useNavigate()
    const {id} = useParams()
    const {data: PTData, isLoading, isSuccess}=  useGetContentItemQuery({ id: id as string });
    const [updateContentItem] = useUpdateContentItemMutation();
    const [uploading, setUploading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
  
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<Post>();
  
    // Cast the fetched data to the Post type
    const post = PTData?.data as Post;
  
    // Reset the form when the post data is available
    useEffect(() => {
      if (isSuccess && post) {
        reset({
          isShowing: post.isShowing,
          category: post.category,
          status: post.status,
          publishDate: post.publishDate ? new Date(post.publishDate).toISOString() : '',
          image: post.image,
        });
        setImageUrl(post.image);
      }
    }, [isSuccess, post, reset]);
  
    const uploadImage = async () => {
      if (!image) return imageUrl;
  
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
  
    const onSubmit: SubmitHandler<Post> = async (data) => {
      try {
        const uploadedImageUrl = await uploadImage();
        if (!uploadedImageUrl) return;
  
        const updatedPost = { ...data, image: uploadedImageUrl };
        await updateContentItem({ id, data: updatedPost }).unwrap();
        toast.success('Post updated successfully ...')
        navigation("/jazakallah");
      } catch (error) {
        console.error("Update Error:", error);
        alert("Failed to update post. Please try again.");
      }
    };
  
    // Show a loading state while the data is being fetched
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    // Only render the form if the post data is available
    if (!post) {
      return <div>No data found for this post.</div>;
    }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className='text-xl font-bold'>Edit Jazakallah Post</h1>
        <button onClick={() => navigation('/jazakalla')} className="bg-primary hover:bg-secondary text-white  rounded text-xs py-1 px-2">Back</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-6 bg-white p-5 rounded-lg">
        <div className="">
          <label className="text-lg font-medium pr-4">Publish Date</label>
        <Controller
            name="publishDate"
            control={control}
            render={({ field }) => (
                <DatePicker 
                selected={field.value ? new Date(field.value) : null} // Prevents invalid date
                onChange={(date: Date) => field.onChange(date ? date.toISOString() : '')}
                className="w-full p-2 border border-gray-4 rounded-lg"
                />
            )}
            />
          {errors.publishDate && <p className="text-danger text-sm">{String(errors.publishDate.message)}</p>}
        </div>
        
        <div>
          <label className="text-md font-medium">Status</label>
          <select {...register("status")} className="w-full p-2 border rounded">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          {errors.status && <p className="text-danger text-sm">{String(errors.status.message)}</p>}
        </div>
        
        <div>
          <label className="text-lg font-medium">Upload Image</label>
          <input type="file" accept="image/png, image/jpeg" className="w-full p-2 border rounded-lg" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
          {uploading && <p className="text-danger text-sm">Uploading...</p>}
          {imageUrl && <img src={imageUrl} alt="Uploaded Preview" className="mt-2 h-32 w-32 object-fit border border-gray-2 p-1 rounded-lg" />}
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-center space-x-2">
         
          <button type="submit" className={`w-1/2 p-2 rounded-lg text-white ${uploading ? "bg-gray-4" : "bg-primary hover:bg-secondary"}`} disabled={uploading}>
            {uploading ? "Processing..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};


export default JazakallahEditPage;