import React, { Dispatch, ReactNode } from "react";
import Header from "./Header";

const Layout: React.FC<{
  children: ReactNode,
  setHasConnected: Dispatch<boolean>
}> = ({ children, setHasConnected }) => {
  return (
    <div>
      <Header setHasConnected={setHasConnected} />
      <div className="pt-20">
        {children}
      </div>
    </div>
  );
}

export default Layout;
