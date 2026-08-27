"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutBreadcrumb() {
  const { t } = useLanguage();

  return (
    <Breadcrumb items={[{ label: t("nav.home", "Home"), href: "/" }, { label: t("nav.about", "About Us") }]} />
  );
}
