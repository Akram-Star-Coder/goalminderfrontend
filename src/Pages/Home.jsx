import React, { useEffect, useState } from 'react';
import './index.css';
import Item from './Item';
import Itemg from './Itemg';
import { DatePicker } from '@mantine/dates';
import { Group } from '@mantine/core';
import axios from 'axios';
import Load from './load.svg';

const Home = () => {
  const [isClickedTask, setIsClickedTask] = useState(false);
  const [isClickedGoals, setisClickedGoals] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [date, setDate] = useState(today);
  const [dateG, setDateG] = useState(today);
  const [taskTitle, settaskTitle] = useState("");
  const [taskTitleG, settaskTitleG] = useState("");
  const [loaderTASKS, SETloaderTASKS] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loaderGoals, setLoaderGoals] = useState(true);
  const [goals, setGoals] = useState([]);
  const [thoughts, setThoughts] = useState([])
  const [loaderThoughts, setLoaderThoughts] = useState(true);
  const [isThoughtClicked, setisThoughtClicked] = useState(false);
  const [taskTitleThought, settaskTitleThought]=  useState("");

  function convertMongooseDateToCustomFormat(mongooseDate) {
    const date = new Date(mongooseDate);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${day}/${month}/${year}`;
  }

  const submitTask = async(ev)=>{
    ev.preventDefault();
    if(date !== null || date !== "" || taskTitle !== ""){
      try{
        const resp = await axios.post('https://goalminder-666.onrender.com/api/tasks/create', {
          title : taskTitle, 
          date : date.toISOString()
        });
        if(resp.status === 200){
          setIsClickedTask(false);
          setDate(today);
          settaskTitle('');
        }
        else{
          alert('Oops, something went wrong!');
        }
      }
      catch(e){
        console.log(e);
        console.log(e.message);
      }
    }
  }
  const submitGoals = async(ev)=>{
    ev.preventDefault();
    if(dateG !== null || dateG !== "" || taskTitleG !== ""){
      try{
        const resp = await axios.post('https://goalminder-666.onrender.com/api/goals/create', {
          title : taskTitleG, 
          date: dateG.toISOString()
        });
        if(resp.status === 200){
          setisClickedGoals(false);
          setDateG(today);
          settaskTitleG('');
        }
        else{
          alert('Oops, something went wrong!');
        }
      }
      catch(e){
        console.log(e);
        console.log(e.message);
      }
    }
  }
  const SubmitThought = async(ev)=>{
    ev.preventDefault();
    if(taskTitleThought !== ""){
      try{
        const resp = await axios.post('https://goalminder-666.onrender.com/api/thoughts/create', {
          title : taskTitleThought, 
        });
        if(resp.status === 200){
          setisThoughtClicked(false);
          settaskTitleThought('');
          console.log("Success");
        }
        else{
          console.log('Error');
          alert('Oops, something went wrong!');
        }
      }
      catch(e){
        console.log('Error');
        console.log(e);
        alert('Oops, something went wrong!');
        console.log(e.message);
      }
    }
    else{
      alert('Empty title of thought');
    }
  }

  const fetchAllTasks = async()=>{
    try{
      const resp = await axios.get('https://goalminder-666.onrender.com/api/tasks/getAll');
      if(resp.status === 200){
        setTasks(resp.data);
      }
      else{
        alert('Oops, something went wrong!');
      }
    }
    catch(e){
      console.log(e);
      console.log(e.message);
    } finally{
      SETloaderTASKS(false);
    }

  }

  const fetchAllThoughts = async()=>{
    try{
      const resp = await axios.get('https://goalminder-666.onrender.com/api/thoughts/getAll');
      if(resp.status === 200){
        setThoughts(resp.data);
      }
      else{
        alert('Oops, something went wrong!');
      }
    }
    catch(e){
      console.log(e);
      console.log(e.message);
    } finally{
      setLoaderThoughts(false);
    }
  
  }



  const fetchAllGoals = async()=>{
    try{
      const resp = await axios.get('https://goalminder-666.onrender.com/api/goals/getAll');
      if(resp.status === 200){
        setGoals(resp.data);
      }
      else{
        alert('Oops, something went wrong!');
      }
    }
    catch(e){
      console.log(e);
      console.log(e.message);
    } finally{
      setLoaderGoals(false);
    }
  }


  const [allInfos, setAllInfos] = useState({});

  const fetchAllInfos = async()=>{
    try{
      const resp = await axios.get('https://goalminder-666.onrender.com/api/allInfos');
      if(resp.status === 200){
        setAllInfos(resp.data);
      }
    }
    catch(e){
      console.log(e);
      console.log(e.message);
    } 
  }


  useEffect(()=>{
    fetchAllTasks();
    fetchAllGoals();
    fetchAllThoughts();
    fetchAllInfos();
  }, []);


  useEffect(()=>{
    fetchAllTasks();
    fetchAllInfos();
    fetchAllThoughts();


  }, [isClickedTask]);
  

  useEffect(()=>{
    fetchAllGoals();
    fetchAllInfos();
    fetchAllThoughts();



  }, [isClickedGoals]);


  useEffect(()=>{
    fetchAllThoughts();
    fetchAllInfos();
    fetchAllGoals();
    fetchAllInfos();
  }, [isThoughtClicked]);


  return (
    <>
      <div className={isClickedTask ? 'showT T' : 'T'}>
        <form onSubmit={submitTask} className="Taski">
          <button type='button' className='xmarkB' onClick={() =>{setDate(today);settaskTitle("");setIsClickedTask(false);} }>
            <i className='fa-solid fa-xmark'></i>
          </button>

          <div className="titleTask">
            <input spellCheck={false} value={taskTitle} onChange={(e)=>{settaskTitle(e.target.value)}} type="text" placeholder='Enter your task name' />
          </div>
          <DatePicker 
            className='datPicker'
            value={date} 
            onChange={setDate} 
            minDate={today}
          />
          <button 
            type='submit'
            className="buttSubmitTask"
          >
            Submit Task
          </button>
        </form>
      </div>

      <div className={isClickedGoals ? 'showT T' : 'T'}>
        <form onSubmit={submitGoals} className="Taski">
          <button type='button' className='xmarkB' onClick={() =>{setDateG(today);settaskTitleG("");setisClickedGoals(false);} }>
            <i className='fa-solid fa-xmark'></i>
          </button>

          <div className="titleTask">
            <input spellCheck={false} value={taskTitleG} onChange={(e)=>{settaskTitleG(e.target.value)}} type="text" placeholder='Enter your goal name' />
          </div>
          <DatePicker 
            className='datPicker'
            value={dateG} 
            onChange={setDateG} 
            minDate={today}
          />
          <button 
            type='submit'
            className="buttSubmitTask"
          >
            Submit Goal
          </button>
        </form>
      </div>

      <div className={isThoughtClicked ? 'showT T' : 'T'}>
        <form onSubmit={SubmitThought} className="Taski">
          <button type='button' className='xmarkB' onClick={() =>{settaskTitleThought("");setisThoughtClicked(false);} }>
            <i className='fa-solid fa-xmark'></i>
          </button>

          <div className="titleTask izhdsqk">
            <textarea placeholder='Your thoughts..' value={taskTitleThought}  onChange={(e)=>{settaskTitleThought(e.target.value)}} ></textarea>
          </div>
          
          <button 
            type='submit'
            className="buttSubmitTask"
          >
            Submit Thought
          </button>
        </form>
      </div>


      <div className='Home'>
        <div className="headerHome">
          <span>
            Today : {new Date().toLocaleDateString()}
          </span>
          <span>
          
            Goals Done :&nbsp; 
            {
            (allInfos !== null) && 
            <>
              {allInfos.numberOfGoalsDone}
            </>
            }
          </span>
          <span>
          
            Tasks Done :&nbsp; 
            {
            (allInfos !== null) && 
            <>
              {allInfos.numberOfTasksDone}
            </>
            }
          </span>
        </div>
        <div className="home3">
          <div className="goals">
            <div className="headerGoals">
              Thoughts
            </div>
            <div className="lineBreak"></div>
            <div className="container">              
              {
              loaderThoughts ? 
              
              <div >
                <div
                 className="item itmeX">

                </div>
                <div
                 className="item itmeX">

                </div>
                
                <div
                 className="item itmeX">

                </div>
                

              </div>

              :
              <>
              {
                thoughts.length === 0 ? <div className='NoTaskGoal'
                >
                  <img src="https://static.vecteezy.com/system/resources/previews/005/073/059/original/empty-box-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg" alt="No thoughts Yet" />
                </div>
                :
                <>
                {
                  thoughts.map((thought, index)=>{
                    return(
                      <div key={index} className="itemP">
                        <div className="deadline">
                          {convertMongooseDateToCustomFormat(thought.createdAt)}
                        </div>
                        • {thought.title}
                      </div>
                    )
                  })
                }
                </>
              }
              </>
            }
              


            </div>
            <button onClick={()=>{setisThoughtClicked(true);}} className='addNew'>
              Add New Thought <i className='fa-solid fa-plus'></i>
            </button>
          </div>
        </div>
        <div className="home1">
          <div className="goals">
            <div className="headerGoals">
              Goals
              <button> <i className='fa-solid fa-eye'></i>&nbsp;All Goals </button>
            </div>
            <div className="lineBreak"></div>
            <div className="container">
            {
              loaderGoals ?  
              
              <div>
                <div className="item itmeX">

                </div>
                <div className="item itmeX">

                </div>
                
              
                
              </div>
              
              :
              <>
              {
                goals.length === 0 ? <div className='NoTaskGoal'>
                  
                  <img src="https://static.vecteezy.com/system/resources/previews/005/073/059/original/empty-box-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg" alt="No Goals Yet" />

                </div>
                :
                <>
                {
                  goals.map((goal, index)=>{
                    return(
                      <Itemg key={index} goal={goal} />
                    )
                  })
                }
                </>
              }
              </>
            }

            </div>
            <button onClick={() => setisClickedGoals(!isClickedGoals)}  className='addNew addNewG'>
              Add New Goal <i className='fa-solid fa-plus'></i>
            </button>
          </div>
        </div>
        <div className="home2">
          <div className="tasks">
            <div className="headerTasks">
              Tasks
              <button><i className='fa-solid fa-eye'></i>&nbsp; All Tasks</button>
            </div>
            <div className="lineBreak"></div>
            <div className="container">
            {
              loaderTASKS ? 
              
              <div >
                <div
                 className="item itmeX">

                </div>
                <div
                 className="item itmeX">

                </div>
                
                <div
                 className="item itmeX">

                </div>
                

              </div>

              :
              <>
              {
                tasks.length === 0 ? <div className='NoTaskGoal'
                >
                  <img src="https://static.vecteezy.com/system/resources/previews/005/073/059/original/empty-box-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg" alt="No Tasks Yet" />
                </div>
                :
                <>
                {
                  tasks.map((task, index)=>{
                    return(
                      <Item key={index} task={task} />
                    )
                  })
                }
                </>
              }
              </>
            }
            </div>
            <button onClick={() => setIsClickedTask(!isClickedTask)} className='addNew addNewt'>
              Add New Task <i className='fa-solid fa-plus'></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
