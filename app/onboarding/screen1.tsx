import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function OnboardingScreen1() {
  return (
    <View style={styles.container}>

      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={() => router.replace("/")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>


      <Image
        source={require("../../assets/img_1.png")}
        style={styles.image}
        resizeMode="contain"
      />


      <Text style={styles.title}>Plan Smarter, Travel Better</Text>
      <Text style={styles.subtitle}>
        Discover unforgettable journeys with personalized itineraries made just
        for you.
      </Text>


      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => router.push("/onboarding/screen2")}
      >
        <Text style={styles.nextText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    position: "relative",
  },


  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "500",
  },


  image: {
    width: "100%",
    height: 280,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 22,
  },


  nextBtn: {
    backgroundColor: "#F86241",
    paddingVertical: 15,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginTop: 50
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
