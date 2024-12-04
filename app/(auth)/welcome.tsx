import BottomModal from "@/components/BottomModal";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
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
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/robot_splash.png")}
        style={styles.image}
        resizeMode="cover"
      >
        <BottomModal visible>
          <View style={styles.modalContent}>
            <Swiper
              width={width}
              ref={swiperRef}
              loop={false}
              dot={<View style={styles.inactiveDot} />}
              activeDot={<View style={styles.activeDot} />}
              onIndexChanged={(index) => setActiveIndex(index)}
            >
              <View style={styles.slide}>
                <Text style={styles.header}>Your Personal AI Assistant</Text>
                <Text style={styles.subHeader}>
                  Whether you're seeking information, guidance, or just a
                  friendly chat, Zoebot is here to lend you a hand.
                </Text>
              </View>
              <View style={styles.slide}>
                <Text style={styles.header}>Simple, Smart, Seamless</Text>
                <Text style={styles.subHeader}>
                  Zoebot is equipped with the knowledge and skills to assist you
                  in various aspects of your life.
                </Text>
              </View>
              <View style={styles.slide}>
                <Text style={styles.thirdSliderHeader}>Tailored Just</Text>
                <Text style={styles.thirdSliderHeader}>For You</Text>
                <Text style={styles.subHeader}>
                  Zoebot adapts to your needs and makes it uniquely yours for a
                  truly personalized experience.
                </Text>
              </View>
            </Swiper>
          </View>
          <View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setActiveIndex(activeIndex + 1);
                swiperRef.current?.scrollBy(1);
              }}
            >
              <Text style={styles.closeButtonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => router.replace("/(auth)/sign-in")}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </BottomModal>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: 300,
  },
  thirdSliderHeader: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: 300,
  },
  subHeader: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 300,
    marginTop: 12,
  },
  image: {
    flex: 1,
    width: "100%",
    height: 475,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "center",
    width: 303,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#6938EF",
    borderRadius: 12,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
  activeDot: {
    width: 32,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#7A5AF8",
  },
  inactiveDot: {
    borderRadius: 12,
    backgroundColor: "#EAECF0",
    height: 12,
    width: 12,
    marginHorizontal: 6,
  },
  signInButton: {
    marginTop: 12,
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
    color: "#6938EF",
  },
});

export default Welcome;
