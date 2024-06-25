import './styles.css';
import {
  MotionStyle,
  motion,
  useMotionValue,
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

  return (
    <div className='mx-auto grid aspect-video max-h-[80vh] p-8'>
      <div className='aspect-video grid grid-cols-3 h-full w-full [grid-area:1/1]'>
        <motion.div
          style={{ x: xLeftSection, skewY: '-1deg' }}
          className='map-image origin-bottom-right border-r border-[rgba(255, 255, 255, .1)] shadow-2xl'
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
          className='map-image origin-bottom-left border-l border-[rgba(255, 255, 255, .1)] shadow-2xl'
        />
      </div>
      <motion.div
        drag='x'
        _dragX={xDrag}
        dragConstraints={{ left: 0, right: 300 }}
        className='[grid-area:1/1] relative z-10'
      />
    </div>
  );
};

export default App;
