import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface SlideProps {
  item: {
    title: string;
    description: string;
    image: any;
  };
}

export default function OnboardingSlide({ item }: SlideProps) {
  return (
    <View style={[styles.container, { width }]}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: { width: "80%", height: 280, marginBottom: 40 },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  description: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    lineHeight: 22,
  },
});
