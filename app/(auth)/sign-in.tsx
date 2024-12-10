import CustomTextInput from "@/components/custom/TextInput"
import RadialGradientBackground from "@/components/gradient/RadialGradientBackground"
import SignUpModal from "@/components/modal/SignUpModal"
import { useSignIn } from "@clerk/clerk-expo"
import { useRouter } from "expo-router"
import React from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

const SignInScreen = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState("")
  const [password, setPassword] = React.useState("")

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace("/")
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

  return (
    <RadialGradientBackground style={{ flex: 1 }}>
      <View className='flex-1'>
        <SignUpModal visible>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}>
            <View className='flex-1 max-h-[125px] items-start py-0 px-5'>
              <Text className='text-3xl font-bold text-left max-w-[300px] text-[#101828]'>
                Welcome back!
              </Text>
              <Text className='max-w-[280px] text-left mt-3 text-[#101828] text-lg'>
                Please enter your email address and password to create an
                account.
              </Text>
            </View>
            <View className='gap-y-6'>
              <CustomTextInput
                autoCapitalize='none'
                value={emailAddress}
                placeholder='john@yourdomain.com'
                labelText='Email'
                onChangeText={(email) => setEmailAddress(email)}
              />
              <CustomTextInput
                value={password}
                placeholder='Password...'
                secureTextEntry={true}
                labelText='Enter password'
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <View className='flex-0 items-center'>
              <TouchableOpacity
                disabled={!emailAddress || !password}
                style={{
                  backgroundColor:
                    !emailAddress || !password ? "#D9D6FE" : "#6938EF",
                }}
                className='w-[303px] h-14 justify-center items-center self-center rounded-2xl mt-20'
                onPress={onSignInPress}>
                <Text className='text-white text-lg font-bold'>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity className='mt-2'>
                <Text className='font-bold text-lg color-[#6938EF]'>
                  Forgot password?
                </Text>
              </TouchableOpacity>
              <Text className='mt-32 text-md text-[#667085]'>
                Don't have an account?
              </Text>
              <TouchableOpacity
                className='items-center self-center bg-transparent'
                onPress={() => router.replace("/(auth)/sign-up")}>
                <Text className='mt-1 text-base font-semibold text-[#6938EF]'>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SignUpModal>
      </View>
    </RadialGradientBackground>
  )
}

export default SignInScreen
