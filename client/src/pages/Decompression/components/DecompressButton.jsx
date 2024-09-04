import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function DecompressButton({ disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex h-20 w-4/5 transform cursor-pointer flex-row items-center justify-center gap-5 rounded-2xl bg-cyan-800 p-5 text-gray-100 transition-all duration-300 hover:scale-105 disabled:pointer-events-none disabled:transform-none disabled:bg-gray-600 md:w-2/5"
    >
      <FontAwesomeIcon icon={faUpload} size="2x" />
      <span className="text-center text-lg font-bold md:text-xl">
        Descomprimir Imagen
      </span>
    </button>
  );
}

DecompressButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
