import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { OverlayTrigger, Popover} from 'react-bootstrap'

const Signup = (props) => {
    const [isOpen,setIsOpen] = useState(true);
    const [showError, setShowError] = useState({doesntMatch: false})

    const history = useHistory()

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

    const signup = (e) => {
        e.preventDefault()
        const firstname = e.target.firstname.value
        const lastname = e.target.lastname.value
        const email = e.target.email.value
        const phone = e.target.phone.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value
        if(password === confirmPassword) {
            const infos = {firstname, lastname, email, phone, password, confirmPassword}
            // https://yoyo-pet-adoption.herokuapp.com/signup
            axios.post('https://yoyo-pet-adoption.herokuapp.com/signup', infos)
                .then(history.push('/'))
                .catch(err => console.log(err))
        } else {
            setShowError({doesntMatch: true})
            setTimeout(() => {
                setShowError({doesntMatch:false})
            }, 2000);
            console.log("passwords don't match")
        }
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Oops</Popover.Title>
          <Popover.Content>
            The password doesn't match. Please type the same password in both fields
          </Popover.Content>
        </Popover>
    )

    return (
        <div className='my-container'>
            <div className='login-button' onClick={openModal}> Signup <img src="https://img.icons8.com/android/35/ffeedc/login-rounded-right.png" alt=''/> </div>
            <Modal
          isOpen={isOpen}
          onHide={closeModal}
          onRequestClose={closeModal}
          style={customStyles}
            >
             <Link to='/'> <svg onClick={closeModal} style={{cursor: "pointer", fill: "#ffeedc"}}xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="32" height="32" preserveAspectRatio="xMinYMin" className="icon__icon"><path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.414 9H14a1 1 0 0 1 0 2H8.414l2.536 2.536a1 1 0 0 1-1.414 1.414l-4.243-4.243a.997.997 0 0 1 0-1.414L9.536 5.05a1 1 0 0 1 1.414 1.414L8.414 9z"></path></svg> </Link>        
            <h4 style={{textAlign:"center", color: "#ffeedc", marginTop: "20px"}}>Signup, it only takes few seconds ⚡</h4>
            <Form action="/signup" method="post" className="form" onSubmit={(e) => signup(e)} style={{margin: '20px auto'}}>
                <Form.Control type="firstname" name="firstname" placeholder="First name" required />
                <Form.Control type="lastname" name="lastname" placeholder="Last name" required/>
                <Form.Control type="phone" name="phone" placeholder="Phone number" required/>
                <Form.Control type="email" name="email" placeholder="E-Mail" required/>
                <Form.Control type="password" name="password" placeholder="Password" required/>
                <Form.Control type="password" name="confirmPassword" placeholder="Confirm password" required/>
                <OverlayTrigger show={showError.doesntMatch} placement="right" overlay={popover} >
                    <Button className='btn-dark' type="submit"> Sign up </Button>
                </OverlayTrigger>
            </Form>
            </Modal>

        </div>
    )
}

export default Signup