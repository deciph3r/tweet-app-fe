import { useEffect, useRef, useState } from 'react'
import { Form,Button } from 'react-bootstrap'

function Register() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const confirmPasswordRef = useRef(null);
    
    function onSubmitHandler(e){
        e.preventDefault();
        if(!confirmPasswordRef.current.classList.contains('is-invalid')){
            console.log(loginId);
        }
    }

    useEffect(()=>{
       if (confirmPassword !== password){
        confirmPasswordRef.current.classList.add('is-invalid');
       }else{
        confirmPasswordRef.current.classList.remove('is-invalid');
       }
    },[confirmPassword])
    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control value={firstName} onChange={(e)=> setFirstName(e.target.value)} type="text" placeholder="Enter your first name" pattern='[aA-zZ]{1,12}' required/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control value={lastName} onChange={(e)=> setLastName(e.target.value)} type="text" placeholder="Enter your last name" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Enter your e-mail" required/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Login Id</Form.Label>
                <Form.Control value={loginId} onChange={(e)=> setLoginId(e.target.value)} type="text" placeholder="Choose your login id" pattern='([aA-zZ_.]){5,12}' required/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Choose your password" pattern='.{6,12}' required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control value={confirmPassword} ref={confirmPasswordRef} onChange={(e)=> setConfirmPassword(e.target.value)} type="password" placeholder="Confirm your password" required/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    )
}

export default Register