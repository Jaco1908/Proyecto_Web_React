import { useState, useEffect } from 'react';

const useProductos = (filtrosIniciales = {}) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    categoria: '',
    subcategoria: '',
    marca: '',
    precioMin: '',
    precioMax: '',
    busqueda: '',
    ...filtrosIniciales
  });

  // Función para construir URL con parámetros
  const construirURL = (filtrosActuales) => {
    const params = new URLSearchParams();
    
    Object.entries(filtrosActuales).forEach(([key, value]) => {
      if (value && value !== '') {
        params.append(key, value);
      }
    });

    return `/api/productos${params.toString() ? `?${params.toString()}` : ''}`;
  };

  // Cargar productos
  const cargarProductos = async (filtrosActuales = filtros) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = construirURL(filtrosActuales);
      console.log('Cargando productos desde:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setProductos(data);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError(err.message);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar productos cuando cambian los filtros
  useEffect(() => {
    cargarProductos(filtros);
  }, [filtros]);

  // Función para actualizar filtros
  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      ...nuevosFiltros
    }));
  };

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    const filtrosVacios = {
      categoria: '',
      subcategoria: '',
      marca: '',
      precioMin: '',
      precioMax: '',
      busqueda: ''
    };
    setFiltros(filtrosVacios);
  };

  // Función para refrescar productos
  const refrescarProductos = () => {
    cargarProductos(filtros);
  };

  return {
    productos,
    loading,
    error,
    filtros,
    actualizarFiltros,
    limpiarFiltros,
    refrescarProductos,
    totalProductos: productos.length
  };
};

export default useProductos;
