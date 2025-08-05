import "./App.css";
import Card from "./components/card/card";
import NavBar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import { useState, useCallback } from "react";
import { useCollections } from "./hooks/useCollections";

function App() {
  const {
    collections,
    loading,
    error,
    addCollection,
    deleteCollection,
    clearError,
    totalCount
  } = useCollections();

  const [selectedCollection, setSelectedCollection] = useState(null);

  const handleCollectionSelect = useCallback((collection) => {
    setSelectedCollection(collection);
  }, []);

  const handleAddCollection = useCallback((newCollection) => {
    const result = addCollection(newCollection);
    if (result.success) {
      // Could show a success toast here
      console.log('Collection added successfully');
    } else {
      // Could show an error toast here
      console.error('Failed to add collection:', result.error);
    }
  }, [addCollection]);

  const handleDeleteCollection = useCallback((collectionId) => {
    const result = deleteCollection(collectionId);
    if (result.success) {
      if (selectedCollection?.id === collectionId) {
        setSelectedCollection(null);
      }
      // Could show a success toast here
      console.log('Collection deleted successfully');
    } else {
      // Could show an error toast here
      console.error('Failed to delete collection:', result.error);
    }
  }, [deleteCollection, selectedCollection]);

  if (loading) {
    return (
      <div className="app">
        <NavBar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading collections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <NavBar />
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={clearError} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <NavBar />
      <main className="container" role="main">
        <aside className="sideBar" role="complementary" aria-label="Collections sidebar">
          <Sidebar 
            collections={collections}
            selectedCollection={selectedCollection}
            onCollectionSelect={handleCollectionSelect}
            onAddCollection={handleAddCollection}
          />
        </aside>

        <section className="main" role="region" aria-label="Collections content">
          <header className="header">
            <h1 className="main-title">My Collections</h1>
            <p className="main-description">
              Introducing collections: the ability to organise your materials
              your way
            </p>
            <div className="result">
              <p>Showing {totalCount} Results</p>
            </div>
            <hr />
          </header>
          
          <div className="content">
            <Card 
              collections={collections}
              selectedCollection={selectedCollection}
              onDeleteCollection={handleDeleteCollection}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
