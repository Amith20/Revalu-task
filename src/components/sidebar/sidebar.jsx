import { useState, useCallback } from "react";
import "./sidebar.css";
import { IoIosArrowDown } from "react-icons/io";
import { CiFolderOn } from "react-icons/ci";
import { FiFolderPlus } from "react-icons/fi";

function Sidebar({ collections, selectedCollection, onCollectionSelect, onAddCollection }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCollection, setNewCollection] = useState({ name: "", description: "" });

  const handleToggle = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleCollectionClick = useCallback((collection) => {
    onCollectionSelect(collection);
  }, [onCollectionSelect]);

  const handleAddClick = useCallback(() => {
    setShowAddForm(true);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (newCollection.name.trim() && newCollection.description.trim()) {
      onAddCollection(newCollection);
      setNewCollection({ name: "", description: "" });
      setShowAddForm(false);
    }
  }, [newCollection, onAddCollection]);

  const handleCancel = useCallback(() => {
    setShowAddForm(false);
    setNewCollection({ name: "", description: "" });
  }, []);

  const handleKeyDown = useCallback((e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }, []);

  return (
    <div className="sidebar-option">
      <div 
        className="sidebar-header"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label="Toggle collections list"
        onClick={handleToggle}
        onKeyDown={(e) => handleKeyDown(e, handleToggle)}
      >
        <p>My collections</p>
        <span className={`arrow ${isExpanded ? 'expanded' : ''}`}>
          <IoIosArrowDown />
        </span>
      </div>
      
      {isExpanded && (
        <div className="collection-list">
          <ul role="list">
            {collections?.map((collection) => (
              <li 
                key={collection.id}
                role="listitem"
                className={selectedCollection?.id === collection.id ? 'selected' : ''}
                onClick={() => handleCollectionClick(collection)}
                onKeyDown={(e) => handleKeyDown(e, () => handleCollectionClick(collection))}
                tabIndex={0}
                aria-label={`Select ${collection.name} collection`}
              >
                <span className="folder-icon" aria-hidden="true">
                  <CiFolderOn />
                </span>
                <span className="collection-name">{collection.name}</span>
                <span className="collection-count" aria-label={`${collection.count} items`}>
                  {collection.count}
                </span>
              </li>
            ))}
          </ul>
          
          <hr />
          
          {showAddForm ? (
            <form onSubmit={handleSubmit} className="add-collection-form">
              <input
                type="text"
                placeholder="Collection name"
                value={newCollection.name}
                onChange={(e) => setNewCollection(prev => ({ ...prev, name: e.target.value }))}
                maxLength={40}
                required
              />
              <textarea
                placeholder="Collection description"
                value={newCollection.description}
                onChange={(e) => setNewCollection(prev => ({ ...prev, description: e.target.value }))}
                maxLength={140}
                required
              />
              <div className="form-actions">
                <button type="button" onClick={handleCancel} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          ) : (
            <button
              className="add-collection-btn"
              onClick={handleAddClick}
              onKeyDown={(e) => handleKeyDown(e, handleAddClick)}
            >
              <span className="add-icon" aria-hidden="true">
                <FiFolderPlus />
              </span>
              New Collection
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar; 