import React from 'react'

const Unit = () => {
  return (
    <div className='box'>
        <div className='heading'>
            <p>Add Unit</p>
        </div>
        <div className='inputs'>
            <input type="text" placeholder='Unit Name' />
            <div className='row-inputs'>
                <label htmlFor="typeActive">Unit Status</label>
                <select name="typeActive" id="">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <textarea name="remarks" id="">Remarks</textarea>
        </div>
        <div className='submit'>
            <button>Save</button>
        </div>
    </div>
  )
}

export default Unit