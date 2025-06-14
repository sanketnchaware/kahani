import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [cdnUrl, setCdnUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kahani_images"); // Replace with your unsigned preset

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/kahani/image/upload",
        formData
      );
      setCdnUrl(res.data.secure_url);
      console.log("Image uploaded:", res.data.secure_url);

      // OPTIONAL: send `res.data.secure_url` to your backend API to store in DB
      // await axios.post('/api/save-image-url', { url: res.data.secure_url });
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-600 text-white px-4 py-2"
      >
        Upload Image
      </button>

      {cdnUrl && (
        <div className="mt-4">
          <p>Image URL:</p>
          <a href={cdnUrl} target="_blank" rel="noreferrer">
            {cdnUrl}
          </a>
          <img src={cdnUrl} alt="Uploaded" className="mt-2 w-48" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
