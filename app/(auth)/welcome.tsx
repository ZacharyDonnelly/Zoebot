import BottomModal from "@/components/BottomModal";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";

const Welcome = () => {
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
          <Swiper
            ref={swiperRef}
            loop={false}
            dot={<View style={styles.inactiveDot} />}
            activeDot={<View style={styles.activeDot} />}
            onIndexChanged={(index) => setActiveIndex(index)}
          >
            <View style={styles.wrapper}>
              <Text style={styles.header}>Your Personal AI Assistant</Text>
              <Text style={styles.subHeader}>
                Whether you're seeking information, guidance, or just a friendly
                chat, Zoebot is here to lend you a hand.
              </Text>
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Simple, Smart, Seamless</Text>
              <Text style={styles.subHeader}>
                Zoebot is equipped with the knowledge and skills to assist you
                in various aspects of your life.
              </Text>
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Tailored Just For You</Text>
              <Text style={styles.subHeader}>
                Zoebot adapts to your needs and makes it uniquely yours for a
                truly personalized experience.
              </Text>
            </View>
          </Swiper>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.replace("/(auth)/sign-up")}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </BottomModal>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  header: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subHeader: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20,
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
  hidden: {
    display: "none",
  },
});

export default Welcome;
