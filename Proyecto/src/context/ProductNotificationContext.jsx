import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const ProductNotificationContext = createContext();

// Hook personalizado para usar el contexto
export const useProductNotification = () => {
  const context = useContext(ProductNotificationContext);
  if (!context) {
    throw new Error('useProductNotification debe usarse dentro de ProductNotificationProvider');
  }
  return context;
};

// Provider del contexto
export const ProductNotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [newProducts, setNewProducts] = useState([]); // Para productos nuevos

  // Cargar datos del localStorage al iniciar
  React.useEffect(() => {
    const savedNotifications = localStorage.getItem('productNotifications');
    const savedNewProducts = localStorage.getItem('newProducts');
    
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed);
        console.log('🔔 Notificaciones cargadas del localStorage:', parsed.length);
      } catch (error) {
        console.error('Error cargando notificaciones del localStorage:', error);
      }
    }
    
    if (savedNewProducts) {
      try {
        const parsed = JSON.parse(savedNewProducts);
        setNewProducts(parsed);
        console.log('🔔 Productos nuevos cargados del localStorage:', parsed.length);
      } catch (error) {
        console.error('Error cargando productos nuevos del localStorage:', error);
      }
    }
  }, []);

  // Log para debugging
  console.log('🔔 ProductNotificationProvider iniciado', {
    notifications: notifications.length,
    newProducts: newProducts.length
  });

  // Agregar notificación de producto creado
  const addProductNotification = (product) => {
    console.log('🔔 addProductNotification llamado con:', product);
    
    const newNotification = {
      id: Date.now(),
      product,
      category: product.categoria_nombre,
      subcategory: product.subcategoria_nombre,
      brand: product.marca_nombre,
      timestamp: new Date(),
      type: 'new_product',
      isPersistent: true // Hacer la notificación persistente
    };

    console.log('🔔 Creando notificación persistente:', newNotification);

    setNotifications(prev => {
      const updated = [newNotification, ...prev.slice(0, 9)]; // Máximo 10 notificaciones persistentes
      console.log('🔔 Notifications updated:', updated);
      
      // Guardar en localStorage para persistencia
      localStorage.setItem('productNotifications', JSON.stringify(updated));
      return updated;
    });
    
    // Agregar a productos nuevos también
    setNewProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (!exists) {
        const updated = [product, ...prev.slice(0, 19)]; // Máximo 20 productos nuevos
        console.log('🔔 New products updated:', updated);
        
        // Guardar en localStorage para persistencia
        localStorage.setItem('newProducts', JSON.stringify(updated));
        return updated;
      }
      console.log('🔔 Product already exists in new products');
      return prev;
    });

    // NO auto-eliminar notificación (removido el setTimeout)
    console.log('🔔 Notificación persistente creada - no se auto-eliminará');
  };

  // Remover notificación específica
  const removeNotification = (notificationId) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== notificationId);
      localStorage.setItem('productNotifications', JSON.stringify(updated));
      return updated;
    });
  };

  // Limpiar todas las notificaciones
  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('productNotifications');
  };

  // Remover producto de nuevos
  const removeFromNewProducts = (productId) => {
    setNewProducts(prev => {
      const updated = prev.filter(p => p.id !== productId);
      localStorage.setItem('newProducts', JSON.stringify(updated));
      return updated;
    });
  };

  // Limpiar productos nuevos
  const clearNewProducts = () => {
    setNewProducts([]);
    localStorage.removeItem('newProducts');
  };

  // Obtener ruta del producto basado en categoría/subcategoría
  const getProductRoute = (product) => {
    const categoria = product.categoria_nombre?.toLowerCase();
    const subcategoria = product.subcategoria_nombre?.toLowerCase();
    
    // Mapeo de categorías a rutas basado en la BD
    const categoryRoutes = {
      'accesorios': '/accesorios',
      'almacenamiento': '/almacenamiento',
      'conectividad': '/conectividad',
      'consola': '/consola',
      'computación': '/computacion',
      'computacion': '/computacion', // por si viene sin tilde
      'electrodomésticos': '/electrodomesticos',
      'electrodomesticos': '/electrodomesticos', // por si viene sin tilde
      'móvil': '/movil',
      'movil': '/movil' // por si viene sin tilde
    };

    console.log('🗺️ Mapeando ruta para producto:', {
      categoria,
      subcategoria,
      product: product.nombre
    });

    // Primero intentar ir al catálogo con hash del producto
    const catalogoRoute = `/catalogo#producto-${product.id}`;
    console.log('📍 Ruta principal al catálogo:', catalogoRoute);

    // Si hay subcategoría, construir ruta completa como alternativa
    if (categoria && subcategoria && categoryRoutes[categoria]) {
      const route = `${categoryRoutes[categoria]}/${subcategoria.replace(/\s+/g, '-')}`;
      console.log('📍 Ruta alternativa con subcategoría:', route);
      return { primary: catalogoRoute, secondary: route };
    }
    
    // Solo categoría como alternativa
    if (categoria && categoryRoutes[categoria]) {
      const route = categoryRoutes[categoria];
      console.log('📍 Ruta alternativa solo categoría:', route);
      return { primary: catalogoRoute, secondary: route };
    }

    // Solo ruta del catálogo
    console.log('📍 Solo ruta del catálogo');
    return { primary: catalogoRoute, secondary: '/catalogo' };
  };

  // Función para navegar al producto desde notificación
  const navigateToProduct = (product, navigate) => {
    const routes = getProductRoute(product);
    console.log('� Navegando al producto:', product.nombre, 'Rutas:', routes);
    
    // Primero intentar ir al catálogo
    navigate(routes.primary);
    
    // Scroll al producto después de un breve delay
    setTimeout(() => {
      const element = document.getElementById(`producto-${product.id}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        // Highlight temporal del producto
        element.style.animation = 'highlight-product 2s ease-in-out';
      }
    }, 100);
  };

  const value = {
    notifications,
    newProducts,
    addProductNotification,
    removeNotification,
    clearAllNotifications,
    removeFromNewProducts,
    clearNewProducts,
    getProductRoute,
    navigateToProduct
  };

  return (
    <ProductNotificationContext.Provider value={value}>
      {children}
    </ProductNotificationContext.Provider>
  );
};
