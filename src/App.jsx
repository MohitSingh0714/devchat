import { useState } from "react";

function App() {
  const [enteredApp, setEnteredApp] = useState(false);
  const [page, setPage] = useState("Home");
  const [postText, setPostText] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Mohit",
      text: "Just built my new React project 🚀",
      likes: 0,
    },
    {
      id: 2,
      name: "Sarah Dev",
      text: "Anyone looking for a frontend collaborator?",
      likes: 0,
    },
  ]);

  function addPost() {
    if (postText.trim() === "") return;

    const newPost = {
      id: Date.now(),
      name: "You",
      text: postText,
      likes: 0,
    };

    setPosts([newPost, ...posts]);
    setPostText("");
  }

  function likePost(id) {
    const updatedPosts = posts.map((post) =>
      post.id === id
        ? { ...post, likes: post.likes + 1 }
        : post
    );

    setPosts(updatedPosts);
  }

  function deletePost(id) {
    const updatedPosts = posts.filter(
      (post) => post.id !== id
    );

    setPosts(updatedPosts);
  }

  const renderContent = () => {
    if (page === "Home") {
      const filteredPosts = posts.filter(
        (post) =>
          post.name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          post.text
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );

      return (
        <>
          <div className="create-post">
            <textarea
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) =>
                setPostText(e.target.value)
              }
            ></textarea>

            <button onClick={addPost}>
              Post
            </button>
          </div>

          {filteredPosts.map((post) => (
            <div className="post" key={post.id}>
              <h3>{post.name}</h3>
              <p>{post.text}</p>

              <div className="post-actions">
                <button
                  onClick={() =>
                    likePost(post.id)
                  }
                >
                  ❤️ {post.likes}
                </button>

                <button
                  onClick={() =>
                    deletePost(post.id)
                  }
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </>
      );
    }

    if (page === "Explore") {
      return (
        <div className="post">
          <h3>Explore Developers</h3>
        </div>
      );
    }

    if (page === "Messages") {
      return (
        <div className="post">
          <h3>Messages</h3>
        </div>
      );
    }

    if (page === "Notifications") {
      return (
        <div className="post">
          <h3>Notifications</h3>
        </div>
      );
    }

    if (page === "Profile") {
      return (
        <div className="post">
          <h3>My Profile</h3>
        </div>
      );
    }
  };

  /* Landing Page */
  if (!enteredApp) {
    return (
      <div className={darkMode ? "app dark" : "app light"}>
        <div className="landing">
          <h1>DevChat</h1>

          <p>
            The social platform built for developers
            to connect, share projects, and grow
            together.
          </p>

          <div className="landing-buttons">
            <button
              onClick={() =>
                setEnteredApp(true)
              }
            >
              Enter App 🚀
            </button>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              {darkMode
                ? "☀ Light"
                : "🌙 Dark"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* Main App */
  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <nav className="navbar">
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <h2>DevChat</h2>

        <input
          type="text"
          placeholder="Search posts..."
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
        />
      </nav>

      <div className="layout">
        <aside className="sidebar">
          <p
            className={
              page === "Home"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("Home")
            }
          >
            🏠 Home
          </p>

          <p
            className={
              page === "Explore"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("Explore")
            }
          >
            🔍 Explore
          </p>

          <p
            className={
              page === "Messages"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("Messages")
            }
          >
            💬 Messages
          </p>

          <p
            className={
              page ===
              "Notifications"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage(
                "Notifications"
              )
            }
          >
            🔔 Notifications
          </p>

          <p
            className={
              page === "Profile"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("Profile")
            }
          >
            👤 Profile
          </p>
        </aside>

        <main className="feed">
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            {page}
          </h2>

          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;