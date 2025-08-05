import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'collections_data';

export const useCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load collections from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCollections(parsed);
      } else {
        // Initialize with default collections
        const defaultCollections = [
          { id: 1, name: "Collection 1", description: "First collection", count: 87 },
          { id: 2, name: "Collection 2", description: "Second collection", count: 45 },
          { id: 3, name: "Collection 3", description: "Third collection", count: 23 },
          { id: 4, name: "Collection 4", description: "Fourth collection", count: 12 },
        ];
        setCollections(defaultCollections);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCollections));
      }
    } catch (err) {
      setError('Failed to load collections');
      console.error('Error loading collections:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save to localStorage whenever collections change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
      } catch (err) {
        console.error('Error saving collections:', err);
      }
    }
  }, [collections, loading]);

  const addCollection = useCallback((newCollection) => {
    try {
      const collectionWithId = {
        ...newCollection,
        id: Date.now(),
        count: 0
      };
      setCollections(prev => [...prev, collectionWithId]);
      return { success: true, collection: collectionWithId };
    } catch (err) {
      setError('Failed to add collection');
      return { success: false, error: err.message };
    }
  }, []);

  const deleteCollection = useCallback((collectionId) => {
    try {
      setCollections(prev => prev.filter(collection => collection.id !== collectionId));
      return { success: true };
    } catch (err) {
      setError('Failed to delete collection');
      return { success: false, error: err.message };
    }
  }, []);

  const updateCollection = useCallback((collectionId, updates) => {
    try {
      setCollections(prev => 
        prev.map(collection => 
          collection.id === collectionId 
            ? { ...collection, ...updates }
            : collection
        )
      );
      return { success: true };
    } catch (err) {
      setError('Failed to update collection');
      return { success: false, error: err.message };
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetCollections = useCallback(() => {
    try {
      const defaultCollections = [
        { id: 1, name: "Collection 1", description: "First collection", count: 87 },
        { id: 2, name: "Collection 2", description: "Second collection", count: 45 },
        { id: 3, name: "Collection 3", description: "Third collection", count: 23 },
        { id: 4, name: "Collection 4", description: "Fourth collection", count: 12 },
      ];
      setCollections(defaultCollections);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCollections));
      return { success: true };
    } catch (err) {
      setError('Failed to reset collections');
      return { success: false, error: err.message };
    }
  }, []);

  return {
    collections,
    loading,
    error,
    addCollection,
    deleteCollection,
    updateCollection,
    clearError,
    resetCollections,
    totalCount: collections.length
  };
}; 