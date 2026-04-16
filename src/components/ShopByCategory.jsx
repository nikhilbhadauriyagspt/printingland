import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ShopByCategory({ categories = [], loading = false }) {
  const filteredCategories = categories.filter((cat) => {
    const name = cat.name?.toLowerCase() || "";
    const slug = cat.slug?.toLowerCase() || "";
    return (
      !name.includes("laptop") &&
      !slug.includes("laptop") &&
      !name.includes("computer") &&
      !name.includes("pc") &&
      !name.includes("chromebook") &&
      !name.includes("notebook")
    );
  });

  const subcategories = filteredCategories
    .flatMap((parent) => parent.children || [])
    .filter((sub) => {
      const name = sub.name?.toLowerCase() || "";
      const slug = sub.slug?.toLowerCase() || "";
      return (
        !name.includes("laptop") &&
        !slug.includes("laptop") &&
        !name.includes("computer") &&
        !name.includes("pc")
      );
    })
    .slice(0, 9);

  const getImagePath = (image) => {
    if (!image) return "https://via.placeholder.com/900x600?text=Category";
    if (image.startsWith("http")) return image;
    return `/${image}`;
  };

  const getDescription = (name) => {
    const lower = name?.toLowerCase() || "";

    if (lower.includes("laser")) {
      return "Fast and dependable printing for business, office tasks, and everyday workflow.";
    }
    if (lower.includes("inkjet")) {
      return "Smooth color printing for home projects, documents, and regular daily use.";
    }
    if (lower.includes("accessories")) {
      return "Essential accessories to improve printer setup, workflow, and support.";
    }
    if (lower.includes("large format")) {
      return "Perfect for bigger prints, posters, graphics, and professional output needs.";
    }
    if (lower.includes("supertank")) {
      return "Efficient high-volume printing with lower running cost and less refill hassle.";
    }
    if (lower.includes("led")) {
      return "Sharp results and efficient performance for modern workspaces.";
    }
    if (lower.includes("thermal")) {
      return "Reliable printing for labels, receipts, and smooth business operations.";
    }
    if (lower.includes("photo")) {
      return "Vibrant and detailed prints for creative work, memories, and visuals.";
    }
    if (lower.includes("dot matrix")) {
      return "Trusted for invoices, forms, and continuous paper-based tasks.";
    }
    if (lower.includes("all-in-one")) {
      return "Print, scan, and copy with flexible all-in-one printer solutions.";
    }

    return "Explore dependable printer solutions for home, office, and professional use.";
  };

  return (
    <section className="w-full bg-[#f6f6f4] py-14 md:py-16 font-['Poppins']">
      <div className="max-w-[1720px] mx-auto px-4 md:px-8 lg:px-10">
        {/* Heading */}
        <div className="mb-10 md:mb-14 text-center">
          <span className="block text-[12px] uppercase tracking-[3px] text-[#6b7280] mb-3">
            Explore Collection
          </span>
          <h2 className="text-[30px] md:text-[42px] lg:text-[50px] font-normal leading-none text-black">
            Shop by Category
          </h2>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="min-h-[430px] border border-[#dddddd] bg-white animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {subcategories.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link
                  to={`/shop?category=${item.slug}`}
                  className="block h-full border border-[#d9d9d9] bg-white transition-all duration-300"
                >
                  <div className="flex flex-col h-full min-h-[430px]">
                    {/* Image area */}
                    <div className="border-b border-[#e4e4e4] bg-white h-[240px] md:h-[350px] flex items-center justify-center overflow-hidden">
                      <img
                        src={getImagePath(item.image)}
                        alt={item.name}
                        className=" object-cover "
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/900x600?text=${encodeURIComponent(
                            item.name
                          )}`;
                        }}
                      />
                    </div>

                    {/* Content area */}
                    <div className="flex flex-col flex-1 px-6 md:px-8 py-7">
                      <span className="text-[11px] uppercase tracking-[2px] text-[#6b7280] mb-3">
                        Printer Range
                      </span>

                      <h3 className="text-[24px] md:text-[28px] leading-[1.15] font-normal text-[#111111]">
                        {item.name}
                      </h3>

                      <p className="mt-4 text-[15px] md:text-[16px] leading-[1.65] text-[#444]">
                        {getDescription(item.name)}
                      </p>

                      <div className="mt-7 pt-5 border-t border-[#ececec]">
                        <span className="inline-flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[1px] text-[#111111]">
                          Shop Now
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}