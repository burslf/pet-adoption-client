import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Dropdown, DropdownButton, OverlayTrigger, Popover } from "react-bootstrap";
import PetCard from "./PetCard";

const Search = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [searchSwitch, setSwitch] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(
    {
      minHeight: 0,
      maxHeight: 100,
      minWeight: 0,
      maxWeight: 100,
      type: null,
      typeTitle: null,
      status: ["Available", "Fostered", "Adopted"],
      statusTitle: null
    });
   const [resultSearch, setResultSearch] = useState(null)
   const [showError, setShowError] = useState({selectType: false, selectStatus: false})
   const [isEmpty, setIsEmpty] = useState(false)
   
   useEffect(() => {
    axios.get(`https://yoyo-pet-adoption.herokuapp.com/pets`).then((res) => {
      const type = [];
      res.data.map((pet) => type.push(pet.type));
      const filteredType = new Set(type);
      setAdvancedSearch({ ...advancedSearch, type: [...filteredType] });
    });
  }, []);

  const handleChange = (e) => {
    setNameInput(e.target.value);
  };

  const getAllTypes = () => {
    if (advancedSearch.type) {
      return advancedSearch.type.map((type, index) => {
        return (
          <Dropdown.Item 
            key={index}
            href='#/action-1'
            onClick={() =>
              setAdvancedSearch({ ...advancedSearch, typeTitle: type })
            }
          >
            {type}
          </Dropdown.Item>
        );
      });
    }
  };

  const getAllStatus = () => {
    return advancedSearch.status.map((status, index)=> {
      return (
        <Dropdown.Item
        key={index}
        href='#/action-1'
        onClick={() =>
          setAdvancedSearch({ ...advancedSearch, statusTitle: status })
        }
      >
        {status}
      </Dropdown.Item>
      )
    })
  }

  const handleRange = (e) => {
    setAdvancedSearch({ ...advancedSearch, [e.target.name]: e.target.value });
  };

  const resultAdvancedSearch = () => {
    if(!advancedSearch.typeTitle && !advancedSearch.statusTitle){
      setShowError({selectType: true, selectStatus: true})
    }else {
      setShowError({selectType: false, selectStatus: false})
      axios.get(`https://yoyo-pet-adoption.herokuapp.com/pet/advanced-search?name=${nameInput}&type=${advancedSearch.typeTitle}&status=${advancedSearch.statusTitle}&minHeight=${advancedSearch.minHeight}&maxHeight=${advancedSearch.maxHeight}`)
      .then(res =>{
        if(res.data.length == 0) {
          setResultSearch(null)
          setIsEmpty(true)
        } else {
          setIsEmpty(false)
          setResultSearch(res.data)
        }
        })
    }
  }

  const resultBasicSearch = () => {
    if(!advancedSearch.typeTitle){
      setShowError({...showError, selectType: true})
    } else {
      setShowError({selectType: false, selectStatus: false})
      axios.get(`https://yoyo-pet-adoption.herokuapp.com/pet/basic-search?name=${nameInput}&type=${advancedSearch.typeTitle}`)
      .then(res => {
        if(res.data.length == 0) {
          setResultSearch(null)
          setIsEmpty(true)
        } else {
          setIsEmpty(false)
          setResultSearch(res.data)
        }
      })
    }
  }

  return (
    <div className='my-container'>
      <div
        style={{
          display: "flex",
          maxWidth: "600px",
          margin: "0 auto",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Form.Control
          className='search-input'
          onChange={(e) => handleChange(e)}
          style={{ margin: "5px", width: "100%" }}
        />

          <DropdownButton
            style={{marginTop: "15px"}}
            id='dropdown-basic-button'
            variant='dark'
            title={advancedSearch.typeTitle || "Type"}
          >
            {advancedSearch.type && getAllTypes()}
          </DropdownButton>
          {showError.selectType && <p style={{color: "red",fontSize:"18px"}}> Please select a type </p>}
       {searchSwitch == true && <>
         <DropdownButton
          style={{marginTop: "15px"}}
          id='dropdown-basic-button'
          variant='dark'
          title={advancedSearch.statusTitle || "Status"}
        >
          {advancedSearch.status && getAllStatus()}
        </DropdownButton>
        {showError.selectStatus && <p style={{color: "red",fontSize:"18px"}}> Please select a status </p>}
        <Form>
          <Form.Group controlId='formBasicRangeCustom'>
            <Form.Label>Height</Form.Label>
            <div>
              <span>
                {advancedSearch["minHeight"] > advancedSearch["maxHeight"]
                  ? "??"
                  : advancedSearch["minHeight"] || 0} - {" "}
              </span>
             <span>{advancedSearch["maxHeight"] || 100} </span>
            </div>
            <Form.Control
              type='range'
              custom
              onChange={(e) => handleRange(e)}
              name='minHeight'
              defaultValue={0}
              step={10}
            />
            <Form.Control
              type='range'
              custom
              onChange={(e) => handleRange(e)}
              name='maxHeight'
              defaultValue={100}
              step={10}
            />
            <Form.Label>Weight</Form.Label>
            <div>
              {" "}
              <span>
                {" "}
                {advancedSearch["minWeight"] > advancedSearch["maxWeight"]
                  ? "??"
                  : advancedSearch["minWeight"] || 0}{" "}
              </span>{" "}
              - <span>{advancedSearch["maxWeight"] || 100} </span>
            </div>
            <Form.Control
              type='range'
              custom
              onChange={(e) => handleRange(e)}
              name='minWeight'
              defaultValue={0}
              step={10}
            />
            <Form.Control
              type='range'
              custom
              onChange={(e) => handleRange(e)}
              name='maxWeight'
              defaultValue={100}
              step={10}
            />
          </Form.Group>
        </Form>
       </>}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Form>
            <Form.Check
              type='switch'
              id='custom-switch'
              label={searchSwitch == false ? "Basic search" : "Advanced search"}
              onClick={() => {
                setTimeout(() => {
                  setSwitch(!searchSwitch)
                }, 100)
              }}
            />
          </Form>
         {searchSwitch == true && <Button
          onClick={resultAdvancedSearch}
            className='btn-dark'
            style={{ height: "100%", alignSelf: "center" }}
          >
            Search
          </Button>}
          {searchSwitch == false && <Button
          onClick={resultBasicSearch}
            className='btn-dark'
            style={{ height: "100%", alignSelf: "center" }}
          >
            Search
          </Button>}
          
        </div>
      </div>
      {isEmpty && advancedSearch.typeTitle && advancedSearch.statusTitle && <h4 style={{ textAlign: "center"}}>No result found</h4> }
      {resultSearch && <div className='pets-container' style={{marginTop: "40px"}}>
            <PetCard pets={resultSearch}/>
      </div>}
    </div>
  );
};

export default Search;
