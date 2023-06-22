import './App.css'
import Form from './components/reservation_form'

function App() {

  return (
    <>
      <div className="text-teal-500 font-bold text-2xl">
       <img className="logoImage" src="./public/mentor.png" alt=" "/>
        Mentor app
        <Form />
      </div>
    </>
  )
}

export default App
