import { useEffect, useRef, useState, useCallback } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { loadTweets, createTweet, getAllTweetsOfUser } from '../service.ts';
import Tweet from './Tweet'
function TweetPage() {
    const [tweet, setTweet] = useState('');
    const tweetInputRef = useRef(null);
    const [hasMore, setHasMore] = useState(true);
    const [listOfTweets, setListOfTweets] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [pageNumber, setPageNumber] = useState(1);
    let [currentUser, setCurrentUser] = useState('');


    function fetchMore() {
        (async () => {
            const json = (id === null) ? await loadTweets(pageNumber) : await getAllTweetsOfUser(id, pageNumber);
            setListOfTweets([...listOfTweets, ...json]);
            setPageNumber(() => pageNumber + 1);
            if (json.length === 0) setHasMore(false);
        })()
    }

    function onSubmitHandler(e) {
        e.preventDefault();
        if (!RegExp(/[\w ]+|(#[\w]{1,50})+/).test(tweet)) {
            tweetInputRef.current.classList.add('is-invalid')
        } else {
            tweetInputRef.current.classList.remove('is-invalid')
            let listOfTag = tweet.match(/#[\w]{1,50}/g);
            listOfTag = (listOfTag === null) ? null : listOfTag.map((e) => e.replace('#', ''))

            createTweet(tweet, listOfTag);
            setTweet('');
        }
    }
    useEffect(() => {
        (async function () {
            try {
                const json = (id === null) ? await loadTweets() : await getAllTweetsOfUser(id);
                setListOfTweets(json);
                if (json.length === 0) setHasMore(false);
            } catch (e) {
                console.error(e);
            }
            setCurrentUser(() => localStorage.getItem('user'));
        })();
    }, []);
    return (
        <>
            {id === null && <Form onSubmit={onSubmitHandler}>
                <InputGroup className='my-2'>
                    <InputGroup.Text>Tweet</InputGroup.Text>
                    <Form.Control ref={tweetInputRef} value={tweet} onChange={(e) => setTweet(e.target.value)} as="textarea" aria-label="Enter your Tweet" maxLength={144} required />
                </InputGroup>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>}

            <>
                <InfiniteScroll
                    dataLength={listOfTweets.length}
                    next={fetchMore}
                    hasMore={hasMore}
                    loader={
                        <div className="spinner-border text-primary my-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                >
                    {listOfTweets.map((e) => <Tweet key={e.id} data={e} currentUser={currentUser} />)}
                </InfiniteScroll>
            </>
        </>
    )
}

export default TweetPage;