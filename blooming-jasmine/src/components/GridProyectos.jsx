export default function GridProyectos({ proyectos, onClickProyecto, onEliminar }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {proyectos.map((p) => (
        <div
          key={p.id}
          className="relative rounded-lg shadow hover:shadow-xl transition cursor-pointer group"
        >
          {/* Imagen / preview */}
          <img
            src={p.imagen}
            alt={p.titulo}
            className="w-full h-48 object-cover rounded-lg"
            onClick={() => onClickProyecto(p)}
          />

          {/* Contenido */}
          <div className="p-3" onClick={() => onClickProyecto(p)}>
            <h3 className="font-bold text-lg">{p.titulo}</h3>
            <p className="text-sm">{p.autor}</p>
          </div>

          {/* --- ICONO DE BASURA (solo en hover) --- */}
          <button
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition text-red-600"
            onClick={(e) => {
              e.stopPropagation(); // evita abrir el popup al eliminar
              onEliminar(p.id);
            }}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}
