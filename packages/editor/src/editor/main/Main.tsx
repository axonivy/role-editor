import type { RoleData } from '@axonivy/role-editor-protocol';
import {
  Badge,
  BasicField,
  Button,
  deleteFirstSelectedRow,
  Flex,
  IvyIcon,
  selectRow,
  Separator,
  SortableHeader,
  Table,
  TableBody,
  TableResizableHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useHotkeys,
  useReadonly,
  useTableGlobalFilter,
  useTableKeyHandler,
  useTableSelect,
  useTableSort
} from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { getCoreRowModel, useReactTable, type ColumnDef, type Table as ReactTable } from '@tanstack/react-table';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { useKnownHotkeys } from '../../utils/useKnownHotkeys';
import { AddRoleDialog } from '../dialog/AddRoleDialog';
import './Main.css';
import { ValidationRow } from './ValidationRow';

export const Main = () => {
  const { t } = useTranslation();
  const { data, setData, setSelectedElement, detail, setDetail } = useAppContext();

  const selection = useTableSelect<RoleData>({
    onSelect: selectedRows => {
      const selectedRowIndex = Object.keys(selectedRows).find(key => selectedRows[key]);
      if (selectedRowIndex === undefined) {
        setSelectedElement();
        return;
      }
      const selectedRole = table.getRowModel().flatRows.find(row => row.index === Number(selectedRowIndex))?.original.id;
      if (selectedRole) {
        setSelectedElement(selectedRole);
      }
    }
  });
  const globalFilter = useTableGlobalFilter();
  const sort = useTableSort();
  const columns: Array<ColumnDef<RoleData, string>> = [
    {
      accessorKey: 'id',
      header: ({ column }) => <SortableHeader column={column} name={t('common.label.name')} />,
      cell: cell => (
        <Flex alignItems='center' gap={1}>
          {<IvyIcon icon={IvyIcons.Users} />}
          <span>{cell.getValue()}</span>
        </Flex>
      )
    },
    {
      accessorKey: 'parent',
      header: ({ column }) => <SortableHeader column={column} name={t('label.parentRole')} />,
      cell: cell => <span>{cell.getValue()}</span>
    },
    {
      id: 'member',
      accessorFn: row => row.members.join(','),
      header: () => <span>{t('label.memberRoles')}</span>,
      cell: cell => (
        <Flex direction='row' gap={1}>
          {cell
            .getValue()
            .split(',')
            .filter(member => member.trim().length > 0)
            .map(member => (
              <Badge key={member} variant='secondary' size='s'>
                {member}
              </Badge>
            ))}
        </Flex>
      )
    }
  ];

  const table = useReactTable({
    ...selection.options,
    ...globalFilter.options,
    ...sort.options,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      ...selection.tableState,
      ...sort.tableState,
      ...globalFilter.tableState
    }
  });

  const { handleKeyDown } = useTableKeyHandler({
    table,
    data
  });

  const deleteRole = () =>
    setData(old => {
      const deleteFirstSelectedRowReturnValue = deleteFirstSelectedRow(table, old);
      return deleteFirstSelectedRowReturnValue.newData;
    });

  const resetSelection = () => {
    selectRow(table);
  };

  const hotkeys = useKnownHotkeys();
  const readonly = useReadonly();
  const ref = useHotkeys(hotkeys.deleteRole.hotkey, () => deleteRole(), { scopes: ['global'], enabled: !readonly });
  const firstElement = useRef<HTMLDivElement>(null);
  useHotkeys(hotkeys.focusMain.hotkey, () => firstElement.current?.focus(), { scopes: ['global'] });

  return (
    <Flex direction='column' ref={ref} onClick={resetSelection} className='role-editor-main-content'>
      <BasicField
        tabIndex={-1}
        ref={firstElement}
        label={t('label.roles')}
        control={<Controls table={table} deleteRole={table.getSelectedRowModel().flatRows.length > 0 ? deleteRole : undefined} />}
        onClick={event => event.stopPropagation()}
      >
        {globalFilter.filter}
        <Table onKeyDown={e => handleKeyDown(e, () => setDetail(!detail))}>
          <TableResizableHeader headerGroups={table.getHeaderGroups()} onClick={resetSelection} />
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <ValidationRow key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </BasicField>
    </Flex>
  );
};

const Controls = ({ table, deleteRole }: { table: ReactTable<RoleData>; deleteRole?: () => void }) => {
  const readonly = useReadonly();
  const hotkeys = useKnownHotkeys();
  if (readonly) {
    return null;
  }
  return (
    <Flex gap={2}>
      <AddRoleDialog table={table}>
        <Button icon={IvyIcons.Plus} aria-label={hotkeys.addRole.label} />
      </AddRoleDialog>
      <Separator decorative orientation='vertical' style={{ height: '20px', margin: 0 }} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button icon={IvyIcons.Trash} onClick={deleteRole} disabled={deleteRole === undefined} aria-label={hotkeys.deleteRole.label} />
          </TooltipTrigger>
          <TooltipContent>{hotkeys.deleteRole.label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Flex>
  );
};
