import React, { useEffect, useState } from 'react'
import './index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Item = ({task}) => {

  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  function convertDatetimeFormat(inputDatetime) {
    // Parse the input datetime string
    const dtObject = new Date(inputDatetime);
  
    // Extract year, month, and day
    const year = dtObject.getFullYear();
    const month = String(dtObject.getMonth() + 1).padStart(2, '0');
    const day = String(dtObject.getDate()).padStart(2, '0');
  
    // Format the date as "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;
    
    return formattedDate;
  }


  const handleCLickTrash = async (id)=>{
    try{
      const resp = await axios.delete(`https://goalminder-666.onrender.com/api/tasks/trash/${id}`);
      if(resp.status === 200){
        navigate(0);
      }
      else{
        alert('Oops, an error occuried!');
      }
    }
    catch(e){
      alert('Oops, an error occuried in the server!');
      console.log(e.message);
    }
  }

  const handleTaskDone = async (id) => {
    try{
      const resp = await axios.get(`https://goalminder-666.onrender.com/api/tasks/done/${id}`);
      if(resp.status === 200){
      }
      else{
        alert('Oops, an error occuried!');
      }
    }
    catch(e){
      alert('Oops, an error occuried in the server!');
      console.log(e.message);
    }
  }

  return (
    <div className="item">
              <div className="part1item1">
                {
                  task.title
                }
                <div className="deadline">
                {
                  convertDatetimeFormat(task.date)
                }
                </div>
              </div>
            
              <div className="part2item">
              {
              !isClicked &&
                <button onClick={()=>{handleCLickTrash(task._id)}}>
                  <i className='fa-solid fa-trash'></i>
                </button>
              }
              </div>
            
              <div className="part3item">
                <button className={isClicked && "noPointER"} onClick={()=>{{setIsClicked(true); handleTaskDone(task._id);}}}>
                  {
                    isClicked ? 
                    <i className='fa-solid fa-check fa-checktask' ></i>
                    :
                    null
                  }
                </button>
              </div>
            </div>
  )
}

export default Item