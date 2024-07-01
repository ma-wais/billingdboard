import React from 'react'

const Shop = () => {
  return (
      <div className='cards'>
        <Card heading='Heading' value='Value' sales='Sales' backgroundColor='red' />
        <Card heading='Heading' value='Value' sales='Sales' backgroundColor='red' />
        <Card heading='Heading' value='Value' sales='Sales' backgroundColor='red' />
        <Card heading='Heading' value='Value' sales='Sales' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />

      </div>
  )
}

const Card = ({ heading, value, sales, backgroundColor }) => {
  return (
    <div className='card' style={{ backgroundColor: `${backgroundColor}`, height: sales ? "150px" : "130px"}} >
      <h3>{heading}</h3>
      <h2>{value}</h2>
      <div>
      {
        sales &&
        <p>Sales: {sales}</p>
      }
      </div>
    </div>
  )
}

export default Shop