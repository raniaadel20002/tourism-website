"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  XIcon,
} from "./ContactIcons";

export default function ContactMapAndSocials() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      className="w-full lg:w-[48%] flex flex-col justify-between gap-6"
    >

      {/* Interactive Google Maps Iframe */}
      <div className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.6895881391188!2d33.8207747749571!3d27.197491347795246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14528759394cdb8d%3A0x9d181f1b75fba03f!2sTech%20gear%20Solutions!5e0!3m2!1sen!2seg!4v1787568761915!5m2!1sen!2seg"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Follow Us Section */}
      <div className="flex flex-col items-start pt-2">
        <h3 className="font-roboto font-bold text-[#004560] text-base sm:text-lg mb-3 sm:mb-4">
          {t("contact.followUs", "Follow Us")}
        </h3>

        {/* Green Social Icons */}
        <div className="flex items-center gap-4 sm:gap-5 text-[#39CA5B]">
          <a href="#" aria-label={t("contact.followFacebook", "Follow us on Facebook")} className="p-1.5 rounded-full hover:text-[#2EA84B] hover:scale-110 transition-all duration-200">
            <FacebookIcon className="w-5 sm:w-6 h-5 sm:h-6" />
          </a>
          <a href="#" aria-label={t("contact.followInstagram", "Follow us on Instagram")} className="p-1.5 rounded-full hover:text-[#2EA84B] hover:scale-110 transition-all duration-200">
            <InstagramIcon className="w-5 sm:w-6 h-5 sm:h-6" />
          </a>
          <a href="#" aria-label={t("contact.followTikTok", "Follow us on TikTok")} className="p-1.5 rounded-full hover:text-[#2EA84B] hover:scale-110 transition-all duration-200">
            <TikTokIcon className="w-5 sm:w-6 h-5 sm:h-6" />
          </a>
          <a href="#" aria-label={t("contact.followX", "Follow us on X")} className="p-1.5 rounded-full hover:text-[#2EA84B] hover:scale-110 transition-all duration-200">
            <XIcon className="w-5 sm:w-6 h-5 sm:h-6" />
          </a>
        </div>
      </div>

    </motion.div>
  );
}
