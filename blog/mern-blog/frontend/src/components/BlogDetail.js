import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
    const { id } = useParams(); // Extract blog ID from the route
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/blogs/${id}`)
            .then((res) => setBlog(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!blog) return <div>Loading...</div>;

    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
        </div>
    );
};

export default BlogDetail;
