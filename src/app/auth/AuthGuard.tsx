import React, { FC } from "react";
import { Spinner } from "@/app/admin/components/ui/Spinner";
import useAuth from "./useAuth";
import { usePathname } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  authArray: string[];
}

const AuthGuard: FC<AuthGuardProps> = ({ children, authArray }) => {
  const { isLoading, isAuthorized } = useAuth();
  const pathname = usePathname();

  const requireAuth = authArray?.includes(pathname);

  // if (isLoading) {
  //     return (
  //         <div className="absolute left-1/2 top-1/2">
  //             <Spinner className="h-10 w-10" size={1.5} />
  //         </div>
  //     );
  // }

  if (requireAuth) {
    return <>{children}</>;
  } else {
    return isAuthorized ? <>{children}</> : null;
  }
};

export default AuthGuard;
