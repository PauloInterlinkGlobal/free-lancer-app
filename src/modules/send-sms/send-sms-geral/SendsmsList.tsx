import { contactsMock } from '../../contacts/contacts-geral/mocks/contacts.mock';
import { sendSms } from './actions/sendSms';
import { SmsForm } from './components/SmsForm';
import { SendSmsStats } from './components/Stats/SendSmsStats';
import {
  GROUPS_MOCK,
  SENDER_IDS_MOCK,
  TEMPLATES_MOCK,
} from './mocks/sendsms.mock';

export function SendsmsList() {
  return (
    <section className="flex flex-col gap-6">
      <SendSmsStats sms={410} contacts={4988} groups={18} />

      <SmsForm
        senderIds={SENDER_IDS_MOCK}
        groups={GROUPS_MOCK}
        templates={TEMPLATES_MOCK}
        availableContacts={contactsMock}
        onSubmit={sendSms}
      />
    </section>
  );
}
