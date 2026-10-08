import { AppearanceCard } from './AppearanceCard';
import { LanguageCard } from './LanguageCard';

export function PreferencesList() {
  return (
    <div className="flex flex-col gap-6">
      <AppearanceCard />
      <LanguageCard />
    </div>
  );
}

export default PreferencesList;
