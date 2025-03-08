/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import toast from "react-hot-toast";
import { UploadToCloudinary } from "@/utils/uploadCloundaryImg";
import { ArrowBigLeft } from "lucide-react";
import { useAddChallengeMutation } from "@/feature/exploreScreen/exploreChallengSlice";
import { IChallenge } from "@/type/challengeContent.type";
import { useGetTemplatesQuery } from "@/feature/exploreScreen/exploreSlice";


const ChallengeAddPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>([]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [addChallenge] = useAddChallengeMutation();
  const { data: TMData, isLoading } = useGetTemplatesQuery();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IChallenge>({
    defaultValues: {
      name: "",
      image: "",
      description: "",
      category: "",
      duration: "",
      visibility: "FREE",
      templateId: [],
      
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const categoriesData = (TMData as any).data || [];

  const categories = TMData ? Array.from(new Set(categoriesData.map(template => template.category))) : [];
  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updatedCategories);
    
    // Get template IDs for selected categories
    const templateIds = categoriesData
      ?.filter(template => updatedCategories.includes(template.category))
      .map(template => template._id) || [];
      console.log(templateIds)
    setSelectedTemplateIds(templateIds);
    setValue('templateId', templateIds);
  };
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: IChallenge) => {
    setIsSubmitting(true);
    try {
      let imageUrl = "";
      if (selectedFile) {
        imageUrl = await UploadToCloudinary(selectedFile);
      }

      const challengeData = {
        ...data,
        image: imageUrl,
        
      };

      console.log(challengeData);

      // Uncomment to submit data
      await addChallenge({ data: challengeData }).unwrap();
      toast.success("Challenge data inserted successfully");
      navigate("/challenge");
    } catch (error) {
      console.error("Failed to add Challenge:", error);
      if (error.data && error.data.error) {
        console.error("Validation Errors:", error.data.error.errors);
      }
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

        {/* Challenge Image Upload Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-2 rounded"
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
        </div>

        {/* Template Details Field (React Quill Editor) */}
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Details</label>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: "Challenge description is required" }}
            render={({ field }) => (
              <>
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter template details"
                  className="h-60 rounded-lg p-3"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium mb-1 pt-10">Challenge Category</label>
          <input
            {...register("category", { required: "Category is required" })}
            className="w-full p-2 border border-gray-2 rounded"
            placeholder="Enter category"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Duration</label>
          <input
            {...register("duration", { required: "Duration is required" })}
            className="w-full p-2 border border-gray-2 rounded"
            placeholder="Enter duration number"
            type="number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1"> Challenge Streak</label>
          <input
            {...register("streak", { required: "Streak is required" })}
            className="w-full p-2 border border-gray-2 rounded"
            placeholder="Enter Streak number"
            type="number"
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

        {/* Template Category Dropdown */}
        <div>
    <label className="block text-sm font-medium mb-1">Select Template Category</label>
    <div className="max-h-48 overflow-y-auto border border-gray-2 rounded p-2">
      {categories.map((category: string) => (
        <div key={category} className="flex items-center gap-2 p-2 hover:bg-gray-50">
          <input
            type="checkbox"
            id={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
            className="w-4 h-4 rounded border-gray-300"
          />
          <label htmlFor={category} className="flex-1 cursor-pointer">
            {category}
          </label>
        </div>
      ))}
    </div>
    {selectedTemplateIds.length > 0 && (
      <p className="text-sm text-gray-500 mt-2">
        Selected templates: {selectedTemplateIds.length}
      </p>
    )}
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