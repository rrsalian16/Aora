import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants';
import { CustomButton, Form } from '@/components';
import { AppWrite } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignUp = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const handleSubmit = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    try {
      setIsSubmitting(true);
      const resp = await AppWrite.createUser(form);
      setUser(resp);
      setIsLoggedIn(true);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center  min-h-[75vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up to Aora
          </Text>
          <Form.Input
            title="Username"
            value={form.username}
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, username: value }))
            }
            otherStyle="mt-7"
          />
          <Form.Input
            title="Email"
            value={form.email}
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, email: value }))
            }
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          <Form.Input
            title="Password"
            value={form.password}
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, password: value }))
            }
            otherStyle="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={handleSubmit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
