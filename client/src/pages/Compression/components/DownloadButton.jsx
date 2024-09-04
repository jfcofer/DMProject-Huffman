import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function DownloadButton({ selectedFile, downloadUrl }) {
  return (
    <a
      href={downloadUrl ? downloadUrl : undefined}
      className={`flex h-20 w-2/5 cursor-pointer flex-row items-center justify-center gap-5 rounded-2xl text-gray-100 transition-all duration-300 ${
        !downloadUrl
          ? "pointer-events-none cursor-not-allowed bg-gray-600"
          : "bg-green-900 hover:scale-105"
      }`}
      download={
        downloadUrl && selectedFile ? `compressed_image.huff` : undefined
      }
    >
      <FontAwesomeIcon icon={faDownload} size="2x" />
      <span className="text-xl font-bold">Descargar Archivo Comprimido</span>
    </a>
  );
}

DownloadButton.propTypes = {
  selectedFile: PropTypes.object,
  downloadUrl: PropTypes.string,
};
