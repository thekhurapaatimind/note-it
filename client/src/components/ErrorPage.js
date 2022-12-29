import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ErrorPage(props) {
  return (
    <Container className='justify-content-around align-items-center' style={{height:'60vh', display:'flex', flexDirection:'column', color:props.mode==='dark'?'#9B9D9E':'#707071'}}>
        <h1 className="display-1">404</h1>
        <img src="./error.svg" alt="error page" style={{height:'100px'}}/>
        <h1 className="display-4">Page Not Found!</h1>
        <Link to="/"><Button variant="info">Go Back to Home!</Button></Link>
    </Container>
  )
}
