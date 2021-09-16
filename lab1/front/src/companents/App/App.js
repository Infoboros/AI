import './App.css';

import background from './bgc.jpg'
import Title from "../Title/Title";
import MainBoard from "../MainBoard/MainBoard";

function App() {

  const appStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover'
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
