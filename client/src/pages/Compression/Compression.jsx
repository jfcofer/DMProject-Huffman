import { useState } from "react";
import Spinner from "../../components/Spinner";
import CompressButton from "./components/CompressButton";
import DownloadButton from "./components/DownloadButton";
import ImagePicker from "./components/ImagePicker";
import RestartButton from "./components/RestartButton";
import { useFileCompression } from "./hooks/useFileCompression";

function Compression() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { compressFile, downloadUrl, setDownloadUrl, loading } =
    useFileCompression();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCompress = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }
    compressFile(selectedFile);
  };

  const handleRestart = () => {
    setSelectedFile(null);
    setDownloadUrl("");
  };

  return (
    <div className="mt-2 flex flex-col items-center gap-7 p-6">
      <ImagePicker
        selectedFile={selectedFile}
        onFileSelect={handleFileSelect}
      />
      {loading && <Spinner />}
      <div className="flex w-full flex-col items-center justify-evenly gap-5 md:flex-row">
        <CompressButton disabled={!selectedFile} onClick={handleCompress} />
        <DownloadButton selectedFile={selectedFile} downloadUrl={downloadUrl} />
      </div>
      {selectedFile && <RestartButton onRestart={handleRestart} />}
    </div>
  );
}

export default Compression;
