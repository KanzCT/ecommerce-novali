import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    try {
      const url = search ? `/api/products?search=${search}` : '/api/products';
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Novali Store</h1>
          <nav className="flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/products" className="font-bold">Products</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Login</Link>
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">All Products</h2>
        <div className="mb-8">
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {products.map(p => (
              <Link key={p.id} href={`/products/${p.id}`}> 
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg"> 
                  <div className="bg-gray-200 h-40 mb-3 rounded"></div> 
                  <h3 className="font-bold">{p.name}</h3> 
                  <p className="text-blue-600 font-bold">${p.price}</p> 
                </div> 
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}