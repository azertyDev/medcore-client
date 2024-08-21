import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { ListItemText } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import Label from '../label';

// ----------------------------------------------------------------------

export default function CollapsibleTable({
  parentData,
  childData,
  handleViewRow,
  childTableTitle,
  parentTableHead,
  childTableHead,
  handleViewSlots,
}) {
  return (
    <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }} size="small">
          <TableHead>
            <TableRow>
              {/* <TableCell /> */}
              {parentTableHead.map((el) => (
                <TableCell>{el.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {parentData?.map((row, idx) => (
              <CollapsibleTableRow
                key={idx}
                row={row.resource}
                childData={childData}
                childTableHead={childTableHead}
                childTableTitle={childTableTitle}
                handleViewSlots={handleViewSlots}
                handleViewRow={() => handleViewRow(row.resource)}
              />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------

function CollapsibleTableRow({
  row,
  childData,
  handleViewRow,
  childTableTitle,
  childTableHead,
  handleViewSlots,
}) {
  const collapsible = useBoolean();

  return (
    <>
      <TableRow key={row.id}>
        <TableCell>
          <IconButton
            size="small"
            color={collapsible.value ? 'inherit' : 'default'}
            onClick={() => {
              handleViewRow();
              collapsible.onToggle();
            }}
          >
            <Iconify
              icon={collapsible.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>

        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>

        <TableCell>
          <ListItemText
            primary={fDate(row.meta.lastUpdated)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          />
        </TableCell>

        <TableCell>
          <Label variant="soft" color={row.active ? 'success' : 'warning'}>
            {row.active ? 'Активный' : 'Не активный'}
          </Label>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={collapsible.value} unmountOnExit>
            <Paper
              variant="outlined"
              sx={{
                my: 2,
                py: 2,
                borderRadius: 1.5,
                ...(collapsible.value && {
                  boxShadow: (theme) => theme.customShadows.z20,
                }),
              }}
            >
              <Typography variant="h6" sx={{ m: 2, mt: 0 }}>
                {childTableTitle}
              </Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    {childTableHead.map((el) => (
                      <TableCell>{el.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {childData?.map((item, idx) => (
                    <TableRow
                      hover
                      sx={{ cursor: 'pointer' }}
                      key={idx}
                      onClick={() => handleViewSlots(item)}
                    >
                      <TableCell>{item.id}</TableCell>

                      <TableCell>
                        <Typography variant="body2" noWrap>
                          {item.display}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <ListItemText
                          primary={fDate(item.created_at)}
                          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                        />
                      </TableCell>
                      <TableCell>
                        <Label variant="soft" color={row.active ? 'success' : 'warning'}>
                          {row.active ? 'Активный' : 'Не активный'}
                        </Label>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

CollapsibleTable.propTypes = {
  handleViewRow: PropTypes.func,
  handleViewSlots: PropTypes.func,
  parentData: PropTypes.arrayOf(PropTypes.object),
  childData: PropTypes.arrayOf(PropTypes.object),
  childTableTitle: PropTypes.string,
  parentTableHead: PropTypes.arrayOf(PropTypes.object),
  childTableHead: PropTypes.arrayOf(PropTypes.object),
};

CollapsibleTableRow.propTypes = {
  row: PropTypes.object,
  handleViewRow: PropTypes.func,
  handleViewSlots: PropTypes.func,
  childTableTitle: PropTypes.string,
  childData: PropTypes.arrayOf(PropTypes.object),
  childTableHead: PropTypes.arrayOf(PropTypes.object),
};
