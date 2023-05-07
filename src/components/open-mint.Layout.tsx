import Head from "next/head";
import React, { Dispatch, ReactNode, useEffect, useState } from "react";
import Header from "./open-mint.Header";
import image from "../../public/background.png";
import HeaderMobile from "./open-mint.HeaderMobile";

const Layout: React.FC<{
  children: ReactNode,
  setHasConnected: Dispatch<boolean>,
  isMobile: boolean
}> = ({ children, setHasConnected, isMobile }) => {
  const [windowDefined, setWindowDefined] = useState(false);

  useEffect(() => {
    setWindowDefined(true);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Head>
        <title>{"🌳 Fork Forest 🌳"}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div style={windowDefined ? {
        backgroundImage: `url(${image.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: isMobile ? "left" : "top",
        maxHeight: '100%',
        height: '100%',
        maxWidth: '100%',
        width: '100%',
      } : {}}>
        {isMobile ?
          <HeaderMobile setHasConnected={setHasConnected} /> :
          <Header setHasConnected={setHasConnected} />
        }
        <div className={isMobile ? "pt-10" : "pt-20"}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
