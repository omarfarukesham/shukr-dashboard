/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { UploadToCloudinary } from "@/utils/uploadCloundaryImg";
import { ArrowBigLeft } from "lucide-react";
import { useUpdateChallengeMutation, useGetChallengeByIdQuery } from "@/feature/exploreScreen/exploreChallengSlice";
import { IChallenge } from "@/type/challengeContent.type";
import { useGetTemplatesQuery } from "@/feature/exploreScreen/exploreSlice";
import Loader from "@/components/ui/Loader";

interface Template {
  _id: string;
  category: string;
}

const ChallengeEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [, setSelectedFile] = useState<File | null>(null);
  const [updateChallenge] = useUpdateChallengeMutation();
  const { data: TMData, isLoading } = useGetTemplatesQuery();
  const { data: challengeData1, isLoading: isChallengeLoading } = useGetChallengeByIdQuery({ id: id as string });
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
  } = useForm<IChallenge>();

  const challengeData = (challengeData1 as any)?.data || null;
  // console.log(challengeData?.templateId);

  useEffect(() => {
    if (challengeData) {
      setValue("name", challengeData.name);
      setValue("isFeatured", challengeData.isFeatured);
      setValue("description", challengeData.description);
      setValue("category", challengeData.category);
      setValue("duration", challengeData.duration);
      setValue("visibility", challengeData.visibility);
      setValue("templateId", challengeData.templateId);
      setImagePreview(challengeData.image);
      setImageUrl(challengeData.image);
      setDuration(challengeData.duration);
  
      // Fix: Ensure selectedCategories is an array of template IDs
      const templateIds = challengeData.templateId?.map((template: any) => template._id || template) || [];
      setSelectedCategories(templateIds);
    }
  }, [challengeData, setValue]);

  if (isLoading || isChallengeLoading) {
    return <Loader />;
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
      data.templateId = selectedCategories.filter(Boolean);
      data.image = imageUrl || challengeData?.image || "";

      await updateChallenge({ id: id || "", data }).unwrap();

      toast.success("Challenge updated successfully");
      navigate("/challenge");
    } catch (error) {
      console.error("Failed to update Challenge:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Edit Challenge</h1>
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
        <div>
          <label className="block text-sm font-medium mb-1">Is Featured</label>
          <select
            {...register("isFeatured", { required: "Is Featured is required" })}
            className="w-full p-2 border border-gray-2 rounded"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.isFeatured && (
            <p className="text-danger text-sm mt-1">{errors.isFeatured.message}</p>
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
          <label className="block text-sm font-medium mb-1">Type</label>
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
          {Array.from({ length: duration || 0 }, (_, index) => {

            return (
              <div key={index}>
                <label className="block text-sm font-medium mb-1">Day - {index + 1}</label>
                <select
                    required
                    className="w-full p-2 border rounded"
                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                    value={
                      selectedCategories[index]
                        ? categories.find((cat) => categoriesMap[cat] === selectedCategories[index])
                        : ""
                    }
                  >
                    <option value="">Select category</option>
                    {categories?.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing ...' : 'Update Challenge'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChallengeEditPage;