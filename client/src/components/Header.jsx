import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between">
        <h1 className="text-xl">MyApp</h1>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;