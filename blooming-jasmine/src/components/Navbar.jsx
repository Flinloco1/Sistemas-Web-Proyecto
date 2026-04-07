export default function Navbar({ abrirPopup, onBuscar }) {
  return (
    <nav className="bg-[#0d0b1f] px-6 py-4 flex justify-between items-center">
      
      {/* LOGO + título */}
      <div className="flex items-center space-x-3">
        <img 
          src="/logo.png"
          alt="Logo"
          className="w-10 h-10 object-contain"
        />

        <div>
          <h1 className="text-2xl font-bold text-white">Blooming Jasmine</h1>
          <span className="block text-sm text-gray-400">
            Archivo Digital Artístico
          </span>
        </div>
      </div>

      {/* Buscador + botón */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => onBuscar(e.target.value)}
          className="bg-gray-800 text-white rounded-full px-4 py-1 focus:outline-none w-48"
        />

        <button
          onClick={abrirPopup}
          className="bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded-md text-sm"
        >
          Subir ↑
        </button>
      </div>

    </nav>
  );
}
