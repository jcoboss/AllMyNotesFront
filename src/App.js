import Home from './components/Home';
const allUsers = [
  {
    id: 1,
    name: 'Enmanuel Magallanes',
    admin: true
  },
  {
    id: 2,
    name: 'Juan Pablo Escobar',
    admin: false
  },
  {
    id: 3,
    name: 'Josue Cobos',
    admin: false
  },
  {
    id: 4,
    name: 'Andres Vargas',
    admin: false
  },
];
function App() {
  return (
    <div className="App">
      <Home
        {...{
          user: allUsers[Math.floor(Math.random() * allUsers.length)]
        }
        }
      />
    </div>
  );
}

export default App;
