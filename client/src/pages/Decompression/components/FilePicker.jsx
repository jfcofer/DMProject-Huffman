import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function FilePicker({ selectedFile, onFileSelect }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <label
      htmlFor="file-upload"
      className={`flex h-52 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-gray-300 transition-all duration-300 ${
        selectedFile
          ? "pointer-events-none"
          : "hover:scale-105 hover:bg-gray-400"
      }`}
    >
      <input
        id="file-upload"
        type="file"
        accept="*.huff"
        onChange={handleFileChange}
        className="hidden"
      />
      <FontAwesomeIcon icon={faImage} size="4x" />
      {!selectedFile ? (
        <h3 className="text-2xl">Escoge un Archivo Huffman para Descomprimir</h3>
      ) : (
        <h3 className="text-xl">Archivo {selectedFile.name} seleccionado</h3>
      )}
    </label>
  );
}

FilePicker.propTypes = {
  selectedFile: PropTypes.object,
  onFileSelect: PropTypes.func,
};
