import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import colImg from "@/assets/bannerr/col.png";
import promoImg from "@/assets/bannerr/ban4.png";
import bannerImg from "@/assets/bannerr/banner6.png";
import bannerImg2 from "@/assets/bannerr/ban1.png";

const collectionData = [
  {
    title: "Office Printers",
    desc: "High-performance printers designed for smooth workflow and daily office productivity.",
    image: colImg,
    link: "/shop?category=laser-printers",
  },
  {
    title: "All-in-One Printers",
    desc: "Print, scan, and copy with reliable all-in-one solutions for home and business use.",
    image: promoImg,
    link: "/shop?category=all-in-one-printers",
  },
  {
    title: "Home Printers",
    desc: "Easy-to-use printers built for everyday documents, school work, and personal printing.",
    image: bannerImg,
    link: "/shop?category=inkjet-printers",
  },
  {
    title: "Printer Accessories",
    desc: "Professional printing solutions with dependable speed, output quality, and efficiency.",
    image: bannerImg2,
    link: "/shop?category=printer-accessories",
  },
];

export default function Collections() {
  return (
    <section className="w-full bg-[#f6f6f4] py-14 md:py-16 lg:py-20 font-['Poppins']">
      <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-14">
          <span className="block text-[12px] md:text-[13px] uppercase tracking-[3px] text-[#6b7280] mb-3">
            Featured Collection
          </span>
          <h2 className="text-[32px] md:text-[44px] lg:text-[52px] leading-none font-normal text-black">
            Explore Our Printers
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7 lg:gap-8">
          {collectionData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group border border-[#dddddd] bg-white"
            >
              <Link to={item.link} className="block h-full">
                {/* Image */}
                <div className="h-[230px] md:h-[250px] bg-white border-b border-[#e5e5e5] flex items-center justify-center px-6 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-[180px] md:max-h-[200px] w-auto object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-7 text-center">
                  <span className="inline-block text-[11px] uppercase tracking-[2px] text-[#6b7280] mb-3">
                    Shop Range
                  </span>

                  <h3 className="text-[24px] md:text-[26px] leading-tight font-normal text-[#111111] min-h-[62px]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[15px] md:text-[16px] leading-[1.55] text-[#3f3f46] min-h-[96px]">
                    {item.desc}
                  </p>

                  <div className="mt-6 pt-5 border-t border-[#ececec]">
                    <span className="inline-flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[1px] text-[#111111]">
                      Shop Now
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}