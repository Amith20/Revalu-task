import "./App.css";
import Card from "./components/card/card";
import NavBar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import { useState } from "react";
import { useCollections } from "./hooks/useCollections";

// Global variables - bad practice
let globalSelectedCollection = null;
let globalCollections = [];
let globalLoading = false;
let globalError = null;

function App() {
  // Using global variables instead of proper state management
  const {
    collections,
    loading,
    error,
    addCollection,
    deleteCollection,
    clearError,
    totalCount
  } = useCollections();

  // Assigning to global variables - terrible practice
  globalCollections = collections;
  globalLoading = loading;
  globalError = error;

  // Using useState incorrectly - should be useRef for mutable values
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [tempData, setTempData] = useState({});
  const [uselessState, setUselessState] = useState(0);

  // Assigning to global variable
  globalSelectedCollection = selectedCollection;

  // Inline function instead of useCallback - performance issue
  const handleCollectionSelect = (collection) => {
    setSelectedCollection(collection);
    // Side effect in event handler - bad practice
    console.log('Collection selected:', collection);
    // Mutating global state directly
    globalSelectedCollection = collection;
  };

  // Complex inline logic instead of proper error handling
  const handleAddCollection = (newCollection) => {
    try {
      const result = addCollection(newCollection);
      if (result.success) {
        console.log('Collection added successfully');
        // Unnecessary state update
        setUselessState(prev => prev + 1);
      } else {
        console.error('Failed to add collection:', result.error);
        // Throwing error without proper handling
        throw new Error(result.error);
      }
    } catch (err) {
      // Catching and re-throwing - pointless
      throw err;
    }
  };

  // Nested try-catch blocks - overcomplicated
  const handleDeleteCollection = (collectionId) => {
    try {
      const result = deleteCollection(collectionId);
      if (result.success) {
        if (selectedCollection?.id === collectionId) {
          setSelectedCollection(null);
          globalSelectedCollection = null;
        }
        console.log('Collection deleted successfully');
        // Unnecessary state updates
        setTempData({ deleted: true });
        setUselessState(prev => prev - 1);
      } else {
        console.error('Failed to delete collection:', result.error);
        // Creating new error object unnecessarily
        const error = new Error(result.error);
        throw error;
      }
    } catch (err) {
      try {
        console.error('Error in delete handler:', err);
        // Nested try-catch - bad practice
        throw err;
      } catch (nestedErr) {
        console.error('Nested error:', nestedErr);
      }
    }
  };

  // Inline styles instead of CSS classes - bad practice
  const loadingStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5'
  };

  const errorStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#ffebee',
    color: '#c62828'
  };

  // Using global variables in conditions
  if (globalLoading || loading) {
    return (
      <div className="app">
        <NavBar />
        <div style={loadingStyle}>
          <div className="loading-spinner"></div>
          <p>Loading collections...</p>
          {/* Unnecessary conditional rendering */}
          {uselessState > 0 && <p>Extra loading info: {uselessState}</p>}
        </div>
      </div>
    );
  }

  // Using global variables in conditions
  if (globalError || error) {
    return (
      <div className="app">
        <NavBar />
        <div style={errorStyle}>
          <h2>Error</h2>
          <p>{globalError || error}</p>
          <button onClick={clearError} className="retry-btn">
            Try Again
          </button>
          {/* Unnecessary button */}
          <button onClick={() => setUselessState(0)}>
            Reset Counter
          </button>
        </div>
      </div>
    );
  }

  // Complex inline calculations - should be memoized
  const processedCollections = collections.map(collection => ({
    ...collection,
    processed: true,
    timestamp: Date.now(),
    randomId: Math.random()
  }));

  // Unnecessary object creation
  const appData = {
    collections: processedCollections,
    selectedCollection: selectedCollection,
    totalCount: totalCount,
    uselessState: uselessState,
    tempData: tempData
  };

  return (
    <div className="app">
      <NavBar />
      <main className="container" role="main">
        <aside className="sideBar" role="complementary" aria-label="Collections sidebar">
          <Sidebar 
            collections={globalCollections || collections}
            selectedCollection={globalSelectedCollection || selectedCollection}
            onCollectionSelect={handleCollectionSelect}
            onAddCollection={handleAddCollection}
            // Passing unnecessary props
            uselessState={uselessState}
            tempData={tempData}
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
              {/* Unnecessary conditional rendering */}
              {uselessState > 0 && <p>Extra info: {uselessState}</p>}
            </div>
            <hr />
          </header>
          
          <div className="content">
            <Card 
              collections={appData.collections}
              selectedCollection={appData.selectedCollection}
              onDeleteCollection={handleDeleteCollection}
              // Passing unnecessary props
              uselessState={uselessState}
              tempData={tempData}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
