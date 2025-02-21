/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductTable from "@/components/table/table";
import { useDeleteProductMutation, useGetProductsQuery } from "@/feature/product/productSlice";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Product() {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [deleteProduct] = useDeleteProductMutation();

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  const products = (data as any)?.data || [];

  // Calculate pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

  // Placeholder functions for actions
  const handleEdit = (id: string) => {
    navigate(`/product/edit-product/${id}`);
  };

  const handleDelete = async (id: string) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    
    try {
      await deleteProduct(productToDelete).unwrap();
      toast.success('Product deleted successfully');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to delete product');
    } finally {
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleAddProduct = () => {
       navigate('/product/add-product');
  };

  // Add pagination component
  const Pagination = () => {
    return (
      <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        ← Prev
      </button>
    
      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
    
      <button
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Next →
      </button>
    </div>
    
    );
  };

  return (
    <>
      <div className="p-5 w-full md:w-auto">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          <button onClick={handleAddProduct} className="bg-primary hover:bg-secondary text-white font-bold py-1 px-4 rounded">
            Add Product
          </button>
        </div>
        <ProductTable
          products={currentProducts} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Pagination />
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-center">Confirm Delete</h3>
            <p className="text-gray-7 mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-white bg-primary rounded hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-danger text-white rounded hover:bg-primary"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
