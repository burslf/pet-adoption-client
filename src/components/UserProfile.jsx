import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import '../profilePage.css'


const UserProfile = (props) => {
    const currentPath = window.location.pathname.slice(9)

    const [user, setUser] = useState(null)
    const [isEditable, setIsEditable] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:5000/user/${currentPath}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => setUser(res.data))        
    }, [currentPath])

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }
    const saveInfos = () => {
        const newInfos = user
        console.log(newInfos)
        axios.post(`http://localhost:5000/user/${currentPath}`, newInfos)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        setIsEditable(!isEditable)
     }

    return (
        <div className='my-container'>
           {user && 
        <div className="profile-page-container">
        <img className='profile-picture' src={user.picture} alt="Pick a pic" srcSet=""/>
        <Form action="/" method="post" className="form" onSubmit={(e) => {}}>
            <div>
                <label htmlFor="firstname"> First Name </label>
                <Form.Control type="firstname" name="firstname" value={user.firstname} onChange={(e) => handleChange(e)} disabled={isEditable}/>
            </div>
            <div>
                <label htmlFor="lastname"> Last Name </label>
                <Form.Control type="lastname" name="lastname"value={user.lastname} onChange={(e) => handleChange(e)}disabled={isEditable}/>
            </div>
            <div>
                <label htmlFor="phone"> Phone Number </label>
                <Form.Control type="phone" name="phone" value={user.phone} onChange={(e) => handleChange(e)}disabled={isEditable}/>
            </div>
            <div>
                <label htmlFor="email"> E-Mail adress </label>
                    <Form.Control type="email" name="email" value={user.email} onChange={(e) => handleChange(e)}disabled={isEditable}/>
            </div>
            <div>
                <label htmlFor="bio"> Bio </label>
                <Form.Control as="textarea" name="bio" rows={4} disabled={isEditable}/> 
            </div>
            <div className='password-div'>
                <label htmlFor="password"> Password </label>
                <Form.Control type="password" name="password" value={user.password} onChange={(e) => handleChange(e)}disabled={isEditable}/>
                <Form.Control type="password" name="confirmPassword" value={user.password} onChange={(e) => handleChange(e)}disabled={isEditable}/>
            </div>
            <div className='edit-save-div'>
            {isEditable && <Button className='btn-dark edit-btn' type="submit" onClick={() => setIsEditable(!isEditable)}>Edit profile</Button>}
            {!isEditable && <Button className='btn-dark save-btn' type="submit" onClick={saveInfos}> Save</Button>}
            </div>
            
        </Form>
        </div> }
          
        </div>
    )
}

export default UserProfile