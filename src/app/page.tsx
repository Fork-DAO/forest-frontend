/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { CustomLink } from '@/components';
import { ethers } from 'ethers';

import twitterLogo from '@/assets/twitter-logo.svg';
import lenster from '@/assets/link-lenster.svg';
import github from '@/assets/link-github.svg';
import ekoToken from '@/assets/ekoToken-logo.svg';
import gainforestLogo from '@/assets/gainforest.logo.svg';
import forkdaoLogo from '@/assets/forkdao-logo.svg';
import forestLogo from '@/assets/forest-logo.svg';
import spinner from '@/assets/spinner.svg';
import photos from '@/assets/photos.svg';

const links = [
  {
    label: 'Proyecto Fork Forest 2',
    href: 'https://forum.forkdaogov.xyz/t/fork-forest-02-los-cerrillos/124/3',
  },
  {
    label: 'Proyecto Fork Forest 1',
    href: 'https://forum.forkdaogov.xyz/t/fork-forest-01-urkku/122/2',
  },
  {
    label: 'Podcast en Spotify',
    href: 'https://open.spotify.com/show/3mbOZyvQj2rGUpaBuXbgDk?si=wxjKFRorQ8S2BlQdZq9Z5g',
  },
  {
    label: 'Aportá en Gitcoin',
    href: 'https://builder.gitcoin.co/#/chains/10/registry/0x8e1bD5Da87C14dd8e08F7ecc2aBf9D1d558ea174/projects/881',
  },
];

const icons = [
  {
    icon: twitterLogo,
    alt: 'Twitter Icon',
    href: 'https://twitter.com/ForkForest?t=tzFGGYP3Qie3eCcTOkpaeQ&s=09',
    className: '',
  },
  {
    icon: gainforestLogo,
    alt: 'Gainforest Logo',
    href: 'https://gainforest.app/',
    className: '',
  },
  { icon: lenster, alt: 'Lenster Logo', href: 'https://lenster.xyz/u/forkdao', className: '' },
  { icon: github, alt: 'Github Logo', href: 'https://github.com/Fork-DAO', className: 'w-[30px]' },
  { icon: ekoToken, alt: 'EkoToken Logo', href: 'https://ekonavi.com/organizacao-social/fork-forest', className: '' },
];

const API_KEY = process.env.NEXT_PUBLIC_GC_API_KEY;
const SCORER_ID = process.env.NEXT_PUBLIC_GC_SCORER_ID;

const SUBMIT_PASSPORT_URI = 'https://api.scorer.gitcoin.co/registry/submit-passport';
const SIGNING_MESSAGE_URI = 'https://api.scorer.gitcoin.co/registry/signing-message';

const headers = API_KEY
  ? {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    }
  : undefined;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Home() {
  const [address, setAddress] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);
  const [score, setScore] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();

        if (accounts && accounts[0]) {
          setConnected(true);
          setAddress(accounts[0].address);
          checkPassport(accounts[0].address);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkConnection();
  }, []);

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts[0]);
      setConnected(true);
    } catch (error) {
      console.log('Error connecting...');
    }
  };

  const checkPassport = async (currentAddress = address) => {
    setScore('');
    setIsLoading(true);
    console.log('llamado');
    const GET_PASSPORT_SCORE_URI = `https://api.scorer.gitcoin.co/registry/score/${SCORER_ID}/${currentAddress}`;

    try {
      const { data } = await axios.get(GET_PASSPORT_SCORE_URI, {
        headers,
      });

      if (data.score) {
        // if the user has a score, round it and set it in the local state
        const roundedScore = Math.round(data.score * 100) / 100;
        setScore(roundedScore.toString());
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  console.log(isLoading);

  const submitPassport = async () => {
    try {
      // call the API to get the signing message and the nonce
      const { message, nonce } = await getSigningMessage();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // ask the user to sign the message
      const signature = await signer.signMessage(message);

      const body = JSON.stringify({
        address,
        scorer_id: SCORER_ID,
        signature,
        nonce,
      });

      // call the API, sending the signing message, the signature, and the nonce
      const { data } = await axios.post(SUBMIT_PASSPORT_URI, body, {
        headers,
      });

      if (data.addres) {
        checkPassport(data.addres);
      }
    } catch (err) {
      console.log('error: ', err);
    }
  };

  const getSigningMessage = async () => {
    try {
      const { data } = await axios(SIGNING_MESSAGE_URI, {
        headers,
      });

      return data;
    } catch (err) {
      console.log('error: ', err);
    }
  };

  return (
    <>
      <main className='relative mx-[10vw] flex-1'>
        <Image src={forestLogo} alt='Fork Fores Logo' className='mx-auto min-w-[160px] pt-5 md:pt-10' />
        <p className='mt-8 text-center leading-[22px] md:mx-auto md:w-[70%] md:text-[22px]'>
          Es un proyecto ReFi que trabaja con herramientas web3 al servicio de los valores de conservación ambiental y
          responsabilidad social, además de promover la participación de la comunidad local en la restauración del medio
          ambiente.
        </p>

        <div className='mt-10 flex flex-col items-center justify-center gap-5'>
          {links.map(({ href, label }) => (
            <CustomLink href={href} label={label} key={label} />
          ))}
          {!connected ? (
            <button className='w-full rounded-[50px] border border-black py-2 text-center md:w-1/2' onClick={connect}>
              Conectá tu billetera para utilizar Gitcoin Passport
            </button>
          ) : (
            <button
              onClick={submitPassport}
              // target='_blank'
              // href='https://passport.gitcoin.co/#/'
              className='w-full rounded-[50px] border border-black py-2 text-center md:w-1/2'
            >
              <p>Tu Gitcoin passport</p>
              <p className='text-xs'>{'(Necesitas 20 puntos para multiplicar tu donación)'}</p>
            </button>
          )}
          {connected && score ? (
            <p>
              Actualmente tienes {score} puntos en tu Gitcoin Passport!{' '}
              {Number(score) >= 20 ? 'Estas multiplicando tu donación' : ''}
            </p>
          ) : isLoading ? (
            <div>
              <Image className='animate-spin' src={spinner} alt='Spinner' />
            </div>
          ) : (
            <p className={`${connected && !score ? 'block' : 'hidden'}`}>No tienes puntos en este momento</p>
          )}
        </div>
      </main>
      <footer className='mt-5'>
        <div className='flex items-center justify-center gap-3'>
          {icons.map(({ alt, icon, href, className }) => (
            <Link key={alt} target='_blank' href={href}>
              <Image src={icon} alt={alt} className={className} />
            </Link>
          ))}
        </div>
        <p className='text-center text-sm'> &#169; 2023 Fork Dao</p>
      </footer>
    </>
  );
}
/* <p className={`${connected && !score ? 'block' : 'hidden'}`}>No tienes puntos en este momento</p> */

/* 
<section className='text-center'>
        <h1 className='mt-2 text-[34px] font-extrabold uppercase leading-[34px] text-custom-green'>
          ¿Qué es fork forest?
        </h1>
        <p className='mt-8 leading-[22px]'>
          Es un proyecto ReFi que trabaja con herramientas web3 al servicio de los valores de conservación ambiental y
          responsabilidad social, además de promover la participación de la comunidad local en la restauración del medio
          ambiente.
        </p>
      </section>

      <section className='mt-8 flex justify-center'>
        <Image src={gainforestLogo} alt='GainForest Logo' />
        <Image src={forkdaoLogo} alt='Forkdao Logo' />
        <Image src={ekoToken} alt='EkoToken Logo' />
      </section>
*/
