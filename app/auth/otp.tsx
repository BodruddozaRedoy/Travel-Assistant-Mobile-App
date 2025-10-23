import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputKeyPressEventData, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { AxiosPublic } from "@/config/axios";

const OtpScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { email } = useLocalSearchParams()

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    const sanitized = value.replace(/[^0-9]/g, "");
    const updatedOtp = [...otp];
    updatedOtp[index] = sanitized;
    setOtp(updatedOtp);

    if (sanitized && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join("");

    try {
      const res = await AxiosPublic.patch("/accounts/api/v1/verify-otp", {
        email,
        otp: otpString,
      });

      console.log("Verify Response:", res.data);

      if (res.status === 200) {
        alert("Verified!");
        router.push("/auth/login");
      }
    } catch (error: any) {
      console.log("OTP verification failed:", error.response?.data || error.message);
      alert("Verification failed! Please try again.");
    }
  };


  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 20 }}>
        <Text style={styles.headline}>Verify Your Identity!</Text>
        <Text style={styles.description}>
          We’ve sent a one-time password (OTP) to your email. Enter the code below and get started!
        </Text>
      </View>

      <View style={styles.inputContainer}>

        <View style={styles.otpWrapper}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleChange(value, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
              returnKeyType="next"
              textAlign="center"
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={verifyOtp}
          style={{
            backgroundColor: "#F86241",
            paddingVertical: 15,
            borderRadius: 30,
            width: "100%",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
            Verify OTP
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center", width: "100%" }}>
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            Don’t get OTP?{" "}
            <Text onPress={() => router.push("/auth/pass_change")} style={{ color: "#F86241", borderBottomWidth: 2 }}>
              Resend
            </Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default OtpScreen

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
  otpWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
    marginBottom: 10
  },
  otpInput: {
    width: "20%",
    minWidth: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 0,
    backgroundColor: "#FFF4F2",
    fontSize: 24
  }
})
