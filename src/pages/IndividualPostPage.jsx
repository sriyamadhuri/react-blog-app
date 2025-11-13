import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/IndividualPostPage.css";

export default function IndividualPostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const postData = await postRes.json();
        setPost(postData);

        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
        const userData = await userRes.json();
        setUser(userData);

        const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        const commentsData = await commentsRes.json();
        setComments(commentsData);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    setPosting(true);

    const newComment = {
      postId: id,
      name,
      body: comment,
      email: "anonymous@demo.com",
    };

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      }
    );

    const data = await response.json();
    setComments([data, ...comments]);
    setName("");
    setComment("");
    setPosting(false);
  };

  if (loading)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading post...</p>
      </div>
    );

  if (!post) return <p>Post not found.</p>;

  return (
    <article className="post-detail">
      <Link to="/posts" className="back-link">
        ← Back to Posts
      </Link>

      <h2>{post.title}</h2>
      <p className="content">{post.body}</p>

      {user && (
        <div className="author-info">
          <h3>Author Details</h3>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Company:</strong> {user.company?.name}
          </p>
        </div>
      )}

      <section className="comments-section">
        <h3>Comments</h3>

        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={posting}
          />
          <textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={posting}
          />
          <button type="submit" disabled={posting}>
            {posting ? "Posting..." : "Post Comment"}
          </button>
        </form>

        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="comments-list">
            {comments.map((c) => (
              <li key={c.id} className="comment-item">
                <strong>{c.name}</strong>
                <p>{c.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
