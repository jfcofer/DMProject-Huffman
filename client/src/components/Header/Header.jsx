import HeaderTitle from "./components/HeaderTitle";
import NavCard from "./components/NavCard";

function Header() {
  return (
    <header className="bg-slate-900 p-4 text-stone-200">
      <nav className="flex flex-col justify-center">
        <div className="flex h-16 flex-row items-center justify-between px-12">
          <HeaderTitle />
          <a href="https://www.espol.edu.ec/" target="blank">
            <img
              src="/images/espol_logo.png"
              alt="Logo de la Escuela Superior Politécnica del Litoral"
              className="w-56 brightness-0 invert"
            />
          </a>
        </div>
        <div className="mb-1 mt-3 flex flex-row justify-center gap-10 font-bold uppercase">
          <NavCard to="/compress">Comprimir</NavCard>
          <NavCard to="/decompress">Descomprimir</NavCard>
        </div>
      </nav>
    </header>
  );
}

export default Header;
