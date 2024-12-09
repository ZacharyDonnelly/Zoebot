import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import AlertCircle from "../icons/AlertCircle";
import GreenCheckCircle from "../icons/GreenCheckCircle";

interface CustomTextInputProps extends TextInputProps {
  labelText: string;
}

const CustomTextInput = ({ labelText, ...props }: CustomTextInputProps) => {
  const [borderColor, setBorderColor] = useState<string>("#D0D5DD");
  const [checkCircleVisible, setCheckCircleVisible] = useState<boolean>(false);
  const [alertCircleVisible, setAlertCircleVisible] = useState<boolean>(false);

  const handleBlur = (): void => {
    if (props.value && props.value.trim() !== "") {
      setBorderColor("#16B364");
      setCheckCircleVisible(true);
      setAlertCircleVisible(false);
    } else {
      setBorderColor("#FDA29B");
      setCheckCircleVisible(false);
      setAlertCircleVisible(true);
    }
  };
  return (
    <View>
      <Text style={styles.label}>{labelText}</Text>
      <View className="relative w-[320px]">
        <TextInput
          placeholderTextColor="#D0D5DD"
          style={[styles.input, { borderColor }]}
          onBlur={handleBlur}
          {...props}
        />
        {checkCircleVisible && (
          <View className="absolute right-5 top-1/2 translate-y-[-6.5px]">
            <GreenCheckCircle />
          </View>
        )}
        {alertCircleVisible && (
          <View className="absolute right-5 top-1/2 translate-y-[-8.5px]">
            <AlertCircle />
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    width: 320,
    borderWidth: 2,
    borderRadius: 20,
    padding: 14,
  },
  label: {
    marginBottom: 10,
    color: "#344054",
  },
});
