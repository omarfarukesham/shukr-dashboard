export const UploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);
  
    const response = await fetch(process.env.CLOUDINARY_URL!, {
      method: "POST",
      body: formData
    });
  
    if (!response.ok) throw new Error("Upload failed");
    
    const data = await response.json();
    return data.secure_url;
  };