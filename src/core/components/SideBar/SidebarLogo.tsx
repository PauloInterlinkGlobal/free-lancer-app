import logoImg from '@/core/assets/images/logo.png';
import Image from 'next/image';

export function SidebarLogo() {
  return (
    <Image
      src={logoImg}
      alt="SMSIllico"
      width={110}
      height={46}
      priority
      className="h-auto w-[110px]"
    />
  );
}
