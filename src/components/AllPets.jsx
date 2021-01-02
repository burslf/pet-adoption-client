import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom"
import '../userInfo.css'

const AllPets = (props) => {
  const [pets, setPets] = useState(null);
  const [isOpen,setIsOpen] = useState(true);

  const currentPath = window.location.pathname.slice(6)
  
  const openModal = () => {
      setIsOpen(true)
  }
  const closeModal = () => {
      setIsOpen(false);
  }
  
  useEffect(() => {
    axios
      .get(`https://yoyo-pet-adoption.herokuapp.com/pets`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
      })
      .then((res) => setPets(res.data))
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
            <h2 style={{textAlign:"center", color: "#ffeedc"}}>List of pets</h2>
           {pets && <ul style={{padding: "0"}}>
                {pets.map(pet => {
                    return (
                        <Link to={`/pet/${pet._id}`} className="list-pet-container">
                            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                                <img src="data:image/jpeg;base64,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" alt="pet"/>
                                <div style={{margin: 0}}>{pet.name} (<span>{pet.type}</span>) </div>                      
                            </div>                     
                        </Link>
                    )
                })}
            </ul>}
 
          </Modal>
        </div>
        
    )
};

export default AllPets;
