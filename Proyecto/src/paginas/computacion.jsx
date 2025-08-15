import React from 'react';
import CategoriaGenerica from '../componentes/CategoriaGenerica';

const Computacion = () => {
  const subcategorias = [
    {
      nombre: 'Mouse',
      descripcion: 'Inalámbricos y gaming',
      imagen: '/images/Masvendidos/Mouse2.jpg',
      ruta: '/subcategoria/computacion/mouse-inalambrico'
    },
    {
      nombre: 'Teclados',
      descripcion: 'Mecánicos y gaming',
      imagen: '/images/Masvendidos/Teclado.jpg',
      ruta: '/subcategoria/computacion/teclado-usb'
    },
    {
      nombre: 'Enclosures',
      descripcion: 'Para discos duros',
      imagen: '/images/Productos/enclosure.jpg',
      ruta: '/subcategoria/computacion/enclosure-usb'
    }
  ];

  return (
    <CategoriaGenerica
      categoriaId="18"
      nombreCategoria="Computación"
      icono="💻"
      descripcion="Encuentra los mejores equipos y periféricos de computación. Mouse, teclados, enclosures y más para mejorar tu experiencia informática."
      subcategorias={subcategorias}
      rutaBreadcrumb="/computacion"
    />
  );
};

export default Computacion;
