import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/blogs', { title, content })
            .then(() => {
                setTitle('');
                setContent('');
            })
            .catch((err) => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button type="submit">Create Blog</button>
        </form>
    );
};

export default CreateBlog;
