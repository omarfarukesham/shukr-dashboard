import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import Button from "@/components/ui/Button";
import { TProduct } from "@/type/product.type";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";

type ProductTableProps = {
  products: TProduct[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  console.log(products)
  return (
    <Table>
      {/* <TableCaption>List of available products.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Sl</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Price (BDT)</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={product._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>{product.author}</TableCell>
            <TableCell>
              {product?.image ? (
                <img 
                  src={product.image} 
                  alt={`${product.title} cover`}
                  className="w-8 h-8 object-cover rounded-md"
                />
              ) : (
                <div>
                  No image
                </div>
              )}
            </TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell className="flex gap-2 justify-center">
              <button onClick={() => product._id && onEdit(product._id.toString())} className="text-sm text-white bg-primary hover:bg-secondary p-1 rounded-lg">
                  <EditIcon />
              </button>
             
              <button  onClick={() => product._id && onDelete(product._id.toString())} className="text-sm text-white bg-danger p-1 rounded-lg hover:bg-primary">
                <DeleteIcon />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
