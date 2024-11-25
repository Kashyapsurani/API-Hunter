import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Counter from './counter';
import Home from './Home';
import ProductsPage from './pages/ProductsPage'; // Import the new ProductsPage
import CartPage from './components/CartPage'; // Import the CartPage

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link> {/* Corrected path here */}
        <Link to="/counter">Counter</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} /> {/* Corrected path here */}
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </Router>
  );
}

export default App;
