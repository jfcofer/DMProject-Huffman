import HeaderTitle from "./components/HeaderTitle";
import NavCard from "./components/NavCard";

function Header() {
  return (
    <header className="bg-slate-900 p-4 text-stone-200">
      <nav className="flex flex-col justify-center">
        <div className="flex flex-col-reverse gap-5 items-center justify-between px-12 md:flex-row">
          <HeaderTitle />
          <a href="https://www.espol.edu.ec/" target="blank">
            <img
              src="/images/espol_logo.png"
              alt="Logo de la Escuela Superior Politécnica del Litoral"
              className="w-36 md:w-56 brightness-0 invert"
            />
          </a>
        </div>
        <div className="mb-1 mt-5 flex flex-col justify-center gap-3 font-bold uppercase md:mt-3 md:flex-row md:gap-10">
          <NavCard to="/compress">Comprimir</NavCard>
          <NavCard to="/decompress">Descomprimir</NavCard>
        </div>
      </nav>
    </header>
  );
}

export default Header;
