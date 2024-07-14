import { Card, EmptyState, Form, Trending } from '@/components';
import { images } from '@/constants';
import { AppWrite } from '@/lib';
import { DocumentType } from '@/lib/type';
import useAppwrite from '@/lib/useAppwrite';
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, data, refetch } = useAppwrite(AppWrite.getAllPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary border-2 h-full ">
      {refreshing && (
        <ActivityIndicator className="absolute w-full h-full -top-200" />
      )}
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Card.VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between flex-row mb-6">
              <View>
                <Text className="font-medium text-sm text-gray-100">
                  Welcome back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Rakshith
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <Form.SearchInput placeholder="Search for a video topic" />
            <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the fist one to create video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
