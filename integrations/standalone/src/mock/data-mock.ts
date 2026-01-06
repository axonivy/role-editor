import type { RoleEditorData } from '@axonivy/role-editor-protocol';

export const data: RoleEditorData = {
  context: { app: 'mockApp', pmv: 'mockPmv', file: 'roles.yaml' },
  data: [
    { id: 'Employee', displayName: 'Employee', members: ['Manager', 'Teamleader'], parent: '' },
    { id: 'Teamleader', displayName: 'Teamleader', members: [], parent: '' },
    { id: 'Manager', displayName: 'Manager', members: [], parent: '' },
    { id: 'HR Manager', displayName: 'HR Manager', members: [], parent: 'Manager' },
    { id: 'Facility Manager', displayName: 'Facility Manager', members: [], parent: 'Manager' },
    { id: 'IT Manager', displayName: 'IT Manager', members: [], parent: 'Manager' },
    { id: 'Office Manager', displayName: 'Office Manager', members: [], parent: 'Manager' },
    { id: 'Executive Manager', displayName: 'Executive Manager', members: [], parent: 'Manager' },
    { id: 'Order', displayName: 'Order', members: [], parent: '' },
    { id: 'Deliverer', displayName: 'Deliverer', members: [], parent: 'Order' },
    { id: 'Processor', displayName: 'Processor', members: [], parent: 'Order' },
    { id: 'Finance', displayName: 'Finance', members: [], parent: 'Order' },
    { id: 'invalid#role', displayName: 'invalid role', members: [], parent: '' }
  ]
};
