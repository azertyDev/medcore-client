import listPlugin from '@fullcalendar/list';
import { useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import ruLocale from '@fullcalendar/core/locales/ru';
import interactionPlugin from '@fullcalendar/interaction';

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Slide,
  Dialog,
  AppBar,
  Button,
  Avatar,
  Toolbar,
  Divider,
  Container,
  TextField,
  CardHeader,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CollapsibleTable } from 'src/components/table';

import { _practitioners } from '../../../_mock';
import Iconify from '../../../components/iconify';
import { useCalendar } from '../../calendar/hooks';
import Scrollbar from '../../../components/scrollbar';
import { StyledCalendar } from '../../calendar/styles';
import { useResponsive } from '../../../hooks/use-responsive';
import { useGetOrganizations } from '../../../api/organization';
import { useGetPractitioners } from '../../../api/practitioner';
import { useSettingsContext } from '../../../components/settings';

const ORGANIZATIONS_TABLE_HEAD = [
  { id: 'practitioners', label: 'Врачи' },
  { id: 'id', label: 'Идентификатор' },
  { id: 'display', label: 'Название' },
  { id: 'created_at', label: 'Дата создания' },
  { id: 'status', label: 'Статус' },
];

const PRACTITIONERS_TABLE_HEAD = [
  { id: 'id', label: 'Идентификатор' },
  { id: 'display', label: 'Ф.И.О.' },
  { id: 'created_at', label: 'Дата регистрации' },
  { id: 'status', label: 'Статус' },
];

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const OrganizationsListView = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const smUp = useResponsive('up', 'sm');

  const { organizations } = useGetOrganizations();
  const { practitioners } = useGetPractitioners();

  const settings = useSettingsContext();
  const patientsModal = useBoolean();
  const practitionerModal = useBoolean();
  const [practitioner, setPractitioner] = useState({});

  const {
    calendarRef,
    //
    view,
    date,
    //
    onDatePrev,
    onDateNext,
    onDateToday,
    onDropEvent,
    onChangeView,
    onSelectRange,
    onClickEvent,
    onResizeEvent,
    onInitialView,
    //
    openForm,
    onOpenForm,
    onCloseForm,
    //
    selectEventId,
    selectedRange,
    //
    onClickEventInFilters,
  } = useCalendar();

  const handleViewRow = (item) => {
    const findedPractitioners = _practitioners.filter(
      (pr) => pr.practitioner_roles[0].organization_id === item.id
    );

    // setPractitioners(findedPractitioners);
  };

  const handleViewSlots = (item) => {
    setPractitioner(item);

    practitionerModal.onTrue();
  };

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Stack>
          <Typography variant="h3" mb={2}>
            {t('registry')}
          </Typography>
          <Button onClick={() => practitionerModal.onTrue()}>Practitioners</Button>

          <Card>
            <CardHeader title={t('organizationsList')} />
            <CollapsibleTable
              childData={practitioners}
              parentData={organizations}
              handleViewRow={handleViewRow}
              handleViewSlots={handleViewSlots}
              childTableTitle={t('practitionersList')}
              childTableHead={PRACTITIONERS_TABLE_HEAD}
              parentTableHead={ORGANIZATIONS_TABLE_HEAD}
            />
          </Card>
        </Stack>
      </Container>

      <Dialog
        fullScreen
        open={practitionerModal.value}
        onClose={practitionerModal.onFalse}
        TransitionComponent={Transition}
      >
        <AppBar position="relative" color="default">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={practitionerModal.onFalse}>
              <Iconify icon="mingcute:close-line" />
            </IconButton>

            <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
              Слоты
            </Typography>

            <Button
              autoFocus
              color="inherit"
              variant="contained"
              onClick={practitionerModal.onFalse}
            >
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>

        <Box display="flex" flexDirection="row">
          <Box>
            <Scrollbar>
              <Stack spacing={2} sx={{ p: 2, width: 350 }}>
                <TextField placeholder="Поиск по ФИО, ПИНФЛ" />

                <Box gap={2} display="grid">
                  {Array.from({ length: 6 }).map((el) => (
                    <Card>
                      <CardContent sx={{ p: 2, gap: 4, display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 56, height: 56 }}>
                          <Iconify icon="hugeicons:user-id-verification" width={32} />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1">RAJABOV AKROM</Typography>
                          <Typography variant="body2">Врач</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Stack>
            </Scrollbar>
          </Box>

          <Divider orientation="vertical" />
          <StyledCalendar>
            {/* <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              editable
              selectable
              initialEvents={[{ title: 'nice event', start: new Date(), resourceId: 'a' }]}
              eventContent={renderEventContent}
            /> */}

            <FullCalendar
              weekends
              editable
              locale={ruLocale}
              droppable
              selectable
              rerenderDelay={10}
              allDayMaintainDuration
              eventResizableFromStart
              ref={calendarRef}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              // events={dataFiltered}
              initialEvents={[{ title: 'nice event', start: new Date(), resourceId: 'a' }]}
              headerToolbar={false}
              select={onSelectRange}
              eventClick={onClickEvent}
              height={smUp ? 720 : 'auto'}
              // eventDrop={(arg) => {
              //   onDropEvent(arg, updateEvent);
              // }}
              // eventResize={(arg) => {
              //   onResizeEvent(arg, updateEvent);
              // }}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
            />
          </StyledCalendar>
        </Box>
      </Dialog>
    </>
  );
};

export default OrganizationsListView;

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
