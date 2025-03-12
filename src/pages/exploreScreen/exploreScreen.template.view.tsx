import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetTemplateByIdQuery } from "@/feature/exploreScreen/exploreSlice";
import { ArrowBigLeft } from "lucide-react";
import toast from "react-hot-toast";
import { ClipboardCopy } from "lucide-react";

const TemplateViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: templateData1, isLoading } = useGetTemplateByIdQuery({id: id as string});

  const templateData = templateData1?.data as any;

  useEffect(() => {
    if (!templateData && !isLoading) {
      toast.error("Template not found");
      navigate("/template");
    }
  }, [templateData, isLoading, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Template Details</h1>
        <button
          onClick={() => navigate("/template")}
          className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-1 flex items-center"
        >
          <ArrowBigLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      <div className="space-y-6 bg-white rounded-lg shadow-lg p-6">
        {/* Title Section */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <div className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            {templateData?.title}
          </div>
        </div>

        {/* Category Section */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <div className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            {templateData?.category}
          </div>
        </div>

        {/* Template Image Section */}
        <div>
          <label className="block text-sm font-medium mb-1">Template Image</label>
          {templateData?.templateImageUrl && (
            <div className="mt-2">
              <img
                src={templateData.templateImageUrl}
                alt="Template Preview"
                className="w-32 h-32 object-cover rounded"
              />
              <div className="mt-2 flex items-end gap-2">
                <p className="text-sm text-white bg-gray-800 p-2 rounded">
                  ![image]({templateData.templateImageUrl})
                </p>
                <button
                  type="button"
                  onClick={() => handleCopy(`![image](${templateData.templateImageUrl})`)}
                  className="text-sm text-primary bg-primary-200 p-2 rounded hover:underline flex items-center"
                >
                  <ClipboardCopy className="w-4 h-4 mr-1" />
                  Copy Image Format
                </button>
              </div>
            </div>
          )}
        </div>

      

        {/* Template Data Section */}
        <div>
          <label className="block text-sm font-medium mb-1">Template Data</label>
          <div className="space-y-2">
            {templateData?.templateData?.map((block, index) => (
              <div key={index} className="  rounded bg-white shadow mb-5">
                {block.type === "description" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <ReactQuill
                      theme="snow"
                      value={block.content}
                      readOnly
                      className="h-60 rounded-lg bg-gray-50"
                    />
                  </div>
                )}
               <div className="pt-5">
               {block.type === "question" && (
                  <div className="">
                    <label className="block text-sm font-bold mb-1 ">Question {index + 1}</label>
                    <div className="w-full p-2 border border-gray-2 rounded bg-gray-50">
                      {block.content}
                    </div>
                  </div>
                )}
                {block.type === "textbox" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">User Input Field</label>
                    <div className="w-full p-2 border border-gray-2 rounded bg-gray-50">
                      [User Input Field]
                    </div>
                  </div>
                )}
               </div>
              </div>
            ))}
          </div>
        </div>


          {/* Template Guide Section */}
          <div>
          <label className="block text-sm font-medium mb-1">Template Guide</label>
          <div className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            <div
              // value={templateData?.templateGuide || ""}
              dangerouslySetInnerHTML={{ __html: templateData.templateGuide }}
              className="h-40 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateViewPage;