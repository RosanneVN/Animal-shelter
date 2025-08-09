export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Logout exitoso, redirigir al login
        window.location.href = "/login"; // O a la página que desees
      } else {
        // Manejar error en el logout
        console.error("Logout failed:", await response.text());
        // Podrías mostrar un mensaje al usuario
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
      // Manejar errores de red u otros
    }
  };

  return (
    <div className="pl-20">
      <button
        onClick={handleLogout}
        className="flex gap-2 text-[#ff3b30] font-semibold text-shortLetters  "
      >
        Cerrar Sesión{" "}
        <span>
          {" "}
          <img className="size-5" src="/Icons/SVGs/logout.svg" alt="" />
        </span>
      </button>
    </div>
  );
}
