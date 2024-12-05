import { IModalProps } from "@/types/modal";
import React, { useState } from "react";
import { Animated, Dimensions, Modal, View } from "react-native";

interface ISignUpModalProps extends IModalProps {
  height?: number;
}

const SignUpModal: React.FC<ISignUpModalProps> = ({
  visible,
  children,
  height = 650,
}) => {
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
        className="absolute bottom-0 left-0 right-0 h-[650px] bg-white rounded-t-[32px] shadow-5"
        style={{ height: height, transform: [{ translateY }] }}
      >
        <View className="flex-1 p-10 pb-10 px-9">{children}</View>
      </Animated.View>
    </Modal>
  );
};

export default SignUpModal;
