import { ComponentProps } from 'react';
import { PaymentDetailsClient } from './PaymentDetailsClient';

export function PaymentDetails(
  props: ComponentProps<typeof PaymentDetailsClient>
) {
  return <PaymentDetailsClient {...props} />;
}
