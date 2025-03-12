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
// import LoadingSpinner from "@/components/ui/LoadingSpinner";
import DeleteModal from "@/components/modal/deleteModal";

// Icons
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";


// API
import {
    useDeleteTemplateMutation, 
    useGetTemplatesQuery 
   } from "@/feature/exploreScreen/exploreSlice";
import { Template } from "@/type/templateContent.type";
import { EyeIcon } from "lucide-react";
import Loader from "@/components/ui/Loader";

// Constants
const ITEMS_PER_PAGE = 10;

const TemplateScreen = () => {
  // API hooks
  const { data:TMData, error, isLoading } = useGetTemplatesQuery();
  const [deleteTemplate] = useDeleteTemplateMutation();

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
    console.log(selectedId)
    await deleteTemplate({ id: selectedId }).unwrap();
    setIsDeleteModalOpen(false);
  };

  // Loading states
  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching data</p>;

  // Data processing
  const templates = (TMData as unknown as { data: Template[] }).data || [];
  const totalPages = Math.ceil(templates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedTemplates = templates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
 
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Templates</h1>
        <button
          onClick={() => navigation("/template/add")}
          className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-2"
        >
          Add Template
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Image</TableHead>
            {/* <TableHead>Details</TableHead> */}
            <TableHead>Category</TableHead>
            {/* <TableHead>Guides</TableHead> */}
            <TableHead>Updated At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedTemplates.map((template, index) => (
            <TableRow key={template._id} className="hover:bg-gray-3">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{template.title}</TableCell>
              <TableCell>
                <img
                  src={template.templateImageUrl}
                  alt={template.title}
                  className="w-8 h-8 object-fit rounded"
                />
              </TableCell>
              {/* <TableCell>
              <div dangerouslySetInnerHTML={{ __html: template.templateDetails.slice(0, 50) }} /> 
                ...</TableCell> */}
              {/* <div dangerouslySetInnerHTML={{ __html: item.details.slice(0, 75) }} /> */}
              <TableCell>{template.category}</TableCell>
              {/* <TableCell>
                <ul>
                  {template.templateGuide.map((guide) => (
                    <li key={guide._id}>
                      <p>{guide.guideDetails}</p>
                      <img
                        src={guide.guideImageUrl}
                        alt={guide.guideDetails}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <a href={guide.guideVideoUrl} target="_blank" rel="noopener noreferrer">
                        Watch Video
                      </a>
                    </li>
                  ))}
                </ul>
              </TableCell> */}
    
              <TableCell>{new Date(template.updatedAt).toLocaleDateString()}</TableCell>
              <TableCell className="flex gap-2 justify-center">
                <button
                  onClick={() => navigation(`/template/view/${template._id}`)}
                  className="text-sm text-white bg-primary hover:bg-secondary p-1 rounded-lg"
                >
                  <EyeIcon size={14}/>
                </button>
                <button
                  onClick={() => navigation(`/template/edit/${template._id}`)}
                  className="text-sm text-white bg-primary hover:bg-secondary p-1 rounded-lg"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => {
                    setSelectedId(template._id);
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

export default TemplateScreen;