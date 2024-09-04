import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function RestartButton({ onRestart }) {
  return (
    <button
      onClick={onRestart}
      className="flex h-20 w-3/5 transform cursor-pointer flex-row items-center justify-center gap-5 rounded-2xl bg-slate-400 text-gray-900 transition-all duration-300 hover:scale-105 md:w-2/5"
    >
      <FontAwesomeIcon icon={faArrowsRotate} size="2x" />
      <span className="text-xl font-bold">Reiniciar</span>
    </button>
  );
}

RestartButton.propTypes = {
  onRestart: PropTypes.func,
};
