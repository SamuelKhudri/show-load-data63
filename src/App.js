// import logo from '../src/images/logo.png';
import { useEffect, useRef, useState } from 'react';
import './App.css';
// import Header from './Header/Header';

function App() {
  const [users, setUsers] = useState([]);
  // ref hook  declare
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    // post data select for post
    const newUser = { name: name, email: email }

    // send data to the server by using post method
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      // after getting data
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        const addedUser = data;
        const newUser = [...users, addedUser];
        setUsers(newUser);

        // reset name and email
        nameRef.current.value = '';
        emailRef.current.value = '';
      })

    e.preventDefault()
  }



  return (
    <div className="App">
      <h2>Product search: {users.length}</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} placeholder="name" />
        <input type="email" ref={emailRef} name="" id="" placeholder="Email" />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <li>name: {user.name} email:{user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
