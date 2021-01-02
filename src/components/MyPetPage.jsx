import { useEffect, useState } from 'react'
import '../myPetPage.css'
import PetCard from './PetCard'
import axios from 'axios'

const MyPetPage = (props) => {
    const [allPets, setAllPets] = useState(null)
    const [ownedPets, setOwnedPets] = useState(null)
    const [savedPets, setSavedPets] = useState(null)
    const [currSection, setCurrSection] = useState('All')

    useEffect(() => {
        axios.get('https://yoyo-pet-adoption.herokuapp.com/pets')
        .then(res => setAllPets(res.data))        
        axios.get(`https://yoyo-pet-adoption.herokuapp.com/user/${localStorage.getItem('id')}`, {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
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
                    <li style={{cursor: "pointer", fontWeight: "600"}} onClick={() => setCurrSection('All')}><img src="https://img.icons8.com/fluent-systems-filled/24/4f4f4f/border-all.png" alt='all'/>All</li>
                    <li style={{cursor: "pointer", fontWeight: "600"}} onClick={() => setCurrSection('Owned')}><img src="https://img.icons8.com/ios-filled/24/4f4f4f/dog-house.png" alt='owned'/>Owned</li>
                    <li style={{cursor: "pointer", fontWeight: "600"}} onClick={() => setCurrSection('Saved')}><img src="https://img.icons8.com/ios-glyphs/24/4f4f4f/like--v1.png" alt='saved'/>Saved</li>
                </ul>
                </div>

                <div className='pets-container'>
                {(ownedPets && ownedPets.length < 1 && currSection === 'owned') && <p> You currently do not own or foster any pets. </p>}
                {(allPets && currSection === 'All') && <PetCard pets={allPets}/> }
                {(ownedPets && currSection === 'Owned') && <PetCard pets={ownedPets}/>} 
                {(savedPets && currSection === 'Saved') && <PetCard pets={savedPets}/>} 
                </div>
            
        </div>
    )
}

export default MyPetPage