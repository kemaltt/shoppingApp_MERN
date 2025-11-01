import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'de', name: t('language.german'), flag: '🇩🇪' },
    { code: 'tr', name: t('language.turkish'), flag: '🇹🇷' },
  ];

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LanguageIcon sx={{ color: 'text.secondary' }} />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="language-select-label">
          {t('language.select')}
        </InputLabel>
        <Select
          labelId="language-select-label"
          value={i18n.language}
          label={t('language.select')}
          onChange={handleLanguageChange}
          sx={{
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }
          }}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;