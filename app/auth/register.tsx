import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 20 }}>
        <Text style={styles.headline}>Create Your Account</Text>
        <Text style={styles.description}>
          Fill in your details below to get started on your personalized travel journey.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={{ width: "100%" }}>
          <Text>Full Name</Text>
          <TextInput style={styles.input} placeholder='Enter full name' />
        </View>
        <View style={{ width: "100%" }}>
          <Text>Email Address</Text>
          <TextInput style={styles.input} placeholder='Enter email address' />
        </View>

        <View style={{ width: "100%", position: "relative" }}>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder='* Enter password'
            secureTextEntry={!showPassword}
          />
          <AntDesign
            name={showPassword ? "eye" : "eye-with-line"}
            size={24}
            color="#6a707c"
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        <View style={{ width: "100%", position: "relative" }}>
          <Text>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder='* Confirm password'
            secureTextEntry={!showConfirmPassword}
          />
          <AntDesign
            name={showConfirmPassword ? "eye" : "eyeo"}
            size={24}
            color="#6a707c"
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => router.replace("/auth/auth_screen")}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

        <View style={{ width: "100%", marginTop: 30, height: 40 }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <View style={{ height: 2, backgroundColor: "#808182", width: 100 }}></View>
            <Text style={{ fontSize: 15, fontWeight: 500, color: "#6a707c", paddingHorizontal: 10 }}>Or Login with</Text>
            <View style={{ height: 2, backgroundColor: "#808182", width: 100 }}></View>
          </View>
        </View>

        <View style={styles.socialContainer}>
          <View style={styles.socialIcon}>
            <AntDesign name="google" size={30} color="#000" />
          </View>
          <View style={styles.socialIcon}>
            <AntDesign name="apple" size={30} color="#000" />
          </View>
        </View>

        <View style={{ alignItems: "center", width: "100%" }}>
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            Already have an account?{' '}
            <Text onPress={() => router.push("/auth/login")} style={{ color: "#F86241", borderBottomWidth: 2 }}>
              Log In
            </Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default RegisterScreen

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
    fontWeight: 600,
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#fff",
    fontWeight: 300,
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
    gap: 20,
    marginTop: 10
  },
  socialIcon: {
    borderWidth: 1,
    borderColor: "#6a707c",
    padding: 20,
    borderRadius: 10
  }
})
