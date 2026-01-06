import type { RoleData, Severity, ValidationResult } from '@axonivy/role-editor-protocol';
import { MessageRow, SelectRow, TableCell } from '@axonivy/ui-components';
import { flexRender, type Row } from '@tanstack/react-table';
import { useValidations } from '../../context/useValidation';
import './ValidationRow.css';

type ValidationRowProps = {
  row: Row<RoleData>;
};

export const ValidationRow = ({ row }: ValidationRowProps) => {
  const validations = useValidations(row.original.id);
  return (
    <>
      <SelectRow row={row} className={rowClass(validations)}>
        {row.getVisibleCells().map(cell => (
          <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </SelectRow>
      {validations?.map((val, index) => (
        <MessageRow
          key={`${index}-${val.message}`}
          columnCount={row.getVisibleCells().length}
          message={{ message: val.message, variant: val.severity.toLocaleLowerCase() as Lowercase<Severity> }}
        />
      ))}
    </>
  );
};

export const rowClass = (validations?: Array<ValidationResult>) => {
  if (!validations) {
    return '';
  }
  if (validations.find(message => message.severity === 'ERROR')) {
    return 'role-editor-row-error';
  }
  if (validations.find(message => message.severity === 'WARNING')) {
    return 'role-editor-row-warning';
  }
  return '';
};
