import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import '../profilePage.css'


const UserProfile = (props) => {
    const currentPath = window.location.pathname.slice(9)

    const [user, setUser] = useState(null)
    const [isEditable, setIsEditable] = useState(true)
    const [password, setPassword] = useState({password: '', confirmPassword: ''})
    const [isPasswordEditable, setIsPasswordEditable] = useState(true)
    const [handleSave, setHandleSave] = useState({userInfos: null, password: null})

// https://yoyo-pet-adoption.herokuapp.com/user/
    useEffect(() => {
        axios.get(`https://yoyo-pet-adoption.herokuapp.com/user/${currentPath}`, {
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
    const handlePasswordChange = (e) => {
        setPassword({
            ...password,
            [e.target.name] : e.target.value
        })
    }
    const saveInfos = () => {
        const newInfos = user
        axios.post(`https://yoyo-pet-adoption.herokuapp.com/user/${currentPath}`, newInfos)
        .then(res => {
            if(res.status == 200) {
                setHandleSave({...handleSave, userInfos : res.data})
            } else if (res.status == 209) {
                setHandleSave({...handleSave, userInfos : res.data})
            }
        })
        .catch(err => console.log(err))
        setIsEditable(!isEditable)
     }

    const savePassword = (e) => {
        e.preventDefault()
        const newPassword = password
        console.log(newPassword)
        axios.post(`https://yoyo-pet-adoption.herokuapp.com/user/${currentPath}/password`, newPassword)
        .then(res => {
            if(res.status == 200) {
                setHandleSave({...handleSave, password : res.data})
            } 
        })
        .catch(err => {
            setHandleSave({...handleSave, password : err.response.data})        
        })
        setIsPasswordEditable(!isPasswordEditable)
    }

    return (
        <div className='my-container'>
           {(user && user._id == localStorage.getItem('id')) && 
        <div className="profile-page-container">
        {/* <img className='profile-picture' src={user.picture} alt="Pick a pic" srcSet=""/> */}
        <Form action="/" method="post" className="form" onSubmit={(e) => {e.preventDefault()}}>
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
                    <Form.Control type="email" name="email" value={user.email} disabled={true}/>
            </div>
            <div>
                <label htmlFor="bio"> Bio </label>
                <Form.Control as="textarea" name="bio" rows={4} disabled={isEditable}/> 
            </div>
            {handleSave.userInfos && <p style={{color: "#ffeedc", fontSize:"18px"}}>{handleSave.userInfos}</p>}
            <div className='edit-save-password-div'>
            {isEditable && <Button className='btn-dark edit-btn' type="submit" onClick={() => setIsEditable(!isEditable)}>Edit profile</Button>}
            {!isEditable && <Button className='btn-dark save-btn' type="submit" onClick={saveInfos}> Save</Button>}
            </div>
            
        </Form>
        <Form action="/" method="post" className="form">
            <div className='password-div'>
                <label htmlFor="password"> Password </label>
                <Form.Control type="password" name="password" placeholder="Enter new password" onChange={(e) => handlePasswordChange(e)} disabled={isPasswordEditable}/>
                <Form.Control type="password" name="confirmPassword" placeholder="Confirm new password" onChange={(e) => handlePasswordChange(e)} disabled={isPasswordEditable}/>
            </div>
            {handleSave.password && <p style={{color: "#ffeedc", fontSize:"18px"}}>{handleSave.password}</p>}
            <div className='edit-save-password-div'>
            {isPasswordEditable && <Button className='btn-dark edit-btn' type="submit" onClick={() => setIsPasswordEditable(!isPasswordEditable)}>Edit profile</Button>}
            {!isPasswordEditable && <Button className='btn-dark save-btn' type="submit" onClick={savePassword}> Save</Button>}
            </div>
        </Form>
        </div> 
        }
          
        </div>
    )
}

export default UserProfile