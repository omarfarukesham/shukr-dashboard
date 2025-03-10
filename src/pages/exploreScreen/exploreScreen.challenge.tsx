import { useState } from "react";
import { useNavigate } from "react-router";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import DeleteModal from "@/components/modal/deleteModal";

// Icons
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { EyeIcon } from "lucide-react";

// API
import { useDeleteChallengeMutation, useGetChallengesQuery } from "@/feature/exploreScreen/exploreChallengSlice";
import { IChallenge } from "@/type/challengeContent.type";

// Constants
const ITEMS_PER_PAGE = 10;

const ChallengePage = () => {
  // API hooks
  const { data: CHData, error, isLoading } = useGetChallengesQuery();
  const [deleteChallenge] = useDeleteChallengeMutation();

  // Navigation
  const navigation = useNavigate();

  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Handlers
  const handleDelete = async () => {
    if (!selectedId) return;
    await deleteChallenge({ id: selectedId }).unwrap();
    setIsDeleteModalOpen(false);
  };

  // Loading states
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error fetching data</p>;

  // Data processing
  const challenges = (CHData as unknown as { data: IChallenge[] }).data || [];

  // Sort challenges by createdAt in descending order (newest first)
  const sortedChallenges = [...challenges].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedChallenges.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedChallenges = sortedChallenges.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Challenge</h1>
        <button
          onClick={() => navigation("/challenge/add")}
          className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-2"
        >
          Add Challenge
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Total Challenge</TableHead>
            <TableHead>Templates</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedChallenges.map((challenge, index) => (
            <TableRow key={challenge._id} className="hover:bg-gray-3">
              <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
              <TableCell className="font-medium">{challenge.name}</TableCell>
              <TableCell>
                <div dangerouslySetInnerHTML={{ __html: challenge.description.slice(0, 50) }} />
                ...
              </TableCell>
              <TableCell>{challenge.category}</TableCell>
              <TableCell>{challenge.duration}</TableCell>
              <TableCell>{challenge.templateId.length}</TableCell>
              <TableCell>{challenge.visibility}</TableCell>
              <TableCell className="flex gap-2 justify-center">
                <button
                  onClick={() => navigation(`/challenge/view/${challenge._id}`)}
                  className="text-sm text-white bg-primary hover:bg-secondary p-1 rounded-lg"
                >
                  <EyeIcon size={14} />
                </button>
                <button
                  onClick={() => navigation(`/challenge/edit/${challenge._id}`)}
                  className="text-sm text-white bg-primary hover:bg-secondary p-1 rounded-lg"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => {
                    setSelectedId(challenge._id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="text-sm text-white bg-danger p-1 rounded-lg hover:bg-primary"
                >
                  <DeleteIcon className="text-white" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-primary text-white"
                : "bg-gray-200 hover:bg-secondary"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default ChallengePage;