import React, { useState } from "react";
import { Animated, Dimensions, Modal, View } from "react-native";

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
        className="absolute bottom-0 left-0 right-0 h-[408px] bg-white rounded-t-[32px] overflow-hidden shadow-5"
        style={{ transform: [{ translateY }] }}
      >
        <View className="flex-1 pt-[38px] pb-7 px-9">{children}</View>
      </Animated.View>
    </Modal>
  );
};

export default BottomModal;
