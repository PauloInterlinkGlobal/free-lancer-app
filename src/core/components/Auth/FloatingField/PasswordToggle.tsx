import { Eye, EyeOff } from 'lucide-react';

interface PasswordToggleProps {
  show: boolean;
  onToggle: () => void;
}

export default function PasswordToggle({
  show,
  onToggle,
}: PasswordToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={show ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
      className="mr-3 text-neutral-500 hover:text-neutral-800 transition dark:hover:text-neutral-200"
    >
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );
}
