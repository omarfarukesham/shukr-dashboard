import { useAddProductMutation } from "@/feature/product/productSlice";
import { TProduct } from "@/type/product.type";
import { ArrowLeft } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CLOUDINARY_UPLOAD_PRESET = "ecom_preset";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbtskylxt/image/upload";


// const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
// const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;

const defaultValues: Omit<TProduct, "image"> = {
  title: "Sample Book",
  author: "John Doe",
  category: "SelfDevelopment",
  description: "This is a sample book description.",
  price: 20,
  quantity: 5,
  inStock: true,
};

export default function ProductAdd() {
  const navigate = useNavigate();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Omit<TProduct, "image">>({ defaultValues });

  // 📌 Function to upload image to Cloudinary
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
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
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

  // 📌 Function to handle form submission
  const onFormSubmit: SubmitHandler<Omit<TProduct, "image">> = async (data) => {
    try {
      if (!image) {
        alert("Please select an image first!");
        return;
      }
  
      const uploadedImageUrl = await uploadImage();
      if (!uploadedImageUrl) {
        return;
      }
  
      const productData: TProduct = {
        ...data,
        image: uploadedImageUrl
      };
  
      // console.log("Product Data:", productData);
      await addProduct(productData).unwrap();
      navigate("/product");
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-bold">Add Books</h2>
        <button 
          onClick={() => navigate("/product")} 
          className="bg-primary flex items-center hover:bg-secondary text-white font-bold px-2 py-1 rounded"
        >
          <ArrowLeft />
        </button>
      </div>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-xl bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input {...register("title", { required: "Title is required" })} className="w-full p-2 border rounded-lg" />
          {errors.title && <p className="text-danger text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Author</label>
          <input {...register("author", { required: "Author is required" })} className="w-full p-2 border rounded-lg" />
          {errors.author && <p className="text-danger text-sm">{errors.author.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input {...register("category", { required: "Category is required" })} className="w-full p-2 border rounded-lg" />
          {errors.category && <p className="text-danger text-sm">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea {...register("description", { required: "Description is required" })} className="w-full p-2 border rounded-lg" />
          {errors.description && <p className="text-danger text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input type="number" {...register("price", { required: "Price is required" })} className="w-full p-2 border rounded-lg" />
          {errors.price && <p className="text-danger text-sm">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input type="number" {...register("quantity", { required: "Quantity is required" })} className="w-full p-2 border rounded-lg" />
          {errors.quantity && <p className="text-danger text-sm">{errors.quantity.message}</p>}
        </div>

        <div className="flex items-center">
          <input type="checkbox" {...register("inStock")} className="mr-2" />
          <label className="text-sm font-medium">In Stock</label>
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input 
            type="file" 
            accept="image/png, image/jpeg" 
            className="w-full p-2 border rounded-lg"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
          {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {imageUrl && <img src={imageUrl} alt="Uploaded Preview" className="mt-2 h-24 w-24 object-cover rounded-lg" />}
        </div>

        <div className="flex justify-center">
          <button 
            type="submit" 
            className={`w-1/2 p-2 rounded-lg text-white ${isLoading ? 'bg-gray-400' : 'bg-primary hover:bg-secondary'}`} 
            disabled={isLoading || uploading}
          >
            {isLoading || uploading ? "Processing..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
