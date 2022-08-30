import { useRef, useState } from 'react';
import {InputGroup,Form,Button} from 'react-bootstrap'
function TweetPage() {
    const [tweet,setTweet] = useState('');
    const tweetInputRef = useRef(null);

    function onSubmitHandler(e){
        e.preventDefault()
        if(!RegExp('[\w ]+|(#[\w]{1,50})+').test(tweet)){
            tweetInputRef.current.classList.add('is-invalid')
        }else{
            tweetInputRef.current.classList.remove('is-invalid')
        }
    }

    return (
        <>
        <Form onSubmit={onSubmitHandler}>
            <InputGroup className='my-2'>
                <InputGroup.Text>Tweet</InputGroup.Text>
                <Form.Control ref={tweetInputRef} value={tweet} onChange={(e)=>setTweet(e.target.value)} as="textarea" aria-label="Enter your Tweet" maxLength={144} required/>
            </InputGroup>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        
        </>
    )
}

export default TweetPage;