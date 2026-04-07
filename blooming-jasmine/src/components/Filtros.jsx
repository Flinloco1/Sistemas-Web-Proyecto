export default function Filtros({ filtro, setFiltro }) {
  const opciones = ["Todos", "Video", "Audio", "Imagen"];

  return (
    <div className="flex justify-center space-x-4 mt-6">
      {opciones.map((opcion) => (
        <button
          key={opcion}
          onClick={() => setFiltro(opcion)}
          className={`px-4 py-2 rounded-md ${
            filtro === opcion
              ? "bg-purple-600"
              : "bg-[#2b2653] hover:bg-purple-500"
          }`}
        >
          {opcion}
        </button>
      ))}
    </div>
  );
}
