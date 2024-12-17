import { PropsWithChildren, MouseEvent } from 'react';

export function Button({
  children,
  onClick,
}: Readonly<
  PropsWithChildren & { onClick: (e: MouseEvent<Element>) => void }
>) {
  return (
    <button className="p-2 bg-slate-100 hover:bg-slate-300" onClick={onClick}>
      {children}
    </button>
  );
}
