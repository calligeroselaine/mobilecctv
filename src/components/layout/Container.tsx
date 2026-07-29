import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Standard page-width container. Use inside every Section instead of ad-hoc max-w classes. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>
      {children}
    </div>
  );
}
