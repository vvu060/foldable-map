import './styles.css';

function App() {
  return (
    <>
      <FoldableMap />
    </>
  );
}

const FoldableMap = () => {
  return (
    <div className='mx-auto grid aspect-video max-h-[80vh] p-8'>
      <div className='aspect-video grid grid-cols-3 h-full w-full'>
        <div className='map-image' />
        <div className='map-image' />
        <div className='map-image' />
      </div>
    </div>
  );
};

export default App;
