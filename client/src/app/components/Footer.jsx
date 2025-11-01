import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer_container">
      <p> &copy;{new Date().getFullYear()} {t("footer.copyright")}</p>
      <h4>{t("footer.createdBy")}</h4>
    </div>
  );
}
