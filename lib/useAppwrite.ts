import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const useAppwrite = <T>(fn: () => Promise<T>) => {
  const [data, setData] = useState<T>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const posts = await fn();
      setData(posts);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => await fetchData();

  return {
    data,
    isLoading,
    refetch,
  };
};

export default useAppwrite;
