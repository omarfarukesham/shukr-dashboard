import { useGetHomeContentQuery, useDeleteContentItemMutation } from "@/feature/homescreen/homeSlice";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { useState } from "react";
import { useNavigate } from "react-router";

const DailyDuaPage = () => {
    const { data, error, isLoading } = useGetHomeContentQuery();
    const [deleteContentItem] = useDeleteContentItemMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigation =  useNavigate();
    if (isLoading) return <LoadingSpinner />;
    if (error) return <p>Error fetching data</p>;

    const shukrPosts = data?.data?.data?.duaOfTheDay || [];
    const totalPages = Math.ceil(shukrPosts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedPosts = shukrPosts.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = async (id: string) => {
       console.log('delete ........', id)
        await deleteContentItem({ category: 'shukrPosts', id });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-6">Dua of the Day</h1>
            <button onClick={() => navigation('/daily-dua/add')} className="bg-primary hover:bg-secondary text-white  rounded text-xs py-1 px-2">Add Dua</button>
            </div>
            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>SL</TableHead>
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
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell>{item.details.slice(0, 50)}</TableCell>
                           
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
                                <button onClick={() => navigation(`/daily-dua/edit/${item._id}`)} className="text-sm text-white bg-primary hover:bg-secondary p-1 rounded-lg">
                                    <EditIcon />
                                </button>
                                <button 
                                    onClick={() => handleDelete(item._id)}
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
        </div>
    );
};

export default DailyDuaPage;