import { useState, useRef, useEffect } from 'react';

export function useLoginState() {
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [direction, setDirection] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (step === 'email') emailRef.current?.focus();
      else passwordRef.current?.focus();
    }, 250);
    return () => clearTimeout(t);
  }, [step]);

  return {
    step,
    setStep,
    direction,
    setDirection,
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    isLoading,
    setIsLoading,
    emailRef,
    passwordRef,
  };
}
