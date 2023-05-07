import Head from "next/head";
import React, { Dispatch, ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import image from "../../public/background.png";
import HeaderMobile from "./HeaderMobile";
import { OpenInNew } from "@mui/icons-material";
import { Card, Typography } from "@mui/material";

const CollectionInfo: React.FC = () => {
  return (
    <div>
      <Card className="p-1" style={{ background: "rgb(67 103 110 / 69%)" }}>
        <Typography color="#cdd8c4" style={{ textAlign: "center" }}>
          <p>
            Gracias a la colección de NFTs, Fork DAO consiguió reunir los fondos suficientes
          </p>
          <p>
            para que la agrupación Zapam Zucum pueda realizar una reforestación
          </p>
          <p>
            de especies nativas en Villa de las Rosas, Córdoba.
          </p>
          <p className="py-2">
            ¡Mantenete actualizado sobre la plantación el día 14/05!
          </p>
        </Typography>
        <Typography color="#cdd8c4" style={{ textAlign: "left" }}>
          <p>
            - Colección de NFTs en OpenSea <a target="_blank" rel="noreferrer" href={'https://opensea.io/es/collection/forestnft-1'}>
              <OpenInNew fontSize="inherit" />
            </a>
          </p>
          <p>
            - Publicación de Zapam Zucum sobre el proyecto <a target="_blank" rel="noreferrer" href={'https://www.instagram.com/p/CrerjpbJy21/?igshid=YmMyMTA2M2Y='}>
              <OpenInNew fontSize="inherit" /></a>
          </p>
          <p>
            - Twitter de Fork DAO <a target="_blank" rel="noreferrer" href={'https://twitter.com/ForkDAOes'}>
              <OpenInNew fontSize="inherit" /></a>
          </p>
        </Typography>
      </Card>
    </div>
  );
}

export default CollectionInfo;
