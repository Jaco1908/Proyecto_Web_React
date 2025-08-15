// utils/fetchWithAuth.js
// Wrapper para fetch que maneja 401 globalmente con modal bonito
let sessionModal = null;
function showSessionExpiredModal() {
  if (sessionModal) return;
  sessionModal = document.createElement('div');
  sessionModal.className = 'session-expired-modal';
  sessionModal.innerHTML = `
    <div class="session-expired-content">
      <h2>Sesión expirada</h2>
      <p>Tu sesión ha expirado o no tienes autorización.<br>Por favor, inicia sesión de nuevo para continuar.</p>
      <button id="session-expired-btn">Ir al login</button>
    </div>
  `;
  document.body.appendChild(sessionModal);
  document.body.style.overflow = 'hidden';
  document.getElementById('session-expired-btn').onclick = () => {
    window.location.href = '/login';
  };
}

export async function fetchWithAuth(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  });
  if (response.status === 401) {
    showSessionExpiredModal();
    throw new Error('Unauthorized');
  }
  return response;
}
