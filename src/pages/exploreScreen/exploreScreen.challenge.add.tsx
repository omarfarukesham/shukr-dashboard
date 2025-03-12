/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { UploadToCloudinary } from "@/utils/uploadCloundaryImg";
import { ArrowBigLeft } from "lucide-react";
import { useAddChallengeMutation } from "@/feature/exploreScreen/exploreChallengSlice";
import { IChallenge } from "@/type/challengeContent.type";
import { useGetTemplatesQuery } from "@/feature/exploreScreen/exploreSlice";

interface Template {
  _id: string;
  category: string;
}

const ChallengeAddPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [, setSelectedFile] = useState<File | null>(null);
  const [addChallenge] = useAddChallengeMutation();
  const { data: TMData, isLoading } = useGetTemplatesQuery();
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IChallenge>({
    defaultValues: {
      name: "test",
      image: "",
      description: "test description",
      category: "test",
      duration: "",
      visibility: "FREE",
      templateId: [],
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
const categoriesData = (TMData as any)?.data || [];
  const categoriesMap = categoriesData?.reduce((acc, template: Template) => {
    if (!acc[template.category]) {
      acc[template.category] = template._id;
    }
    return acc;
  }, {} as Record<string, string>);

  const categories = Object.keys(categoriesMap || {});

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));

      setIsUploading(true);
      try {
        const uploadedImageUrl = await UploadToCloudinary(file);
        setImageUrl(uploadedImageUrl);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleCopy = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(`![image](${imageUrl})`);
      toast.success("Image format copied to clipboard");
    }
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const durationValue = parseInt(event.target.value);
    setDuration(durationValue);
  };

  // Update handler function for category selection
  const handleCategoryChange = (index: number, category: string) => {
    const templateId = categoriesMap?.[category];
    if (templateId) {
      const updatedCategories = [...selectedCategories];
      updatedCategories[index] = templateId;
      setSelectedCategories(updatedCategories);
      setValue("templateId", updatedCategories);
    }
  };

  const onSubmit = async (data: IChallenge) => {
    setIsSubmitting(true);
    try {
      // Add selected template IDs to the form data
      data.templateId = selectedCategories.filter(Boolean); // Remove empty values
      console.log("Form Data:", data);

      // Add your logic to process the form data
      await addChallenge({ data }).unwrap();

      toast.success("Challenge data inserted successfully");
      navigate("/challenge");
    } catch (error) {
      console.error("Failed to add Challenge:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Add New Challenge</h1>
        <button
          onClick={() => navigate("/challenge")}
          className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-1 flex items-center"
        >
          <ArrowBigLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-lg shadow-lg p-6">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Name of Challenge</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border border-gray-2 rounded"
            placeholder="Enter Name"
          />
          {errors.name && (
            <p className="text-danger text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Image Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
              />
              {imageUrl && (
                <div className="mt-2">
                  <p className="text-sm text-white bg-gray-8 p-2 mt-1">![image]({imageUrl})</p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-sm text-primary  bg-primary-200 p-2 mt-1 hover:underline"
                  >
                    Copy Image Format
                  </button>
                </div>
              )}
            </div>
          )}
          {isUploading && <p className="text-danger text-sm mt-1">Uploading...</p>}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Details</label>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Challenge description is required" }}
            render={({ field }) => (
              <>
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  height={400}
                />
                {errors.description && (
                  <p className="text-danger text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Category</label>
          <input
            {...register("category", { required: "Category is required" })}
            className="w-full p-2 border border-gray-2 rounded"
            placeholder="Enter category"
          />
        </div>

        {/* Visibility Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Visibility</label>
          <select
            {...register("visibility", { required: "Visibility is required" })}
            className="w-full p-2 border border-gray-2 rounded"
          >
            <option value="FREE">Free</option>
            <option value="PRO">Premium</option>
          </select>
          {errors.visibility && (
            <p className="text-danger text-sm mt-1">{errors.visibility.message}</p>
          )}
        </div>

        {/* Duration Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Duration</label>
          <input
            {...register("duration", { required: "Duration is required" })}
            className="w-full p-2 border border-gray-2 rounded"
            placeholder="Enter duration number"
            onChange={handleDurationChange}
            type="number"
          />
        </div>

        {/* Dynamically Generated Day Fields */}
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: duration || 0 }, (_, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1">Day - {index + 1}</label>
              <select
              required
                // {...register(`day-${index + 1}`, { required: "Category is required" })}
                className="w-full p-2 border rounded"
                onChange={(e) => handleCategoryChange(index, e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing ...' : 'Add Challenge'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChallengeAddPage;