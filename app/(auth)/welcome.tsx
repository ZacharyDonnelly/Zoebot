import BottomModal from "@/components/BottomModal";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";

const Welcome = () => {
  const { width } = Dimensions.get("window");
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/images/robot_splash.png")}
        className="flex-1 w-full h-[475px] justify-center items-center"
        resizeMode="cover"
      >
        <BottomModal visible>
          <View
            className="flex-1 items-center 
          bg-[rgba(255, 255, 255, 0.9)]"
          >
            <Swiper
              width={width}
              ref={swiperRef}
              loop={false}
              dot={
                <View className="rounded-xl bg-[#EAECF0] h-3 w-3 mx-[6px]" />
              }
              activeDot={<View className="w-8 h-3 rounded-xl bg-[#7A5AF8]" />}
              onIndexChanged={(index) => setActiveIndex(index)}
            >
              <View className="flex-1 items-center py-0 px-5">
                <Text className="text-3xl font-bold text-center max-w-[300px]">
                  Your Personal AI Assistant
                </Text>
                <Text className="text-base text-center max-w-[300px] mt-3">
                  Whether you're seeking information, guidance, or just a
                  friendly chat, Zoebot is here to lend you a hand.
                </Text>
              </View>
              <View className="flex-1 items-center py-0 px-5">
                <Text className="text-3xl font-bold text-center max-w-[300px]">
                  Simple, Smart, Seamless
                </Text>
                <Text className="text-base text-center max-w-[300px] mt-3">
                  Zoebot is equipped with the knowledge and skills to assist you
                  in various aspects of your life.
                </Text>
              </View>
              <View className="flex-1 items-center py-0 px-5">
                <Text className="text-3xl font-bold items-center max-w-[300px]">
                  Tailored Just
                </Text>
                <Text className="text-3xl font-bold items-center max-w-[300px]">
                  For You
                </Text>
                <Text className="text-base text-center max-w-[300px] mt-3">
                  Zoebot adapts to your needs and makes it uniquely yours for a
                  truly personalized experience.
                </Text>
              </View>
            </Swiper>
          </View>
          <View>
            <TouchableOpacity
              className="w-[303px] h-14 justify-center items-center bg-[#6938EF] rounded-xl mt-4"
              onPress={() => {
                setActiveIndex(activeIndex + 1);
                swiperRef.current?.scrollBy(1);
              }}
            >
              <Text className="text-white text-base">Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-3 self-center bg-transparent"
              onPress={() => router.replace("/(auth)/sign-in")}
            >
              <Text className="text-base font-medium text-[#6938EF]">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </BottomModal>
      </ImageBackground>
    </View>
  );
};

export default Welcome;
