import { useState } from 'react';

function AuthDebugger({ user, onUserChange }) {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev.slice(-10), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    onUserChange(null);
    addLog('🧹 localStorage limpiado completamente');
  };

  const checkAuthState = () => {
    const user = localStorage.getItem('user');
    const googleUser = localStorage.getItem('googleUser');
    const token = localStorage.getItem('token');
    const googleToken = localStorage.getItem('googleToken');

    addLog(`👤 User: ${user ? 'Existe' : 'No existe'}`);
    addLog(`👤 GoogleUser: ${googleUser ? 'Existe' : 'No existe'}`);
    addLog(`🔑 Token: ${token ? 'Existe' : 'No existe'}`);
    addLog(`🔑 GoogleToken: ${googleToken ? 'Existe' : 'No existe'}`);
    addLog(`⚡ Estado actual: ${user ? 'Logueado' : 'No logueado'}`);
  };

  const simulateGoogleLogin = () => {
    const mockUser = {
      id: 'test123',
      nombre: 'Usuario Test',
      email: 'test@example.com',
      picture: '/images/user.png',
      isGoogleUser: true
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('googleUser', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('googleToken', 'mock-google-token');
    
    onUserChange(mockUser);
    addLog('🎭 Login simulado ejecutado');
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#f0f0f0',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      width: '300px',
      fontSize: '12px',
      zIndex: 9999,
      maxHeight: '400px',
      overflow: 'auto'
    }}>
      <h4 style={{margin: '0 0 10px 0'}}>🔍 Auth Debugger</h4>
      
      <div style={{marginBottom: '10px'}}>
        <strong>Estado actual:</strong> {user ? '✅ Logueado' : '❌ No logueado'}
        <br />
        {user && <span>Usuario: {user.nombre}</span>}
      </div>

      <div style={{marginBottom: '10px'}}>
        <button onClick={checkAuthState} style={{marginRight: '5px', padding: '5px 10px'}}>
          📊 Verificar Estado
        </button>
        <button onClick={clearLocalStorage} style={{marginRight: '5px', padding: '5px 10px', background: '#ff4444', color: 'white'}}>
          🧹 Limpiar Todo
        </button>
        <button onClick={simulateGoogleLogin} style={{padding: '5px 10px', background: '#4285f4', color: 'white'}}>
          🎭 Simular Login
        </button>
      </div>

      <div style={{
        background: '#000',
        color: '#0f0',
        padding: '8px',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '11px',
        maxHeight: '150px',
        overflow: 'auto'
      }}>
        <strong>📝 Logs:</strong>
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
}

export default AuthDebugger;
