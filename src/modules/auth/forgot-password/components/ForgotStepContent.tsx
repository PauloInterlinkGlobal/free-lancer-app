import ForgotEmailForm from './Forms/ForgotEmailForm';
import ForgotCodeForm from './Forms/ForgotCodeForm';
import ForgotNewPasswordForm from './Forms/ForgotNewPasswordForm';
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm';

type FormType = ReturnType<typeof useForgotPasswordForm>;

export default function ForgotStepContent({ form }: { form: FormType }) {
  if (form.step === 'email') {
    return (
      <ForgotEmailForm
        email={form.email}
        emailError={form.errors.email}
        isLoading={form.isLoading}
        emailRef={form.emailRef}
        onEmailChange={(v) => {
          form.setEmail(v);
          form.clearError('email');
        }}
      />
    );
  }

  if (form.step === 'code') {
    return (
      <ForgotCodeForm
        code={form.code}
        codeError={form.errors.code}
        isLoading={form.isLoading}
        codeRef={form.codeRef}
        onCodeChange={(v) => {
          form.setCode(v);
          form.clearError('code');
        }}
        onBack={form.handleBack}
      />
    );
  }

  return (
    <ForgotNewPasswordForm
      password={form.password}
      confirmPassword={form.confirmPassword}
      errors={form.errors}
      isLoading={form.isLoading}
      passwordRef={form.passwordRef}
      onPasswordChange={(v) => {
        form.setPassword(v);
        form.clearError('password');
      }}
      onConfirmPasswordChange={(v) => {
        form.setConfirmPassword(v);
        form.clearError('confirmPassword');
      }}
      onBack={form.handleBack}
    />
  );
}
