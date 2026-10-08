'use client';

import React from 'react';
import { AddSenderModal } from './Modal';

interface SendersWrapperProps {
  children: React.ReactNode;
}

export function SendersWrapper({ children }: SendersWrapperProps) {
  return (
    <>
      {children}
      <AddSenderModal />
    </>
  );
}
