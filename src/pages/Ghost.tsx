import { useNavigate } from "react-router-dom";

const Ghost = () => {
  const navigate = useNavigate();
 

 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-7 to-black text-white">
      <div className="mb-8 text-center">
        {/* Ghost Illustration */}
        <svg
          className="w-24 h-24 mx-auto mb-4"
          viewBox="0 0 64 64"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M32,2C15.432,2,2,12.745,2,26c0,10.168,7.143,18.716,17,21.86V62l8-6l8,6v-6.14 c9.857-3.144,17-11.692,17-21.86C62,12.745,48.568,2,32,2z M22,28c0,1.657-1.343,3-3,3s-3-1.343-3-3s1.343-3,3-3 S22,26.343,22,28z M46,28c0,1.657-1.343,3-3,3s-3-1.343-3-3s1.343-3,3-3S46,26.343,46,28z" />
        </svg>
        <h1 className="text-3xl font-bold mb-2">Ghost Login</h1>
        <p className="text-lg text-gray-4">
          Only authorized ghosts can enter this realm.
        </p>
      </div>
      <button onClick={()=>navigate('/login')} className="bg-primary text-white p-2 text-xs rounded-lg hover:bg-secondary">
        Login .. 
      </button>
  
    </div>
  );
};

export default Ghost;