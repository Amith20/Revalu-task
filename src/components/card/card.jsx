import { useState } from "react";
import "./card.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuDownloadCloud } from "react-icons/lu";

function Card() {
  const [data, setData] = useState([
    {
      name: "Collection 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nam dignissimos unde voluptates ut voluptate voluptatem, sed quia iste magnam dicta possimus autem, nihil alias.",
    },
    {
      name: "Collection 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nam dignissimos unde voluptates ut voluptate voluptatem, sed quia iste magnam dicta possimus autem, nihil alias.",
    },
    {
      name: "Collection 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nam dignissimos unde voluptates ut voluptate voluptatem, sed quia iste magnam dicta possimus autem, nihil alias.",
    },
    {
      name: "Collection 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nam dignissimos unde voluptates ut voluptate voluptatem, sed quia iste magnam dicta possimus autem, nihil alias.",
    },
    {
      name: "Collection 5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nam dignissimos unde voluptates ut voluptate voluptatem, sed quia iste magnam dicta possimus autem, nihil alias.",
    },
  ]);

  const [addPopUp, setAddPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [index , setIndex] = useState(-1);

  const [collection, setCollection] = useState({
    name: "",
    description: "",
  });

  const addPopupToggle = () => {
    setAddPopUp(!addPopUp);
  };

  const deletePopUpToggle = (i) => {
    setDeletePopUp(!deletePopUp);
    if(index == -1){
      setIndex(i);
    } else {
      setIndex(-1)
    }
  };

  const addCollection = () => {
    if (collection.name == "" && collection.description == "") {
      alert("Add Correct data");
    } else {
      setData([...data, collection]);
      setAddPopUp(false);
      setCollection({name:'',description:''});
    }
  };

  const deleteCollection = () => {
   setData(data.filter((_ , i) => i !== index))
    setDeletePopUp(false);
    setIndex(-1);
  };
  return (
    <>
      <div className="card-container">
        {data.map((collec, i) => {
          return (
              <div className="card" key={i}>
                <div className="card-header">
                  <p className="download-data">Download Data <span className="d-flex"><LuDownloadCloud /></span></p>
                  <div className="card-header-icons d-flex">
                    <span>87</span>
                    <span onClick={() => deletePopUpToggle(i)} id="delete-icon"><RiDeleteBin6Line /></span>
                  </div>
                </div>
                <div className="card-info">
                  <p className="card-title">{collec.name}</p>
                  <span className="card-desc">{collec.description}</span>
                </div>
              </div>
          );
        })}
        <div className=" card add-card">
          <div className="add-icon" onClick={() => addPopupToggle()}>
            <span>+</span>
          </div>
        </div>
      </div>
      {addPopUp && (
        <div className="popup">
          <div className="popup-content add-popup">
            <h4>New Collection</h4>
            <div className="form-element">
              <p>Name<span>*</span></p>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Collection Title"
                value={collection.name}
                onChange={(e) => {
                  setCollection({ ...collection, name: e.target.value });
                }}
              />
              <span className="letter-count">{collection.name.length}/40</span>
            </div>
            <div className="form-element">
              <p>Description<span>*</span></p>
              <input
                type="text"
                name="description"
                id="description"
                value={collection.description}
                onChange={(e) => {
                  setCollection({ ...collection, description: e.target.value });
                }}
              />
              <span className="letter-count">{collection.description.length}/ 140</span>
            </div>
            <div className="add-btn-grp">
              <button onClick={() => addPopupToggle()}>Close</button>
              <button onClick={() => addCollection()}>Create Collection</button>
            </div>
          </div>
        </div>
      )}

      {deletePopUp && (
        <div className="popup">
          <div className="popup-content delete-popup">
            <h4>Delete Collection</h4>
            <p>Are you sure you would like to delete this collection? <br />You won&#39;t be able to undo this.</p>
            <div className="delete-btn-grp">
              <button onClick={() => deleteCollection()}>Delete</button>
              <button onClick={() => deletePopUpToggle()}>Close</button>
            </div>
          </div>
        </div>
      )}
      {(addPopUp || deletePopUp) && <div className="blur-background" />}
    </>
  );
}

export default Card;
