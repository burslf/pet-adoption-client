import axios from 'axios'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const Pet = (props) => {
    const [petInfo, setPetInfo] = useState(null)
    const [isAdmin, setIsAdmin] = useState({status: null})
    const [isOpen,setIsOpen] = useState(true);

    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    const handleChange = (e) => {
        setPetInfo({...petInfo, [e.target.name] : e.target.value})
    }
    let errorTag = null
    const postPet = (e) => {
        e.preventDefault()
        const infos = {
            data: petInfo, 
            isAdmin:localStorage.getItem("token") 
        }
        axios.post('https://yoyo-pet-adoption.herokuapp.com/pet', infos )
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
    }
    const handleBoolean = (e) => {
            console.log(e)
             setPetInfo({...petInfo, hypoallergenic : e.target.value})
    }
    useEffect(() => {
        async function fetchData () {
            await axios.get(`https://yoyo-pet-adoption.herokuapp.com/user/${localStorage.getItem('id')}`, {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(res => setIsAdmin({status: res.data.isAdmin}))
            .catch(err => {
                setIsAdmin({status: false})
                console.error(err.response.data)
            })
        }
        fetchData()
        console.log(errorTag)
    }, [])

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
          display               : "flex",
          flexDirection         : 'column',
          bottom: '70px',
          position              : 'absolute',
        }
      };

    return (
        <div className="my-container">
            {isAdmin.status === false && <h3 style={{textAlign: "center"}}> Sorry, you are not admin </h3> }
        {isAdmin.status === true && 
        <Modal
            isOpen={isOpen}
            style={customStyles}
              >
          <Link to='/'> <svg onClick={closeModal} style={{cursor: "pointer", fill: "#ffeedc"}}xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="32" height="32" preserveAspectRatio="xMinYMin" className="icon__icon" ><path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.414 9H14a1 1 0 0 1 0 2H8.414l2.536 2.536a1 1 0 0 1-1.414 1.414l-4.243-4.243a.997.997 0 0 1 0-1.414L9.536 5.05a1 1 0 0 1 1.414 1.414L8.414 9z"></path></svg> </Link>        
        <Form action="/signup" method="post" className="form" onSubmit={(e) => postPet(e)}>
            <div className="file-input" onClick={() => document.querySelector('#file-input').click()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -4 24 24" width="32" height="32" preserveAspectRatio="xMinYMin" class="icon__icon" style={{fill: "#4f4f4f"}}><path d="M4.126 3C4.57 1.275 6.136 0 8 0h4a4.002 4.002 0 0 1 3.874 3H16a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h.126zM10 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6-5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-6 3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path></svg></div>
            <Form.Control type="text" name="type" placeholder="Type" required onChange={(e) => handleChange(e)} />
            <Form.Control type="text" name="name" placeholder="Name" required onChange={(e) => handleChange(e)}/>
            <Form.Control type="text" name="status" placeholder="Status" required onChange={(e) => handleChange(e)}/>
            <Form.Control type="file" name="picture" style={{display: "none"}} id="file-input"/>
            <Form.Control type="text" name="height" placeholder="Height" required onChange={(e) => handleChange(e)}/>
            <Form.Control type="text" name="weight" placeholder="Weight" required onChange={(e) => handleChange(e)}/>
            <Form.Control type="text" name="color" placeholder="Color" required onChange={(e) => handleChange(e)}/>
            <Form.Control type="text" name="bio" placeholder="Bio" required onChange={(e) => handleChange(e)}/>
            <div onChange={(e) => handleBoolean(e)} style={{display: "flex", flexDirection: "column", width: "75%"}}> 
            <span style={{fontWeight: "500", fontSize: "18px", padding: "5px", color: "#ffeedc"}}>Hypoallergenic ?</span>
            <Form.Control as="select" custom>
                <option>Yes</option>
                <option>No</option>
            </Form.Control>
            </div>

            <Form.Control type="text" name="dietaryRestrictions" placeholder="Dietary restrictions" required onChange={(e) => handleChange(e)}/>
            <Form.Control type="text" name="breed" placeholder="Breed" required onChange={(e) => handleChange(e)}/>
            <Button className="btn-dark" type="submit" style={{marginBottom: '20px'}}> Add pet </Button>
        </Form>
        </Modal>
        }
        </div>
    )
}

export default Pet