import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom"

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const [isOpen,setIsOpen] = useState(true);

  const openModal = () => {
      setIsOpen(true)
  }
  const closeModal = () => {
      setIsOpen(false);
  }

  useEffect(() => {
    axios
      .get("https://yoyo-pet-adoption.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const customStyles = {
    overlay: {
        backgroundColor: 'transparent',
      },
    content : {
      margin                : '0 auto',  
      maxWidth              : '600px',
      border                : '2px solid #ffeedc',
      backgroundColor       :'#57949a',
      width                 : '80%',
      borderRadius          : '20px', 
      top                   : '90px',
      bottom                : '70px',
      display               : "flex",
      flexDirection         : 'column',
    }
  };

  return (
        <div className='my-container'> 
          <Modal
            isOpen={isOpen}
            style={customStyles}
          >
            <Link to='/'> <svg onClick={closeModal} style={{cursor: "pointer", fill: "#ffeedc"}}xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="32" height="32" preserveAspectRatio="xMinYMin" className="icon__icon" ><path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.414 9H14a1 1 0 0 1 0 2H8.414l2.536 2.536a1 1 0 0 1-1.414 1.414l-4.243-4.243a.997.997 0 0 1 0-1.414L9.536 5.05a1 1 0 0 1 1.414 1.414L8.414 9z"></path></svg> </Link>        
            <h2 style={{textAlign:"center", color: "#ffeedc"}}>List of users</h2>
            <div style={{width: "100%", maxWidth:"600px", display: "flex", margin:"0 auto", justifyContent: "center"}}>
            <ul style={{padding: "0", color: "#ffeedc", width: "100%", maxWidth: "600px"}}>             
                {users.map((user,index) => <Link to={`user/${user._id}`} key={index} className="user-list"> <span>{user.firstname} {user.lastname}</span><span>{user.email}</span> </Link>)}
            </ul>
            </div>
 
          </Modal>
        </div>
        
    )
};

export default Users;
