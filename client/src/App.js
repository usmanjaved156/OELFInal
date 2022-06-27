import './App.css';
import React, {useEffect} from "react"
import Axios  from 'axios';

function App() {

  const [foodName,setFoodName]= React.useState("");
  const [days,setDays]=React.useState(0);

  const [foodList,setFoodList]=React.useState([]);
  const [newFoodName,setNewFoodName]= React.useState("");
  
  useEffect(()=>{
    Axios.get("http://localhost:3001/read").then(response =>{
      setFoodList(response.data);
    })
  })


  const addTolist=()=>{
    Axios.post('http://localhost:3001/insert',{foodName:foodName,days:days})
  }

  const updateFood=(id)=>{
    Axios.put("http://localhost:3001/update",{id:id,newFoodName:newFoodName})
  }

  const deleteFood=(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }
  return (
      <div className='App'>
        <h1>EMS </h1>
        <label >Employee's Name :</label>
        <input  type="text" placeholder='Enter Employees Name' onChange={(event)=>{
          setFoodName(event.target.value);
        }} />
        
    
        <label>Number of Projects :</label>
        <input type="number" placeholder='Enter Number of Projects' onChange={(event)=>{
          setDays(event.target.value);
        }}  />
        <button className="btn btnAdd"  onClick={addTolist}>ADD</button>
        <hr/>
        {
          foodList.map((val, key)=>{
            return <div key={key}> 
              <h1>{val.foodName}</h1>
              <h1>{val.daysSinceIAte}</h1>
              <input type="text" placeholder='New Employee Name'  onChange={(event)=>{
          setNewFoodName(event.target.value);
        }} />
              <button className="btn btnUpdate" onClick={()=>updateFood(val._id)}>Update</button>
              <button className="btn btnRemove" onClick={()=>deleteFood(val._id)}>Remove</button>
            </div>
          })
        }
        </div>
    );
}

export default App;
