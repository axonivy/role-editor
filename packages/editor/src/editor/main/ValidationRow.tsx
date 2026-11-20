import type { RoleData, Severity, ValidationResult } from '@axonivy/role-editor-protocol';
import { cn, MessageRow, SelectRow, TableCell, type DataTableFeatures } from '@axonivy/ui-components';
import { flexRender, type Row } from '@tanstack/react-table';
import { useAction } from '../../hooks/useAction';
import { useValidations } from '../../hooks/useValidation';

type ValidationRowProps = {
  row: Row<DataTableFeatures, RoleData>;
};

export const ValidationRow = ({ row }: ValidationRowProps) => {
  const validations = useValidations(row.original.id);
  const openUrl = useAction('openUrl');
  return (
    <>
      <SelectRow row={row} className={rowClass(validations)}>
        {row.getVisibleCells().map(cell => (
          <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </SelectRow>
      {validations?.map((val, index) => {
        const message = {
          message: val.message,
          variant: val.severity.toLocaleLowerCase() as Lowercase<Severity>,
          reference: { tooltip: val.code, openUrl: () => openUrl(val.url) }
        };
        return (
          <MessageRow
            // eslint-disable-next-line @eslint-react/no-array-index-key
            key={`${index}-${val.message}`}
            columnCount={row.getVisibleCells().length}
            message={message}
          />
        );
      })}
    </>
  );
};

export const rowClass = (validations?: Array<ValidationResult>) => {
  if (!validations) {
    return '';
  }
  if (validations.find(message => message.severity === 'ERROR')) {
    return cn('border-b-error!');
  }
  if (validations.find(message => message.severity === 'WARNING')) {
    return cn('border-b-warning!');
  }
  return '';
};
