import axios from "axios";
import { useState } from "react";

export const useFileCompression = () => {
  const [downloadUrl, setDownloadUrl] = useState("");

  const compressFile = async (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/v1/image/compress",
        formData,
        {
          responseType: "blob",
        },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
    } catch (error) {
      console.error("Error uploading the file", error);
      alert("Failed to compress the image");
    }
  };

  return { compressFile, downloadUrl, setDownloadUrl };
};
