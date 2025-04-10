import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [editState, setEditState] = useState("");
  const [editStatusMonitor, setEditStatusMonitor] = useState(false);
  const [editWeight, setEditWeight] = useState(0);
  const [editEntryDate, setEditEntryDate] = useState("");
  const [editImage, setEditImage] = useState(null); // Nuevo estado para imagen editada

  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    if (editIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editIndex]);

  const handleViewDetails = (product, index) => {
    navigate("/detalle-producto", {
      state: { product: { ...product, index } },
    });
  };

  const handleEdit = (index, product) => {
    setEditIndex(index);
    setEditValue(product.name);
    setEditCategory(product.category);
    setEditStatus(product.status === "Usado");
    setEditState(product.state);
    setEditStatusMonitor(product.statusMonitor === "Monitor Independiente");
    setEditWeight(product.weight);
    setEditEntryDate(product.entryDate);
    setEditImage(product.image); // Cargar la imagen del producto
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImage(reader.result); // Guarda la imagen como base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (index) => {
    const today = new Date().toISOString().split("T")[0];
    if (editEntryDate > today) {
      alert("La fecha de ingreso no puede ser futura.");
      return;
    }

    if (editValue.trim() && editCategory.trim() && editEntryDate) {
      onEdit(index, {
        name: editValue,
        category: editCategory,
        status: editStatus ? "Usado" : "Nuevo",
        state: editState,
        statusMonitor: editStatusMonitor
          ? "Monitor Independiente"
          : "Monitor Integrado",
        weight: editWeight,
        entryDate: editEntryDate,
        image: editImage, // Guardar la imagen editada
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
    setEditEntryDate("");
    setEditImage(null); // Limpiar la imagen editada
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateRange =
      (!startDate || product.entryDate >= startDate) &&
      (!endDate || product.entryDate <= endDate);

    return matchesSearch && matchesDateRange;
  });

  return (
    <div>
      <h2>Lista de Productos</h2>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="date-filter"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="date-filter"
        />
        <button onClick={handleClearSearch} className="clear-btn">
          Limpiar
        </button>
      </div>

      <ul>
        {filteredProducts.map((product, index) => (
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

                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={editStatus}
                      onChange={() => setEditStatus(!editStatus)}
                    />
                    Equipo Usado
                  </label>

                  <select
                    value={editState}
                    onChange={(e) => setEditState(e.target.value)}
                  >
                    <option value="">Seleccione el estado</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>

                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={editStatusMonitor}
                      onChange={() => setEditStatusMonitor(!editStatusMonitor)}
                    />
                    Monitor Independiente
                  </label>

                  <label className="text-left">Peso</label>
                  <input
                    type="number"
                    placeholder="Peso del Equipo"
                    value={editWeight}
                    onChange={(e) => setEditWeight(e.target.value)}
                  />

                  <input
                    type="date"
                    value={editEntryDate}
                    onChange={(e) => setEditEntryDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                  />

                  {/* Vista previa de la imagen existente */}
                  {editImage && (
                    <img
                      src={editImage}
                      alt="Vista previa"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginBottom: "5px",
                      }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </>
              ) : (
                <div className="centro">
                  <span>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={`Vista previa de ${product.product}`}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "8px",
                          verticalAlign: "middle",
                          marginRight: "5px",
                          border: "1px solid #ccc",
                        }}
                      />
                    )}{" "}
                    {product.name} - <strong>{product.category}</strong> -{" "}
                    {product.status} - <strong>{product.state}</strong> -{" "}
                    {product.statusMonitor} -{" "}
                    <strong>{product.weight} Kg </strong> - {product.entryDate}
                  </span>
                </div>
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
                  <button onClick={() => handleViewDetails(product, index)}>
                    Ver Detalles
                  </button>
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
