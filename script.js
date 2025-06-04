let posts = JSON.parse(localStorage.getItem("posts")) || [];
let editingId = null;

function createOrUpdatePost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (!title || !content) return alert("Title and content required");

  if (editingId) {
    const post = posts.find(p => p.id === editingId);
    post.title = title;
    post.content = content;
    editingId = null;
  } else {
    posts.unshift({ id: Date.now(), title, content });
  }

  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}

function renderPosts() {
  const postList = document.getElementById("post-list");
  postList.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${marked.parse(post.content)}</p>
      <button onclick="editPost(${post.id})">Edit</button>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;
    postList.appendChild(div);
  });
}

function editPost(id) {
  const post = posts.find(p => p.id === id);
  document.getElementById("title").value = post.title;
  document.getElementById("content").value = post.content;
  editingId = id;
}

function deletePost(id) {
  posts = posts.filter(p => p.id !== id);
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}

function saveDraft() {
  const draft = {
    title: document.getElementById("title").value,
    content: document.getElementById("content").value
  };
  localStorage.setItem("draft", JSON.stringify(draft));
  alert("Draft Saved!");
}

function loadDraft() {
  const draft = JSON.parse(localStorage.getItem("draft"));
  if (draft) {
    document.getElementById("title").value = draft.title;
    document.getElementById("content").value = draft.content;
  }
}

// Load all on start
loadDraft();
renderPosts();
