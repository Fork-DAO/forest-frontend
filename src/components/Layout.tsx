import Head from "next/head";
import React, { Dispatch, ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import image from "../../public/background.png";
import HeaderMobile from "./HeaderMobile";

const Layout: React.FC<{
  children: ReactNode,
  isMobile: boolean
}> = ({ children, isMobile }) => {
  const [windowDefined, setWindowDefined] = useState(false);

  useEffect(() => {
    setWindowDefined(true);
  }, []);

  return (
    windowDefined ?
      (<div style={{ width: '100vw', height: '100vh' }}>
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
            <HeaderMobile /> :
            <Header />
          }
          <div className={isMobile ? "pt-10" : "pt-20"}>
            {children}
          </div>
        </div>
      </div >)
      : <div />
  );
}

export default Layout;
