"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lens } from "../ui/lens";

export function Logo({title,styles}: {title: string,styles: string}) {
  const [hovering, setHovering] = useState(false);

  return (
    <Lens hovering={hovering} setHovering={setHovering}>
      <motion.h1
        initial={{ opacity: 0.5, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.5,
          ease: "easeInOut",
        }}
        className={styles}
      >
        {title}
      </motion.h1>
    </Lens>
  );
}
