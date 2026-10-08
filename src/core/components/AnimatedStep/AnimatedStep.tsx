'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideVariants } from '@/core/animations/slide';

interface AnimatedStepProps {
  stepKey: string;
  direction: number;
  children: ReactNode;
}

export default function AnimatedStep({
  stepKey,
  direction,
  children,
}: AnimatedStepProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={stepKey}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
