import React from 'react'
import { useTranslation } from 'react-i18next'

export default function AboutUs() {
  const { t } = useTranslation()
  return <div style={{ height: '76vh', textAlign: 'center', padding: '20px' }}>
    <h1>{t('about.title')}</h1>
  </div>
}
