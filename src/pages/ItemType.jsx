import React from 'react'

const ItemType = () => {
  return (
    <div className='box'>
        <div className='heading'>
            <p>Add ItemType</p>
        </div>
        <div className='inputs'>
            <input type="text" placeholder='Shop Name' />
            <input type="text" placeholder='Shop Owner' />
            <div className='row-inputs'>
                <label htmlFor="typeActive">Item Type Active</label>
                <select name="typeActive" id="">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <input type="text" placeholder='Shop Phone' />
        </div>
        <div className='submit'>
            <button>Save</button>
        </div>
    </div>
  )
}

export default ItemType