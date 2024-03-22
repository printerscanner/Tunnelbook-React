import TunnelBook from './lib/TunnelBook.tsx'; // Adjust the path if needed

const imagePaths = [
  "./images/peepshow_5.png",
  "./images/peepshow_4.png",
  "./images/peepshow_3.png",
  "./images/peepshow_2.png",
  "./images/peepshow_1.png",
];

const backgroundImage = "./images/peepshow_bg.png";


function App() {
    return (
      <div style={{margin: '50px'}}>
        <TunnelBook imagePaths={imagePaths} backgroundImage={backgroundImage} />
      </div>
    );
}

export default App;
