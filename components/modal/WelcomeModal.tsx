import { IModalProps } from "@/types/modal";
import React, { useState } from "react";
import { Animated, Dimensions, Modal, View } from "react-native";

const WelcomeModal: React.FC<IModalProps> = ({ visible, children }) => {
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

  const heightCalculated = screenHeight * 0.5 - 19;

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-white rounded-t-[32px] overflow-hidden shadow-5"
        style={{ transform: [{ translateY }], maxHeight: heightCalculated }}
      >
        <View className="flex-1 p-10 pb-10 px-9">{children}</View>
      </Animated.View>
    </Modal>
  );
};

export default WelcomeModal;
