import logoImg from '@/core/assets/images/logo.png';
import Image from 'next/image';

const sizeMap = {
  sm: 80,
  md: 120,
  lg: 160,
};

interface LogoProps {
  size?: keyof typeof sizeMap;
  className?: string;
}

export function Logo({ size = 'sm', className = '' }: LogoProps) {
  return (
    <Image
      src={logoImg}
      alt="SMSIllico"
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={className}
    />
  );
}

export default Logo;
