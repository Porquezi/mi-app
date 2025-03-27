import React, { useState } from "react";

const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [isUsed, setIsUsed] = useState(false); // Estado para determinar si el equipo es usado4
  const [state, setState] = useState("");
  const [independentmonitor, setIndependentmonitor] = useState(false);
  const [weight, setWeight] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.trim() && category.trim()) {
      onAdd({
        name: product,
        category,
        status: isUsed ? "Usado" : "Nuevo",
        state,
        statusMonitor: independentmonitor
          ? "Monitor Independiente"
          : "Monitor Integrado",
        weight,
      });
      setProduct("");
      setCategory("");
      setIsUsed(false);
      setState("");
      setIndependentmonitor(false);
      setWeight(0);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Marca del Equipo"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
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

      {/* Checkbox para estado del equipo */}
      <label class="checkbox-container">
        <input
          type="checkbox"
          id="estado-equipo"
          checked={isUsed}
          onChange={() => setIsUsed(!isUsed)}
        />
        Equipo Usado
      </label>

      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">Seleccione el estado</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
        <option value="Mantenimiento">Mantenimiento</option>
      </select>

      <label class="checkbox-container">
        <input
          type="checkbox"
          id="estado-equipo"
          checked={independentmonitor}
          onChange={() => setIndependentmonitor(!independentmonitor)}
        />
        Monitor Independiente
      </label>

      <label class="text-left">
        Peso
      </label>
      <input
          type="number"
          placeholder="Peso del Equipo"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

      <button type="submit">Agregar</button>
    </form>
  );
};

export default ProductForm;
