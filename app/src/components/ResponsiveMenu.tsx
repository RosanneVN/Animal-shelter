import { useEffect } from "react";
import { NavBarMenu, NavBarAdminMenu } from "./data";
import { useLocation } from "wouter";

type Prop = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResponsiveMenu = ({ open, setOpen }: Prop) => {
  const [location] = useLocation();
  const menu = location.startsWith("/administrationPages")
    ? [...NavBarAdminMenu]
    : [...NavBarMenu];

  // Bloquea el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // Cierra con ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  return (
    <>
      {/* Overlay + panel */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        {/* Capa oscura */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        {/* Panel lateral */}
        <nav
          className={`absolute top-0 left-0 h-full w-80 max-w-[90%] flex flex-col bg-gradient-to-b from-primary to-primary/90 text-lettersLight shadow-2xl rounded-r-3xl transform transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <div className="flex items-center gap-2">
              <img
                src="/Image/logoPasosNegro.png"
                alt="Logo"
                className="h-6 drop-shadow"
              />
            </div>
            <button
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="group p-2 rounded-full hover:bg-white/15 focus:outline-none focus-visible:ring focus-visible:ring-white/40 transition"
            >
              <img
                src="/Image/closeIcon.png"
                alt="Cerrar"
                className="h-5 w-5 group-hover:rotate-90 transition-transform"
              />
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto px-4 pb-10 flex flex-col gap-1">
            {menu.map((item) => (
              <li
                key={item.id}
                className="first:border-t border-t border-white/10"
              >
                <a
                  href={item.url}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-base font-semibold hover:bg-white/10 hover:text-secondary focus:outline-none focus-visible:ring focus-visible:ring-white/40 transition-colors"
                >
                  <span>{item.title}</span>
                  <span className="text-xs opacity-60">›</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-6 text-[11px] text-white/50 tracking-wide">
            © {new Date().getFullYear()} Refugio. Todos los derechos reservados.
          </div>
        </nav>
      </div>
    </>
  );
};
export default ResponsiveMenu;
