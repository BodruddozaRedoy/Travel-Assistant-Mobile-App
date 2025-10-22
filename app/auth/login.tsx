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
                <Text style={styles.headline}>Welcome Back!</Text>
                <Text style={styles.description}>
                    Log in to continue your personalized travel journey. Access your itineraries,and recommendations anytime.
                </Text>
            </View>

            <View style={styles.inputContainer}>

                <View style={{ width: "100%" }}>
                    <Text>Email Address</Text>
                    <TextInput style={styles.input} placeholder="Enter email address" />
                </View>

                <View style={{ width: "100%", position: "relative" }}>
                    <Text>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="* * * * * *"
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

                <View style={styles.optionsRow}>
                    <TouchableOpacity
                        style={styles.rememberContainer}
                        onPress={() => setRememberMe((prev) => !prev)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.checkbox, rememberMe && styles.checkboxSelected]}>
                            {rememberMe && <Feather name="check" size={14} color="#fff" />}
                        </View>
                        <Text style={styles.rememberText}>Remember me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            router.push("/auth/forget_pass")
                        }
                        activeOpacity={0.7}
                    >
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>



                <TouchableOpacity
                    style={styles.registerBtn}
                    onPress={() => router.replace("/itineraries/choose")}
                >
                    <Text style={styles.registerText}>Log In</Text>
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
                        Don’t have any account?{" "}
                        <Text onPress={() => router.push("/auth/register")} style={{ color: "#F86241", borderBottomWidth: 2 }}>
                            Register
                        </Text>
                    </Text>
                </View>
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
