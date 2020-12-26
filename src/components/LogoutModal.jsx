import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"

function MyVerticallyCenteredModal(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body closeButton className='modal-body'>          
            <h3>Are you sure ?</h3>
        </Modal.Body>
       <Modal.Footer className='modal-footer'>
       <Link to='/'>
       <Button onClick={() => {
           props.onHide()
        props.logout()
        }}>Logout</Button>
       </Link>
       <Button onClick={props.onHide}>Close</Button>
       </Modal.Footer>

      </Modal>
    );
  }

  export default MyVerticallyCenteredModal