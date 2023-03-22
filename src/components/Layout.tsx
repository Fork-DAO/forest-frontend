import Head from "next/head";
import React, { Dispatch, ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import image from "../../public/background.png";

const Layout: React.FC<{
  children: ReactNode,
  setHasConnected: Dispatch<boolean>
}> = ({ children, setHasConnected }) => {
  const [windowDefined, setWindowDefined] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setWindowDefined(true);
    setIsMobile(window.innerWidth < 769);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Head>
        <title>Fork Forest 🌳</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div style={windowDefined ? {
        backgroundImage: `url(${image.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: false ? "left" : "top",
        maxHeight: '100%',
        height: '100%',
        maxWidth: '100%',
        width: '100%',
      } : {}}>
        <Header setHasConnected={setHasConnected} />
        <div className="pt-20">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
