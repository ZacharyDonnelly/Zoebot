import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface RadialGradientBackgroundProps extends ViewProps {
  children: React.ReactNode;
}

const RadialGradientBackground = ({
  children,
  style,
  ...props
}: RadialGradientBackgroundProps) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <LinearGradient
        colors={["#E2FBF8", "#D8FFFA", "#D8CAFF", "#BCA4FE"]}
        start={{ x: 0.1827, y: 0.3233 }}
        end={{ x: 1.236, y: 0.4495 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RadialGradientBackground;
