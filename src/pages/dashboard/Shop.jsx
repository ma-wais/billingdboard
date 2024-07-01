import React from 'react'

const Shop = () => {
  return (
    <div className='box'>
        <div className='heading'>
            <p>Shop</p>
        </div>
        <div className='inputs'>
            <input type="text" placeholder='Shop Name' />
            <input type="text" placeholder='Shop Owner' />
            <input type="text" placeholder='Shop Address' />
            <input type="text" placeholder='Shop Phone' />
            {/* <input type="text" placeholder='Shop Address' /> */}
            <input type="file" accept='image/*' id='image' />
        </div>
        <div className='submit'>
            <button>Save</button>
        </div>
    </div>
  )
}

export default Shop