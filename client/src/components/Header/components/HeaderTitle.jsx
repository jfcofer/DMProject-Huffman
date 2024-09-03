import { Link } from "react-router-dom";
function HeaderTitle() {
  return (
    <Link to="/">
      <h1 className="text-2xl font-bold">Huffman</h1>
    </Link>
  );
}
export default HeaderTitle;
