import axios from 'axios'
import { useEffect, useState } from 'react'

const Pet = (props) => {
    const [petInfo, setPetInfo] = useState(null)
    const [isAdmin, setIsAdmin] = useState({status: null})
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
    return (
        <div className="my-container">
            {isAdmin.status === false && <h3 style={{textAlign: "center"}}> Sorry, you are not admin </h3> }
        {isAdmin.status === true && <form action="/signup" method="post" className="form" onSubmit={(e) => postPet(e)}>
            <input type="text" name="type" placeholder="Type" required onChange={(e) => handleChange(e)} />
            <input type="text" name="name" placeholder="Name" required onChange={(e) => handleChange(e)}/>
            <input type="text" name="status" placeholder="Status" required onChange={(e) => handleChange(e)}/>
            <input type="file" name="picture"/>
            <input type="text" name="height" placeholder="height" required onChange={(e) => handleChange(e)}/>
            <input type="text" name="weight" placeholder="weight" required onChange={(e) => handleChange(e)}/>
            <input type="text" name="color" placeholder="color" required onChange={(e) => handleChange(e)}/>
            <input type="text" name="bio" placeholder="bio" required onChange={(e) => handleChange(e)}/>
            <div onChange={(e) => handleBoolean(e)} style={{display: "flex", alignItems: "center"}}> 
            <input type="radio" name="hypoallergenic" value="yes" required/>
            <label htmlFor="yes">Yes</label>
            <input type="radio" name="hypoallergenic" value="no"/>
            <label htmlFor="no">No</label>
            </div>

            <input type="text" name="dietaryRestrictions" placeholder="Dietary restriction" required onChange={(e) => handleChange(e)}/>
            <input type="text" name="breed" placeholder="breed" required onChange={(e) => handleChange(e)}/>
            <button type="submit"> Add pet </button>
        </form>}
        </div>
    )
}

export default Pet