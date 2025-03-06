import AddContentForm from "@/components/Form/AddContentForm";
import { useAddContentItemMutation } from "@/feature/homescreen/homeSlice";
import { IContent } from "@/type/homeContent.type";
import { ArrowBigLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function StickyNoteAddPage() {
  const navigate = useNavigate();
  const [addContentItem] = useAddContentItemMutation();

  const defaultValues: Omit<IContent, "image"> = {
    title: "",
    details: "",
 
    isShowing: false,
    status: "published | draft",
    category: "duaOfTheDay",
    publishDate: new Date().toISOString(),
  };

  const handleSubmit = async (data: IContent | null) => {
    if (!data) {
      return;
    }
    console.log(data);
    await addContentItem({ data });
    toast.success('Content added successfully');
    navigate('/sticky-notes');
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 mx-6">
        <h1 className="text-xl font-bold">Add What's New</h1>
        <button
          onClick={() => navigate("/sticky-notes")}
          className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-1 flex items-center"
        >
          <ArrowBigLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>
      <AddContentForm
        category="whatNew"
        refField={false}
        arabicTextField={false}
        requireImage={false}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      />
    </>
  );
}





// import { useForm, Controller } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { ArrowBigLeft } from "lucide-react";
// import toast from "react-hot-toast";
// import { useAddContentItemMutation } from "@/feature/homescreen/homeSlice";
// import { IContent, contentSchema } from "@/type/homeContent.type";
// import { zodResolver } from "@hookform/resolvers/zod";
// import DatePicker from "react-datepicker";
// import ReactQuill from "react-quill";
// import { useState } from "react";

// const StickyNoteAddPage = () => {
//   const navigate = useNavigate();
//   const [addContentItem] = useAddContentItemMutation();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//   const { register, handleSubmit, control, formState: { errors } } = useForm<IContent>({
//     resolver: zodResolver(contentSchema),
//     defaultValues: {
//         title: "",
//         details: "",
//         category: "whatNew",
//         status: "published | draft",
//         isShowing: false,
//         publishDate: new Date().toISOString(),
//       }
//   });

//   console.log(errors)
//   const handleFormSubmit = async (formData: IContent) => {
//     setIsSubmitting(true)
//     try {
//       const postData = {
//         ...formData,
//         category: "whatNew" 
//       };
      
//       await addContentItem({ data: postData }).unwrap();
//       toast.success("Sticky note added successfully");
//       setIsSubmitting(true)
//       navigate("/sticky-notes");

//     } catch (error) {
//       toast.error(`Failed to add sticky note ${error}`);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center mb-6 mx-6">
//         <h1 className="text-xl font-bold">Add Sticky Notes</h1>
//         <button
//           onClick={() => navigate("/sticky-notes")}
//           className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-1 flex items-center"
//         >
//           <ArrowBigLeft className="w-4 h-4 mr-1" />
//           Back
//         </button>
//       </div>
//       <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-lg mx-auto space-y-4">
//         {/* Title Field */}
//         <div>
//           <label className="block text-lg font-medium">Title</label>
//           <input
//             {...register("title", { required: "Title is required" })}
//             placeholder="Enter title"
//             className="w-full p-2 border rounded mt-1"
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Details Field */}
//         <div>
//           <label className="block text-lg font-medium">Details</label>
//           <Controller
//             name="details"
//             control={control}
//             render={({ field }) => <ReactQuill {...field} theme="snow" className="h-60 rounded-lg p-3" />}
//           />
//           {errors.details && (
//             <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>
//           )}
//         </div>

//         {/* Date Field */}
//         <div className="pt-10">
//           <label className="text-lg font-medium pr-4">Publish Date</label>
//           <Controller
//             name="publishDate"
//             control={control}
//             render={({ field }) => (
//               <DatePicker  
//                 selected={field.value ? new Date(field.value) : null}
//                 onChange={(date: Date) => field.onChange(date?.toISOString())} 
//                 className="w-full p-2 border border-gray-4 rounded-lg"
//               />
//             )}
//           />
//           {errors.publishDate && <p className="text-danger text-sm">{errors.publishDate.message}</p>}
//         </div>

//         {/* Status Field */}
//         <div>
//           <label className="text-lg font-medium">Status</label>
//           <select {...register("status", { required: true })} className="w-full p-3 border border-gray-4 rounded-lg">
//             <option className="bg-primary  text-white" value="published">Published</option>
//             <option className="bg-primary  text-white" value="draft">Draft</option>
//           </select>
//           {errors.status && <p className="text-danger text-sm">{errors.status.message}</p>}
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="w-full p-3 bg-primary text-white rounded hover:bg-secondary transition-colors">
//         {(isSubmitting) ? 'Processing...' : 'Submit'}
//             Submit

//         </button>
//       </form>
//     </>
//   );
// };

// export default StickyNoteAddPage;


