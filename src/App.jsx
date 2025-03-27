import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./index.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);

    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const editProduct = (index, newProduct) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? newProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <div className="container">
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀ Modo Claro" : "🌙 Modo Oscuro"}
      </button>
      <h1>Inventario de Equipos de la USTA</h1>
      <ProductForm onAdd={addProduct} />
      <ProductList products={products} onDelete={deleteProduct} onEdit={editProduct} />
    </div>
  );
};

export default App;
