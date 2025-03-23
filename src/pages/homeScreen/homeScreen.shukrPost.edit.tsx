import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowBigLeft } from "lucide-react";
import { useGetContentItemQuery, useUpdateContentItemMutation } from "@/feature/homescreen/homeSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Post {
  title: string;
  details: string;
  isShowing: boolean;
  category: string;
  status: string;
  publishDate: string;
  image: string;
}

// const CLOUDINARY_UPLOAD_PRESET = "ecom_preset";
// const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbtskylxt/image/upload";
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

const ShukrPostEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the content item
  const { data: post1, isLoading, isSuccess } = useGetContentItemQuery({
    id: id as string,
  });

  const [updateContentItem] = useUpdateContentItemMutation();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const { register, handleSubmit, control, reset } = useForm<Post>();

  // Cast the fetched data to the Post type
  const post = post1?.data as Post;

  // Reset the form when the post data is available
  useEffect(() => {
    if (isSuccess && post) {
      reset({
        title: post.title || "",
        details: post.details,
        isShowing: post.isShowing,
        category: post.category,
        status: post.status,
        publishDate: post.publishDate,
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

  const onFormSubmit: SubmitHandler<Post> = async (data) => {
    try {
      const uploadedImageUrl = await uploadImage();
      if (!uploadedImageUrl) return;

      const updatedPost = { ...data, image: uploadedImageUrl };
      await updateContentItem({ id, data: updatedPost }).unwrap();
      navigate("/shukr-post");
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Edit Shukr Post</h1>
        <button onClick={() => navigate("/shukr-post")} className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-1 flex items-center">
          <ArrowBigLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="text-lg font-medium">Title</label>
          <input {...register("title", { required: "Title is required" })} className="w-full p-2 border rounded-lg" />
        </div>

        <div>
          <label className="text-lg font-medium">Content</label>
          <Controller name="details" control={control} render={({ field }) => <ReactQuill {...field} theme="snow" className="h-[400px] rounded p-2" />} />
        </div>

        <div className="pt-10">
          <label className="text-lg font-medium">Publish Date</label>
          <Controller name="publishDate" control={control} render={({ field }) => (
            <DatePicker selected={field.value ? new Date(field.value) : null} onChange={(date: Date) => field.onChange(date ? date.toISOString() : null)} className="w-full p-2 border rounded-lg" dateFormat="yyyy-MM-dd" isClearable placeholderText="Select a date" />
          )} />
        </div>

        <div>
          <label className="text-lg font-medium">Status</label>
          <select {...register("status", { required: true })} className="w-full p-3 border rounded-lg">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div>
          <label className="text-lg font-medium">Upload Image</label>
          <input type="file" accept="image/png, image/jpeg" className="w-full p-2 border rounded-lg" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
          {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {imageUrl && <img src={imageUrl} alt="Uploaded Preview" className="mt-2 h-24 w-24 object-cover rounded-lg" />}
        </div>

        <div className="flex justify-center">
          <button type="submit" className={`w-1/2 p-2 rounded-lg text-white ${uploading ? "bg-gray-400" : "bg-primary hover:bg-secondary"}`} disabled={uploading}>
            {uploading ? "Processing..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShukrPostEditPage;