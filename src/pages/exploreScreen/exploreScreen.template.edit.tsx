
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import { useGetTemplateByIdQuery, useUpdateTemplateMutation } from "@/feature/exploreScreen/exploreSlice";
import toast from "react-hot-toast";
import { UploadToCloudinary } from "@/utils/uploadCloundaryImg";
import { ArrowBigLeft } from "lucide-react";
// import { UploadToCloudinary } from "@/path/to/UploadToCloudinary"; // Adjust the import path

// Define the form data type
interface TemplateFormData {
  title: string;
  templateImageUrl: string;
  templateDetails: string;
  category: string;
  templateGuide: Array<{
    guideDetails: string;
    guideImageUrl: string;
    guideVideoUrl: string;
  }>;
}

const TemplateEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get the template ID from the URL
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<TemplateFormData>();

  // Fetch existing template data
  const { data: template1, isLoading, isError } = useGetTemplateByIdQuery({ id: id as string });
  const [updateTemplate] = useUpdateTemplateMutation();

  // State for template guide inputs
  const [templateGuides, setTemplateGuides] = useState<
    Array<{ guideDetails: string; guideImageUrl: string; guideVideoUrl: string; _id: string }>
  >([]);

  const template = template1?.data
  // Populate form fields with fetched data
  useEffect(() => {
    if (template) {
      setValue("title", template.title);
      setValue("templateImageUrl", template.templateImageUrl);
      setValue("templateDetails", template.templateDetails);
      setValue("category", template.category);
      setTemplateGuides(template.templateGuide);
      setImagePreview(template.templateImageUrl); // Set image preview
    }
  }, [template, setValue]);

  // Handler for adding a new guide
  const handleAddGuide = () => {
    setTemplateGuides([...templateGuides, { guideDetails: "", guideImageUrl: "", guideVideoUrl: "", _id: "" }]);
  };

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
      let imageUrl = data.templateImageUrl; // Use existing URL by default
      if (selectedFile) {
        imageUrl = await UploadToCloudinary(selectedFile); // Upload new image
      }

      const updatedTemplateData = {
        ...data,
        templateImageUrl: imageUrl,
        templateGuide: templateGuides,
      };

      await updateTemplate({ id: id!, data: updatedTemplateData }).unwrap();
      toast.success("Template updated successfully");
      navigate("/template");
    } catch (error) {
      console.error("Failed to update template:", error);
      if (error.data && error.data.error) {
        console.error("Validation Errors:", error.data.error.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching template data</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Edit Template</h1>
        <button onClick={() => navigate("/template")} className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-1 flex items-center">
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
          <label className="block text-sm font-medium mb-1">Template Guides</label>
          {templateGuides?.map((guide, index) => (
            <div key={index} className="space-y-4 mb-4 p-4 border rounded">
              <div>
                <label className="block text-sm font-medium mb-1">Guide Details</label>
                <input
                  value={guide.guideDetails}
                  onChange={(e) => {
                    const newGuides = [...templateGuides];
                    newGuides[index].guideDetails = e.target.value;
                    setTemplateGuides(newGuides);
                  }}
                  className="w-full p-2 border border-gray-2 rounded"
                  placeholder="Enter guide details"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Guide Image URL</label>
                <input
                  value={guide.guideImageUrl}
                  onChange={(e) => {
                    const newGuides = [...templateGuides];
                    newGuides[index].guideImageUrl = e.target.value;
                    setTemplateGuides(newGuides);
                  }}
                  className="w-full p-2 border border-gray-2 rounded"
                  placeholder="Enter guide image URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Guide Video URL</label>
                <input
                  value={guide.guideVideoUrl}
                  onChange={(e) => {
                    const newGuides = [...templateGuides];
                    newGuides[index].guideVideoUrl = e.target.value;
                    setTemplateGuides(newGuides);
                  }}
                  className="w-full p-2 border border-gray-2 rounded"
                  placeholder="Enter guide video URL"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddGuide}
            className="bg-primary text-white px-2 py-1 text-xs rounded hover:bg-secondary"
          >
            Add Guide
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating ...' : 'Update Template'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplateEditPage;
