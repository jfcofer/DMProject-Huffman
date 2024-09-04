import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavCard({ to, children }) {
  return (
    <Link to={to}>
      <div className="text-center transform justify-center rounded px-5 py-3 text-gray-200 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:text-gray-700">
        {children}
      </div>
    </Link>
  );
}
export default NavCard;

NavCard.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};
