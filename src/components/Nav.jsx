import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Modal from './LogoutModal'
import '../navbar.css'

const Nav = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [profilePath, setProfilePath] = useState(null)

  useEffect(()=>{
    console.log('effects')
    if(localStorage.getItem('id')) {
      setProfilePath(localStorage.getItem('id'))  
    } else {
      setProfilePath(null)
    }
  })
    return  (
      <div>
        <nav className="my-nav">
          <div className='logo'> Pets </div>
          <div className='nav-links'> 
            <ul >
              <li>
              <Link to="/"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -1.5 24 24" width="32" height="32" preserveAspectRatio="xMinYMin" className="icon__icon"><path d="M13 20.565v-5a3 3 0 0 0-6 0v5H2a2 2 0 0 1-2-2V7.697a2 2 0 0 1 .971-1.715l8-4.8a2 2 0 0 1 2.058 0l8 4.8A2 2 0 0 1 20 7.697v10.868a2 2 0 0 1-2 2h-5z"></path></svg> </Link>
              </li> 
              <li>
              <Link to="/my-pets"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 172 172" style={{fill:"#4f4f4f"}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#4f4f4f"><path d="M30.96,10.32c-12.8312,0 -27.52,21.9816 -27.52,30.96c0,7.1896 6.12347,13.17466 13.17547,15.78906c0.3784,-0.5848 0.78905,-1.1696 1.23625,-1.72c-0.4472,-2.408 -0.65172,-4.81546 -0.65172,-7.18906c0,-15.3424 8.39548,-28.75813 20.84828,-35.84453c-2.064,-1.2728 -4.50828,-1.99547 -7.08828,-1.99547zM86,10.32c-2.58,0 -5.02428,0.72267 -7.08828,1.99547c12.4528,7.0864 20.84828,20.50213 20.84828,35.84453c0,2.3736 -0.20452,4.78106 -0.65172,7.18906c0.4472,0.5504 0.85785,1.1352 1.23625,1.72c7.052,-2.6144 13.17547,-8.59946 13.17547,-15.78906c0,-8.9784 -14.6888,-30.96 -27.52,-30.96zM58.48,13.76c-18.9888,0 -34.4,15.4112 -34.4,34.4c0,3.1304 0.44505,6.16055 1.23625,9.05015c-5.0224,5.2632 -8.11625,12.34665 -8.11625,20.18985c0,16.1336 13.1064,29.24 29.24,29.24h8.6v-21.63437c-4.0248,-2.2704 -6.88,-7.84643 -6.88,-9.32563c0,-1.892 4.6096,-3.44 10.32,-3.44c5.7104,0 10.32,1.548 10.32,3.44c0,1.4792 -2.8552,7.05523 -6.88,9.32563v21.63437h8.6c16.1336,0 29.24,-13.1064 29.24,-29.24c0,-7.8432 -3.09385,-14.92665 -8.11625,-20.18985c0.7912,-2.8896 1.23625,-5.91975 1.23625,-9.05015c0,-18.9888 -15.4112,-34.4 -34.4,-34.4zM46.44,51.6c2.8552,0 5.16,2.3048 5.16,5.16c0,2.8552 -2.3048,5.16 -5.16,5.16c-2.8552,0 -5.16,-2.3048 -5.16,-5.16c0,-2.8552 2.3048,-5.16 5.16,-5.16zM70.52,51.6c2.8552,0 5.16,2.3048 5.16,5.16c0,2.8552 -2.3048,5.16 -5.16,5.16c-2.8552,0 -5.16,-2.3048 -5.16,-5.16c0,-2.8552 2.3048,-5.16 5.16,-5.16zM151.73625,72.2736c-0.8944,-0.1032 -1.8181,0.14082 -2.5061,0.72562l-15.68828,12.51703c-3.2336,-1.0664 -10.25227,-2.95625 -20.02187,-2.95625c-2.6488,0 -5.05385,0.13545 -7.28985,0.37625c-2.6832,17.3032 -17.68455,30.58375 -35.71015,30.58375h-5.1936c-1.6856,5.332 -3.3032,13.2104 -3.4064,24.0464c0,0.6192 0.17415,1.2376 0.48375,1.7536c0.516,0.9288 13.48265,22.36 51.11625,22.36c37.6336,0 50.60025,-21.4312 51.11625,-22.36c0.3096,-0.516 0.48375,-1.1344 0.48375,-1.7536c-0.1376,-16.9592 -4.02749,-26.65892 -6.19469,-30.71812c1.2728,-2.0984 2.75469,-5.57468 2.75469,-10.52828c0,-13.1064 -7.32962,-22.39145 -7.63922,-22.76985c-0.5504,-0.7224 -1.41013,-1.17336 -2.30453,-1.27656zM101.48,113.52c2.8552,0 5.16,2.3048 5.16,5.16c0,2.8552 -2.3048,5.16 -5.16,5.16c-2.8552,0 -5.16,-2.3048 -5.16,-5.16c0,-2.8552 2.3048,-5.16 5.16,-5.16zM125.56,113.52c2.8552,0 5.16,2.3048 5.16,5.16c0,2.8552 -2.3048,5.16 -5.16,5.16c-2.8552,0 -5.16,-2.3048 -5.16,-5.16c0,-2.8552 2.3048,-5.16 5.16,-5.16zM113.52,127.28c5.7104,0 10.32,1.548 10.32,3.44c0,1.204 -2.71465,4.95682 -5.56985,7.60563c1.204,1.3072 3.09305,2.71437 5.56985,2.71437v6.88c-4.6784,0 -8.1184,-2.33866 -10.32,-4.60906c-2.2016,2.2704 -5.6416,4.60906 -10.32,4.60906v-6.88c2.4768,0 4.36585,-1.40718 5.56985,-2.71437c-2.8552,-2.6488 -5.56985,-6.40163 -5.56985,-7.60563c0,-1.892 4.6096,-3.44 10.32,-3.44z"></path></g></g></svg></Link>
              </li>
              <li>
              <Link to="/search"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 -2.5 24 24" width="32" height="32" preserveAspectRatio="xMinYMin" className="icon__icon"><path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z"></path></svg> </Link>
              </li>
              {profilePath && <li>
              <Link to={`/profile/${localStorage.getItem("id")}`}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="32" height="32" preserveAspectRatio="xMinYMin" className="icon__icon"><path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-14a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V8a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V8a2 2 0 0 0-2-2zM5.91 16.876a8.033 8.033 0 0 1-1.58-1.232 5.57 5.57 0 0 1 2.204-1.574 1 1 0 1 1 .733 1.86c-.532.21-.993.538-1.358.946zm8.144.022a3.652 3.652 0 0 0-1.41-.964 1 1 0 1 1 .712-1.868 5.65 5.65 0 0 1 2.284 1.607 8.032 8.032 0 0 1-1.586 1.225z"></path></svg> </Link>
              </li>}
              {props.isLogged && <li>
              <div onClick={() => setModalShow(true)} style={{cursor: "pointer"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -2 24 24" width="32" height="32" preserveAspectRatio="xMinYMin" className="icon__icon"><path d="M2 0h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v16h8V2H2zm2 7h1a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z"></path></svg></div>
              </li>}
            </ul>
          </div>
        </nav>
        <Modal isLogged={props.isLogged} logout={props.logout} show={modalShow} onHide={() => setModalShow(false)}/>
      </div>
       
    )
    
}

export default Nav