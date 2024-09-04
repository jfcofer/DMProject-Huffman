import { Link } from "react-router-dom";
function HeaderTitle() {
  return (
    <Link to="/" className="flex flex-row gap-3  items-center">
      <img src="/images/binary_logo.png" className="h-14"/>
      <h1 className="text-2xl font-bold text-center md:text-left">Compresión de Huffman</h1>
    </Link>
  );
}
export default HeaderTitle;
