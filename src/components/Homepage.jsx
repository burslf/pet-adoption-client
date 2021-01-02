import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import '../style.css'
import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import { Form, Popover, OverlayTrigger } from 'react-bootstrap'
import axios from 'axios'


const Homepage = (props) => {
    const [isOpen,setIsOpen] = useState(true);
    const [user, setUser] = useState(null)
    const [errorLogin, setErrorLogin] = useState(null)
    
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    useEffect(() => {
      if(!props.isLogged) {
        setUser(null)
      }
      if(props.isAdmin) {
        setIsOpen(false)
      }
      axios.get(`https://yoyo-pet-adoption.herokuapp.com/user/${localStorage.getItem('id')}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => setUser(res.data))
    .catch(err => console.log(err.response.status))
    }, [props.isLogged, props.isAdmin])

    const customStyles = {
        overlay: {
            backgroundColor: '#ffeedc',
          },
        content : {
          margin                : '0 auto',  
          maxWidth              : '600px',
          border                : '2px solid #ffeedc',
          backgroundColor       : '#57949a',
          width                 : '80%',
          borderRadius          : '20px', 
          top                   : '90px',
          bottom                : '70px',
          paddingBottom         : '50px',
          display               : 'flex',
          flexDirection         : 'column',
        }
      };

      const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Oops</Popover.Title>
          <Popover.Content>
            The password seems incorrect
          </Popover.Content>
        </Popover>
      )

    return (
        <div className='my-container'>
          {/* If not logged: */}
          {!props.isLogged && <> 
                <div className='login-button' onClick={openModal}> Login <img src="https://img.icons8.com/android/35/ffeedc/login-rounded-right.png" alt=''/> </div>
                <Modal
          isOpen={isOpen}
          onHide={closeModal}
          onRequestClose={closeModal}
          style={customStyles}
            >
                <svg onClick={closeModal} style={{cursor: "pointer", fill: "#ffeedc"}} xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="32" height="32" preserveAspectRatio="xMinYMin" className="icon__icon"><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path><path d="M11.414 10l2.829 2.828a1 1 0 0 1-1.415 1.415L10 11.414l-2.828 2.829a1 1 0 1 1-1.415-1.415L8.586 10 5.757 7.172a1 1 0 0 1 1.415-1.415L10 8.586l2.828-2.829a1 1 0 0 1 1.415 1.415L11.414 10z"></path></svg>
                <h4 style={{textAlign:"center", color: "#ffeedc", marginTop: "20px"}}>Now, please log into your account 🙂</h4>
                <Form action="/login" method="post" className="form" onSubmit={(e) =>{
                   props.login(e).then(res => console.log(res)).catch(err=>console.log(err))
                }} style={{margin: '20px auto'}}>
                <Form.Control type="email" name="email" placeholder="E-Mail"  required/>
                <Form.Control type="password" name="password" placeholder="Password" required/>
                <OverlayTrigger show={props.showError.incorrectPassword} placement="right" overlay={popover} >
                  <Button className='btn-dark' style={{backgroundColor: "#ffeedc", color: "#4f4f4f", borderRadius: "25px", padding:"5px 25px"}} type="submit"> Login </Button>
                </OverlayTrigger>
            </Form>
            <div className='sign-up-area'>
            <Link to="signup"> Sign up !</Link>
            </div>
            </Modal>
            </>}

          {/* If logged: */}
            {(props.isLogged && user) && <h1 className='header-logged-in'> Welcome, {`${user.firstname} ${user.lastname}`} ! </h1>}


          {/* If logged and is admin    */}

           {(user && user.isAdmin) && <> 
           <div className="dashboard-button" onClick={openModal}>
                DASHBOARD
            </div>
            <Modal
          isOpen={isOpen}
          onHide={closeModal}
          onRequestClose={closeModal}
          style={customStyles}
            >
            <svg onClick={closeModal} style={{cursor: "pointer", fill: "#ffeedc"}} xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="32" height="32" preserveAspectRatio="xMinYMin" className="icon__icon"><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path><path d="M11.414 10l2.829 2.828a1 1 0 0 1-1.415 1.415L10 11.414l-2.828 2.829a1 1 0 1 1-1.415-1.415L8.586 10 5.757 7.172a1 1 0 0 1 1.415-1.415L10 8.586l2.828-2.829a1 1 0 0 1 1.415 1.415L11.414 10z"></path></svg>
            <div className='header-logged-in'>
              <Link to='/add-pet'> <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="50" height="50" preserveAspectRatio="xMinYMin" class="icon__icon" style={{fill: "#ffeedc"}}><path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-7v4a1 1 0 0 1-2 0v-4H5a1 1 0 0 1 0-2h4V5a1 1 0 1 1 2 0v4h4a1 1 0 0 1 0 2h-4z"></path></svg>
              </Link>
              <p style={{fontWeight: "600", color: "#ffeedc", textDecoration: "none"}}>Add pet</p>

              <Link to='/users'> <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -1.5 24 24" width="50" height="50" preserveAspectRatio="xMinYMin" class="icon__icon" style={{fill: "#ffeedc"}}><path d="M3.534 11.07a1 1 0 1 1 .733 1.86A3.579 3.579 0 0 0 2 16.26V18a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.647a3.658 3.658 0 0 0-2.356-3.419 1 1 0 1 1 .712-1.868A5.658 5.658 0 0 1 14 16.353V18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-1.74a5.579 5.579 0 0 1 3.534-5.19zM7 1a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zm9 17a1 1 0 0 1 0-2h1a1 1 0 0 0 1-1v-1.838a3.387 3.387 0 0 0-2.316-3.213 1 1 0 1 1 .632-1.898A5.387 5.387 0 0 1 20 15.162V17a3 3 0 0 1-3 3h-1zM13 2a1 1 0 0 1 0-2 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 1 1 0 0 1 0-2 2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path></svg>
              </Link>
              <p style={{fontWeight: "600", color: "#ffeedc"}}>List of users</p>

              <Link to='/all-pets'> <img src="https://img.icons8.com/dotty/60/ffeedc/animal-shelter.png"/> 
              </Link>
              <p style={{fontWeight: "600", color: "#ffeedc"}}>List of pets</p>

            </div>
            </Modal>
            </>}

        </div>
    )
}

export default Homepage