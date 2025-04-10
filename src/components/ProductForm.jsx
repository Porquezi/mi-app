import React, { useRef, useState } from "react";

const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [isUsed, setIsUsed] = useState(false); // Estado para determinar si el equipo es usado4
  const [state, setState] = useState("");
  const [independentmonitor, setIndependentmonitor] = useState(false);
  const [weight, setWeight] = useState(0);
  const [entryDate, setEntryDate] = useState("");
  const [image, setImage] = useState(null); // Estado para la imagen del producto
  const [imagePreview, setImagePreview] = useState(null); // Estado para la vista previa de la imagen

  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que la fecha no sea futura
    const today = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
    if (entryDate > today) {
      // Compara la fecha de ingreso con la fecha actual
      alert("La fecha de ingreso no puede ser futura.");
      return;
    }

    if (product.trim() && category.trim() && entryDate && image) {
      onAdd({
        name: product,
        category,
        status: isUsed ? "Usado" : "Nuevo",
        state,
        statusMonitor: independentmonitor
          ? "Monitor Independiente"
          : "Monitor Integrado",
        weight,
        entryDate,
        image,
      });
      setProduct("");
      setCategory("");
      setIsUsed(false);
      setState("");
      setIndependentmonitor(false);
      setWeight(0);
      setEntryDate("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Limpiar el input de archivo
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
        "image/webp",
      ];
      const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB

      if (!validImageTypes.includes(file.type)) {
        alert(
          "Por favor, selecciona un archivo de imagen válido (jpeg, png, jpg, gif, webp)."
        );
        e.target.value = null; // Limpia la selección del archivo
        setImage(null);
        setImagePreview(null);
        return;
      }

      if (file.size > maxSizeInBytes) {
        alert(
          "La imagen es demasiado grande. El tamaño máximo permitido es de 2 MB."
        );
        e.target.value = null;
        setImage(null);
        setImagePreview(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Guarda la imagen como base64
      };
      setImagePreview(URL.createObjectURL(file)); // Para la vista previa
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Primera fila: Marca, Sala y Estado */}
      <div className="form-row">
        <input
          type="text"
          placeholder="Marca del Equipo"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="input-field"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field"
        >
          <option value="">Seleccione la Sala</option>
          <optgroup label="Edificio Giordano">
            <option value="Sala 1E">Sala 1E</option>
            <option value="Lab. Software">Lab. Software</option>
          </optgroup>
          <optgroup label="Edificio Santo Domingo">
            <option value="Sala 1F">Sala 1F</option>
            <option value="Sala 2F">Sala 2F</option>
          </optgroup>
        </select>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="input-field"
        >
          <option value="">Seleccione el estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
          <option value="Mantenimiento">Mantenimiento</option>
        </select>
      </div>

      {/* Segunda fila: Peso y Fecha */}
      <div className="form-row">
        <div className="input-group">
          <label className="input-label">Peso</label>
          <input
            type="number"
            placeholder="Peso del Equipo"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label className="input-label">Fecha de ingreso</label>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            required
            className="input-field"
          />
        </div>
      </div>

      {/* Checkboxes en línea */}
      <div className="checkbox-row">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={isUsed}
            onChange={() => setIsUsed(!isUsed)}
          />
          Equipo Usado
        </label>
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={independentmonitor}
            onChange={() => setIndependentmonitor(!independentmonitor)}
          />
          Monitor Independiente
        </label>
      </div>
      <div>
      <label>Imagen del producto:</label>
      <div className="centro">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef} // Referencia al input de archivo
      />
      </div>

      {/* Vista previa de la imagen */}
      {imagePreview && (
        <div>
          <p>Vista previa de la imagen:</p>
          <img
            src={imagePreview}
            alt="Vista previa"
            style={{
              width: "200px",
              height: "auto",
              marginBottom: "10px",
            }}
          />
        </div>
      )}
      </div>

      {/* Botón */}
      <div className="button-container">
        <button type="submit" className="submit-button">
          Agregar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
