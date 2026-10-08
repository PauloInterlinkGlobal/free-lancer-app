import RegisterInfoForm from './Forms/RegisterInfoForm';
import RegisterPasswordForm from './Forms/RegisterPasswordForm';
import { useRegisterForm } from '../hooks/useRegisterForm';

type FormType = ReturnType<typeof useRegisterForm>;

export default function RegisterStepContent({ form }: { form: FormType }) {
  if (form.step === 'info') {
    return (
      <RegisterInfoForm
        firstName={form.firstName}
        lastName={form.lastName}
        email={form.email}
        phone={form.phone}
        errors={form.errors}
        isLoading={form.isLoading}
        firstNameRef={form.firstNameRef}
        onFirstNameChange={(v) => {
          form.setFirstName(v);
          form.clearError('firstName');
        }}
        onLastNameChange={(v) => {
          form.setLastName(v);
          form.clearError('lastName');
        }}
        onEmailChange={(v) => {
          form.setEmail(v);
          form.clearError('email');
        }}
        onPhoneChange={(v) => form.setPhone(v)}
      />
    );
  }

  return (
    <RegisterPasswordForm
      password={form.password}
      confirmPassword={form.confirmPassword}
      errors={form.errors}
      isLoading={form.isLoading}
      passwordRef={form.passwordInputRef}
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
