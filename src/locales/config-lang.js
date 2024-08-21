'use client';

import merge from 'lodash/merge';
import {
  fr as frFRAdapter,
  vi as viVNAdapter,
  ru as ruRuAdapter,
  enUS as enUSAdapter,
  zhCN as zhCNAdapter,
  arSA as arSAAdapter,
} from 'date-fns/locale';

// core
import {
  enUS as enUSCore,
  frFR as frFRCore,
  viVN as viVNCore,
  zhCN as zhCNCore,
  arSA as arSACore,
  ruRU as ruRuCore,
} from '@mui/material/locale';
// date-pickers
import {
  enUS as enUSDate,
  frFR as frFRDate,
  viVN as viVNDate,
  zhCN as zhCNDate,
  ruRU as ruRuDate,
  // ruRu as ruRu
} from '@mui/x-date-pickers/locales';
// data-grid
import {
  enUS as enUSDataGrid,
  frFR as frFRDataGrid,
  viVN as viVNDataGrid,
  zhCN as zhCNDataGrid,
  arSD as arSDDataGrid,
  ruRU as ruRuDataGrid,
} from '@mui/x-data-grid';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  },
  {
    label: 'Russian',
    value: 'ru',
    systemValue: merge(ruRuDate, ruRuDataGrid, ruRuCore),
    adapterLocale: ruRuAdapter,
    icon: 'flagpack:ru',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: merge(frFRDate, frFRDataGrid, frFRCore),
    adapterLocale: frFRAdapter,
    icon: 'flagpack:fr',
  },
  {
    label: 'Vietnamese',
    value: 'vi',
    systemValue: merge(viVNDate, viVNDataGrid, viVNCore),
    adapterLocale: viVNAdapter,
    icon: 'flagpack:vn',
  },
  {
    label: 'Chinese',
    value: 'cn',
    systemValue: merge(zhCNDate, zhCNDataGrid, zhCNCore),
    adapterLocale: zhCNAdapter,
    icon: 'flagpack:cn',
  },
  {
    label: 'Arabic',
    value: 'ar',
    systemValue: merge(arSDDataGrid, arSACore),
    adapterLocale: arSAAdapter,
    icon: 'flagpack:sa',
  },
];

export const defaultLang = allLangs[1]; // Russian

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
