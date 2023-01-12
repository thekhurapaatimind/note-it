import React from 'react'
import { useState } from 'react'
import { Card, Container, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name:"", email: "", password: "", cpassword: ""})
    const { name, email, password, cpassword } = credentials;

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        if(password!==cpassword) {
            return alert("Password Did Not Match!")
        }
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        const json =  await response.json();
        console.log(json);
        if(json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/")
        }
        else {
            alert("Some Internal Error Occured")
        }
    }

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
            <Card style={{ width: "20rem" }}>
                <Form onSubmit={handleLogin}>
                    <Card.Body>
                        <Card.Title className='text-center mt-2'><i className="fa-solid fa-user-plus"></i></Card.Title>
                        <Card.Title className='text-center'>Sign Up!</Card.Title>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                value={name}
                                onChange={onChange}
                                name="name"
                                required
                                autoFocus
                            />
                        </Form.Group>
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
                                minLength={5}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={cpassword}
                                onChange={onChange}
                                name="cpassword"
                                minLength={5}
                                required
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Link to="/login" style={{ textDecoration: "none" }}>Already Registered? Log In!</Link>
                        </div>
                    </Card.Body>
                    <Card.Footer className="text-center my-1">
                        <Button type="submit" variant="primary">
                            Register
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    )
}

export default Signup