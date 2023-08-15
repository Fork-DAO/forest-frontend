import Image from 'next/image';
import twitterLogo from '@/assets/twitter-logo.svg';
import lenster from '@/assets/link-lenster.svg';
import github from '@/assets/link-github.svg';
import ekoToken from '@/assets/ekoToken-logo.svg';
import gainforestLogo from '@/assets/gainforest.logo.svg';
import forkdaoLogo from '@/assets/forkdao-logo.svg';
import forestLogo from '@/assets/forest-logo.svg';
import photos from '@/assets/photos.svg';
import { CustomLink } from '@/components';
import Link from 'next/link';

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
  { icon: ekoToken, alt: 'EkoToken Logo', href: '', className: 'https://ekonavi.com/organizacao-social/fork-forest' },
];

export default function Home() {
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
          <Link
            target='_blank'
            href='https://passport.gitcoin.co/#/'
            className='w-full rounded-[50px] border border-black py-2 text-center md:w-1/2'
          >
            <p>Tu Gitcoin passport</p>
            <p className='text-xs'>{'(Necesitas 20 puntos para multiplicar tu donación)'}</p>
          </Link>
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
