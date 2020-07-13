import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PostList from './PostList';

export default () => {
    const [typedTitle, setTitle] = useState('');

    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://posts.com/posts');
        setPosts(res.data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        if(typedTitle.length === 0){
            return;
        }

        var res = await axios.post('http://posts.com/posts/create', {
            title: typedTitle
        });
        
        const {id, title, comments} = res.data;
        posts[id] = {id, title, comments};
        setTitle('');
        setPosts(posts);
    }

    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                    <label>Title</label>
                    <input 
                        value={typedTitle} 
                        onChange={e => setTitle(e.target.value)} 
                        className="form-control" />
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
            <hr />
            <h1>Posts</h1>
            <PostList posts={posts} />
        </div>
    )
}