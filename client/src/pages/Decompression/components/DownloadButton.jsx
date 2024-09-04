import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function DownloadButton({ selectedFormat, downloadUrl }) {
  return (
    <a
      href={downloadUrl ? downloadUrl : undefined}
      className={`flex h-20 w-4/5 cursor-pointer flex-row items-center justify-center gap-5 rounded-2xl p-5 text-gray-100 transition-all duration-300 md:w-2/5 ${
        !downloadUrl
          ? "pointer-events-none cursor-not-allowed bg-gray-600"
          : "bg-green-900 hover:scale-105"
      }`}
      download={
        downloadUrl ? `decompressed_image.${selectedFormat}` : undefined
      }
    >
      <FontAwesomeIcon icon={faDownload} size="2x" />
      <span className="text-center text-lg font-bold md:text-xl">
        Descargar Imagen
      </span>
    </a>
  );
}

DownloadButton.propTypes = {
  selectedFormat: PropTypes.string,
  downloadUrl: PropTypes.string,
};
