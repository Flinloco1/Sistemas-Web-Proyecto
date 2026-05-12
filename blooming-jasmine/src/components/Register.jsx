import { useState } from "react";

export default function Register({ onRegistrado, irALogin }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegistro = () => {
    if (!nombre || !email || !password) {
      setError("Por favor rellena todos los campos.");
      return;
    }
    // Simulación: guardamos el usuario en memoria
    onRegistrado({ nombre, email });
  };

  return (
    <div className="min-h-screen bg-[#0d0b1f] flex flex-col items-center justify-center text-white">
      <div className="bg-[#1d1b2f] p-8 rounded-2xl shadow-lg w-96">

        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain mb-2" />
          <h1 className="text-2xl font-bold">Blooming Jasmine</h1>
          <span className="text-sm text-gray-400">Archivo Digital Artístico</span>
        </div>

        <h2 className="text-xl font-semibold mb-5 text-center">Crear cuenta</h2>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="Nombre de usuario"
          className="w-full p-2 mb-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-2 mb-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-5 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegistro}
          className="w-full bg-purple-500 hover:bg-purple-600 p-2 rounded-lg font-semibold transition-colors"
        >
          Registrarse
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          ¿Ya tienes cuenta?{" "}
          <span
            className="text-purple-400 hover:underline cursor-pointer"
            onClick={irALogin}
          >
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}
