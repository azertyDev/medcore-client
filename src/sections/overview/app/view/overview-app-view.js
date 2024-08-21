'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { SeoIllustration, OnlineDoctorIllustration } from 'src/assets/illustrations';

import Iconify from 'src/components/iconify/iconify';
import { useSettingsContext } from 'src/components/settings';

import AppWelcomeCard from '../app-welcome-card';

// ----------------------------------------------------------------------

const mainSectionNav = [
  {
    title: 'registry',
    link: '/dashboard/registry',
    icon: <Iconify width={48} icon="eva:person-done-outline" className="caption" />,
    image: <SeoIllustration />,
  },
  {
    title: 'docPanel',
    link: '/dashboard/doc-panel',
    icon: <Iconify width={48} icon="eva:monitor-outline" className="caption" />,
    image: <OnlineDoctorIllustration />,
  },
];

export default function OverviewAppView() {
  const router = useRouter();

  const { t } = useTranslation();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography mb={4} variant="h3">
        {t('main')}
      </Typography>
      <Grid container spacing={4}>
        {mainSectionNav.map((el, idx) => (
          <Grid key={idx} sm={6} md={4}>
            <AppWelcomeCard
              onClick={() => router.push(el.link)}
              title={t(el.title)}
              img={el.image}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
