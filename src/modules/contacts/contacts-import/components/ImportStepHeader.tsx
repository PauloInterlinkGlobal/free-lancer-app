interface ImportStepHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function ImportStepHeader({
  eyebrow,
  title,
  description,
}: ImportStepHeaderProps) {
  return (
    <header className="flex flex-col gap-1.5 px-1">
      <span className="text-xs font-bold uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
      <h1 className="text-2xl font-bold leading-tight text-primary-content md:text-4xl">
        {title}
      </h1>
      <p className="max-w-xl text-sm text-muted-content md:text-base">
        {description}
      </p>
    </header>
  );
}
