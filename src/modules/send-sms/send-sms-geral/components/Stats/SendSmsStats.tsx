import { MessageSquare, Users, UsersRound } from 'lucide-react';

interface SendSmsStatsProps {
  sms: number;
  contacts: number;
  groups: number;
}

const stats = [
  {
    key: 'sms',
    label: 'SMS Disponíveis',
    icon: MessageSquare,
    value: (props: SendSmsStatsProps) => props.sms,
    iconColor: 'text-primary',
  },
  {
    key: 'contacts',
    label: 'Contactos na conta',
    icon: Users,
    value: (props: SendSmsStatsProps) => props.contacts,
    iconColor: 'text-blue-500',
  },
  {
    key: 'groups',
    label: 'Grupos criados',
    icon: UsersRound,
    value: (props: SendSmsStatsProps) => props.groups,
    iconColor: 'text-violet-500',
  },
] as const;

export function SendSmsStats(props: SendSmsStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(({ key, label, icon: Icon, value, iconColor }) => (
        <div
          key={key}
          className="flex flex-col gap-4 rounded-2xl bg-surface p-5 shadow-sm"
        >
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconColor}`}
          >
            <Icon size={20} aria-hidden />
          </span>

          <div className="min-w-0">
            <p className="text-sm text-muted-content">{label}</p>
            <p className="mt-1 truncate text-2xl font-bold text-primary-content">
              {value(props).toLocaleString('pt-PT')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
