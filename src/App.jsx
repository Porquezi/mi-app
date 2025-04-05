import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";
import "./index.css";

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    document.body.classList.remove("light", "dark", "blue", "yellow", "pink");
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      localStorage.removeItem("products");
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const editProduct = (index, newProduct) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? newProduct : product
    );
    setProducts(updatedProducts);
  };

  const toggleTheme = () => {
    const newTheme =
      theme === "light"
        ? "dark"
        : theme === "dark"
        ? "blue"
        : theme === "blue"
        ? "yellow"
        : theme === "yellow"
        ? "pink"
        : "light";
    setTheme(newTheme);
  };

  return (
    <Router>
      <div className="container">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light"
            ? "🌙 Modo Oscuro"
            : theme === "dark"
            ? "🔵 Modo Azul"
            : theme === "blue"
            ? "📁 Modo Amarillo"
            : theme === "yellow"
            ? "🦩 Modo Rosado"
            : "☀ Modo Claro"}
        </button>
        <h1>Inventario de Equipos de la USTA</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductForm onAdd={addProduct} />
                <ProductList
                  products={products}
                  onDelete={deleteProduct}
                  onEdit={editProduct}
                />
              </>
            }
          />
          <Route path="/detalle-producto" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;