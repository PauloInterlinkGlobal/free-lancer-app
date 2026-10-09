export interface VariablesDropdownProps {
  onSelect: (token: string) => void;
  customKeys?: string[];
  disabled?: boolean;
  className?: string;
}
