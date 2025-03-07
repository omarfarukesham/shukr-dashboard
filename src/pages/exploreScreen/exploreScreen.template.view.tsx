
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTemplateByIdQuery } from "@/feature/exploreScreen/exploreSlice";
import { toast } from "react-hot-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ArrowBigLeft } from "lucide-react";

const TemplateViewPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigation = useNavigate()

  // Fetch template data
  const {
    data: template1,
    isLoading,
    isError,
  } = useGetTemplateByIdQuery({id: id as string});

const template = template1?.data

  // Handle loading and error states
  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch template data");
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!template) {
    return <div className="text-center py-10">Template not found</div>;
  }

  return (
    <>
  <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">View Template</h1>
        <button onClick={() => navigation("/template")} className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-1 flex items-center">
          <ArrowBigLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>
  
    <div className="p-6 max-w-7xl bg-white mx-auto rounded-lg">
   
      <h1 className="text-xl font-bold text-start mb-8">Title: {template.title}</h1>

      {/* Template Image */}
      <div className="flex justify-start mb-8">
        <span className="text-lg font-bold mx-2">Image: </span>
        <img
          src={template.templateImageUrl}
          alt={template.title}
          className="rounded-lg shadow-lg w-[250px] max-w-xl h-auto"
        />
      </div>

      {/* Template Details */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Template Details</h2>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: template.templateDetails }}
        />
      </div>

      {/* Category */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Category</h2>
        <p className="text-gray-7">{template.category}</p>
      </div>

      {/* Template Guides */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Template Guides</h2>
        {template.templateGuide.map((guide, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">Guide {index + 1}</h3>
            <p className="text-gray-700 mb-2">{guide.guideDetails}</p>
            {guide.guideImageUrl && (
              <div className="mb-2">
                <img
                  src={guide.guideImageUrl}
                  alt={`Guide ${index + 1} Image`}
                  className="rounded-lg w-full max-w-md h-auto"
                />
              </div>
            )}
            {guide.guideVideoUrl && (
              <div className="mb-2">
                <a
                  href={guide.guideVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Watch Video Guide
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    </>
  );
};


export default TemplateViewPage;