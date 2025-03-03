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

// API
import {
  useGetHomeContentQuery,
  useDeleteContentItemMutation,
} from "@/feature/homescreen/homeSlice";

// Constants
const ITEMS_PER_PAGE = 10;

const ShukrInspirationPage = () => {
  // API hooks
  const { data, error, isLoading } = useGetHomeContentQuery();
  const [deleteContentItem] = useDeleteContentItemMutation();

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
    await deleteContentItem({ id: selectedId });
  };

  // Loading states
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error fetching data</p>;

  // Data processing
  const shukrInspiration = data?.data?.data?.shukrInspiration || [];
  const totalPages = Math.ceil(shukrInspiration.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedPosts = shukrInspiration.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Shukr Inspirations</h1>
        <button
          onClick={() => navigation("/shukr-ins/add")}
          className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-2"
        >
          Add Inspiration
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Likes</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedPosts.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <img src={item.image} alt={item.title} className="w-12 h-12 rounded" />
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.details.slice(0, 50)}</TableCell>
              <TableCell>
                <span
                  className={`px-1 py-0.5 rounded ${
                    item.status === "published"
                      ? "bg-success text-white text-xs"
                      : "bg-warning text-xs text-black"
                  }`}
                >
                  {item.status}
                </span>
              </TableCell>
              <TableCell className="text-center">{item.totalLikes}</TableCell>
              <TableCell>{new Date(item.publishDate).toLocaleDateString()}</TableCell>
              <TableCell className="flex gap-2 justify-center">
                <button
                  onClick={() => navigation(`/shukr-ins/edit/${item._id}`)}
                  className="text-sm text-white bg-primary hover:bg-secondary p-1 rounded-lg"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => {
                    setSelectedId(item._id);
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
              currentPage === i + 1 ? "bg-primary text-white" : "bg-gray-200 hover:bg-secondary"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
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

export default ShukrInspirationPage;
