import { useNavigate, useParams } from "react-router";

const ShukrInspirationEditPage = () => {
    const {id} = useParams();
    const navigation =  useNavigate();
    return (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-6"> Edit Shukr Inspirations</h1>
            <button
                onClick={() => navigation("/shukr-ins")}
                className="bg-primary hover:bg-secondary text-white  rounded text-xs py-1 px-2"
            >
                Back
            </button>
            </div>
            <div>
                <h1>Shukr Inspirations {id}</h1>
            </div>
        </div>
    );
};

export default ShukrInspirationEditPage;