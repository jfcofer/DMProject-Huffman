import { useState } from "react";
import SupportedFormats from "./../../models/SupportedFormats";
import DecompressButton from "./components/DecompressButton";
import DownloadButton from "./components/DownloadButton";
import FilePicker from "./components/FilePicker";
import FormatSelector from "./components/FormatSelector";
import RestartButton from "./components/RestartButton";
import { useFileDecompression } from "./hooks/useFileDecompression";
import Spinner from "../../components/Spinner";

function Decompression() {
  const [selectedFormat, setSelectedFormat] = useState(SupportedFormats.PNG);
  const [selectedFile, setSelectedFile] = useState(null);
  const { decompressFile, downloadUrl, setDownloadUrl ,loading} =
    useFileDecompression();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
    setDownloadUrl("");
  };

  const handleDecompress = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }
    decompressFile(selectedFile, selectedFormat);
  };

  const handleRestart = () => {
    setSelectedFormat(SupportedFormats.PNG);
    setSelectedFile(null);
    setDownloadUrl("");
  };

  return (
    <div className="mt-2 flex flex-col items-center gap-7 p-6">
      <div className="flex w-full flex-col gap-8 md:flex-row">
        <FilePicker
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
        />
        <FormatSelector
          selectedFormat={selectedFormat}
          onSelectFormat={handleFormatChange}
        />
      </div>
      {loading && <Spinner/>}
      <div className="flex w-full flex-col items-center justify-evenly gap-5 md:flex-row">
        <DecompressButton disabled={!selectedFile} onClick={handleDecompress} />
        <DownloadButton
          selectedFormat={selectedFormat}
          downloadUrl={downloadUrl}
        />
      </div>
      {selectedFile && <RestartButton onRestart={handleRestart} />}
    </div>
  );
}

export default Decompression;
