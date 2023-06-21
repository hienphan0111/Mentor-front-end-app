import { useState } from 'react'
import './App.css'
import Form from './components/reservation_form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-teal-500 font-bold text-2xl">
       <img class="logoImage" src="./public/mentor.png" alt=" "/>
        Mentor app
        <Form />
      </div>
    </>
  )
}

export default App
