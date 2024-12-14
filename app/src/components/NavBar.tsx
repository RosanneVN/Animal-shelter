import { useState } from "react";
import { NavBarMenu } from "./data";
import ResponsiveMenu from "./ResponsiveMenu";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="flex w-full place-content-center ">
        <div
          className="fixed top-0 z-20 w-[80%] max-sm:w-[95%] flex flex-row px-10 py-5 my-10 justify-between items-center
bg-white/55 rounded-full backdrop-blur-md"
        >
          <div className="text-2xl max-sm:text-lg text-secondary items-center justify-center font-bold">
            <p>Fundacion Tepa</p>
          </div>

          <div className="hidden lg:block">
            <ul className="flex  items-center gap-3 text-primary">
              {NavBarMenu.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      className="inline-block py-1 px-3 hover:text-secondary font-semibold"
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img src="/Icons/SVGs/menu.svg" alt="" />
          </div>
        </div>
      </nav>
      <ResponsiveMenu open={open} setOpen={setOpen} />
    </>
  );
};
export default NavBar;
