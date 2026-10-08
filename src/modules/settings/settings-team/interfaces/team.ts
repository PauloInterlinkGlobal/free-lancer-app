export type TeamRole = 'admin' | 'manager' | 'sales';
export type MemberStatus = 'active' | 'suspended';

export interface ITeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: MemberStatus;
  lastActive: string | null;
}

export interface IMemberDraft {
  firstName: string;
  lastName: string;
  email: string;
  role: TeamRole;
}
