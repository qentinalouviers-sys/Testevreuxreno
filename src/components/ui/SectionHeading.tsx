"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <motion.span
          variants={staggerItem}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-energy"
        >
          <span className="h-px w-8 bg-amber" aria-hidden />
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h2
        variants={fadeUp}
        className="max-w-3xl text-3xl font-semibold leading-[1.1] text-forest sm:text-4xl md:text-[2.75rem]"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={staggerItem}
          className={cn(
            "max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
