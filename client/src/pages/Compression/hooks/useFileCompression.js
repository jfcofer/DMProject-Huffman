import axios from "axios";
import { useState } from "react";
import delay from "../../../utils/delay";

export const useFileCompression = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const compressFile = async (selectedFile) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${apiUrl}/v1/image/compress`,
        formData,
        {
          responseType: "blob",
        },
      );
      await delay(1000);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading the file", error);
      alert("Failed to compress the image");
      setLoading(false);
    }
  };

  return { compressFile, loading, downloadUrl, setDownloadUrl };
};
