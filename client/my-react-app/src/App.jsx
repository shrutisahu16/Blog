
import './App.css';
import LoginPage from './assets/pages/LoginPage';
import Register from './assets/pages/Register.jsx';
// import IndexPage from './assets/pages/indexPage';
// import Header from './header';
import Post from './post.jsx';
import {Routes,Route} from "react-router-dom";
function App() {
  

  return (
    <Routes>
      {/* <Route path="/" elemnet={<Layout />}> */}
      {/* <Route index element={<IndexPage /> } /> */}
      <Route index element={<Post/> } />
      
      <Route path="/login" element={<LoginPage /> }/>
       <Route path="/register"element={<Register/>}/>
      
    </Routes>
  );
}

export default App;
