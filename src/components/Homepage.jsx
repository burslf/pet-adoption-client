import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import '../style.css'
import Modal from 'react-modal'
import { useState } from 'react'
import { Form } from 'react-bootstrap'

const Homepage = (props) => {
    const [isOpen,setIsOpen] = useState(true);
    
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const customStyles = {
        overlay: {
            backgroundColor: 'transparent',
            zIndex: '4'
          },
        content : {
          maxWidth              : '600px',
          border                : '2px solid #ffeedc',
          backgroundColor       :'#57949a',
          width                 : '80%',
          height                : '70%',
          borderRadius          : '20px', 
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

    return (
        <div className='my-container'>
            {props.isLogged && <h1 className='header-logged-in'> Welcome, Yoel Zerbib ! </h1>}
            {!props.isLogged && <> 
                <div className='login-button' onClick={openModal}> Login <img src="https://img.icons8.com/android/35/ffeedc/login-rounded-right.png"/> </div>
                <Modal
          isOpen={isOpen}
        //   onAfterOpen={afterOpenModal}
          onHide={closeModal}
          onRequestClose={closeModal}
          style={customStyles}
        //   contentLabel="Example Modal"
            >
                <svg onClick={closeModal} style={{cursor: "pointer", fill: "#ffeedc"}} xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="32" height="32" preserveAspectRatio="xMinYMin" className="icon__icon"><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path><path d="M11.414 10l2.829 2.828a1 1 0 0 1-1.415 1.415L10 11.414l-2.828 2.829a1 1 0 1 1-1.415-1.415L8.586 10 5.757 7.172a1 1 0 0 1 1.415-1.415L10 8.586l2.828-2.829a1 1 0 0 1 1.415 1.415L11.414 10z"></path></svg>
                <Form action="/login" method="post" className="form" onSubmit={(e) => props.login(e)} style={{margin: '20px auto'}}>
                <Form.Control type="email" name="email" placeholder="E-Mail"  required/>
                <Form.Control type="password" name="password" placeholder="Password" required/>
                <Button className='btn-dark' style={{backgroundColor: "#ffeedc", color: "#4f4f4f", borderRadius: "25px", padding:"5px 25px"}} type="submit"> Login </Button>
            </Form>
            <div className='sign-up-area'>
            <Link to="signup"> Sign up !</Link>
            </div>
            </Modal>
            </>}
        </div>
    )
}

export default Homepage