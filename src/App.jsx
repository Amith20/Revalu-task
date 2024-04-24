import "./App.css";
import Card from "./components/card/card";
import NavBar from "./components/navbar/navbar";
import { IoIosArrowDown } from "react-icons/io";
import { CiFolderOn } from "react-icons/ci";
import { FiFolderPlus } from "react-icons/fi";

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        {/* side bar */}
        <div className="sideBar">
          <div className="sidebar-option">
            <div className="sidebar-header">
              <p>My collections</p>
              <span><IoIosArrowDown /></span>
            </div>
            <div className="collection-list">
              <ul>
                <li><span><CiFolderOn /></span>Collection 1</li>
                <li><span><CiFolderOn /></span>Collection 2</li>
                <li><span><CiFolderOn /></span>Collection 3</li>
                <li><span><CiFolderOn /></span>Collection 4</li>
              </ul>
              <hr />
              <p><span><FiFolderPlus /></span>New Collection</p>
            </div>
          </div>
        </div>

        {/* main */}
        <div className="main">
          <div>
            <div className="header">
              <h3>My Collections</h3>
              <p>
                Introducing collections: the ability to organise your materials
                your way
              </p>
            </div>
            <div className="result">
              <p>Showing 10 Results</p>
            </div>
            <hr />
          </div>
          <div>
            <Card />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
