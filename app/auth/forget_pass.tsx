import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 20 }}>
        <Text style={styles.headline}>Trouble Logging In?</Text>
        <Text style={styles.description}>
          No worries! Just enter your email address below, and we’ll send you a link to reset your password.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={{ width: "100%" }}>
          <Text>Enter Email Address</Text>
          <TextInput style={styles.input} placeholder="Enter email address" />
        </View>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => router.replace("/auth/otp")}
        >
          <Text style={styles.registerText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "flex-start",
    backgroundColor: "#F86241",
    paddingTop: 100
  },
  headline: {
    fontSize: 30,
    fontWeight: "600",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "300",
    marginRight: 50
  },
  inputContainer: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
    width: "100%",
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 15
  },
  input: {
    backgroundColor: "#FFF4F2",
    marginTop: 10,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 20,
    width: "100%"
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 42
  },
  optionsRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -5
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  rememberText: {
    color: "#2c2d30",
    fontSize: 14,
    fontWeight: 600
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#6a707c",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "transparent"
  },
  checkboxSelected: {
    backgroundColor: "#F86241",
    borderColor: "#F86241"
  },
  forgotText: {
    color: "#F86241",
    fontSize: 14,
    fontWeight: "500"
  },
  registerBtn: {
    backgroundColor: "#F86241",
    paddingVertical: 15,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginTop: 20
  },
  registerText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center"
  },
  socialIcon: {
    borderWidth: 1,
    borderColor: "#6a707c",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10
  }
})
