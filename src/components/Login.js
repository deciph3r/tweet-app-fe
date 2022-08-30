import { useState } from "react"
import { Form,Button } from 'react-bootstrap'

function Login(){
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    function onSubmitHandler(e){
        e.preventDefault();
    }
    return (
        <Form onSubmit = {onSubmitHandler}>
        <Form.Group className="mb-3" >
          <Form.Label>User Name</Form.Label>
          <Form.Control value={userName} onChange={(e)=> setUserName(e.target.value)} type="text" placeholder="Enter your user name" required />
        </Form.Group>
  
        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Enter your password" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
}

export default Login