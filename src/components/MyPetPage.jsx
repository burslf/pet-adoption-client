import { useEffect, useState } from 'react'
import '../myPetPage.css'
import PetCard from './PetCard'
import axios from 'axios'

const MyPetPage = (props) => {
    const [allPets, setAllPets] = useState(null)
    const [ownedPets, setOwnedPets] = useState(null)
    const [savedPets, setSavedPets] = useState(null)
    const [currSection, setCurrSection] = useState('all')

    useEffect(() => {
        axios.get('http://localhost:5000/pet')
        .then(res => setAllPets(res.data))        
        axios.get(`http://localhost:5000/user/${localStorage.getItem('id')}`, {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                setOwnedPets(res.data.owns)
                setSavedPets(res.data.saved)
            })
            .catch(err => console.log(err))    
    }, [])

    return (
        <div className="my-container">
            <div className='pets-navbar'>
                <ul>
                    <li style={{cursor: "pointer", fontWeight: "600"}} onClick={() => setCurrSection('all')}><img src="https://img.icons8.com/fluent-systems-filled/24/4f4f4f/border-all.png"/></li>
                    <li style={{cursor: "pointer", fontWeight: "600"}} onClick={() => setCurrSection('owned')}><img src="https://img.icons8.com/ios-filled/24/4f4f4f/dog-house.png"/></li>
                    <li style={{cursor: "pointer", fontWeight: "600"}} onClick={() => setCurrSection('saved')}><img src="https://img.icons8.com/ios-glyphs/24/4f4f4f/like--v1.png"/></li>
                </ul>
                </div>
                            
                <div className='pets-container'>
                {(ownedPets && ownedPets.length < 1 && currSection === 'owned') && <p> You currently do not own or foster any pets. </p>}
                {(allPets && currSection === 'all') && <PetCard pets={allPets}/> }
                {(ownedPets && currSection === 'owned') && <PetCard pets={ownedPets}/>} 
                {(savedPets && currSection === 'saved') && <PetCard pets={savedPets}/>} 
                </div>
            
        </div>
    )
}

export default MyPetPage