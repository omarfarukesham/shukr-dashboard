import { useState } from "react";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteModal from "@/components/modal/deleteModal";


// Icons
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";

// API

import { useDeleteContentItemMutation, useGetHomeContentQuery } from "@/feature/homescreen/homeSlice";
import AddModalForm from "@/components/modal/addFormModal";
// import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useNavigate } from "react-router";
import Loader from "@/components/ui/Loader";


const ITEMS_PER_PAGE = 10;

const PositiveThinking = () => {
    const navigation = useNavigate()
    const { data, error, isLoading } = useGetHomeContentQuery();
    const [deleteContentItem] = useDeleteContentItemMutation();
  
  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = async () => {
    if (!selectedItem) return;
    await deleteContentItem({ id: selectedItem._id });
    setIsDeleteModalOpen(false);
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching data</p>;

  const positiveItems = data?.data?.data?.positiveThinking || [];
  const totalPages = Math.ceil(positiveItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedItems = positiveItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Positive Thinking</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-2"
        >
          Add Positive Thought
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Like</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedItems.map((item, index) => (
            <TableRow key={item._id} className="hover:bg-gray-3 transition-colors duration-200">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <img src={item.image} alt="" className="w-8 h-8 rounded" />
              </TableCell>
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
              <TableCell className="text-start">{item.totalLikes}</TableCell>
              <TableCell>{new Date(item.publishDate).toLocaleDateString()}</TableCell>
              <TableCell className="flex gap-2 justify-center">
                 <button
                     onClick={() => navigation(`/positive-thinking/edit/${item._id}`)}
                    className="text-sm text-white bg-primary hover:bg-secondary p-1 rounded-lg"
                    >
                    <EditIcon />
                 </button>
                <button
                  onClick={() => {
                    setSelectedItem(item);
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

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}

      {isAddModalOpen && (
        <AddModalForm
          isOpen={isAddModalOpen}
          category="positiveThinking"
          onClose={() => setIsAddModalOpen(false)}
        //   onSubmit={handleSubmit}
       
        />
      )}
    </div>
  );
};

export default PositiveThinking;
