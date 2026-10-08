import {
  PERSONAL_MOCK,
  PersonalForm,
  SettingsSection
} from '@/modules/settings/settings-general';

export default function GeneralPage() {
  return (
    <div className="flex flex-col gap-10">
      <SettingsSection
        title="Pessoal"
        description="Os teus dados pessoais e de acesso."
      >
        <PersonalForm defaultValues={PERSONAL_MOCK} />
      </SettingsSection>

     
    </div>
  );
}
