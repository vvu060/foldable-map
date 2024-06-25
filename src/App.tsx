import { useState } from 'react';
import './styles.css';
import {
  MotionStyle,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';

function App() {
  return (
    <>
      <FoldableMap />
    </>
  );
}

const FoldableMap = () => {
  const xDrag = useMotionValue(0);
  const xLeftSection = useTransform(xDrag, [0, 300], ['100%', '0%']);
  const xRightSection = useTransform(xDrag, [0, 300], ['-100%', '0%']);
  const centerScale = useTransform(xDrag, [150, 300], [0, 1]);
  const centerBrightness = useTransform(xDrag, [150, 300], [0.2, 1]);
  const [isFolded, setIsFolded] = useState(false);

  useMotionValueEvent(xDrag, 'change', (currentX) => {
    if (currentX > 260) {
      setIsFolded(false);
    } else {
      setIsFolded(true);
    }
  });

  return (
    <div className='overflow-x-clip'>
      <motion.div
        animate={isFolded ? 'folded' : 'open'}
        variants={{
          open: { scale: 1 },
          folded: { scale: 0.9 },
        }}
        initial='folded'
      >
        <div className='mx-auto grid aspect-video max-h-[80vh] p-8'>
          <div className='aspect-video grid grid-cols-3 h-full w-full [grid-area:1/1]'>
            <motion.div
              style={{ x: xLeftSection, skewY: '-1deg' }}
              className='map-image origin-bottom-right border-r border-[rgba(255,255,255,.1)] shadow-2xl'
            />
            <motion.div
              style={
                {
                  scaleX: centerScale,
                  '--brightness': centerBrightness,
                } as MotionStyle
              }
              className='map-image brightness-[--brightness]'
            />
            <motion.div
              style={{ x: xRightSection, skewY: '1deg' }}
              className='map-image origin-bottom-left border-l border-[rgba(255,255,255,.1)] shadow-2xl'
            />
          </div>
          <motion.div
            drag='x'
            _dragX={xDrag}
            dragConstraints={{ left: 0, right: 300 }}
            dragTransition={{
              modifyTarget: (target) => {
                return target > 150 ? 300 : 0;
              },
              timeConstant: 45,
            }}
            className='[grid-area:1/1] relative z-10 cursor-grab active:cursor-grabbing'
          />
        </div>
        <motion.div
          variants={{
            folded: {
              opacity: 0,
              scale: 0.9,
              y: 30,
            },
            open: {
              opacity: 1,
              scale: 1,
              y: 0,
            },
          }}
          className='flex w-full justify-center text-xl font-semibold md:text-4xl'
        >
          <p className='rounded-2xl bg-white px-12 py-5 text-[hsl(73_69%_26%)]'>
            Pick your favorite spot
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default App;
