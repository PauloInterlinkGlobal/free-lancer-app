interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className=" pb-3">
        <h3 className="text-lg font-semibold text-primary-content">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted-content">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}
