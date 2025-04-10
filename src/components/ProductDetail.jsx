import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetail = ({ onEdit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  // Usa un índice predeterminado si product.index no está definido
  const productIndex = product?.index ?? 0;

  // Helper function to load saved data from localStorage
  const loadSavedData = (key, fallback) => {
    const savedData =
      JSON.parse(localStorage.getItem(`editingProduct-${productIndex}`)) || {};
    return savedData[key] || fallback;
  };

  const [isEditing, setIsEditing] = useState(() => {
    const savedEditingState = localStorage.getItem(`isEditing-${productIndex}`);
    return savedEditingState ? JSON.parse(savedEditingState) : false;
  });

  const [editValue, setEditValue] = useState(() =>
    loadSavedData("name", product?.name || "")
  );
  const [editCategory, setEditCategory] = useState(() =>
    loadSavedData("category", product?.category || "")
  );
  const [editState, setEditState] = useState(() =>
    loadSavedData("state", product?.state || "")
  );
  const [editWeight, setEditWeight] = useState(() =>
    loadSavedData("weight", product?.weight || 0)
  );
  const [editEntryDate, setEditEntryDate] = useState(() =>
    loadSavedData("entryDate", product?.entryDate || "")
  );
  const [editStatus, setEditStatus] = useState(
    () => loadSavedData("status", product?.status === "Usado") === "Usado"
  );
  const [editStatusMonitor, setEditStatusMonitor] = useState(
    () =>
      loadSavedData(
        "statusMonitor",
        product?.statusMonitor === "Monitor Independiente"
      ) === "Monitor Independiente"
  );

  const [editImage, setEditImage] = useState(() =>
    loadSavedData("image", product?.image || null)
  );

  // Save data to localStorage whenever any edit state changes
  useEffect(() => {
    const editingData = {
      name: editValue,
      category: editCategory,
      state: editState,
      weight: editWeight,
      entryDate: editEntryDate,
      status: editStatus ? "Usado" : "Nuevo",
      statusMonitor: editStatusMonitor
        ? "Monitor Independiente"
        : "Monitor Integrado",
      image: editImage,
    };
    localStorage.setItem(
      `editingProduct-${productIndex}`,
      JSON.stringify(editingData)
    );
  }, [
    editValue,
    editCategory,
    editState,
    editWeight,
    editEntryDate,
    editStatus,
    editStatusMonitor,
    productIndex,
    editImage,
  ]);

  // Save editing state to localStorage
  useEffect(() => {
    localStorage.setItem(
      `isEditing-${productIndex}`,
      JSON.stringify(isEditing)
    );
  }, [isEditing, productIndex]);

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      name: editValue,
      category: editCategory,
      state: editState,
      weight: editWeight,
      entryDate: editEntryDate,
      status: editStatus ? "Usado" : "Nuevo",
      statusMonitor: editStatusMonitor
        ? "Monitor Independiente"
        : "Monitor Integrado",
      image: editImage,
    };

    if (productIndex !== undefined) {
      onEdit(productIndex, updatedProduct);
      localStorage.removeItem(`editingProduct-${productIndex}`);
      localStorage.removeItem(`isEditing-${productIndex}`);
      setIsEditing(false);
      navigate(-1);
    } else {
      console.error("El índice del producto no está definido.");
    }
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

  const handleCancel = () => {
    setIsEditing(false);
    localStorage.removeItem(`editingProduct-${productIndex}`);
    localStorage.removeItem(`isEditing-${productIndex}`);
    window.location.reload(); // Recarga la página
  };

  return (
    <div className="detail-container">
      {isEditing ? (
        <>
          <h2>Editar Producto</h2>

          <div className="product-content">
            <label>
              Marca del Equipo:
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            </label>
            Sala:
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
            <label>
              Estado:
              <select
                value={editState}
                onChange={(e) => setEditState(e.target.value)}
              >
                <option value="">Seleccione el estado</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Mantenimiento">Mantenimiento</option>
              </select>
            </label>
            <label>
              Peso:
              <input
                type="number"
                value={editWeight}
                onChange={(e) => setEditWeight(e.target.value)}
              />
            </label>
            <label>
              Fecha de Ingreso:
              <input
                type="date"
                value={editEntryDate}
                onChange={(e) => setEditEntryDate(e.target.value)}
              />
            </label>
            <label className="checkbox-container">
              Equipo Usado:
              <input
                type="checkbox"
                checked={editStatus}
                onChange={() => setEditStatus(!editStatus)}
              />
            </label>
            <label className="checkbox-container">
              Monitor Independiente:
              <input
                type="checkbox"
                checked={editStatusMonitor}
                onChange={() => setEditStatusMonitor(!editStatusMonitor)}
              />
            </label>
            {/* Vista previa de la imagen existente */}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {editImage && (
              <div>
                <img
                  src={editImage}
                  alt="Vista previa"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )}
          </div>
          <div className="button-group">
            <button className="save-button" onClick={handleSave}>
              Guardar
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Detalles del Producto</h2>

          {/* Vista previa de la imagen */}
          {editImage && (
            <div style={{ marginBottom: "20px" }}>
              <img
                src={editImage} // se maneja en base 64
                alt={editImage}
                style={{ width: "200px", height: "200px", borderRadius: "5px" }}
              />
            </div>
          )}

          <table className="detail-table">
            <tbody>
              <tr>
                <th>Marca del Equipo</th>
                <td>{editValue}</td>
              </tr>
              <tr>
                <th>Sala</th>
                <td>{editCategory}</td>
              </tr>
              <tr>
                <th>Estado</th>
                <td>{editState}</td>
              </tr>
              <tr>
                <th>Peso</th>
                <td>{editWeight} Kg</td>
              </tr>
              <tr>
                <th>Fecha de Ingreso</th>
                <td>{editEntryDate}</td>
              </tr>
              <tr>
                <th>Equipo</th>
                <td>{editStatus ? "Usado" : "Nuevo"}</td>
              </tr>
              <tr>
                <th>Monitor</th>
                <td>
                  {editStatusMonitor
                    ? "Monitor Independiente"
                    : "Monitor Integrado"}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="button-group">
            <button className="back-button" onClick={() => navigate(-1)}>
              Volver
            </button>
            <button className="back-button" onClick={() => setIsEditing(true)}>
              Editar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
