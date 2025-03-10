/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";
import { useGetChallengeByIdQuery } from "@/feature/exploreScreen/exploreChallengSlice";

const ChallengeViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: challengeData1, isLoading } = useGetChallengeByIdQuery({ id: id as string });

  const challengeData = (challengeData1 as any)?.data

  useEffect(() => {
    if (!isLoading && !challengeData) {
      navigate("/challenge");
    }
  }, [challengeData, isLoading, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
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

        {/* Challenge Image Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Image</label>
          {challengeData?.image && (
            <div className="mt-2">
              <img src={challengeData.image} alt="Challenge" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
        </div>

        {/* Template Details Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Details</label>
          <div
            className="ql-editor border border-gray-2 rounded bg-gray-50 p-2"
            style={{ height: "auto" }}

            dangerouslySetInnerHTML={{ __html: challengeData?.description || "" }}
          />
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium mb-1 pt-10">Challenge Category</label>
          <p className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            {challengeData?.category}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Challenge Duration</label>
          <p className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            {challengeData?.duration}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1"> Challenge Streak</label>
          <p className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            {challengeData?.streak}
          </p>
        </div>

        {/* Visibility Field */}
        <div>
            <label className="block text-sm font-medium mb-1">Challenge Visibility</label>
            <p className="w-full p-2 border border-gray-2 rounded bg-gray-50">
              {challengeData?.visibility}
            </p>
        </div>

        {/* Template Category Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Selected Template Categories</label>
          <p className="w-full p-2 border border-gray-2 rounded bg-gray-50">
            {challengeData?.templateId.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};


export default ChallengeViewPage;