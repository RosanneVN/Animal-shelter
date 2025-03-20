import React, { Children, type ReactNode } from "react";

type Props = {};

export default function ScreenWidthLayoutTsx({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section
      className="max-w-[1400px] max-lg:max-w-[700px] w-full flex-col justify-center
     items-center m-auto"
    >
      {children}
    </section>
  );
}
