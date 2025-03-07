import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import { useAddTemplateMutation } from "@/feature/exploreScreen/exploreSlice";
import toast from "react-hot-toast";
import { UploadToCloudinary } from "@/utils/uploadCloundaryImg";
import { ArrowBigLeft } from "lucide-react";
// import { UploadToCloudinary } from "@/path/to/UploadToCloudinary"; // Adjust the import path
interface TemplateGuide {
  guideDetails: string;
  guideImageUrl: string;
  guideVideoUrl: string;
}

interface TemplateFormData {
  title: string;
  templateImageUrl: string;
  templateDetails: string;
  category: string;
  templateGuide: TemplateGuide[];
}


const TemplateAddPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [addTemplate] = useAddTemplateMutation();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TemplateFormData>({
    defaultValues: {
      title: "",
      templateImageUrl: "",
      templateDetails: "",
      category: "",
      // Pre-populate with one empty guide.
      templateGuide: [
        { guideDetails: "", guideImageUrl: "", guideVideoUrl: "" }
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "templateGuide",
  });

  // Handler for file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handler for submitting the form
  const onSubmit = async (data: TemplateFormData) => {
    setIsSubmitting(true);
    try {
      let imageUrl = "";
      if (selectedFile) {
        imageUrl = await UploadToCloudinary(selectedFile);
      }
      
      const templateData = {
        ...data,
        templateImageUrl: imageUrl,
        templateGuide: data.templateGuide.map((guide) => ({
          guideDetails: guide.guideDetails,
          guideImageUrl: guide.guideImageUrl,
          guideVideoUrl: guide.guideVideoUrl,
        })),
      };

      // console.log(templateData)
      await addTemplate({ data: templateData }).unwrap();
      toast.success("Template added successfully");
      navigate("/template");
    } catch (error) {
      console.error("Failed to add template:", error);
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
        <h1 className="text-xl font-bold">Add New Template</h1>
        <button
          onClick={() => navigate("/template")}
          className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-1 flex items-center"
        >
          <ArrowBigLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-lg shadow-lg p-6">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border border-gray-2 rounded"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-danger text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Template Image Upload Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Template Image</label>
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
          <label className="block text-sm font-medium mb-1">Template Details</label>
          <Controller
            name="templateDetails"
            control={control}
            defaultValue=""
            rules={{ required: "Template details are required" }}
            render={({ field }) => (
              <>
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter template details"
                  className="h-60 rounded-lg p-3"
                />
                {errors.templateDetails && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.templateDetails.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium mb-1 pt-10">Category</label>
          <input
            {...register("category", { required: "Category is required" })}
            className="w-full p-2 border border-gray-2 rounded"
            placeholder="Enter category"
          />
        </div>

        {/* Template Guides Section */}
        <div>
          <label className="block text-sm font-medium mb-1">Template Guides (optional)</label>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4 p-4 border rounded">
              <div className="mb-2">
                <label className="block text-xs font-medium mb-1">
                  Guide Details
                </label>
                <input
                  {...register(`templateGuide.${index}.guideDetails` as const)}
                  placeholder="Enter guide details"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium mb-1">
                  Guide Image URL
                </label>
                <input
                  {...register(`templateGuide.${index}.guideImageUrl` as const)}
                  placeholder="Enter guide image URL"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">
                  Guide Video URL
                </label>
                <input
                  {...register(`templateGuide.${index}.guideVideoUrl` as const)}
                  placeholder="Enter guide video URL"
                  className="w-full p-2 border rounded"
                />
              </div>
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
            {isSubmitting ? 'Processing ...' : 'Add Template'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplateAddPage;