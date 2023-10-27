import React from "react"

function App() {

 
  return (
    <section className='section-center'>
    <form className='grocery-form' >
    

      <h3>grocery bud</h3>
      <div className='form-control'>
        <input
          type='text'
          className='grocery'
          placeholder='e.g. eggs'
        
        />
        <button type='submit' className='submit-btn'>
       
        </button>
      </div>
    </form>
 
      <div className='grocery-container'>
      
        <button className='clear-btn' >
          clear items
        </button>
      </div>
    
  </section>
  )
}

export default App