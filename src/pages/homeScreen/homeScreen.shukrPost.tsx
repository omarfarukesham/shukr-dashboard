import { useGetHomeContentQuery, useDeleteContentItemMutation } from "@/feature/homescreen/homeSlice";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { useState } from "react";
import { useNavigate } from "react-router";
import DeleteModal from "@/components/modal/deleteModal";
import Loader from "@/components/ui/Loader";

const ShukrPostPage = () => {
    const { data, error, isLoading } = useGetHomeContentQuery();
    const [deleteContentItem] = useDeleteContentItemMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigation =  useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    if (isLoading) return <Loader />;
    if (error) return <p>Error fetching data</p>;

    const shukrPosts = data?.data?.data?.shukrPosts || [];
    const totalPages = Math.ceil(shukrPosts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedPosts = shukrPosts.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = async () => {
        if (!selectedId) return;
        await deleteContentItem({ id: selectedId });
      };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-6">Shukr Posts</h1>
            <button onClick={() => navigation('/shukr-post/add')} className="bg-primary hover:bg-secondary text-white  rounded text-xs py-1 px-2">Add Post</button>
            </div>
            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>SL</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Likes</TableHead>
                        <TableHead>Published</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayedPosts.map((item, index) => (
                        <TableRow key={item._id} className="hover:bg-gray-3 transition-colors duration-200">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell>
                                <div dangerouslySetInnerHTML={{ __html: item?.details?.slice(0, 65) }} />
                                                ...
                            </TableCell>
                            <TableCell>
                                {item.image ? (
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="w-8 h-8 object-fit rounded-md"
                                    />
                                ) : (
                                    <span className="text-gray-500">N/A</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <span className={`px-1 py-0.5 rounded ${
                                    item.status === 'published' ? 'bg-success text-white text-xs' : 'bg-warning text-xs text-black'
                                }`}>
                                    {item.status}
                                </span>
                            </TableCell>
                            <TableCell className="text-center">{item.totalLikes}</TableCell>
                            <TableCell>{new Date(item.publishDate).toLocaleDateString()}</TableCell>
                            <TableCell className="flex gap-2 justify-center">
                                <button onClick={() => navigation(`/shukr-post/edit/${item._id}`)} className="text-sm text-white bg-primary hover:bg-secondary p-1 rounded-lg">
                                    <EditIcon />
                                </button>
                                <button 
                                  onClick={() => {
                                    // handleDelete(item._id)
                                    setSelectedId(item._id);
                                    setIsDeleteModalOpen(true);
                                  }}
                                    className="text-sm text-white bg-danger p-1 rounded-lg hover:bg-primary"
                                >
                                    <DeleteIcon className="text-white"/>
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
                                ? 'bg-primary text-white' 
                                : 'bg-gray-200 hover:bg-secondary'
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

export default ShukrPostPage;