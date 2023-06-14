import { useState } from 'react'
import mentorLogo from '/mentor.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-teal-500 font-bold text-2xl">
        Mentor app
      </div>
    </>
  )
}

export default App
