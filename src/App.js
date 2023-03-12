import { useState, useEffect } from "react"
import List from "./List";
import Alert from "./Alert";

const getItems = () => {
  let list = localStorage.getItem('list')
  return list ? JSON.parse(list) : []
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getItems())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'danger', 'Please enter a valid value')
    } else if (name && isEditing) {
      setList(list.map(item => {
        if (item.id === editID) {
          return {...item, title: name}
        }
        return item
      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'Item updated')
    } else {
      showAlert(true, 'success', 'Item Added')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
    }
  }
  const showAlert = (show=false, type="", msg="") => {
    setAlert({
      show,
      type,
      msg
    })
  }
  const clearList = () => {
    showAlert(true, 'danger', 'the list is empty')
    setList([])
  }
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter(item => item.id !== id))
  }
  const editItem = (id) => {
    setIsEditing(true)
    setEditID(id)
    const item = list.find(x => x.id === id)
    setName(item.title)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery list</h3>
        <div className="form-control">
          <input type="text" className="grocery" placeholder="e.g. egg" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="submit-btn" type="submit">
            {isEditing ? 'edit' : 'add'}
          </button>
        </div>
      </form>
      {list.length > 0 && 
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      }
    </section>
  );
}

export default App;
