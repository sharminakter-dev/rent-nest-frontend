"use client"
import { motion } from "framer-motion"
import bannerImg from "@/public/assets/house-banner.png"
import Image from "next/image"
export default function MotionHouse() {
  return (
    <motion.div
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 1,
      }}
    >
      <div className="relative h-[750px] w-[750px]">
        <Image
          src={bannerImg}
          alt="Hero car"
          fill
          className="rounded-2xl object-contain"
          priority
        />
      </div>
    </motion.div>
  )
}