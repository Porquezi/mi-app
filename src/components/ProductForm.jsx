import React, { useState } from "react";

const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [isUsed, setIsUsed] = useState(false); // Estado para determinar si el equipo es usado4
  const [state, setState] = useState("");
  const [independentmonitor, setIndependentmonitor] = useState(false);
  const [weight, setWeight] = useState(0);
  const [entryDate, setEntryDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.trim() && category.trim() && entryDate) {
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
      });
      setProduct("");
      setCategory("");
      setIsUsed(false);
      setState("");
      setIndependentmonitor(false);
      setWeight(0);
      setEntryDate("");
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

  {/* Botón */}
  <div className="button-container">
    <button type="submit" className="submit-button">Agregar</button>
  </div>
</form>

  );
};

export default ProductForm;
