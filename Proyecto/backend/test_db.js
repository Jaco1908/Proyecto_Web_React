// Script de prueba para verificar la base de datos
import { query } from './db.js';

async function testConnection() {
  try {
    console.log('🔗 Probando conexión a la base de datos...');
    
    // Probar conexión básica
    const testResult = await query('SELECT NOW() as current_time');
    console.log('✅ Conexión exitosa:', testResult.rows[0].current_time);
    
    // Verificar tablas existentes
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    console.log('📋 Tablas encontradas:', tables.rows.map(t => t.table_name));
    
    // Verificar categorías
    const categorias = await query('SELECT * FROM categorias ORDER BY id');
    console.log('📂 Categorías:', categorias.rows.length, 'encontradas');
    categorias.rows.forEach(cat => console.log(`  - ${cat.id}: ${cat.nombre}`));
    
    // Verificar marcas
    const marcas = await query('SELECT * FROM marcas ORDER BY id LIMIT 5');
    console.log('🏷️ Marcas (primeras 5):', marcas.rows.length, 'encontradas');
    marcas.rows.forEach(marca => console.log(`  - ${marca.id}: ${marca.nombre}`));
    
    // Verificar productos
    const productos = await query('SELECT COUNT(*) as total FROM productos');
    console.log('📦 Productos totales:', productos.rows[0].total);
    
    // Probar consulta de productos con JOIN
    const productosCompletos = await query(`
      SELECT 
        p.id, p.nombre, p.precio,
        c.nombre as categoria_nombre,
        m.nombre as marca_nombre
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN marcas m ON p.marca_id = m.id
      LIMIT 3
    `);
    
    console.log('🔍 Productos con información completa:');
    productosCompletos.rows.forEach(prod => {
      console.log(`  - ${prod.nombre} ($${prod.precio}) - ${prod.categoria_nombre} - ${prod.marca_nombre}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
}

testConnection();
