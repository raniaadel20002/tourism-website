"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LocationIcon, PhoneCallIcon, MailIcon } from "./ContactIcons";

export default function ContactInfoBar() {
  const { t } = useLanguage();

  const contactItems = [
    {
      Icon: LocationIcon,
      label: t("contact.locationLabel", "Location"),
      value: t("contact.locationValue", "Hurghada, Red Sea, Egypt"),
    },
    {
      Icon: PhoneCallIcon,
      label: t("contact.callUs", "Call Us"),
      value: "+20 123 456 7890",
    },
    {
      Icon: MailIcon,
      label: t("contact.emailLabel", "Email"),
      value: "info@example.com",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200/90 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-start sm:items-center justify-between gap-6 sm:gap-8 lg:gap-12">
        {contactItems.map(({ Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#EBF9EE] flex items-center justify-center flex-shrink-0">
              <Icon />
            </div>
            <div className="flex flex-col">
              <span className="font-roboto font-bold text-[#004560] text-sm sm:text-base">
                {label}
              </span>
              <span className="font-roboto font-normal text-[#484848] text-xs sm:text-sm mt-0.5">
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
