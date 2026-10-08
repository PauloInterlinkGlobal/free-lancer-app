import { ComponentProps } from 'react';
import { BankTransferStepClient } from './BankTransferStepClient';

export function BankTransferStep(
  props: ComponentProps<typeof BankTransferStepClient>
) {
  return <BankTransferStepClient {...props} />;
}
