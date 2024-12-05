import CustomTextInput from "@/components/custom/TextInput";
import RadialGradientBackground from "@/components/gradient/RadialGradientBackground";
import SignUpModal from "@/components/modal/SignUpModal";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const SignUpScreen = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <RadialGradientBackground style={{ flex: 1 }}>
      <View className="flex-1">
        {!pendingVerification ? (
          <SignUpModal visible>
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              }}
            >
              <View className="flex-1 items-start py-0 px-5">
                <Text className="text-3xl font-bold text-left max-w-[300px] text-[#101828]">
                  Welcome to Zoebot!
                </Text>
                <Text className="max-w-[280px] text-left mt-3 text-[#101828] text-lg">
                  Please enter your email address and password to create an
                  account.
                </Text>
              </View>
              <View className="gap-y-5">
                <CustomTextInput
                  autoCapitalize="none"
                  value={firstName}
                  placeholder="Enter name"
                  labelText="Name"
                  onChangeText={(firstName) => setFirstName(firstName)}
                />
                <CustomTextInput
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="john@yourdomain.com"
                  labelText="Email"
                  onChangeText={(email) => setEmailAddress(email)}
                />
                <CustomTextInput
                  value={password}
                  placeholder="Password..."
                  secureTextEntry={true}
                  labelText="Enter password"
                  onChangeText={(password) => setPassword(password)}
                />
              </View>
              <View className="flex-0 items-center">
                <TouchableOpacity
                  disabled={!emailAddress || !password}
                  style={{
                    backgroundColor:
                      !emailAddress || !password ? "#D9D6FE" : "#6938EF",
                  }}
                  className="w-[303px] h-14 justify-center items-center self-center rounded-2xl mt-20"
                  onPress={onSignUpPress}
                >
                  <Text className="text-white text-lg font-bold">Sign up</Text>
                </TouchableOpacity>
                <Text className="mt-4 text-md text-[#667085]">
                  Already have an account?
                </Text>
                <TouchableOpacity
                  className="items-center self-center bg-transparent"
                  onPress={() => router.replace("/(root)/chat")}
                >
                  <Text className="mt-1 text-base font-semibold text-[#6938EF]">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SignUpModal>
        ) : (
          <SignUpModal height={375} visible>
            <View className="flex-1 items-center gap-y-5 bg-[rgba(255, 255, 255, 0.9)]">
              <View className="flex-1 items-center py-0 px-5">
                <Text className="text-3xl font-bold text-center max-w-[300px] text-[#101828]">
                  Verify Your Email
                </Text>
                <Text className="max-w-[280px] text-center mt-3 text-[#101828] text-lg">
                  Please enter the verification code sent to your email address.
                </Text>
              </View>
              <CustomTextInput
                labelText="Verification Code"
                placeholder="Enter the code"
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
                className="w-full, p-2.5, border-1, border-[#D0D5DD], rounded-xl"
                style={{
                  width: "100%",
                  padding: 10,
                  borderColor: "#D0D5DD",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              />
              <TouchableOpacity
                disabled={!code}
                style={{
                  backgroundColor: !code ? "#D9D6FE" : "#6938EF",
                  width: 303,
                  height: 56,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                  marginTop: 28,
                }}
                onPress={onPressVerify}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "600" }}
                >
                  Verify
                </Text>
              </TouchableOpacity>
            </View>
          </SignUpModal>
        )}
      </View>
    </RadialGradientBackground>
  );
};

export default SignUpScreen;
