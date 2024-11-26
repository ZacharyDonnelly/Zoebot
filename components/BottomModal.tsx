import React, { useState } from "react";
import { Animated, Dimensions, Modal, StyleSheet, View } from "react-native";

interface BottomModalProps {
  visible: boolean;
  children: React.ReactNode;
}

const BottomModal: React.FC<BottomModalProps> = ({ visible, children }) => {
  const screenHeight = Dimensions.get("screen").height;
  const [translateY] = useState(new Animated.Value(screenHeight));

  const openModal = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    if (visible) {
      openModal();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}
      >
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
  },

  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default BottomModal;