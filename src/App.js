// Functional stuff
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

// Styles
import './App.css';

function App() {

  const [tasks, setTasks] = useState({})
  const [buttonPressed, setButtonPressed] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [didDelete, setDidDelete] = useState(false)
  const entry = useRef(null);
  const status = useRef(null);

  const URL = 'http://localhost:3000/api'

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${URL}/table`)
        await setTasks(data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [didSubmit, buttonPressed, didDelete])

  const handleClick = async (statusChange, id) => {
    try {
      const { status } = await axios.put(`${URL}/${id}`, {
        status: statusChange,
      });
      if (status === 200) {
        setButtonPressed(!buttonPressed)
      } else {
        console.log('something went wrong')
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await axios.post(`${URL}`, {
        entry: entry.current.value,
        status: 'TO-DO',
      });
      setDidSubmit(!didSubmit)
      entry.current.value = ''
    } catch (err) {
      console.log(err);
    }
  };

  // THESE ARE DEFINITELY BAD BUT I DON'T KNOW WHY I SHOULDN'T DO IT YET. BUT I CAN TELL IT'S BAD.
  // But hey I got to sort using confirm windows?
  const handleDeleteAll = async () => {
    try {
      const { data } = await axios.get(`${URL}/table`)
      const { COMPLETED } = data
      const TODO = data['TO-DO']
      const toDelete = []
      if (COMPLETED) {
        COMPLETED.forEach((i) => {
          toDelete.push(i._id)
        })
      }
      if (TODO) {
        TODO.forEach((i) => {
          toDelete.push(i._id)
        })
      }
      let confirm = window.confirm('Are you sure you want to delete EVERYTHING on the short list?')

      if (confirm === true) {
        toDelete.forEach((i) => {
          axios.delete(`${URL}/${i}`)
          setDidDelete(!didDelete)
        })
      }

      if (confirm === false) {
        return ''
      }

    } catch (err) {
      console.log(err)
    }
  }

  // See above
  const handleDeleteCompleted = async () => {
    try {
      const { data } = await axios.get(`${URL}/table`)
      const {COMPLETED} = data
      const toDelete = []
      COMPLETED.forEach((i) => {
        toDelete.push(i._id)
      })
      let confirm = window.confirm('Are you sure you want to clear you completed tasks?')
      if (confirm === true) {
        toDelete.forEach((i) => {
          axios.delete(`${URL}/${i}`)
          setDidDelete(!didDelete)
        })
      }
      if (confirm === false) {
        return ''
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="formContainer">
        <form className="form">
          <label>New item</label>
          <div>
            <input type="text" ref={entry}/>
            <button className="submit" onClick={handleSubmit}>Add</button>
          </div>
        </form>
      </div>
      <div className="container">
        <div className="section" id="to-do">
          <h2>To Do</h2>
            { !tasks['TO-DO'] ? <p>Use the field above to enter your first to do</p>: '' }
          <div className="list">
            {
              tasks['TO-DO'] ?
              tasks['TO-DO'].map((item, i) => {
                  return (
                    <div className="task" key={i}>
                      <div className="task-title" onClick={() => {handleClick('COMPLETED', item._id)}}><span className="checkbox">&#9744;</span> <span className="entry-text">{item.entry}</span></div>
                      <Link to={`/${item._id}`}><button>Edit</button></Link>
                    </div>
                  );
                })
              : ''
            }
          </div>
        </div>
        <hr />
        <div className="section" id="done">
          <h2>Done 🎉</h2>
          { !tasks['COMPLETED'] ? <p>You can do it! Finish that first task!</p>: '' }
          <div className="list completed-list">
            {tasks['COMPLETED']
                ? tasks['COMPLETED'].map((item, i) => {
                    return (
                      <div className="task" key={i}>
                      <div className="task-title" onClick={() => {handleClick('TO-DO', item._id)}}><span className="checkbox">&#9745;</span> <span className="line-through entry-text">{item.entry}</span></div>
                      <Link to={`/${item._id}`}><button>Edit</button></Link>
                      </div>
                    );
                  })
                : ''
              }
          </div>
        </div>
      </div>
      <div className="deleteLinks">
        <div onClick={handleDeleteCompleted}>Delete Finished Tasks</div>
        <div onClick={handleDeleteAll}>Cleanse The Short List</div>
      </div>

    </>
  );
}

export default App;
