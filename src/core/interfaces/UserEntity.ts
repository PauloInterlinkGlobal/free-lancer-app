import type { Types } from 'mongoose';
import { TModel } from '../types/TModel';

export type ProjectStatus =
  'active' | 'suspended' | 'pending_deletion' | 'deleted';

export interface IProject extends TModel {
  projectId: string;
  company: {
    tradeName: string;
    nif: string;
    sector: string;

    contacts?: {
      phone?: string;
      isPhoneVerified?: boolean;

      email?: string;
      isEmailVerified?: boolean;
    };

    address?: {
      streetAddress: string;
      neighborhood: string;
      city: string;
      country: string;
    };

    website?: string;
  };

  owner?: Types.ObjectId;
  webhookUrl?: string;

  customFields: string[];

  status: ProjectStatus;

  deletionScheduledAt?: Date;
  deletionRequestedAt?: Date;
  deletionRequestedBy?: Types.ObjectId;
  deletionReason?: string;
}
