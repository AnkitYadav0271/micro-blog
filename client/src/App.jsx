import "./App.css";
import { BlogPost } from "./components/BlogPost";
import { GetPost } from "./components/getPost";

function App() {
  return (
    <div className="container">
      <BlogPost />
      <h1>All of the posts are here :</h1>
      <GetPost />
    </div>
  );
}

export default App;
