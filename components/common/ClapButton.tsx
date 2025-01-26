import { useState } from 'react';
import { motion } from 'framer-motion';
import { useClap } from 'hooks/useClap';

interface ClapButtonProps {
  pageId: string;
  initialClaps?: number;
}

export default function ClapButton({ pageId, initialClaps = 0 }: ClapButtonProps) {
  const [claps, setClaps] = useState(initialClaps);

  const { mutate: updateClaps } = useClap();

  const handleClap = async () => {
    const newClaps = claps + 1;

    setClaps(newClaps);
    updateClaps({ pageId, newClaps });
  };

  return (
    <div className="flex items-center">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-full transition-colors"
        onClick={handleClap}
      >
        👏
      </motion.button>
      <span className="text-sm text-gray-600">{claps}</span>
    </div>
  );
}
