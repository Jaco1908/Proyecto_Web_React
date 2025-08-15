import { useEffect, useState } from 'react';

export default function useMarcas() {
  const [marcas, setMarcas] = useState([]);
  useEffect(() => {
    fetch('/api/marcas/public')
      .then(res => res.json())
      .then(data => setMarcas([{ id: '', nombre: 'Todas las marcas' }, ...data]))
      .catch(() => setMarcas([{ id: '', nombre: 'Todas las marcas' }]));
  }, []);
  return marcas;
}
