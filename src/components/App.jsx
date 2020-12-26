import Homepage from "./Homepage";
import Signup from "./Signup"
import Nav from './Nav'
import AddPet from "./AddPet"
import Users from "./Users"
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./Search";
import MyPetPage from "./MyPetPage";
import Pet from "./Pet";
import { useEffect, useState } from 'react'
import UserProfile from "./UserProfile";

function App() {
  const [isLogged, setisLogged] = useState(false)

  useEffect(() => {
      if (localStorage.getItem('token')) {
          setisLogged(true)
      } else {
          setisLogged(false)
      }
  }, [])

  const logout = () => {
    localStorage.clear()
    setisLogged(false)
}

const login = async (e) => {
  e.preventDefault()
  const email = e.target.email.value
  const password = e.target.password.value
  const infos = {email, password}
  await axios.post('http://localhost:5000/login', infos)
  .then(response => {
    if (response.status === 200) {
          setisLogged(true)
          localStorage.setItem('token', response.data.accessToken)
          localStorage.setItem('id', response.data.id)
      }
  })
  .catch(err => console.log(err))
}

  return (
    <Router>
      <div>
      <Nav isLogged={isLogged} logout={logout} />
      <Switch>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/add-pet'>
          <AddPet />
        </Route>
        <Route path='/my-pets'>
          <MyPetPage />
        </Route>
        <Route path='/pet/:id'>
          <Pet />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/profile/:id'>
          <UserProfile />
        </Route>
        <Route path='/'>
          <Homepage isLogged={isLogged} logout={logout} login={login} />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
