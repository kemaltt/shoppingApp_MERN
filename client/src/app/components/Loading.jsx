import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Loading() {
  const { t } = useTranslation();
  return (
    <div
      style={{
        height: '100vh',
        textAlign: 'center',
        margin: '10vh 0',
        fontSize: '2rem',
      }}
    >
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">{t('loading.spinner')}</span>
      </div>
    </div>
  );
}
