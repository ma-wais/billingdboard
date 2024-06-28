import React from 'react'

const City = () => {
  return (
    <div className='box'>
        <div className='heading'>
            <p>Add City</p>
        </div>
        <div className='inputs'>
            <input type="text" placeholder='City Name' style={{maxWidth: "300px"}}/>
        </div>
        <div className='submit'>
            <button>Save</button>
        </div>
    </div>
  )
}

export default City