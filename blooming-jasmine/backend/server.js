import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());


const proyectosPath = path.join(__dirname, "..", "data", "proyectos.json");

function leerProyectos() {
  const data = fs.readFileSync(proyectosPath, "utf8");
  return JSON.parse(data);
}

function guardarProyectos(lista) {
  fs.writeFileSync(proyectosPath, JSON.stringify(lista, null, 2));
}


const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.use((req, res, next) => {
  if (req.url.endsWith(".mp3")) {
    res.setHeader("Content-Type", "audio/mpeg");
  }
  next();
});


app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));



function detectarTipo(extension) {
  extension = extension.toLowerCase();

  const videos = ["mp4", "mov", "avi", "mkv", "webm"];
  const audios = ["mp3", "wav", "ogg", "m4a"];
  const imagenes = ["png", "jpg", "jpeg", "gif", "webp"];

  if (videos.includes(extension)) return "Video";
  if (audios.includes(extension)) return "Audio";
  if (imagenes.includes(extension)) return "Imagen";

  return "Archivo"; 
}



app.get("/proyectos", (req, res) => {
  const proyectos = leerProyectos();
  res.json(proyectos);
});


app.post("/subir", upload.single("archivo"), (req, res) => {
  const proyectos = leerProyectos();

  const nombreArchivo = req.file.filename;
  let urlArchivo = `http://localhost:4000/uploads/${nombreArchivo}`;

  let miniatura = urlArchivo; 

  if (req.body.tipo === "Audio") {
    miniatura = "http://localhost:4000/uploads/audio-default.png";
  }

  if (req.body.tipo === "Video") {
    miniatura = "http://localhost:4000/uploads/video-default.png";
  }

  const nuevo = {
    id: proyectos.length + 1,
    titulo: req.body.titulo || "Nuevo proyecto",
    autor: req.body.autor || "Desconocido",
    tipo: req.body.tipo,
    vistas: "0",
    favoritos: 0,
    imagen: miniatura,
    archivoReal: urlArchivo,
  };

  proyectos.push(nuevo);
  guardarProyectos(proyectos);

  res.json({ mensaje: "Proyecto agregado", proyecto: nuevo });
});


app.delete("/proyectos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  let proyectos = leerProyectos();

  const proyecto = proyectos.find((p) => p.id === id);
  if (!proyecto) {
    return res.status(404).json({ error: "Proyecto no encontrado" });
  }

  const archivoURL = proyecto.archivoReal || proyecto.imagen; 
  const nombreArchivo = archivoURL.replace("http://localhost:4000/uploads/", "");
  const rutaArchivo = path.join(__dirname, "..", "uploads", nombreArchivo);

  if (fs.existsSync(rutaArchivo)) {
    fs.unlinkSync(rutaArchivo);
  }

  proyectos = proyectos.filter((p) => p.id !== id);
  guardarProyectos(proyectos);

  res.json({ mensaje: "Proyecto eliminado", proyecto });
});



// ---- INICIAR SERVIDOR ----
app.listen(4000, () => console.log("Backend corriendo en puerto 4000"));