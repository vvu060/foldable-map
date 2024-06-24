import './styles.css';
import { motion, useMotionValue } from 'framer-motion';

function App() {
  return (
    <>
      <FoldableMap />
    </>
  );
}

const FoldableMap = () => {
  const xDrag = useMotionValue(0);

  return (
    <div className='mx-auto grid aspect-video max-h-[80vh] p-8'>
      <div className='aspect-video grid grid-cols-3 h-full w-full [grid-area:1/1]'>
        <div className='map-image translate-x-full' />
        <div className='map-image' />
        <div className='map-image -translate-x-full' />
      </div>
      <motion.div
        drag='x'
        style={{ x: xDrag }}
        dragConstraints={{ left: 0, right: 300 }}
        className='[grid-area:1/1] border border-black relative z-10'
      />
    </div>
  );
};

export default App;
