import React, { useState } from 'react';
import Axios from 'axios';
import CommentList from './CommentList';

export default ({ post }) => {
    const [state, setContent] = useState({
        comments : post.comments || [],
        content: '',
    });


    console.log(state.comments);


    const onSubmit = async (event) => {
        event.preventDefault();

        if(state.content.length === 0)
        {
            return;
        }

        var res = await Axios.post(`http://posts.com/posts/${post.id}/comments`, {
            content: state.content,
        });

        setContent({
            content: '',
            comments: res.data
        });
    };

    return (
    <div>
        <CommentList comments={state.comments} />

        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input 
                        value={state.content}
                        onChange={e => setContent(
                            { 
                                content: e.target.value, 
                                comments: state.comments
                        })}
                        className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
    );
}