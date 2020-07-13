import React from 'react';

import CommentCreate from './CommetCreate';

export default ({ posts }) => {

    const renderedPosts = Object.values(posts).map(post => {
        return (
        <div key={post.id} 
            className="card"
            >
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentCreate post={post} />
            </div>
        </div>);
    });


    return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>
    );
}
