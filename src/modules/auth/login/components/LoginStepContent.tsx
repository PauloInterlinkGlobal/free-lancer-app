import LoginEmailForm from './Forms/LoginEmailForm';
import LoginPasswordForm from './Forms/LoginPasswordForm';
import { useLoginForm } from '../hooks/useLoginForm';

type FormType = ReturnType<typeof useLoginForm>;

export default function LoginStepContent({ form }: { form: FormType }) {
  if (form.step === 'email') {
    return (
      <LoginEmailForm
        email={form.email}
        emailError={form.emailError}
        isLoading={form.isLoading}
        emailRef={form.emailRef}
        onEmailChange={(val) => {
          form.setEmail(val);
          if (form.emailError) form.setEmailError('');
        }}
      />
    );
  }

  return (
    <LoginPasswordForm
      password={form.password}
      passwordError={form.passwordError}
      isLoading={form.isLoading}
      passwordRef={form.passwordRef}
      onPasswordChange={(val) => {
        form.setPassword(val);
        if (form.passwordError) form.setPasswordError('');
      }}
      onBack={form.handleBack}
    />
  );
}
