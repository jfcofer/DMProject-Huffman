import PropTypes from "prop-types";
import SupportedFormats from "./../../../models/SupportedFormats";

export default function FormatSelector({ selectedFormat, onSelectFormat }) {
  const handleFormatChange = (event) => {
    const selectedValue = event.target.value;
    onSelectFormat(selectedValue);
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <label htmlFor="format-select" className="text-lg font-medium text-center">
        Selecciona el Formato de la Imagen
      </label>
      <select
        id="format-select"
        value={selectedFormat}
        onChange={handleFormatChange}
        className="rounded-lg border p-2"
      >
        {Object.values(SupportedFormats).map((format) => (
          <option key={format} value={format}>
            {format.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

FormatSelector.propTypes = {
  selectedFormat: PropTypes.string,
  onSelectFormat: PropTypes.func,
};
