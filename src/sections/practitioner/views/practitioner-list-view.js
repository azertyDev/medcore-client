import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { Button, Container, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { applyFilter } from 'src/layouts/common/searchbar/utils';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import { ConfirmDialog } from 'src/components/custom-dialog';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
} from 'src/components/table';

import { _practitioners } from '../../../_mock';
import PractitionerTableRow from '../practitioner-table-row';

const TABLE_HEAD = [
  { id: 'id', label: 'Идентификатор' },
  { id: 'display', label: 'Ф.И.О.' },
  { id: 'created_at', label: 'Дата регистрации' },
  { id: 'status', label: 'Статус' },
  { id: '' },
];

const defaultFilters = {
  id: null,
  display: '',
  created_at: '',
  status: false,
};

export default function PractitionerListView(props) {
  const table = useTable();
  const { t } = useTranslation();

  const { data } = props;

  const settings = useSettingsContext();

  const confirm = useBoolean();
  const practitionerModal = useBoolean();

  const [tableData, setTableData] = useState(_practitioners || data);

  const denseHeight = table.dense ? 56 : 76;

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    // filters,
    // dateError,
  });

  const [filters, setFilters] = useState(defaultFilters);

  const canReset = !!filters.display || filters.status !== false || !!filters.created_at;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleViewRow = (item) => {
    const practitioners = _practitioners.filter(
      (pr) => pr.practitioner_roles[0].organization_id === item.id
    );

    practitionerModal.onTrue();
  };

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Stack>
          <Typography variant="h3" mb={2}>
            {t('practitionersList')}
          </Typography>

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Stack direction="row">
                  <Tooltip title="Sent">
                    <IconButton color="primary">
                      <Iconify icon="iconamoon:send-fill" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton color="primary">
                      <Iconify icon="eva:download-outline" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="solar:printer-minimalistic-bold" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.map((row) => (
                    <PractitionerTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onViewRow={() => handleViewRow(row)}
                      //   onEditRow={() => handleEditRow(row.id)}
                      //   onDeleteRow={() => handleDeleteRow(row.id)}
                    />
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Stack>
      </Container>

      <ConfirmDialog
        open={practitionerModal.value}
        onClose={practitionerModal.onFalse}
        title="Practitioner"
        content={<div>Content</div>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              practitionerModal.onFalse();
            }}
          >
            Close
          </Button>
        }
      />
    </>
  );
}

PractitionerListView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
