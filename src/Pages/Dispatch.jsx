import Navbar from "../Components/Navbar"

const Dispatch = ({setIsLogedIn}) => {
  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <Navbar setIsLogedIn={setIsLogedIn}/>
      <div className="grow custom-container">

      </div>
    </div>
  )
}

export default Dispatch