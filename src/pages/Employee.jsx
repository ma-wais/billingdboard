import React from 'react'

const Employee = () => {
  return (
    <div className='box'>
        <div className='heading'>
            <p>Add Employee</p>
        </div>
        <div className='inputs'>
            <input type="text" placeholder='Employee code (Password)' />
            <div className='row-inputs'>
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='Father Name' />
            </div>
            <div className='row-inputs'>
                <label htmlFor="gender"> Gender: </label>
                <select name="gender" id="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label htmlFor="dob"> Date of Birth: </label>
                <input style={{width: "195px"}} type="date" name="" id="dob" />
            </div>
            <div className='row-inputs'>
                <input type="text" placeholder='CNIC'/>
                <label htmlFor="status">Status</label>
                <select name="status" id="">
                    <option value="">Active</option>
                    <option value="">Left</option>
                </select>
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
            <textarea type="text" placeholder='Remarks' />
            <input type="file" accept='image/*' id='image' />
        </div>
        <div className='submit'>
            <button>Save</button>
        </div>
    </div>
  )
}

export default Employee