import { useEffect, useState, useRef } from 'react';
import { Card, Col, Row, Container, Button, InputGroup, Form } from 'react-bootstrap'
import { updateTweet, replyTweet, deleteTweet, likeTweet, isLikedByUser, unLikeTweet } from '../service.ts';
import logo from '../logo.svg'
import ConfirmationModal from './ConfirmationModal';
function Tweet({ data, currentUser }) {

    const [time, setTime] = useState('');
    const [tweet, setTweet] = useState('');
    const tweetInputRef = useRef(null);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showUpdateInput, setShowUpdateInput] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLiked, setIsLiked] = useState(false);


    function onSubmitHandler(e) {
        e.preventDefault();
        if (!RegExp(/[\w ]+|(#[\w]{1,50})+/).test(tweet)) {
            tweetInputRef.current.classList.add('is-invalid')
        } else {
            tweetInputRef.current.classList.remove('is-invalid')
            let listOfTag = tweet.match(/#[\w]{1,50}/g);
            listOfTag = (listOfTag === null) ? null : listOfTag.map((e) => e.replace('#', ''))
            showUpdateInput ? updateTweet(data.id, tweet, listOfTag) : replyTweet(data.id, tweet, listOfTag);
            setTweet('');
        }
    }

    async function likeHandler() {
        if (isLiked) {
            unLikeTweet(data['id']);
            setIsLiked(false)
        } else {
            likeTweet(data['id']);
            setIsLiked(true)
        }
    }



    useEffect(() => {
        setTweet(() => showUpdateInput ? data['tweet'] : '')
    }, [showReplyInput, showUpdateInput])

    useEffect(() => {
        setIsLiked(() => data['likedByUser']);
        const currentTime = new Date();
        const createdTime = new Date(data.postTime * 1000);
        const difference = currentTime - createdTime;
        if (difference / 1000 < 60) {
            setTime(Math.floor(difference / 1000) + "s")
        } else if ((difference / (1000 * 60)) < 60) {
            setTime(Math.floor(difference / (1000 * 60)) + "m");
        } else if ((difference / (1000 * 60 * 60)) < 24) {
            setTime(Math.floor(difference / (1000 * 60 * 60)) + "h");
        } else if ((difference / (1000 * 60 * 60 * 24)) < 30) {
            setTime(Math.floor(difference / (1000 * 60 * 60 * 24)) + " days");
        } else if ((difference / (1000 * 60 * 60 * 24 * 30)) < 30) {
            setTime(Math.floor(difference / (1000 * 60 * 60 * 24 * 30)) + " months");
        } else {
            setTime(Math.floor(difference / (1000 * 60 * 60 * 24 * 365)) + " years");
        }

    }, [])
    return (
        <>
            <Card className='my-2' body>
                <Container>
                    <Row className='justify-content-center'>
                        <Col xs="auto"><img alt='profile' src={logo} width="60"
                            height="60" /></Col>
                        <Col xs="auto">
                            <Row className='my-1'>
                                <Col>@{data.username}</Col>
                                <Col>{time} ago</Col>
                            </Row>
                            <Row className='my-1'>
                                <Col>
                                    {data["repliedToMessage"] &&
                                        <div>"{data["repliedToMessage"]}"</div>
                                    }
                                    <div>{data.tweet}</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Button className='mx-2' onClick={likeHandler}>{(isLiked) ? "\u2665" : "\u2661"} {data['likes']}</Button>
                        <Button className='mx-2' onClick={() => { setShowUpdateInput(false); setShowReplyInput(() => !showReplyInput) }}> Reply </Button>
                        {data["username"] === currentUser && <Button className='mx-2' onClick={() => setShowModal(true)} > Delete </Button>}
                        {data["username"] === currentUser && <Button className='mx-2' onClick={() => { setShowReplyInput(false); setShowUpdateInput(() => !showUpdateInput) }}> Edit </Button>}
                    </div>
                    {(showReplyInput || showUpdateInput) && <div>
                        <Form onSubmit={onSubmitHandler}>
                            <InputGroup className='my-2'>
                                <InputGroup.Text>Tweet</InputGroup.Text>
                                <Form.Control ref={tweetInputRef} value={tweet} onChange={(e) => setTweet(e.target.value)} as="textarea" aria-label="Enter your Tweet" maxLength={144} required />
                            </InputGroup>
                            <Button onClick={onSubmitHandler} variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>}
                </Container>
            </Card>
            <ConfirmationModal show={showModal} message={"Want to delete the following tweet"} tweet={data['tweet']} setShow={setShowModal} onConfirm={() => { deleteTweet(data['id']); setShowModal(false); }} />
        </>
    )
}


export default Tweet;