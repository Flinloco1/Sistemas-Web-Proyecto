export default function TarjetaProyecto({ titulo, autor, tipo, vistas, favoritos, imagen }) {
  const iconos = {
    Video: "🎬",
    Audio: "🔊",
    Imagen: "🖼️",
  };

  return (
    <div className="bg-[#2b2653] rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform">
      <img src={imagen} alt={titulo} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="text-lg font-bold">{titulo}</h3>
        <p className="text-sm text-gray-300">Por: {autor}</p>
        <div className="flex justify-between text-gray-400 mt-2 text-sm">
          <span>{iconos[tipo]} {tipo}</span>
          <span>👁️ {vistas}</span>
          <span>⭐ {favoritos}</span>
        </div>
      </div>
    </div>
  );
}
