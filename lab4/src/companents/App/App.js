import './App.css';

import background from './img_1.png'
import Title from "../Title/Title";
import MainBoard from "../MainBoard/MainBoard";

function App() {

  const appStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    height: "100%"
  }

  return (
    <div
        className="App"
        style={appStyle}
    >
      <Title/>
      <MainBoard/>
    </div>
  );
}

export default App;
