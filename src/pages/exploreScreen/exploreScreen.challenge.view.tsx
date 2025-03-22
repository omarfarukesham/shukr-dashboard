/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { ArrowBigLeft } from "lucide-react";
import { useGetChallengeByIdQuery } from "@/feature/exploreScreen/exploreChallengSlice";
import Loader from "@/components/ui/Loader";

const ChallengeViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: challengeData1, isLoading } = useGetChallengeByIdQuery({ id: id as string });

  const challengeData = (challengeData1 as any)?.data || null;
  const dayCategories = challengeData?.templateId 
  ? challengeData.templateId.map((cat) => cat.category) 
  : [];




  useEffect(() => {
    if (!challengeData && !isLoading) {
      navigate("/challenge"); 
    }
  }, [challengeData, isLoading, navigate]);

  if (isLoading) {
    return <Loader />;
  }



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Challenge Details</h1>
        <button
          onClick={() => navigate("/challenge")}
          className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-1 flex items-center"
        >
          <ArrowBigLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      <div className="space-y-6 bg-white rounded-lg shadow-lg p-6">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Name of Challenge</label>
          <p className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            {challengeData?.name}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Is Featured</label>
          <p className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            {challengeData?.isFeatured ? "Yes" : "No"}
          </p>
        </div>

        {/* Image Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Image</label>
          {challengeData?.image && (
            <img
              src={challengeData.image}
              alt="Challenge Preview"
              className="w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Details</label>
          <div className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            <MDEditor.Markdown source={challengeData?.description} className="markdown p-4 bg-primary-200" />
          </div>
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Category</label>
          <p className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            {challengeData?.category}
          </p>
        </div>

        {/* Visibility Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <p className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            {challengeData?.visibility === "FREE" ? "Free" : "Premium"}
          </p>
        </div>

        {/* Duration Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Duration</label>
          <p className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            {challengeData?.duration} days
          </p>
        </div>

        {/*  Categories */}
        <div>
          <label className="block text-sm font-medium mb-1">Template Categories</label>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: challengeData?.duration || 0 }, (_, index) => {
             

              return (
                <div key={index}>
                  <label className="block text-sm font-medium mb-1">Day - {index + 1}</label>
                  <p className="w-full p-2 border border-gray-2 rounded bg-gray-50">
                    {String(dayCategories[index]) || "No category"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeViewPage;