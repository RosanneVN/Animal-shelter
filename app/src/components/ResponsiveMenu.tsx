import { NavBarMenu } from "./data";

type Prop = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResponsiveMenu = ({ open, setOpen }: Prop) => {
  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 z-50 w-full h-screen lg:hidden ">
          <div className="absolute text-xl h-full font-semibold bg-primary z-50 text-lettersLight py-10 rounded-r-3xl md:w-80 w-full ">
            <ul className="flex flex-col justify-center items-center gap-5">
              {NavBarMenu.map((item) => {
                return (
                  <li
                    className="border-t border-lettersMiddle w-[70%]"
                    key={item.id}
                  >
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
            className="w-full h-full backdrop-blur-sm absolute top-0 z-40"
            onClick={() => setOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
};
export default ResponsiveMenu;
