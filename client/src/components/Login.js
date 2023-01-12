import React from 'react'
import { useState } from 'react'
import { Card, Container, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const { email, password } = credentials;

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const json =  await response.json();
        console.log(json);
        if(json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/")
        }
        else {
            alert("Some Error Occured")
        }
    }
    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
            <Card style={{ width: "20rem" }}>
                <Form onSubmit={handleLogin}>
                    <Card.Body>
                        <Card.Title className='text-center mt-2'><i className="fa-solid fa-right-to-bracket"></i></Card.Title>
                        <Card.Title className='text-center'>Login!</Card.Title>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Id</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={onChange}
                                name="email"
                                required
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={onChange}
                                name="password"
                                required
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Link to="/signup" style={{ textDecoration: "none" }}>New User? Sign Up Here!</Link>
                        </div>
                    </Card.Body>
                    <Card.Footer className="text-center my-1">
                        <Button type="submit" variant="primary">
                            Log In
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    )
}

export default Login