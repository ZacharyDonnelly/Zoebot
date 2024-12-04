import { Stack } from "expo-router/stack";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="chat" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeLayout;
