import React from 'react'

const Shop = () => {
  return (
    <div className='container'>
      <div className='cards'>
        <Card heading='Heading' value='Value' sales='Sales' backgroundColor='red' />
        <Card heading='Heading' value='Value' sales='Sales' backgroundColor='green' />
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
      <h2>{heading}</h2>
      <h1>{value}</h1>
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