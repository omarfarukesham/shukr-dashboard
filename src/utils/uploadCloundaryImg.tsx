
// const CLOUDINARY_UPLOAD_PRESET = "ecom_preset";
// const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbtskylxt/image/upload";

// const CLOUDINARY_UPLOAD_PRESET = "shukrApp";
// const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/di5naers2/image/upload";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

export const UploadToCloudinary = async (file: File): Promise<string> => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET!);
    // formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);
  
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData
    });
    // const response = await fetch(process.env.CLOUDINARY_URL!, {
    //   method: "POST",
    //   body: formData
    // });
  
    if (!response.ok) throw new Error("Upload failed");
    
    const data = await response.json();
    return data.secure_url;
  };