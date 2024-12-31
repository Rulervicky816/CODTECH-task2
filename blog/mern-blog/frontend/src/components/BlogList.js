import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    // Fetch blogs from the backend
    useEffect(() => {
        axios.get('http://localhost:5000/api/blogs')
            .then((res) => setBlogs(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Handle delete functionality
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/blogs/${id}`)
            .then(() => {
                setBlogs(blogs.filter((blog) => blog._id !== id)); // Update the state to reflect the deletion
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h1>Blogs</h1>
            {blogs.map((blog) => (
                <div key={blog._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                    {/* Button to delete a blog */}
                    <button onClick={() => handleDelete(blog._id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
