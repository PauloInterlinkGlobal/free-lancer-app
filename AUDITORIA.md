# Auditoria app-smsillico — repositório principal vs. local

## Causa do erro `Module not found ... ApiIntegrationBreadcrumbButtons`
O `BreadcrumbClient.tsx` local já era igual ao do repositório (importa `ApiIntegrationBreadcrumbButtons`),
mas a funcionalidade **api-integration** (página, módulo, botões do breadcrumb, modais, store) nunca chegou à
pasta local. Resultado: `tsc` local falha nesse import e `/pt/dashboard` devolve 500.

## Estratégia da fusão
Base = repositório principal. Por cima foram aplicadas as funcionalidades só existentes no local.
Onde o repositório evoluiu mais (redesenho), manteve-se a versão do repositório.

### Mantido do repositório (mais recente)
Header em subpastas (Search, Wallet, Notifications), wizard de importação de contactos (ImportStepHeader,
UploadFileSummary...), grupos (detalhe, stats, visuais), modais da blacklist, modais Detail/Delete redesenhados,
Select (popoverRef/estimatedHeight), api-integration completo, CompanyForm nas definições gerais.

### Adicionado do local
- Links: página `/links`, módulo `modules/links`, breadcrumb, entrada no menu, modais ADD/DELETE_LINK
- Definições > Projeto (`/settings/project`, módulo `settings-project`)
- Enviar SMS: ItemPickerModal (grupos/modelos/links), PickerTrigger, LinksCard, VariablesDropdown + dynamic-variables
- Contactos: AddContactModal, sobrenome/email/variáveis (`ICreateContactInput`), validação, filtros por nome completo
- Relatórios: GenerateReportModal (módulo reports e dashboard), exportação CSV/SVG, `currency` nos mocks
- Navegação i18n: `Link` de `@/core/i18n/navigation` (evita perder o prefixo /pt /en) em AuthFooterLinks, SidebarNavItem, MobileMenuClient
- Login / recuperar palavra-passe: redirecionamento (mock) para /dashboard e /login
- i18n pt/en: união das chaves (sem conflitos de valores); `useModalStore`: união dos tipos de modal

### Incompatibilidades corrigidas
1. **Maiúsculas/minúsculas em imports** — a pasta é `GroupForm/` mas o repositório importava `.../groupForm`.
   Funciona em Windows/macOS, **quebra em Linux (Docker, CI)**. Corrigido em CreateGroupModal, UpdateGroupModal, GroupsGrid.
2. `contact.sex` passou a opcional → DetailContactModal ajustado.
3. `ReportsBreadcrumbButtons` agora abre o modal de relatório (`GENERATE_REPORT`) em vez de só `console.log`.

## Pontos a tratar (não alterados de propósito)
- **yarn.lock** contém URLs `registry.npmmirror.com` (mongoose, xlsx, bson, cfb...). Fora de redes que alcancem esse
  mirror o `yarn install --frozen-lockfile` do Dockerfile falha. Regenerar: apagar essas entradas e correr `yarn install`.
- **Dois lockfiles no local** (`package-lock.json` + `yarn.lock`): usar só yarn (o Dockerfile usa yarn). Não incluído aqui.
- **react-is ^19.3.0** existe no package.json local mas não no repositório. Se precisares, `yarn add react-is` (actualiza o yarn.lock;
  editar só o package.json quebraria `--frozen-lockfile`).
- **ESLint**: o `eslint.config.mjs` do repositório (`eslint-config-standard`) ignora todo o `src/*.tsx`, por isso não valida nada.
  O do local (`next/core-web-vitals`) valida, mas revela ~22 erros `no-unused-vars` que fariam `next build` falhar.
  Mantive o do repositório. Quando quiseres activar o do local, limpa primeiro: BreadcrumbClient (title, description, backHref,
  isTemplatesPage), HeaderTitle (label), SelectTrigger (SelectSize), useSelectPlacement (popoverRef, estimatedHeight),
  GroupsGrid (setViewing), Create/UpdateGroupModal (onSubmit), DashboardRecentTable (History), DetailHistoryModal (sendingTypeStyles),
  BankTransferStepClient (transferReference), ReportsCampaignTable (onView, onExport, selectedCampaign), DetailDraftModal (smsTypeStyles),
  SmsForm (links), DetailSenderModal (initials), SendersHeader (openModal).
- `ReportsCampaignTable`: o repositório removeu a coluna de acções (Ver detalhes/Exportar) que o local tinha; ficou a do repositório.
- `HeaderTitle` renderiza um `<h1>` vazio (o título vem do layout) — código morto em ambos.

## Verificação
`tsc --noEmit` do projeto fundido: **0 erros** (o local original: 1 erro, o import do Breadcrumb).
`next build` não pôde ser concluído no meu ambiente (sem acesso ao Google Fonts/Poppins); corre `yarn build` na tua máquina.
