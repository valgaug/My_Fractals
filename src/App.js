import './App.css';
import Navbar from './Components/01-NavBar';
import Title from './Components/02-Title';
import Collection from './Components/03-Collection';
import Creation from './Components/04-Creation';
import Tree from './Components/05-01-Tree';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Title />
      <Collection />
      <Creation />
      <Tree />
    </div>
  );
}

export default App;
