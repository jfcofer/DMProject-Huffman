import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function CompressButton({ disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex h-20 w-2/5 transform cursor-pointer flex-row items-center justify-center gap-5 rounded-2xl bg-cyan-800 text-gray-100 transition-all duration-300 hover:scale-105 disabled:pointer-events-none disabled:transform-none disabled:bg-gray-600"
    >
      <FontAwesomeIcon icon={faUpload} size="2x" />
      <span className="text-xl font-bold">Comprimir Imagen</span>
    </button>
  );
}

CompressButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.object,
};
