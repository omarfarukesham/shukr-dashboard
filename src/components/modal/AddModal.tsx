import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  
  interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
  }
  
  const AddModal = ({ 
    isOpen, 
    onClose, 
    title = "Add New",
    description,
    children 
  }: AddModalProps) => {
    return (
     
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black gap-5">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  };
  
  export default AddModal;