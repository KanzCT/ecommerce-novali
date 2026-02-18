import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Novali Store</h1>
          <nav className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900">Cart</Link>
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Login</Link>
          </nav>
        </div>
      </header>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Novali Store</h2>
          <p className="text-xl mb-8">Find the best products at amazing prices</p>
          <Link href="/products" className="bg-white text-blue-600 px-8 py-3 rounded font-semibold hover:bg-gray-100">Shop Now</Link>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold mb-8">Featured Products</h3>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition">
                  {product.image && <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />}
                  <h4 className="font-semibold text-lg">{product.name}</h4>
                  <p className="text-gray-600 mt-2">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}