import { useState, useEffect } from 'react';
import { Category } from '../types/category';
import { fetchCategories } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialCategory, setInitialCategory] = useState<string>('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        // Set initial category as the first one
        if (data.length > 0) {
          setInitialCategory(data[0].insert_language);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error, initialCategory };
};