import Image from 'next/image';
import ekoToken from '@/assets/ekoToken-logo.svg';
import gainforestLogo from '@/assets/gainforest.logo.svg';
import forkdaoLogo from '@/assets/forkdao-logo.svg';

export default function Home() {
  return (
    <main className='mx-[10vw]'>
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
    </main>
  );
}
