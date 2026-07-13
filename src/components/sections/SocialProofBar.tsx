"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/stats";
import { CountUp } from "@/components/ui/CountUp";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function SocialProofBar() {
  return (
    <section className="relative z-10 -mt-px bg-forest py-10 text-cream sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center md:text-left"
            >
              <dd className="font-display text-4xl font-semibold text-amber sm:text-5xl">
                <CountUp
                  value={stat.value}
                  decimals={stat.decimals ?? 0}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix}
                />
              </dd>
              <dt className="mt-1.5 text-sm leading-snug text-cream/75">
                {stat.label}
              </dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
