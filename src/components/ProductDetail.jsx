import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <p>No hay datos disponibles.</p>;
  }

  return (
    <div className="detail-container">
      <h2>Detalles del Producto</h2>
      <table className="detail-table">
        <tbody>
          <tr>
            <th>Marca del Equipo</th>
            <td>{product.name}</td>
          </tr>
          <tr>
            <th>Sala</th>
            <td>{product.category}</td>
          </tr>
          <tr>
            <th>Estado</th>
            <td>{product.state}</td>
          </tr>
          <tr>
            <th>Peso</th>
            <td>{product.weight} Kg</td>
          </tr>
          <tr>
            <th>Fecha de Ingreso</th>
            <td>{product.entryDate}</td>
          </tr>
          <tr>
            <th>Equipo</th>
            <td>{product.status}</td>
          </tr>
          <tr>
            <th>Monitor</th>
            <td>{product.statusMonitor}</td>
          </tr>
        </tbody>
      </table>
      <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default ProductDetail;
