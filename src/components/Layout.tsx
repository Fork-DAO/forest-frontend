import Head from "next/head";
import React, { Dispatch, ReactNode } from "react";
import Header from "./Header";

const Layout: React.FC<{
  children: ReactNode,
  setHasConnected: Dispatch<boolean>
}> = ({ children, setHasConnected }) => {
  return (
    <>
      <Head>
        <title>Fork Forest 🌳</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header setHasConnected={setHasConnected} />
      <div className="pt-20">
        {children}
      </div>
    </>
  );
}

export default Layout;
