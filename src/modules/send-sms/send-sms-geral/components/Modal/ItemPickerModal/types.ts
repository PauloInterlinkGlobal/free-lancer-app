import type { ModalType } from '@/core/store/useModalStore';
import type { LucideIcon } from 'lucide-react';

export interface ItemPickerItem {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
}

export interface ItemPickerModalProps {
  id: ModalType;
  title: string;
  description?: string;
  icon?: LucideIcon;
  items: ItemPickerItem[];
  selectedIds: string[];
  mode: 'single' | 'multiple';
  pageSize?: number;
  emptyMessage?: string;
  confirmLabel?: string;
  onConfirm: (ids: string[]) => void;
  onClose?: () => void;
}
