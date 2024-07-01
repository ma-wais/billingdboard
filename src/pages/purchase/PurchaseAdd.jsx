import React from 'react'

const PurchaseAdd = () => {
  return (
    <div className='box'>
        <div className='heading'>
            <p>Add Purchase</p>
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
                <input className='w50' type="number" placeholder='Quantity' />
                <input className='w50' type="number" placeholder='Bonus Qty' />
                <input type="number" placeholder='Rate (Purchase Price)' />
                <input className='w50' type="number" placeholder='Total' />
                <input className='w50' type="number" placeholder='QtyInPack' />
                <input className='w50' type="number" placeholder='Retail' />
                <input className='w50' type="number" placeholder='Price %' />
                <input type="number" placeholder='Discount %' />
                <input type="number" placeholder='Discount' />
                <input type="number" placeholder='Price after Discount' />
                <input className='w50' type="number" placeholder='Tax %' />
                <input className='w50' type="number" placeholder='Tax Amount' />
                <input className='w50' type="number" placeholder='Tax Amount2' />
                <input type="number" placeholder='Net Amount' />
                <input type="number" placeholder='Batch #'/>
                <div className='row-inputs' style={{width: "200px"}}>
                    <label htmlFor="expiry">Expiry Date: </label>
                    <input type="date" id='expiry' placeholder='Expiry Date'/>
                </div>
                <textarea style={{width: "60%", height: "30px"}} type="text" placeholder='Remarks' />
                <button style={{background: "#739e73", color: "white", marginLeft: "auto", marginRight: "10px"}}>Add To Table</button>
            </div>
        </div>
        <div className='submit'>
            <button>Save</button>
        </div>
    </div>
  )
}

export default PurchaseAdd