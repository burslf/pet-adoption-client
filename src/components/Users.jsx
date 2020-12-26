import axios from "axios";
import { useEffect, useState } from "react";

const Users = (props) => {
  const [users, setusers] = useState([]);

  useEffect(() => {
    axios
      .get("https://yoyo-pet-adoption.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
      })
      .then((res) => setusers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
        <div className='my-container'> 
            <ul>
                {users.map((user,index) => <li key={index} className="user-list"> {user.email} </li>)}
            </ul>
        </div>
        
    )
};

export default Users;
