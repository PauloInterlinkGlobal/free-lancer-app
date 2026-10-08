import { ComponentProps } from 'react';
import { ImportWizardClient } from './ImportWizardClient';

export function ImportWizard(props: ComponentProps<typeof ImportWizardClient>) {
  return <ImportWizardClient {...props} />;
}
