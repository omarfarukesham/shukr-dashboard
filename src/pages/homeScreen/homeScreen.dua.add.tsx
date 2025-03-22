import AddContentForm from "@/components/Form/AddContentForm";
import { useAddContentItemMutation } from "@/feature/homescreen/homeSlice";
import { IContent } from "@/type/homeContent.type";
import { ArrowBigLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function DailyDuaAdd() {
  const navigate = useNavigate();
  const [addContentItem] = useAddContentItemMutation();

  const defaultValues: Omit<IContent, "image"> = {
    title: "",
    details: "",
    arabicText: "",
    ref: "",
    isShowing: false,
    status: "published | draft",
    category: "duaOfTheDay",
    publishDate: new Date().toISOString(),
  };

  const handleSubmit = async (data: IContent | null) => {
    if (!data) {
      return;
    }
    // console.log(data);
    await addContentItem({ data });
    toast.success('Content added successfully');
    navigate('/daily-dua');
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 mx-6">
        <h1 className="text-xl font-bold">Add Daily Dua</h1>
        <button
          onClick={() => navigate("/daily-dua")}
          className="bg-primary hover:bg-secondary text-white rounded text-xs py-1 px-1 flex items-center"
        >
          <ArrowBigLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>
      <AddContentForm
        category="duaOfTheDay"
        refField={true}
        arabicTextField={true}
        requireImage={false}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      />
    </>
  );
}

