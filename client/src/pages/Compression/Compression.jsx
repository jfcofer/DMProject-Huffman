import { useState } from "react";
import ImagePicker from "./components/ImagePicker";
import CompressButton from "./components/CompressButton";
import DownloadButton from "./components/DownloadButton";
import { useFileCompression } from "./hooks/useFileCompression";

function Compression() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { compressFile, downloadUrl } = useFileCompression();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCompress = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }
    compressFile(selectedFile);
    setSelectedFile(null);
  };

  return (
    <div className="flex flex-col gap-7 p-6 mt-2">
      <ImagePicker onFileSelect={handleFileSelect} />
      <div className="flex flex-row justify-evenly">
        <CompressButton disabled={!selectedFile} onClick={handleCompress} />
        <DownloadButton downloadUrl={downloadUrl} />
      </div>
    </div>
  );
}

export default Compression;
