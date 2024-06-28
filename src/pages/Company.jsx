import React from 'react'

const Company = () => {
  return (
    <div className='box'>
        <div className='heading'>
            <p>Add Company</p>
        </div>
        <div className='inputs'>
            <input type="text" placeholder='Company Name' />
            <div className='row-inputs'>
                <input type="text" placeholder='Short Name' />
                <input type="text" placeholder='Code' />
            </div>
            <div className='row-inputs'>
            <input type="text" placeholder='Phone #' />
                <input type="email" placeholder='Email' />
            </div>
            <div className='row-inputs'>
            <textarea style={{width: "40%"}} type="text" placeholder='Address' />
            <select name="" id="">
                <option value="Gujrat">Gujrat</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="KPK">KPK</option>
            </select>
            </div>
            <select name="" id="">
                <option value="Gujrat">Gujrat</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="KPK">KPK</option>
            </select>
            <textarea type="text" placeholder='Remarks' />
        </div>
        <div className='submit'>
            <button>Save</button>
        </div>
    </div>
  )
}

export default Company