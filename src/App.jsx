import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Goard from './Components/Goard/Goard';
import Layout from '../src/Components/Layout/Layout';
import Home from '../src/Components/Home/Home';
import Categories from '../src/Components/Catigories/Catigories'; 
import Cart from '../src/Components/Cart/Cart';
import Products from '../src/Components/Products/Products';
import Brands from '../src/Components/Brands/Brands';
import Login from '../src/Components/Login/Login';
import Register from '../src/Components/Register/Register';
import AouthContextProvider, { aouthContext } from './Components/Context/AouthContext';
import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import WishList from './Components/WishList/WishList';
import ProducDetailes from './Components/producrDetails/ProducDetailes';
import CartContextProvider from './Components/Context/cartContext';
import Wishlist from './Components/WishList/WishList';
import WishlistContextProvider from './Components/Context/WishListContext';
import ForgetPassword from './Components/forgetPass/ForgetPass';
import ResetPassword from './Components/forgetPass/ResetPass';
import Order from './Components/Order/Order';
import { Toaster } from 'react-hot-toast';
import AllOrders from './Components/Order/AllOrders';
const quertClient =new QueryClient()
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Goard><Home /> </Goard>},  
      { path: 'Categories', element: <Goard> <Categories /></Goard> }, 
      { path: 'Cart', element:  <Goard> <Cart /></Goard>},
      { path: 'Wishs', element:  <Goard> <Wishlist /></Goard>},
      { path: 'ProductDetailes/:id', element:  <Goard> <ProducDetailes/></Goard>},
      { path: 'Order', element:  <Goard> <Order/></Goard>},

      { path: 'Products', element: <Goard><Products /> </Goard> },
      { path: 'Brands', element: <Goard><Brands /> </Goard> },
      { path: 'AllOrders', element: <Goard><AllOrders /> </Goard> },
     { path:"/forget-password" ,element:<ForgetPassword /> },
{path:"/reset-password", element:<ResetPassword /> },

      { path: 'Login', element: <Login /> },
      { path: 'Register', element: <Register /> },
    ],
  },
]);

export default function App() {

  return (
    <>
    <AouthContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
      <QueryClientProvider client={quertClient}>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
      </QueryClientProvider>
    </WishlistContextProvider>
      </CartContextProvider>
      </AouthContextProvider>
    </>
  );
}
