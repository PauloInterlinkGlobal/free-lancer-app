import { teamMock } from '../mocks/team.mock';
import { countByGroup } from '../utils/team-utils';
import { TeamOverview } from './TeamOverview';
import { TeamWorkspace } from './TeamWorkspace';

const CURRENT_USER_ID = 'm1';

export async function TeamList() {
  const members = teamMock;

  return (
    <div className="flex flex-col gap-6">
      <TeamOverview counts={countByGroup(members)} />
      <TeamWorkspace members={members} currentUserId={CURRENT_USER_ID} />
    </div>
  );
}
