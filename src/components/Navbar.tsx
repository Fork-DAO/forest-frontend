import Image from 'next/image';
import forestLogo from '@/assets/forest-logo.svg';

export const Navbar = () => {
  return (
    <nav className='flex justify-between px-[10vw] py-5'>
      <Image src={forestLogo} alt='Logo' />

      <div>
        <button className='flex flex-col items-center justify-center gap-2 p-[2px]'>
          <span className='mx-auto block h-[2px] w-[15px] bg-black' />
          <span className='block h-[2px] w-[25px] bg-black' />
          <span className='mx-auto block h-[2px] w-[15px] bg-black' />
        </button>
      </div>
    </nav>
  );
};
