import { useNavigate } from 'react-router';

const ShukrInspirationAddPage = () => {
    const navigation = useNavigate();
    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-6"> Add Shukr Inspirations</h1>
            <button
                onClick={() => navigation("/shukr-ins")}
                className="bg-primary hover:bg-secondary text-white  rounded text-xs py-1 px-2"
            >
                Back
            </button>
            </div>
        </div>
    );
};

export default ShukrInspirationAddPage;