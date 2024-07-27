import React from 'react'
import { CgClose } from 'react-icons/cg'
import './reprint.scss'

const Reprint = () => {
  return (
    <div className='reprint-modal'>
      <div>
        <h2>Reprint Invoice From Sale Refrence</h2>
        <CgClose />
      </div>
      <div>
        <input
          type="text"
          placeholder="Reference No."
          className="search-input"
          style={{padding:"5px",border:"1px solid #ccc",borderRadius:"4px",outline:"none"}}
        />
          <button>Reprint</button>
      </div>
    </div>
  )
}

export default Reprint