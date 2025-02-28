/* eslint-disable @typescript-eslint/no-unused-vars */
import {  useGetHomeContentQuery } from "@/feature/homescreen/homeSlice";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useNavigate } from "react-router";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const HomeScreenPage = () => {
  const { data, error, isLoading } = useGetHomeContentQuery();
  const navigation =  useNavigate();
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error fetching data</p>;
  const contentData = (data as any)?.data?.data || [];

  const renderTable = (items: any[], category: string) => {
    if (!items?.length) return null;

    const totalItems = items.length;
    const displayedItems = items.slice(0, 2);
    const hasMore = totalItems > 2;

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold capitalize">
            {category}
            <span className="ml-2 text-xs bg-success text-white px-1 py-0.5 rounded">
              {totalItems} items
            </span>
          </h2>
          {hasMore && (
            <button 
              onClick={() => navigation('/shukr-post')} 
              className="text-sm text-white bg-primary hover:bg-secondary px-2 py-0.5 rounded-lg"
            >
              View All
            </button>
)}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Published</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.details.slice(0, 50)}</TableCell>
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
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <span className={`px-1 py-0.5 rounded ${
                    item.status === 'published' ? 'bg-success text-white text-xs' : 'bg-warning text-xs text-black'
                  }`}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">{item.totalLikes}</TableCell>
                <TableCell>{new Date(item.publishDate).toLocaleDateString()}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Content Management</h1>
      {contentData && Object.entries(contentData).map(([category, items]) => 
        renderTable(items as any[], category)
      )}
    </div>
  );
};

export default HomeScreenPage;