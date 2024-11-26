import BottomModal from "@/components/BottomModal";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
const Home = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/robot_splash.png")}
        style={styles.image}
      />
      <BottomModal visible>
        <Pressable
          style={styles.closeButton}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  image: {
    width: 375,
    height: 436,
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 10,
    width: 303,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#6938EF",
    borderRadius: 12,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Home;
