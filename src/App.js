import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Home
        {...{
          user: { id: Math.floor(Math.random() * 4) + 2, admin: true, name: 'Enmanuel Magallanes' } }
        }
        />
    </div>
  );
}

export default App;
