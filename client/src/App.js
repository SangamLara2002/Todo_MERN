import { useState, useEffect } from "react";
import axios from 'axios';
import "./style.css";
import UpdateIcon from '@mui/icons-material/Update';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
// { <style>
//   @import url('https://fonts.googleapis.com/css2?family=Kanit:ital@1&family=Poltawski+Nowy:ital@1&display=swap');
// </style> }

function App() {
  const [addtask, setAddTask] = useState();
  const [adddesc, setAddDesc] = useState();
  const [allTask, setAllTask] = useState([]);
  const [addNewTask, setNewTask] = useState();
  const [addNewDesc, setNewDesc] = useState();
  const [show, setShow] = useState(false);
  const [getid, setGetId] = useState();


  async function handleSubmit(e) {
    e.preventDefault();
    let response = await axios.post("http://localhost:5000/saveList", {
      task: addtask,
      desc: adddesc,
    })
    // console.log("response");
  }

  useEffect(() => {
    async function getAllData() {
      let item = await axios.get("http://localhost:5000/all");
      setAllTask(item.data);
      console.log(item.data)
    }
    getAllData();
  },[])

  async function deleteTask(id) {
    await axios.delete("http://localhost:5000/del/" + id);
  }
  async function updateTask(id) {

    await axios.put("http://localhost:5000/update", {
      id: id,
      newTask: addNewTask,
      newDesc: addNewDesc,
    })
    setShow(!show);
  }

  return ( 
    <div className="container">
    <div className="App">
      <h1>ToDo</h1>
      {show=== false && <form onSubmit={handleSubmit} className="form">
        <div>
        <input type="text" placeholder="Task" onChange={(e) => setAddTask(e.target.value)} />
       <br />
        <input type="text" placeholder="Description" onChange={(e) => setAddDesc(e.target.value)} />
        </div>
        <button type='submit'> <AddTaskIcon/></button>
      </form>}
      {
        show === true && 
        <div className="form">
          <div>
          <input type="text" placeholder="New-Task" onChange={(e) => setNewTask(e.target.value)} />
          <br />
          <input type="text" placeholder="New-Description" onChange={(e) => setNewDesc(e.target.value)} />
          </div>
          <button onClick={() => updateTask(getid)}> <UpdateIcon/></button>
        </div>

      }

      {
        allTask.map((ele, key) => {
          return (
            <>
              <div className="all-items">
                <div className="task">
                <span><h3>Task :</h3>{ele.task}</span>
                <span> <h3>Desc :</h3>{ele.desc}</span>
                </div>
                <br />
                <div className="btn">
                <button onClick={() => deleteTask(ele._id)}><DeleteIcon/></button>
                <button onClick={() => {setShow(!show); setGetId(ele._id)}}><EditNoteIcon /></button>
                </div>
              </div>
              
            </>
          );
        })
      }
    </div>
    </div>
  );
}

export default App;
