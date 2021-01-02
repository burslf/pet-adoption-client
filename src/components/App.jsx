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
import UserInfo from "./UserInfo";
import AllPets from "./AllPets";

function App() {
  const [isLogged, setisLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showError, setShowError] = useState({incorrectPassword : false})

  useEffect(() => {
      if (localStorage.getItem('token')) {
          setisLogged(true)
      } else {
          setisLogged(false)
      }
  })

  const logout = () => {
    localStorage.clear()
    setIsAdmin(false)
    setisLogged(false)
}

const login = async (e) => {
  e.preventDefault()
  const email = e.target.email.value
  const password = e.target.password.value
  const infos = {email, password}
  await axios.post('https://yoyo-pet-adoption.herokuapp.com/login', infos)
  .then(response => {
    if (response.status === 200) {
      setisLogged(true)
      localStorage.setItem('token', response.data.accessToken)
      localStorage.setItem('id', response.data.id)
      if(response.data.isAdmin == true) {
        setIsAdmin(true)
      }
      console.log(response.data)
         
     }
      return response.status == 200
  })
  .catch(err => {
    setShowError({...showError, incorrectPassword : true})
    setTimeout(() => {
    setShowError({...showError, incorrectPassword : false})
    }, 2000);
    return err.response.status
  })
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
        <Route path='/user/:id'>
          <UserInfo />
        </Route>
        <Route path='/all-pets'>
          <AllPets />
        </Route>
        <Route path='/profile/:id'>
          <UserProfile isAdmin={isAdmin}/>
        </Route>
        <Route path='/'>
          <Homepage isLogged={isLogged} isAdmin={isAdmin} logout={logout} login={login} showError={showError}/>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
