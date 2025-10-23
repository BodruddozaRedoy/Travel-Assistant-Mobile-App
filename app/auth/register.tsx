import { AxiosPublic } from "@/config/axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";


const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    username: "",
    password: ""
  })

  const handleRegister = async () => {
    if (user.password.length < 8) {
      alert("Password should be 8 character!")
    }
    console.log(user)
    setLoading(true)
    try {
      const res = await AxiosPublic.post("/accounts/api/v1/register", user)
      if (res.status === 201) {
        alert("Registered!")
        Toast.show({
          type: "success",
          text1: "Registration Successful!"
        })
        setLoading(false)
        router.push({
          pathname: "/auth/otp",
          params: { email: user.email }
        })
      }
      console.log(res)
    } catch (error) {
      console.log("Error register", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
            <TextInput style={styles.input} onChangeText={(e) => setUser({ ...user, full_name: e })} placeholder="Enter full name" />
          </View>
          <View style={{ width: "100%" }}>
            <Text>Email Address</Text>
            <TextInput style={styles.input} placeholder="Enter email address" onChangeText={(e) => setUser({ ...user, email: e })} />
          </View>
          <View style={{ width: "100%" }}>
            <Text>User Name</Text>
            <TextInput style={styles.input} onChangeText={(e) => setUser({ ...user, username: e })} placeholder="Enter email address" />
          </View>

          <View style={{ width: "100%", position: "relative" }}>
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="* * * * * *"
              onChangeText={(e) => setUser({ ...user, password: e })}
              secureTextEntry={!showPassword}
            />
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="#6a707c"
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          <TouchableOpacity
            style={styles.registerBtn}
            onPress={handleRegister}
          >
            <Text style={styles.registerText}>{loading ? "Registering..." : "Register"}</Text>
          </TouchableOpacity>

          <View style={{ width: "100%", marginTop: 30, height: 40 }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%" }}>
              <View style={{ height: 2, backgroundColor: "#808182", width: 100 }}></View>
              <Text style={{ fontSize: 15, fontWeight: "500", color: "#6a707c", paddingHorizontal: 10 }}>Or Login with</Text>
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
              Already have an account?{" "}
              <Text onPress={() => router.push("/auth/login")} style={{ color: "#F86241", borderBottomWidth: 2 }}>
                Log In
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
