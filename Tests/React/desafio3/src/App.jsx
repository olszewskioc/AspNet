import { useState } from 'react';
import './App.css';
import CardUsuario from './components/CardUsuario';
import Form from './components/Form';
import FotoUsuario from './components/FotoUsuario';

function App() {
  const [user, setUser] = useState({
    id: 1,
    name: "Thiago Olszewski",
    nick: "olszewskioc",
    bio: "🤔 Entusiast of programming and always learning something new. i like Sports too.\n🎓 I have an Bacharelor deegre in Computer Engineering (UCDB).\n💼 I work on Digix as IT Trainee.\n🌱 I do some courses in Udemy and looking for certifications in this programming area.",
  });

  const [edit, setEdit] = useState(false);

  const updateUser = (newUserData) => {
    setUser(prev => ({
      ...prev,
      ...newUserData,
    }));
  };

  const handleEdit = () => {
    setEdit(!edit);
  }

  return (
    <main id="App">
      <CardUsuario key={user.id} user={user} handleEdit={handleEdit}>
        <FotoUsuario nick={user.nick} alt={user.name} size={150} />
      </CardUsuario>
      {edit && <Form user={user} onSubmit={updateUser} />}
    </main>
  );
}

export default App;
