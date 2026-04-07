// ModalReproductor.jsx
"use client";
import React from "react";

export default function ModalReproductor({ item, onClose }) {
  if (!item) return null;

  const renderContenido = () => {
    if (item.tipo === "Video") {
      return (
        <video src={item.imagen} controls className="w-full rounded-lg" />
      );
    }
    if (item.tipo === "Audio") {
      return (
        <audio src={item.imagen} controls className="w-full mt-4" />
      );
    }
    if (item.tipo === "Imagen") {
      return (
        <img src={item.imagen} className="w-full rounded-lg" />
      );
    }
    return null;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl w-[600px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón X */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl font-bold text-gray-700 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">{item.titulo}</h2>

        {renderContenido()}
      </div>
    </div>
  );
}
