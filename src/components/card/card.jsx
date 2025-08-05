import { useState, useCallback, useMemo } from "react";
import "./card.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuDownloadCloud } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";

function Card({ collections = [], selectedCollection, onDeleteCollection }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);
  const [newCollection, setNewCollection] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});

  const filteredCollections = useMemo(() => {
    if (selectedCollection) {
      return collections.filter(collection => collection.id === selectedCollection.id);
    }
    return collections;
  }, [collections, selectedCollection]);

  const handleAddClick = useCallback(() => {
    setShowAddModal(true);
    setErrors({});
  }, []);

  const handleDeleteClick = useCallback((collection) => {
    setCollectionToDelete(collection);
    setShowDeleteModal(true);
  }, []);

  const handleCloseModals = useCallback(() => {
    setShowAddModal(false);
    setShowDeleteModal(false);
    setCollectionToDelete(null);
    setNewCollection({ name: "", description: "" });
    setErrors({});
  }, []);

  const validateForm = useCallback((data) => {
    const newErrors = {};
    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    } else if (data.name.length > 40) {
      newErrors.name = "Name must be 40 characters or less";
    }
    
    if (!data.description.trim()) {
      newErrors.description = "Description is required";
    } else if (data.description.length > 140) {
      newErrors.description = "Description must be 140 characters or less";
    }
    
    return newErrors;
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const validationErrors = validateForm(newCollection);
    
    if (Object.keys(validationErrors).length === 0) {
      // Here you would typically call a prop function to add the collection
      // For now, we'll just close the modal
      handleCloseModals();
    } else {
      setErrors(validationErrors);
    }
  }, [newCollection, validateForm, handleCloseModals]);

  const handleDeleteConfirm = useCallback(() => {
    if (collectionToDelete) {
      onDeleteCollection(collectionToDelete.id);
      handleCloseModals();
    }
  }, [collectionToDelete, onDeleteCollection, handleCloseModals]);

  const handleKeyDown = useCallback((e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setNewCollection(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  if (filteredCollections.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <FiPlus />
        </div>
        <h3>No collections yet</h3>
        <p>Create your first collection to get started</p>
        <button 
          className="create-first-btn"
          onClick={handleAddClick}
          aria-label="Create your first collection"
        >
          Create Collection
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="card-container" role="grid" aria-label="Collections grid">
        {filteredCollections.map((collection) => (
          <div 
            key={collection.id}
            className="card"
            role="gridcell"
            aria-label={`${collection.name} collection with ${collection.count} items`}
          >
            <div className="card-header">
              <button 
                className="download-data"
                onClick={() => console.log(`Download ${collection.name}`)}
                aria-label={`Download data for ${collection.name}`}
              >
                <LuDownloadCloud />
                <span>Download Data</span>
              </button>
              <div className="card-header-icons">
                <span className="item-count" aria-label={`${collection.count} items`}>
                  {collection.count}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(collection)}
                  onKeyDown={(e) => handleKeyDown(e, () => handleDeleteClick(collection))}
                  aria-label={`Delete ${collection.name} collection`}
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
            <div className="card-info">
              <h3 className="card-title">{collection.name}</h3>
              <p className="card-desc">{collection.description}</p>
            </div>
          </div>
        ))}
        
        <div className="card add-card">
          <button 
            className="add-card-btn"
            onClick={handleAddClick}
            onKeyDown={(e) => handleKeyDown(e, handleAddClick)}
            aria-label="Add new collection"
          >
            <div className="add-icon">
              <FiPlus />
            </div>
            <span>Add Collection</span>
          </button>
        </div>
      </div>

      {/* Add Collection Modal */}
      {showAddModal && (
        <div className="modal-overlay" role="dialog" aria-labelledby="add-modal-title">
          <div className="modal-content add-modal">
            <h2 id="add-modal-title">New Collection</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="collection-name">
                  Name <span className="required">*</span>
                </label>
                <input
                  id="collection-name"
                  type="text"
                  placeholder="Collection Title"
                  value={newCollection.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  maxLength={40}
                  aria-describedby={errors.name ? 'name-error' : 'name-count'}
                  aria-invalid={!!errors.name}
                />
                {errors.name ? (
                  <span id="name-error" className="error-message">{errors.name}</span>
                ) : (
                  <span id="name-count" className="char-count">
                    {newCollection.name.length}/40
                  </span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="collection-description">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  id="collection-description"
                  placeholder="Collection description"
                  value={newCollection.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  maxLength={140}
                  aria-describedby={errors.description ? 'description-error' : 'description-count'}
                  aria-invalid={!!errors.description}
                />
                {errors.description ? (
                  <span id="description-error" className="error-message">{errors.description}</span>
                ) : (
                  <span id="description-count" className="char-count">
                    {newCollection.description.length}/140
                  </span>
                )}
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={handleCloseModals} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="create-btn">
                  Create Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" role="dialog" aria-labelledby="delete-modal-title">
          <div className="modal-content delete-modal">
            <h2 id="delete-modal-title">Delete Collection</h2>
            <p>
              Are you sure you would like to delete "{collectionToDelete?.name}"? 
              <br />
              You won't be able to undo this action.
            </p>
            <div className="modal-actions">
              <button onClick={handleCloseModals} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
