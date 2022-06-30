import logo from './logo.svg';
import './App.css';
import NoteCreator from './components/NoteCreater';
import NoteDisplay from './components/NoteDisplay';


function App() {
  return (
    <div className="App">
      <NoteCreator></NoteCreator>
      <NoteDisplay></NoteDisplay>
    </div>
   
  );
}

export default App;
