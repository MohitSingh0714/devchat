import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  /* AUTH STATES */
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [isSignup, setIsSignup] =
    useState(false);

  /* APP STATES */
  const [enteredApp, setEnteredApp] =
    useState(false);

  const [page, setPage] =
    useState("Home");

  const [postText, setPostText] =
    useState("");

  const [darkMode, setDarkMode] =
    useState(true);

  const [searchText, setSearchText] =
    useState("");

  const [profileImage, setProfileImage] =
    useState(null);

  const [postImage, setPostImage] =
    useState(null);

  /* CHAT STATES */
  const [messageText, setMessageText] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        text: "Hey! Loved your DevChat UI 🔥",
        type: "received",
      },
      {
        text: "Thank you so much 🚀",
        type: "sent",
      },
      {
        text: "Are you using React?",
        type: "received",
      },
    ]);

  /* NOTIFICATIONS */
  const [notifications] = useState([
    "Sarah liked your post ❤️",
    "Alex started following you 👤",
    "New message from Sarah 💬",
  ]);

  /* POSTS */
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Mohit",
      text: "Just built my new React project 🚀",
      likes: 0,
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },

    {
      id: 2,
      name: "Sarah Dev",
      text: "Anyone looking for a frontend collaborator?",
      likes: 0,
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    },
  ]);

  /* ADD POST */
  function addPost() {
    if (
      postText.trim() === "" &&
      !postImage
    )
      return;

    const newPost = {
      id: Date.now(),
      name: "You",
      text: postText,
      likes: 0,
      image: postImage,
    };

    setPosts([newPost, ...posts]);

    setPostText("");
    setPostImage(null);
  }

  /* LIKE POST */
  function likePost(id) {
    const updatedPosts = posts.map(
      (post) =>
        post.id === id
          ? {
              ...post,
              likes: post.likes + 1,
            }
          : post
    );

    setPosts(updatedPosts);
  }

  /* DELETE POST */
  function deletePost(id) {
    const updatedPosts = posts.filter(
      (post) => post.id !== id
    );

    setPosts(updatedPosts);
  }

  /* SEND MESSAGE */
  function sendMessage() {
    if (messageText.trim() === "")
      return;

    const newMessage = {
      text: messageText,
      type: "sent",
    };

    setMessages([
      ...messages,
      newMessage,
    ]);

    setMessageText("");
  }

  /* PAGE CONTENT */
  const renderContent = () => {
    /* HOME */
    if (page === "Home") {
      const filteredPosts = posts.filter(
        (post) =>
          post.name
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            ) ||
          post.text
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            )
      );

      return (
        <>
          {/* CREATE POST */}
          <div className="create-post">
            <textarea
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) =>
                setPostText(
                  e.target.value
                )
              }
            ></textarea>

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file =
                  e.target.files[0];

                if (file) {
                  setPostImage(
                    URL.createObjectURL(
                      file
                    )
                  );
                }
              }}
            />

            {/* PREVIEW */}
            {postImage && (
              <img
                src={postImage}
                alt="Preview"
                className="post-preview"
              />
            )}

            <button onClick={addPost}>
              Post
            </button>
          </div>

          {/* POSTS */}
          {filteredPosts.map((post) => (
            <motion.div
              className="post"
              key={post.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              whileHover={{
                scale: 1.02,
              }}
            >
              <h3>{post.name}</h3>

              <p>{post.text}</p>

              {/* POST IMAGE */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="post-image"
                />
              )}

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
            </motion.div>
          ))}
        </>
      );
    }

    /* EXPLORE */
    if (page === "Explore") {
      return (
        <motion.div
          className="post"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        >
          <h3>Explore Developers</h3>

          <p>
            Discover talented frontend,
            backend and full stack
            developers 🚀
          </p>
        </motion.div>
      );
    }

    /* MESSAGES */
    if (page === "Messages") {
      return (
        <div className="chat-page">
          {/* CHAT SIDEBAR */}
          <div className="chat-sidebar">
            <h3>Chats</h3>

            <div className="chat-user active-chat">
              🟢 Sarah Dev
            </div>

            <div className="chat-user">
              🟢 Alex React
            </div>

            <div className="chat-user">
              ⚪ UI Master
            </div>
          </div>

          {/* CHAT WINDOW */}
          <div className="chat-window">
            <div className="chat-header">
              Sarah Dev
            </div>

            <div className="chat-messages">
              {messages.map(
                (message, index) => (
                  <motion.div
                    key={index}
                    className={`message ${message.type}`}
                    initial={{
                      opacity: 0,
                      x:
                        message.type ===
                        "sent"
                          ? 100
                          : -100,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                  >
                    {message.text}
                  </motion.div>
                )
              )}
            </div>

            {/* INPUT */}
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) =>
                  setMessageText(
                    e.target.value
                  )
                }
              />

              <button
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      );
    }

    /* NOTIFICATIONS */
    if (page === "Notifications") {
      return (
        <div className="notifications-page">
          <h2>Notifications</h2>

          {notifications.map(
            (
              notification,
              index
            ) => (
              <motion.div
                className="notification-card"
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                {notification}
              </motion.div>
            )
          )}
        </div>
      );
    }

    /* PROFILE */
    if (page === "Profile") {
      return (
        <motion.div
          className="profile-page"
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
        >
          <div className="profile-banner"></div>

          <div className="profile-info">
            {/* AVATAR */}
            <div className="avatar">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="avatar-img"
                />
              ) : (
                "M"
              )}
            </div>

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file =
                  e.target.files[0];

                if (file) {
                  setProfileImage(
                    URL.createObjectURL(
                      file
                    )
                  );
                }
              }}
            />

            <h2>Mohit Singh</h2>

            <p className="bio">
              Frontend Developer
              passionate about React,
              UI/UX, and modern web
              apps.
            </p>

            {/* SKILLS */}
            <div className="skills">
              <span>React</span>
              <span>JavaScript</span>
              <span>CSS</span>
              <span>UI/UX</span>
            </div>

            {/* BUTTONS */}
            <div className="profile-buttons">
              <button>
                GitHub
              </button>

              <button>
                Portfolio
              </button>
            </div>

            {/* STATS */}
            <div className="profile-stats">
              <div>
                <h3>12</h3>
                <p>Posts</p>
              </div>

              <div>
                <h3>340</h3>
                <p>Followers</p>
              </div>

              <div>
                <h3>180</h3>
                <p>Following</p>
              </div>
            </div>

            {/* PROJECTS */}
            <div className="projects-section">
              <h2>
                Featured Projects
              </h2>

              <div className="projects-grid">
                <div className="project-card">
                  <h3>DevChat</h3>

                  <p>
                    Developer social
                    platform built using
                    React and Vite.
                  </p>

                  <button>
                    View Project
                  </button>
                </div>

                <div className="project-card">
                  <h3>Food AI</h3>

                  <p>
                    AI-powered food
                    detection app.
                  </p>

                  <button>
                    View Project
                  </button>
                </div>

                <div className="project-card">
                  <h3>Portfolio</h3>

                  <p>
                    Personal developer
                    portfolio with
                    animations.
                  </p>

                  <button>
                    View Project
                  </button>
                </div>
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="social-links">
              <button>
                GitHub
              </button>

              <button>
                LinkedIn
              </button>

              <button>
                Twitter
              </button>
            </div>

            {/* TECH STACK */}
            <div className="tech-stack">
              <h2>Tech Stack</h2>

              <div className="tech-grid">
                <div>⚛ React</div>
                <div>
                  🟨 JavaScript
                </div>
                <div>🎨 CSS3</div>
                <div>
                  🔥 Firebase
                </div>
                <div>
                  🟩 Node.js
                </div>
                <div>
                  💨 Tailwind
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
  };

  /* AUTH PAGE */
  if (!isLoggedIn) {
    return (
      <div
        className={
          darkMode
            ? "app dark"
            : "app light"
        }
      >
        <div className="auth-page">
          <motion.div
            className="auth-box"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
          >
            <h1>
              {isSignup
                ? "Create Account"
                : "Welcome Back"}
            </h1>

            <input
              type="text"
              placeholder="Username"
            />

            <input
              type="email"
              placeholder="Email"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <button
              onClick={() =>
                setIsLoggedIn(true)
              }
            >
              {isSignup
                ? "Sign Up"
                : "Login"}
            </button>

            <p
              onClick={() =>
                setIsSignup(
                  !isSignup
                )
              }
              style={{
                cursor: "pointer",
                marginTop: "15px",
                textAlign: "center",
              }}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  /* LANDING PAGE */
  if (!enteredApp) {
    return (
      <div
        className={
          darkMode
            ? "app dark"
            : "app light"
        }
      >
        <motion.div
          className="landing"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
        >
          <h1>DevChat</h1>

          <p>
            The social platform built
            for developers to connect,
            share projects, and grow
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
        </motion.div>
      </div>
    );
  }

  /* MAIN APP */
  return (
    <div
      className={
        darkMode
          ? "app dark"
          : "app light"
      }
    >
      {/* NAVBAR */}
      <nav className="navbar">
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode
            ? "☀ Light"
            : "🌙 Dark"}
        </button>

        <button
          onClick={() =>
            setIsLoggedIn(false)
          }
        >
          Logout
        </button>

        <h2>DevChat</h2>

        <input
          type="text"
          placeholder="Search posts..."
          value={searchText}
          onChange={(e) =>
            setSearchText(
              e.target.value
            )
          }
        />
      </nav>

      {/* LAYOUT */}
      <div className="layout">
        {/* SIDEBAR */}
        <motion.aside
          className="sidebar"
          initial={{
            x: -100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
          }}
        >
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
        </motion.aside>

        {/* FEED */}
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