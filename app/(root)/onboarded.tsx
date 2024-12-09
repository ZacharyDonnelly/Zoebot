// create a simple post auth page

import { useClerk } from '@clerk/clerk-expo'
import { useUser } from '@clerk/clerk-react'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const PostAuthPage = () => {
  const { signOut } = useClerk()
  const user = useUser()
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-4">
      <View className="flex-1 w-full">
        <Text className="text-2xl font-bold text-center">
          Welcome, {user.user?.firstName}
        </Text>
        <TouchableOpacity
          className="w-[303px] h-14 justify-center items-center self-center bg-[#6938EF] rounded-xl mt-7"
          onPress={() => {
            signOut().then(() => router.replace('/'))
          }}>
          <Text className="text-white text-lg font-bold">Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PostAuthPage
