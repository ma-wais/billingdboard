import React from 'react'

const Shop = () => {
  return (
    <div className='container'>
      <div className='cards'>
        <Card heading='Heading' value='Value' sales='Sales' backgroundColor='red' />
        <Card heading='Heading' value='Value' sales='Sales' backgroundColor='red' />
        <Card heading='Heading' value='Value' sales='Sales' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />
        <Card heading='Heading' value='Value' backgroundColor='red' />

      </div>
    </div>
  )
}

const Card = ({ heading, value, sales, backgroundColor }) => {
  return (
    <div className='card' style={{ backgroundColor: `${backgroundColor}` }} >
      <h3>{heading}</h3>
      <h2>{value}</h2>
      <span>
      {
        sales &&
        <p>Sales: {sales}</p>
      }
      </span>
    </div>
  )
}

export default Shop