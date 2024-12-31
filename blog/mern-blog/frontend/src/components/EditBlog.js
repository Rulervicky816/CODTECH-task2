import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/blogs/${id}`)
            .then((res) => {
                setTitle(res.data.title);
                setContent(res.data.content);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/blogs/${id}`, { title, content })
            .then(() => navigate('/'))
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
            <button type="submit">Update Blog</button>
        </form>
    );
};

export default EditBlog;
