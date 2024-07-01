import React from 'react'

const PurchaseAdd2 = () => {
  return (
    <div className='box'>
        <div className='heading'>
            <p>Purchase Add (Loose Item)</p>
        </div>
        <div className='inputs'>
           <div className='row-inputs'>
                <label htmlFor="gender"> Supplier: </label>
                <select name="gender" id="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label htmlFor="pDate"> Date of Purchase: </label>
                <input style={{width: "195px"}} type="date" name="" id="pDate" />
            </div>
            <div className='row-inputs'>
                <input type="text" placeholder='Bill #'/>
                <label htmlFor="status">Payment Mode</label>
                <select name="status" id="">
                    <option value="">Cash</option>
                    <option value="">Credit</option>
                </select>
            </div>
            <textarea type="text" placeholder='Remarks' />
        </div>
        <div className='inputs more'>
            <div className='more-inputs'>
                <input type="text" placeholder='Item Name' />
                <input className='w50' type="number" placeholder='Retail' />
                <input type="number" placeholder='Loose Qty' />
                <input className='w50' type="number" placeholder='Rate' />
                <input type="number" placeholder='Discount %' />
                <input className='w50' type="number" placeholder='Discount' />
                <input type="number" placeholder='Net Amount' />
                <button style={{background: "#739e73", color: "white", marginLeft: "auto", marginRight: "10px"}}>Add To Table</button>
            </div>
        </div>
        <div className='submit'>
            <button>Save</button>
        </div>
    </div>
  )
}

export default PurchaseAdd2