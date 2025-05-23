export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        // Logout exitoso, redirigir al login
        window.location.href = '/login'; // O a la página que desees
      } else {
        // Manejar error en el logout
        console.error('Logout failed:', await response.text());
        // Podrías mostrar un mensaje al usuario
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
      // Manejar errores de red u otros
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Cerrar Sesión
    </button>
  );
}