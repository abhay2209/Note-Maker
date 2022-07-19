import logo from './logo.svg';
import './App.css';
import NoteCreator from './components/NoteCreater';
import NoteDisplay from './components/NoteDisplay';


function App() {
  return (
    <div className="App">
      <h1 className="app-heading">NOTE MAKER</h1>
      <NoteCreator/>
      <NoteDisplay/>
    </div>
  );
}

export default App;
