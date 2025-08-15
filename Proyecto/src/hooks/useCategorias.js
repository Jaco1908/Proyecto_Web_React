import { useState, useEffect } from 'react';

// Hook personalizado para obtener categorías de la base de datos
export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categorias/public');
        
        if (!response.ok) {
          throw new Error('Error al cargar categorías');
        }
        
        const data = await response.json();
        setCategorias(data);
        console.log('✅ Categorías cargadas desde BD:', data);
      } catch (err) {
        console.error('❌ Error cargando categorías:', err);
        setError(err.message);
        // Categorías fallback si no se puede conectar a la BD
        setCategorias([
          { id: 1, nombre: 'ACCESORIOS' },
          { id: 2, nombre: 'ALMACENAMIENTO' },
          { id: 3, nombre: 'CONECTIVIDAD' },
          { id: 4, nombre: 'CONSOLA' },
          { id: 5, nombre: 'COMPUTACIÓN' },
          { id: 6, nombre: 'ELECTRODOMÉSTICOS' },
          { id: 7, nombre: 'MÓVIL' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return { categorias, loading, error };
};

// Hook para obtener subcategorías por categoría
export const useSubcategorias = (categoriaId) => {
  const [subcategorias, setSubcategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategorias = async () => {
      if (!categoriaId) {
        setSubcategorias([]);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/subcategorias/public?categoria_id=${categoriaId}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar subcategorías');
        }
        
        const data = await response.json();
        setSubcategorias(data);
        console.log('✅ Subcategorías cargadas desde BD para categoría', categoriaId, ':', data);
      } catch (err) {
        console.error('❌ Error cargando subcategorías:', err);
        setError(err.message);
        setSubcategorias([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategorias();
  }, [categoriaId]);

  return { subcategorias, loading, error };
};

// Mapeo de categorías de BD a rutas del navbar
export const mapCategoriaToRoute = (categoriaNombre) => {
  const mapping = {
    'ACCESORIOS': '/accesorios',
    'ALMACENAMIENTO': '/almacenamiento', 
    'CONECTIVIDAD': '/conectividad',
    'CONSOLA': '/consola',
    'COMPUTACIÓN': '/computacion',
    'ELECTRODOMÉSTICOS': '/electrodomesticos',
    'MÓVIL': '/movil'
  };
  
  const normalized = categoriaNombre?.toUpperCase();
  return mapping[normalized] || '/catalogo';
};
