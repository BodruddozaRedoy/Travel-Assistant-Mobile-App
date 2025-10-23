import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home 🏠</Text>

      <BlurView intensity={90} tint="light" style={styles.card}>
        <View style={{ padding: 10, borderRadius: 20, overflow: "hidden" }}>
          <Text style={styles.cardTitle}>Glassmorphism UI</Text>
          <Text style={styles.cardText}>
            This screen uses a frosted glass effect for a clean, modern look.
          </Text>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#222",
  },
  card: {
    width: width * 0.85,
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
