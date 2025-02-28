import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowBigLeft } from "lucide-react";
import { useAddContentItemMutation } from "@/feature/homescreen/homeSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CLOUDINARY_UPLOAD_PRESET = "ecom_preset";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbtskylxt/image/upload";

interface IShukrPost {
  title: string;
  details: string;
  image: string;
  category: string;
  isShowing: boolean;
  publishDate: string;
}

const defaultValues: Omit<IShukrPost, "image"> = {
  title: "",
  details: "",
  isShowing: false,
  category: "shukrPosts",
  publishDate: new Date().toISOString(),
};

export default function ShukrPostPage() {
  const navigate = useNavigate();
  const [addContentItem] = useAddContentItemMutation();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  //for cloundinary upload ........ 
  // const CLOUDINARY_UPLOAD_PRESET = "ecom_preset";
  // const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbtskylxt/image/upload";

  const { register, handleSubmit, control, formState: { errors } } = useForm<Omit<IShukrPost, "image">>({ defaultValues });

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
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

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

  const onFormSubmit: SubmitHandler<Omit<IShukrPost, "image">> = async (data) => {
    console.log(data);
    try {
      if (!image) {
        alert("Please select an image first!");
        return;
      }

      const uploadedImageUrl = await uploadImage();
      if (!uploadedImageUrl) return;

      const postData : IShukrPost = {
          ...data,
          image: uploadedImageUrl,
      
      };
        // const productData: TProduct = {
        //       ...data,
        //       image: uploadedImageUrl
        //     };

      console.log(postData);
     await addContentItem({ data: postData }).unwrap();
      navigate("/shukr-post");
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to add post. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Add Shukr Post</h1>
        <button
          onClick={() => navigate("/shukr-post")}
          className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-1 flex items-center"
        >
          <ArrowBigLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Title */}
        <div>
          <label className=" text-lg  font-medium">Title</label>
          <input {...register("title", { required: "Title is required" })} className="w-full p-2 border rounded-lg" />
          {errors.title && <p className="text-danger text-sm">{errors.title.message}</p>}
        </div>

        {/* Details */}
        {/* <div>
          <label className="block text-sm font-medium">Details</label>
          <textarea {...register("details", { required: "Details are required" })} className="w-full p-2 border rounded-lg" />
          {errors.details && <p className="text-danger text-sm">{errors.details.message}</p>}
        </div> */}

        {/* Content (Rich Text Editor) */}
        <div className="">
          <label className=" text-lg font-medium">Content</label>
         <div className="">
         <Controller
            name="details"
            control={control}
            render={({ field }) => <ReactQuill {...field} theme="snow" className="h-[400px] rounded  p-2" />}
          />
         </div>
        </div>

        {/* Publish Date (Date Picker) */}
        <div className="pt-10">
            <label className="text-lg font-medium">Publish Date</label>
           <div className="mt-5">
           
              <Controller
                  name="publishDate"
                  control={control}
                  defaultValue={new Date().toISOString()}
                  render={({ field }) => (
                  <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date: Date) => field.onChange(date ? date.toISOString() : null)} 
                      className="lg:w-full p-2 border rounded-lg"
                      dateFormat="yyyy-MM-dd"
                      isClearable
                      placeholderText="Select a date"
                  />
                  )}
              />
           </div>
        </div>

        {/* Is Showing (Dropdown) */}
        <div>
          <label className="text-lg font-medium">Is Showing</label>
          <select {...register("isShowing")} className="w-full p-2 border rounded-lg">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Upload Image */}
        <div>
          <label className="text-lg font-medium">Upload Image</label>
          <input type="file" accept="image/png, image/jpeg" className="w-full p-2 border rounded-lg" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
          {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {imageUrl && <img src={imageUrl} alt="Uploaded Preview" className="mt-2 h-24 w-24 object-cover rounded-lg" />}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className={`w-1/2 p-2 rounded-lg text-white ${uploading ? "bg-gray-400" : "bg-primary hover:bg-secondary"}`} disabled={uploading}>
            {uploading ? "Processing..." : "Submit"}
          </button>
        </div>
      </form>

    </div>
  );
}
