import WelcomeModal from "@/components/modal/WelcomeModal";
import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const Welcome = () => {
  const { width, height } = Dimensions.get("window");
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const imageMap: { [key: number]: any } = {
    0: require("../../assets/images/welcome/welcomeScreen-one.png"),
    1: require("../../assets/images/welcome/welcomeScreen-two.png"),
    2: require("../../assets/images/welcome/welcomeScreen-three.png"),
  };

  const imageSource = useMemo(() => imageMap[activeIndex], [activeIndex]);

  const getSubHeaderFontSize = (): string =>
    height > 855 ? "text-xl" : "text-base";

  return (
    <View className="flex-1">
      <View className="flex-1">
        <Image
          alt="Zoebot welcome screen image"
          source={imageSource}
          style={{ width: width, height: "55%" }}
          resizeMode="cover"
        />
        <WelcomeModal visible>
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
                <Text className="text-4xl font-bold text-center max-w-[300px] mb-1 text-[#101828]">
                  Your Personal AI Assistant
                </Text>
                <Text
                  className={`${getSubHeaderFontSize()} max-w-[280px] text-center mt-3 text-[#101828]`}
                >
                  Whether you're seeking information, guidance, or just a
                  friendly chat, Zoebot is here to lend you a hand.
                </Text>
              </View>
              <View className="flex-1 items-center py-0 px-5">
                <Text className="text-4xl font-bold text-center max-w-[280px] mb-1 text-[#101828]">
                  Simple, Smart, Seamless
                </Text>
                <Text
                  className={`${getSubHeaderFontSize()} text-center max-w-[254px] mt-3 text-[#101828]`}
                >
                  Zoebot is equipped with the knowledge and skills to assist you
                  in various aspects of your life.
                </Text>
              </View>
              <View className="flex-1 items-center py-0 px-5">
                <Text className="text-4xl font-bold items-center max-w-[300px] mb-1 text-[#101828]">
                  Tailored Just
                </Text>
                <Text className="text-4xl font-bold items-center max-w-[300px]">
                  For You
                </Text>
                <Text
                  className={`${getSubHeaderFontSize()} text-center max-w-[250px] mt-3 text-[#101828]`}
                >
                  Zoebot adapts to your needs and makes it uniquely yours for a
                  truly personalized experience.
                </Text>
              </View>
            </Swiper>
          </View>
          <TouchableOpacity
            className="w-[303px] h-14 justify-center items-center self-center bg-[#6938EF] rounded-xl mt-7"
            onPress={() => {
              if (activeIndex >= 2) {
                router.replace("/(auth)/sign-up");
                return;
              }
              setActiveIndex(activeIndex + 1);

              Image.prefetch(imageMap[activeIndex]);

              swiperRef.current?.scrollBy(1);
            }}
          >
            <Text className="text-white text-lg font-bold">
              {activeIndex >= 2 ? "Let's begin" : "Next"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-3 self-center bg-transparent"
            onPress={() => router.replace("/(auth)/sign-in")}
          >
            <Text className="text-base font-semibold text-[#6938EF]">
              Sign In
            </Text>
          </TouchableOpacity>
        </WelcomeModal>
      </View>
    </View>
  );
};

export default Welcome;
