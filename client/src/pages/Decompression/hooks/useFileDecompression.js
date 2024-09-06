import axios from "axios";
import { useState } from "react";
import delay from "../../../utils/delay";

export const useFileDecompression = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const decompressFile = async (selectedFile, format) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${apiUrl}/v1/image/decompress/${format}`,
        formData,
        {
          responseType: "blob", // Expecting a blob as a response (the decompressed image)
        },
      );
      await delay(1000);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
      setLoading(false);
    } catch (error) {
      console.error("Error decompressing the file", error);
      alert("Failed to decompress the image");
      setLoading(false);
    }
  };

  return { decompressFile, downloadUrl, setDownloadUrl, loading };
};
