import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddModal from "./AddModal";
import { useAddContentItemMutation } from "@/feature/homescreen/homeSlice";
import toast from "react-hot-toast";

const CLOUDINARY_UPLOAD_PRESET = "ecom_preset";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbtskylxt/image/upload";

interface IPositiveThiniking {
  image: string;
  category?: string;
  isShowing?: boolean;
  publishDate: string;
  status: string;
}

const defaultValues: Omit<IPositiveThiniking, "image"> = {
  isShowing: false,
  // category: "positiveThinking",
  status: "published" as "published | draft",
  publishDate: new Date().toISOString(),
};


const AddModalForm = ({ isOpen, onClose, category}) => {
  const [addContentItem] = useAddContentItemMutation();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<Omit<IPositiveThiniking, "image">>({ defaultValues });
 
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
 
   const onFormSubmit: SubmitHandler<Omit<IPositiveThiniking, "image">> = async (data) => {
     try {
       if (!image) {
         alert("Please select an image first!");
         return;
       }
 
       const uploadedImageUrl = await uploadImage();
       if (!uploadedImageUrl) return;
 
       const postData : IPositiveThiniking = {
           ...data,
           category: category,
           image: uploadedImageUrl,
       };
 
       // console.log(postData);
      await addContentItem({ data: postData }).unwrap();
       toast.success('Positive thinking card successfully added...')
       onClose();

     } catch (error) {
       console.error("Submission Error:", error);
       alert("Failed to add post. Please try again.");
     }
   };

  return (
    <AddModal isOpen={isOpen} onClose={onClose} title="Add Content">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
       <div className="">
                  <label className="text-lg font-medium pr-4">Publish Date</label>
                  <Controller
                    name="publishDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker selected={new Date(field.value)} onChange={(date: Date) => field.onChange(date?.toISOString())} 
                        className="w-full p-2 border border-gray-4 rounded-lg" />
                    )}
                  />
                  {errors.publishDate && <p className="text-danger text-sm">{errors.publishDate.message}</p>}
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
          {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {imageUrl && <img src={imageUrl} alt="Uploaded Preview" className="mt-2 h-24 w-24 object-cover rounded-lg" />}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-secondary hover:bg-danger rounded">
            Cancel
          </button>
          <button type="submit" className={`w-1/2 p-2 rounded-lg text-white ${uploading ? "bg-gray-4" : "bg-primary hover:bg-secondary"}`} disabled={uploading}>
            {uploading ? "Processing..." : "Submit"}
          </button>
        </div>
      </form>
    </AddModal>
  );
};

export default AddModalForm;
