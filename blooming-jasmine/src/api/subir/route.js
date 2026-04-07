import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  const formData = await request.formData();
  
  const archivo = formData.get("archivo");
  const bytes = await archivo.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Ruta final del archivo
  const ruta = path.join(process.cwd(), "media", archivo.name);

  // Guardar archivo en /media
  await writeFile(ruta, buffer);

  const nuevoProyecto = {
    id: Date.now(),
    titulo: formData.get("titulo"),
    autor: formData.get("autor"),
    tipo: formData.get("tipo"),
    vistas: formData.get("vistas"),
    favoritos: formData.get("favoritos"),
    imagen: "/media/" + archivo.name,
  };

  return new Response(JSON.stringify(nuevoProyecto), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}