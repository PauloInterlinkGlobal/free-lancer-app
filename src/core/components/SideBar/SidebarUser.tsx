export function SidebarUser() {
  return (
    <div className="flex items-center gap-3 px-3 py-3 mt-4 rounded-xl border border-border-ui">
      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
        <span className="text-primary-500 text-xs font-semibold">JD</span>
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium text-text-primary truncate">
          John Doe
        </span>
        <span className="text-xs text-text-muted truncate">
          john@smsillico.com
        </span>
      </div>
    </div>
  );
}
