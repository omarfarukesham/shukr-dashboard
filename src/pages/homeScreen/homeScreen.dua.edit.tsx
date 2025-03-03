import AddContentForm from "@/components/Form/AddContentForm";
import { useGetContentItemQuery, useUpdateContentItemMutation } from "@/feature/homescreen/homeSlice";
import { IContent } from "@/type/homeContent.type";
import toast from "react-hot-toast";
import {  useNavigate, useParams } from "react-router";

const DailyDuaEditPage = () => {
    const {id} = useParams();
    const [updateContentItem] = useUpdateContentItemMutation();
    const navigation =  useNavigate();
    const {data: dua, isLoading} = useGetContentItemQuery({ id: id as string });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const defaultValues: Omit<IContent, "image"> = (dua?.data as Omit<IContent, "image">) || {
        category: 'duaOfTheDay',
        status: 'draft' as "published | draft", 
        title: '',
        details: '',
        arabicText: '',
        ref: '',
        isShowing: false, 
        publishDate: '',
        
    };

    const handleSubmit = async (data: IContent| null) => {
        if (!data) {
          return;
        }
        await updateContentItem({  id: id as string, data });
        toast.success('Content added successfully');
        navigation('/daily-dua');
      };


    return (
        <div>
           <div className="flex justify-between items-center">
                <h1>Edit Daily Dua</h1>
                <button onClick={() => navigation('/daily-dua')} className="bg-primary hover:bg-secondary text-white  rounded text-xs py-1 px-2">Back</button>
           </div>
           <div>
           <AddContentForm
            category="duaOfTheDay" 
            refField={true}
            arabicTextField={true}
            requireImage={false}
            defaultValues={defaultValues} 
            onSubmit={handleSubmit} 
       />;
           </div>
        </div>
    );
};

export default DailyDuaEditPage;