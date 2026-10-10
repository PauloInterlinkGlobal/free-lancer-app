'use client';

import React from 'react';
import { CreateApiKeyModal } from './Modal';

interface ApiIntegrationWrapperProps {
  children: React.ReactNode;
}

export function ApiIntegrationWrapper({
  children,
}: ApiIntegrationWrapperProps) {
  return (
    <>
      {children}
      <CreateApiKeyModal />
    </>
  );
}
