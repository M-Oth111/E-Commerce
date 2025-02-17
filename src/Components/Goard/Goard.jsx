import React, { useContext, useEffect, useState } from 'react';
import { aouthContext } from '../Context/AouthContext';
import { Navigate } from 'react-router-dom';

export default function Goard({ children }) {
  const { token } = useContext(aouthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return token ? children : <Navigate to="/login" replace />;
}
