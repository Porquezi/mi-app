import React, { useState } from "react";

const ProductList = ({ products, onDelete, onEdit }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [editState, setEditState] = useState("");
  const [editStatusMonitor, setEditStatusMonitor] = useState(false);
  const [editWeight, setEditWeight] = useState(0);

  const handleEdit = (index, product) => {
    setEditIndex(index);
    setEditValue(product.name);
    setEditCategory(product.category);
    setEditStatus(product.status === "Usado"); // Convertir a booleano
    setEditState(product.state);
    setEditStatusMonitor(product.statusMonitor === "Monitor Independiente");
    setEditWeight(product.weight);
  };

  const handleSave = (index) => {
    if (editValue.trim() && editCategory.trim()) {
      onEdit(index, {
        name: editValue,
        category: editCategory,
        status: editStatus ? "Usado" : "Nuevo",
        state: editState,
        statusMonitor: editStatusMonitor
          ? "Monitor Independiente"
          : "Monitor Integrado",
        weight: editWeight,
      });
      setEditIndex(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue("");
    setEditCategory("");
    setEditStatus(false);
    setEditState("");
    setEditStatusMonitor(false);
    setEditWeight(0);
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index} className="product-item">
            <div className="product-content">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
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

                  {/* Checkbox para editar estado del equipo */}
                  <label class="checkbox-container">
                    <input
                      type="checkbox"
                      id="estado-equipo"
                      checked={editStatus}
                      onChange={() => setEditStatus(!editStatus)}
                    />
                    Equipo Usado
                  </label>
                  
                  <select value={editState} onChange={(e) => setEditState(e.target.value)}>
        <option value="">Seleccione el estado</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
        <option value="Mantenimiento">Mantenimiento</option>
      </select>

      <label class="checkbox-container">
        <input
          type="checkbox"
          id="estado-equipo"
          checked={editStatusMonitor}
          onChange={() => setEditStatusMonitor(!editStatusMonitor)}
        />
        Monitor Independiente
      </label>

      <label class="text-left">
        Peso
      </label>
      <input
          type="number"
          placeholder="Peso del Equipo"
          value={editWeight}
          onChange={(e) => setEditWeight(e.target.value)}
        />

                </>
              ) : (
                <span>
                  {product.name} - <strong>{product.category}</strong> -{" "}
                  {product.status} - <strong>{product.state}</strong> -{" "}
                  {product.statusMonitor} - <strong>{product.weight}</strong>
                </span>
              )}
            </div>
            <div className="button-group">
              {editIndex === index ? (
                <>
                  <button
                    className="save-btn"
                    onClick={() => handleSave(index)}
                  >
                    Guardar
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(index, product)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(index)}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
