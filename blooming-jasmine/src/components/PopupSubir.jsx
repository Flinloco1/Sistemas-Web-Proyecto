import { useState } from "react";

export default function PopupSubir({ cerrar, onSubido, usuario }) {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("Imagen");
  const [archivo, setArchivo] = useState(null);

  const enviar = async () => {
    const form = new FormData();
    form.append("titulo", titulo);
    form.append("autor", usuario.nombre); // nombre del usuario logueado
    form.append("tipo", tipo);
    form.append("archivo", archivo);

    const res = await fetch("http://localhost:4000/subir", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    onSubido(data.proyecto);
    cerrar();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-[#1d1b2f] p-6 rounded-lg text-white w-96">
        <h2 className="text-xl mb-1 font-bold">Subir nuevo proyecto</h2>
        <p className="text-sm text-gray-400 mb-4">Subiendo como <span className="text-purple-400 font-semibold">{usuario.nombre}</span></p>

        <input
          type="text"
          placeholder="Título"
          className="w-full p-2 mb-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setTitulo(e.target.value)}
        />
        <select
          className="w-full p-2 mb-3 rounded bg-gray-800 focus:outline-none"
          onChange={(e) => setTipo(e.target.value)}
        >
          <option>Imagen</option>
          <option>Audio</option>
          <option>Video</option>
        </select>
        <input
          type="file"
          className="w-full p-2 mb-4"
          onChange={(e) => setArchivo(e.target.files[0])}
        />
        <button
          onClick={enviar}
          className="w-full bg-purple-500 hover:bg-purple-600 p-2 rounded transition-colors"
        >
          Subir archivo
        </button>
        <button
          onClick={cerrar}
          className="w-full mt-2 bg-gray-600 hover:bg-gray-700 p-2 rounded transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
