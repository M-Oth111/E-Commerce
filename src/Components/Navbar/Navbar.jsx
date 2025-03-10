import React, { useContext, useEffect, useState } from 'react';
import logo from '../../../src/assets/images/freshcart-logo.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { aouthContext } from '../Context/AouthContext';
import { CartContext } from '../Context/cartContext';

export default function Navbar() {
  const { token, setToken } = useContext(aouthContext);
  const { numOfCartItems, getCartData } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getCartData();
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/Login');
  };

  const isActive = (path) => location.pathname === path ? 'bg-green-500 text-white rounded-lg px-3 py-2' : '';

  return (
    <nav className="bg-slate-100 py-5">
      <div className="container mx-auto flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img src={logo} alt="FreshCart Logo" className="mr-4 w-32" />
          
          {token && (
            <ul className={`flex flex-row space-x-4 lg:flex hidden`}>
              <li><Link to="/" className={`px-3 py-2 hover:bg-green-200 rounded-lg transition ${isActive('/')}`}>Home</Link></li>
              <li><Link to="/wishs" className={`px-3 py-2 hover:bg-green-200 rounded-lg transition ${isActive('/wishs')}`}>Wishes</Link></li>
              <li><Link to="/categories" className={`px-3 py-2 hover:bg-green-200 rounded-lg transition ${isActive('/categories')}`}>Categories</Link></li>
              <li><Link to="/brands" className={`px-3 py-2 hover:bg-green-200 rounded-lg transition ${isActive('/brands')}`}>Brands</Link></li>
              <li><Link to="/products" className={`px-3 py-2 hover:bg-green-200 rounded-lg transition ${isActive('/products')}`}>Products</Link></li>
            </ul>
          )}
        </div>

        <div className="flex flex-row items-center space-x-4">
          <Link to="/cart">
            <button className="">
              <i className="fa-solid fa-cart-shopping text-green-500 text-2xl">
                <sup className='text-red-600   bg-green-400 p-1 rounded-full text-sm'>{numOfCartItems ?? 0}</sup>
              </i>
            </button>
          </Link>

          <div className="icons flex space-x-2 text-xl hidden lg:flex">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-tiktok"></i>
            <i className="fa-brands fa-youtube"></i>
          </div>

          <div className="ml-4">
            {token ? (
              <button className="text-2xl border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link className="border border-green-500 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition mx-3" to="/Login">Login</Link>
                <Link className="border border-green-500 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition" to="/register">Signup</Link>
              </>
            )}
          </div>

          
          <button className="lg:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className="fa-solid fa-bars text-green-500"></i>
          </button>
        </div>
      </div>

      
      {isMenuOpen && token && (
        <ul className="lg:hidden bg-slate-200 px-4 py-2 space-y-4">
          <li><Link to="/" className={`block py-2 ${isActive('/')}`}>Home</Link></li>
          <li><Link to="/wishs" className={`block py-2 ${isActive('/wishs')}`}>Wishes</Link></li>
          <li><Link to="/categories" className={`block py-2 ${isActive('/categories')}`}>Categories</Link></li>
          <li><Link to="/brands" className={`block py-2 ${isActive('/brands')}`}>Brands</Link></li>
          <li><Link to="/products" className={`block py-2 ${isActive('/products')}`}>Products</Link></li>
        </ul>
      )}
    </nav>
  );
}
