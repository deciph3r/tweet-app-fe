import { Form, Button } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { changePassword } from '../service.ts'
import { useNavigate } from 'react-router-dom'

function ChangePassword({ setIsLoggedIn }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFormDirty, setIsFormDirty] = useState(false);

    const confirmPasswordRef = useRef(null);
    const history = useNavigate();

    useEffect(() => {
        if (confirmPassword !== password && isFormDirty) {
            confirmPasswordRef.current.classList.remove('is-valid');
            confirmPasswordRef.current.classList.add('is-invalid');
        } else if (confirmPassword === password && isFormDirty) {
            confirmPasswordRef.current.classList.remove('is-invalid');
            confirmPasswordRef.current.classList.add('is-valid');
        }
    }, [confirmPassword, password, isFormDirty])

    async function onSubmitHandler(e) {
        e.preventDefault();
        if (!confirmPasswordRef.current.classList.contains('is-invalid')) {
            await changePassword(password);
            localStorage.removeItem('user');
            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');
            setIsLoggedIn(false);
            history("/");
        }

    }

    return (
        <>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Choose your password" pattern='.{6,12}' required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onBlur={() => setIsFormDirty(true)} value={confirmPassword} ref={confirmPasswordRef} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm your password" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default ChangePassword;