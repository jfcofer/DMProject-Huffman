import axios from "axios";
import { useState } from "react";

export const useFileDecompression = () => {
  const [downloadUrl, setDownloadUrl] = useState("");

  const decompressFile = async (selectedFile, format) => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `http://localhost:8000/v1/image/decompress/${format}`,
        formData,
        {
          responseType: "blob", // Expecting a blob as a response (the decompressed image)
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
    } catch (error) {
      console.error("Error decompressing the file", error);
      alert("Failed to decompress the image");
    }
  };

  return { decompressFile, downloadUrl, setDownloadUrl };
};
