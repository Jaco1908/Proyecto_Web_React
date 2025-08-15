import React, { useState, useEffect } from 'react';
import './FiltrosDinamicos.css';

const FiltrosDinamicos = ({ 
  filtros, 
  onChange, 
  onReset,
  totalProductos = 0,
  showCompact = false 
}) => {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [rangosPrecios, setRangosPrecios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(!showCompact);

  // Estados locales para los filtros
  const [localFiltros, setLocalFiltros] = useState({
    categoria: '',
    subcategoria: '',
    marca: '',
    precioMin: '',
    precioMax: '',
    busqueda: '',
    ...filtros
  });

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        // Cargar categorías
        const categoriasRes = await fetch('/api/categorias/public');
        const categoriasData = await categoriasRes.json();
        setCategorias([{ id: '', nombre: 'Todas las categorías' }, ...categoriasData]);

        // Cargar marcas
        const marcasRes = await fetch('/api/marcas/public');
        const marcasData = await marcasRes.json();
        setMarcas([{ id: '', nombre: 'Todas las marcas' }, ...marcasData]);

        // Generar rangos de precios dinámicos
        setRangosPrecios([
          { min: 0, max: 50, label: '$0 - $50' },
          { min: 50, max: 100, label: '$50 - $100' },
          { min: 100, max: 250, label: '$100 - $250' },
          { min: 250, max: 500, label: '$250 - $500' },
          { min: 500, max: null, label: '$500+' }
        ]);

      } catch (error) {
        console.error('Error cargando datos de filtros:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // Cargar subcategorías cuando cambia la categoría
  useEffect(() => {
    const cargarSubcategorias = async () => {
      if (localFiltros.categoria) {
        try {
          const res = await fetch(`/api/subcategorias/public?categoria_id=${localFiltros.categoria}`);
          const data = await res.json();
          setSubcategorias([{ id: '', nombre: 'Todas las subcategorías' }, ...data]);
        } catch (error) {
          console.error('Error cargando subcategorías:', error);
          setSubcategorias([{ id: '', nombre: 'Todas las subcategorías' }]);
        }
      } else {
        setSubcategorias([{ id: '', nombre: 'Todas las subcategorías' }]);
      }
    };

    cargarSubcategorias();
  }, [localFiltros.categoria]);

  // Sincronizar con filtros externos
  useEffect(() => {
    setLocalFiltros(prevLocal => ({ ...prevLocal, ...filtros }));
  }, [filtros]);

  // Manejar cambios en los filtros
  const handleChange = (campo, valor) => {
    const nuevosFiltros = { ...localFiltros, [campo]: valor };
    
    // Si cambia la categoría, reiniciar subcategoría
    if (campo === 'categoria') {
      nuevosFiltros.subcategoria = '';
    }

    setLocalFiltros(nuevosFiltros);
    onChange(nuevosFiltros);
  };

  // Manejar rango de precios predefinido
  const handleRangoPrecio = (min, max) => {
    const nuevosFiltros = {
      ...localFiltros,
      precioMin: min || '',
      precioMax: max || ''
    };
    setLocalFiltros(nuevosFiltros);
    onChange(nuevosFiltros);
  };

  // Limpiar filtros
  const handleReset = () => {
    const filtrosVacios = {
      categoria: '',
      subcategoria: '',
      marca: '',
      precioMin: '',
      precioMax: '',
      busqueda: ''
    };
    setLocalFiltros(filtrosVacios);
    onChange(filtrosVacios);
    if (onReset) onReset();
  };

  // Contar filtros activos
  const filtrosActivos = Object.values(localFiltros).filter(valor => 
    valor !== '' && valor !== null && valor !== undefined
  ).length;

  if (loading) {
    return (
      <div className="filtros-dinamicos loading">
        <div className="loading-spinner">Cargando filtros...</div>
      </div>
    );
  }

  const FiltroContent = () => (
    <div className="filtros-content">
      {/* Barra de búsqueda */}
      <div className="filtro-grupo">
        <label className="filtro-label">
          <span className="filtro-icono">🔍</span>
          Buscar productos
        </label>
        <input
          type="text"
          className="filtro-input"
          placeholder="Buscar por nombre o descripción..."
          value={localFiltros.busqueda}
          onChange={(e) => handleChange('busqueda', e.target.value)}
        />
      </div>

      {/* Categoría */}
      <div className="filtro-grupo">
        <label className="filtro-label">
          <span className="filtro-icono">📂</span>
          Categoría
        </label>
        <select
          className="filtro-select"
          value={localFiltros.categoria}
          onChange={(e) => handleChange('categoria', e.target.value)}
        >
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategoría */}
      <div className="filtro-grupo">
        <label className="filtro-label">
          <span className="filtro-icono">📁</span>
          Subcategoría
        </label>
        <select
          className="filtro-select"
          value={localFiltros.subcategoria}
          onChange={(e) => handleChange('subcategoria', e.target.value)}
          disabled={!localFiltros.categoria}
        >
          {subcategorias.map(subcategoria => (
            <option key={subcategoria.id} value={subcategoria.id}>
              {subcategoria.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Marca */}
      <div className="filtro-grupo">
        <label className="filtro-label">
          <span className="filtro-icono">🏷️</span>
          Marca
        </label>
        <select
          className="filtro-select"
          value={localFiltros.marca}
          onChange={(e) => handleChange('marca', e.target.value)}
        >
          {marcas.map(marca => (
            <option key={marca.id} value={marca.id}>
              {marca.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Rangos de precio predefinidos */}
      <div className="filtro-grupo">
        <label className="filtro-label">
          <span className="filtro-icono">💰</span>
          Rango de precio
        </label>
        <div className="rangos-precio">
          {rangosPrecios.map((rango, index) => (
            <button
              key={index}
              className={`rango-btn ${
                localFiltros.precioMin === rango.min && 
                localFiltros.precioMax === rango.max ? 'activo' : ''
              }`}
              onClick={() => handleRangoPrecio(rango.min, rango.max)}
            >
              {rango.label}
            </button>
          ))}
        </div>
      </div>

      {/* Precio personalizado */}
      <div className="filtro-grupo precio-personalizado">
        <label className="filtro-label">
          <span className="filtro-icono">🎯</span>
          Precio personalizado
        </label>
        <div className="precio-inputs">
          <input
            type="number"
            className="filtro-input precio-input"
            placeholder="Mín"
            value={localFiltros.precioMin}
            onChange={(e) => handleChange('precioMin', e.target.value)}
            min="0"
          />
          <span className="precio-separador">-</span>
          <input
            type="number"
            className="filtro-input precio-input"
            placeholder="Máx"
            value={localFiltros.precioMax}
            onChange={(e) => handleChange('precioMax', e.target.value)}
            min="0"
          />
        </div>
      </div>

      {/* Resumen y acciones */}
      <div className="filtros-resumen">
        <div className="productos-encontrados">
          <span className="icono-resumen">📊</span>
          <span className="texto-resumen">
            {totalProductos} producto{totalProductos !== 1 ? 's' : ''} encontrado{totalProductos !== 1 ? 's' : ''}
          </span>
        </div>
        
        {filtrosActivos > 0 && (
          <div className="filtros-activos">
            <span className="filtros-count">{filtrosActivos} filtro{filtrosActivos !== 1 ? 's' : ''} activo{filtrosActivos !== 1 ? 's' : ''}</span>
            <button 
              className="btn-limpiar"
              onClick={handleReset}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (showCompact) {
    return (
      <div className="filtros-dinamicos compact">
        <div className="filtros-header" onClick={() => setExpanded(!expanded)}>
          <div className="filtros-title">
            <span className="filtro-icono">⚙️</span>
            Filtros
            {filtrosActivos > 0 && (
              <span className="filtros-badge">{filtrosActivos}</span>
            )}
          </div>
          <button className="expand-btn">
            {expanded ? '↑' : '↓'}
          </button>
        </div>
        
        {expanded && <FiltroContent />}
      </div>
    );
  }

  return (
    <div className="filtros-dinamicos">
      <div className="filtros-header">
        <h3 className="filtros-title">
          <span className="filtro-icono">⚙️</span>
          Filtros de búsqueda
        </h3>
      </div>
      <FiltroContent />
    </div>
  );
};

export default FiltrosDinamicos;
