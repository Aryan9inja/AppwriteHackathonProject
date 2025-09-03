import { ReactNode } from "react";

interface SharedRouteProps {
  children: ReactNode;
}

const SharedRoute = ({ children }: SharedRouteProps) => {
  return <>{children}</>;
};

export default SharedRoute;