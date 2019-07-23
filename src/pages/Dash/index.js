import React, { Component } from 'react'
import { Card } from 'antd';


class Dash extends Component{
  render(){
    return(
      <div className='bg-dash'>
      <Card
        hoverable
        className='card-image-dash'
        cover={<img alt="example" src='../../bgDash.jpeg' />}
      />
      </div>
    )
  }
}

export default Dash