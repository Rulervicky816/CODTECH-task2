import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editing, setEditing] = useState(null);

  const API_URL = 'http://localhost:5000/api/blogs'; // Update to match your backend URL

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_URL);
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(API_URL, form);
      setBlogs([...blogs, response.data]);
      setForm({ title: '', content: '' });
    } catch (err) {
      setError('Failed to create blog');
    }
  };

  const handleEdit = (blog) => {
    setForm({ title: blog.title, content: blog.content });
    setEditing(blog._id);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API_URL}/${editing}`, form);
      setBlogs(
        blogs.map((blog) =>
          blog._id === editing ? response.data : blog
        )
      );
      setForm({ title: '', content: '' });
      setEditing(null);
    } catch (err) {
      setError('Failed to update blog');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>MY BLOG</h1>

        {/* Form Section */}
        <div style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
          />
          <textarea
            style={styles.textarea}
            name="content"
            placeholder="Blog Content"
            value={form.content}
            onChange={handleChange}
          ></textarea>
          <button
            style={styles.button}
            onClick={editing ? handleUpdate : handleCreate}
          >
            {editing ? 'Update Blog' : 'Create Blog'}
          </button>
        </div>

        {/* Blogs List */}
        <div style={styles.blogList}>
          {blogs.map((blog) => (
            <div key={blog._id} style={styles.blogItem}>
              <img
                src="https://via.placeholder.com/150"
                alt="Blog Thumbnail"
                style={styles.image}
              />
              <div style={styles.blogContent}>
                <h2 style={styles.title}>{blog.title}</h2>
                <p style={styles.content}>{blog.content}</p>
                <div style={styles.buttonGroup}>
                  <button
                    style={styles.editButton}
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#f0f8ff',
    minHeight: '100vh',
    padding: '20px 0',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  blogList: {
    marginTop: '20px',
  },
  blogItem: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '20px',
    background: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '150px',
    height: '100px',
    borderRadius: '5px',
    marginRight: '15px',
  },
  blogContent: {
    flex: 1,
  },
  title: {
    margin: '0 0 10px',
    color: '#333',
  },
  content: {
    color: '#555',
  },
  buttonGroup: {
    marginTop: '10px',
  },
  editButton: {
    marginRight: '10px',
    padding: '5px 10px',
    backgroundColor: '#ffc107',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#e74c3c',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default App;
