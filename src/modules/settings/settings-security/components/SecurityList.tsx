import { MfaCard } from './MfaCard';
import { PasswordForm } from './PasswordForm';

export function SecurityList() {
  return (
    <div className="flex flex-col gap-6">
      <PasswordForm />
      <MfaCard />
    </div>
  );
}
