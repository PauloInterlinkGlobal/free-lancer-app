'use server';

import type { ISendSmsPayload } from '../interfaces';

export async function sendSms(payload: ISendSmsPayload) {
  //chamada da api
  console.log(payload);
}
