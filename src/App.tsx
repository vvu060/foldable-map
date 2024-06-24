import './styles.css';
import { motion, useMotionValue, useTransform } from 'framer-motion';

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
  const xRightSection = useTransform(xDrag, [0, 300], ['100%', '0%']);

  return (
    <div className='mx-auto grid aspect-video max-h-[80vh] p-8'>
      <div className='aspect-video grid grid-cols-3 h-full w-full [grid-area:1/1]'>
        <motion.div
          style={{ x: xLeftSection }}
          className='map-image translate-x-full'
        />
        <motion.div className='map-image' />
        <motion.div
          style={{ x: xRightSection }}
          className='map-image -translate-x-full'
        />
      </div>
      <motion.div
        drag='x'
        _dragX={xDrag}
        dragConstraints={{ left: 0, right: 300 }}
        className='[grid-area:1/1]  relative z-10'
      />
    </div>
  );
};

export default App;
