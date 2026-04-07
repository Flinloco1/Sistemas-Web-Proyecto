import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Filtros from "./components/Filtros";
import GridProyectos from "./components/GridProyectos";
import PopupSubir from "./components/PopupSubir";

function App() {

  const eliminarProyecto = async (id) => {
    try {
      await fetch(`http://localhost:4000/proyectos/${id}`, {
        method: "DELETE",
      });

      // eliminar del frontend
      setProyectos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error eliminando proyecto:", error);
    }
  };

  const [filtro, setFiltro] = useState("Todos");
  const [proyectos, setProyectos] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  // popup para ver proyecto
  const [proyectoActivo, setProyectoActivo] = useState(null);

  // estado para el buscador
  const [busqueda, setBusqueda] = useState("");

  // cargar desde backend
  const cargarProyectos = async () => {
    const res = await fetch("http://localhost:4000/proyectos");
    const data = await res.json();
    setProyectos(data);
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

  // FILTRO FINAL = filtro por tipo + filtro por búsqueda
  const proyectosFiltrados = proyectos
    .filter((p) => (filtro === "Todos" ? true : p.tipo === filtro))
    .filter((p) => {
      const t = busqueda.toLowerCase();
      return (
        p.titulo.toLowerCase().includes(t) ||
        p.autor.toLowerCase().includes(t) ||
        p.tipo.toLowerCase().includes(t)
      );
    });

  return (
    <div>
      {/* Navbar ahora recibe onBuscar */}
      <Navbar
        abrirPopup={() => setMostrarPopup(true)}
        onBuscar={(texto) => setBusqueda(texto)}
      />

      <h2 className="text-center text-2xl mt-6 font-semibold">
        Explorar proyectos
      </h2>

      <Filtros filtro={filtro} setFiltro={setFiltro} />

      <GridProyectos
        proyectos={proyectosFiltrados}
        onClickProyecto={setProyectoActivo}
        onEliminar={eliminarProyecto}
      />

      {/* POPUP SUBIR */}
      {mostrarPopup && (
        <PopupSubir
          cerrar={() => setMostrarPopup(false)}
          onSubido={(nuevo) => setProyectos([...proyectos, nuevo])}
        />
      )}

      {/* POPUP VER PROYECTO */}
      {proyectoActivo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setProyectoActivo(null)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-2xl font-bold text-gray-700 hover:text-black"
              onClick={() => setProyectoActivo(null)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {proyectoActivo.titulo}
            </h2>

            {proyectoActivo.tipo === "Imagen" && (
              <img
                src={proyectoActivo.imagen}
                alt=""
                className="w-full rounded-lg"
              />
            )}

            {proyectoActivo.tipo === "Audio" && (
              <audio controls className="w-full mt-4">
                <source src={proyectoActivo.archivoReal} />
              </audio>
            )}

            {proyectoActivo.tipo === "Video" && (
              <video controls className="w-full mt-4 rounded-lg">
                <source src={proyectoActivo.archivoReal} />
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
