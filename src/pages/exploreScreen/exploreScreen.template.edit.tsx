import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetTemplateByIdQuery, useUpdateTemplateMutation } from "@/feature/exploreScreen/exploreSlice";
import toast from "react-hot-toast";
import { UploadToCloudinary } from "@/utils/uploadCloundaryImg";
import { ArrowBigLeft } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";

const ItemTypes = { BLOCK: "block" };

interface ITemplateData {
  type: "description" | "question";
  content: string;
}

interface TemplateFormData {
  title: string;
  templateImageUrl: string;
  templateDetails: string;
  templateData: ITemplateData[];
  category: string;
  templateGuide?: string;
  blocks: any[];
}

const DraggableBlock = ({ block, index, moveBlock, removeBlock, register, control }: any) => {
  const [, ref] = useDrag({
    type: ItemTypes.BLOCK,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.BLOCK,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveBlock(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="p-4 border rounded bg-white shadow mb-2"
    >
      {block.type === "description" && (
        <Controller
          name={`blocks.${index}.content`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value}
              onChange={field.onChange}
              placeholder="Enter description"
              className="h-40 rounded-lg mb-10"
            />
          )}
        />
      )}
      {block.type === "question" && (
        <input
          type="text"
          {...register(`blocks.${index}.content`)}
          className="w-full p-2 border rounded"
          placeholder="Enter question"
        />
      )}
      {block.type === "textbox" && (
        <p className="p-2 border rounded bg-gray-100">User Input Field</p>
      )}
      <button
        className="mt-2 text-danger underline"
        onClick={() => removeBlock(index)}
      >
        Delete
      </button>
    </div>
  );
};

const TemplateEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [, setSelectedFile] = useState<File | null>(null);
  const [updateTemplate] = useUpdateTemplateMutation();
  const [selectedBlockType, setSelectedBlockType] = useState("description");
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { data: templateData1, isLoading } = useGetTemplateByIdQuery({id: id as string});

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TemplateFormData>({
    defaultValues: {
      title: "",
      templateImageUrl: "",
      templateDetails: "",
      category: "",
      templateGuide: "",
      blocks: [],
    },
  });

  const { fields: blockFields, append, remove, move } = useFieldArray({
    control,
    name: "blocks",
  });

const templateData = templateData1?.data as any;

  useEffect(() => {
    if (templateData) {
      reset({
        title: templateData.title,
        templateImageUrl: templateData.templateImageUrl,
        templateDetails: templateData.templateDetails,
        category: templateData.category,
        templateGuide: templateData.templateGuide,
        blocks: templateData.templateData || [],
      });
      setImageUrl(templateData.templateImageUrl);
    }
  }, [templateData, reset]);

  const addBlock = (type: string) => {
    append({
      id: uuidv4(),
      type,
      content: "",
    });
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    move(fromIndex, toIndex);
  };

  const removeBlock = (index: number) => {
    remove(index);
  };

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

  const onSubmit = async (data: TemplateFormData) => {
    console.log(data)
    setIsSubmitting(true);
    try {
      const formData = {
        ...data,
        templateData: data.blocks,
        templateImageUrl: imageUrl,
        blocks: undefined,
      };

      delete formData.blocks;

      console.log("Form Data:", formData);
      await updateTemplate({ id: id || "", data: formData }).unwrap();
      toast.success("Template updated successfully");
      navigate("/template");
    } catch (error) {
      console.error("Failed to update template:", error);
      toast.error("Failed to update template");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Edit Template</h1>
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

          {/* Category Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              {...register("category", { required: "Category is required" })}
              className="w-full p-2 border border-gray-2 rounded"
              placeholder="Enter category"
            />
          </div>
          {/* Template Image Upload Field */}
          <div>
            <label className="block text-sm font-medium mb-1 text-success"> Generate Template Image url (if needed)</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-2 rounded"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />
                {imageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-white bg-gray-8 p-2 mt-1">![image]({imageUrl})</p>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-sm text-primary bg-primary-200 p-2 mt-1 hover:underline"
                    >
                      Copy Image Format
                    </button>
                  </div>
                )}
              </div>
            )}
            {isUploading && <p className="text-danger text-sm mt-1">Uploading...</p>}
          </div>

          {/* Drag and Drop Blocks Section */}
          <div>
            <label className="block text-sm font-medium mb-1">Template Data</label>
            <div className="space-y-2">
              {blockFields.map((block, index) => (
                <DraggableBlock
                  key={block.id}
                  block={block}
                  index={index}
                  moveBlock={moveBlock}
                  removeBlock={removeBlock}
                  register={register}
                  control={control}
                />
              ))}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <button
                type="button"
                className="px-2 py-1 bg-primary text-white text-xs rounded"
                onClick={() => addBlock(selectedBlockType)}
              >
                Add Block
              </button>
              <select
                value={selectedBlockType}
                onChange={(e) => setSelectedBlockType(e.target.value)}
                className=""
              >
                <option value="description">Description</option>
                <option value="question">Question</option>
              </select>
            </div>
          </div>

          

          {/* Template Guides Section */}
          <div>
            <label className="block text-sm font-medium mb-1">Template Guide (Optional)</label>
            <Controller
              name="templateGuide"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter template details"
                  className="h-60 rounded-lg p-3"
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-10">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Update Template"}
            </button>
          </div>
        </form>
      </div>
    </DndProvider>
  );
};

export default TemplateEditPage;