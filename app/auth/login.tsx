import { AxiosPublic } from "@/config/axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async () => {
        if (!user.email || !user.password) {
            Alert.alert("Missing Fields", "Please fill in both email and password.");
            return;
        }

        try {
            setLoading(true);

            const res = await AxiosPublic.post("/accounts/api/v1/login", user);

            // console.log(res.data);

            Alert.alert("Success", "You have successfully logged in!", [
                {
                    text: "OK",
                    onPress: () => router.replace("/(tabs)/home"),
                },
            ]);



            await SecureStore.setItemAsync("access-token", JSON.stringify(res.data.access))
            await AsyncStorage.setItem("user", JSON.stringify(res.data.login_user_info))
        } catch (error: any) {
            console.log("Login error:", error.response?.data || error.message);
            if (error.response?.data?.message) {
                Alert.alert("Login Failed", error.response.data.message);
            } else {
                Alert.alert("Error", "Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ marginLeft: 20 }}>
                <Text style={styles.headline}>Welcome Back!</Text>
                <Text style={styles.description}>
                    Log in to continue your personalized travel journey. Access your
                    itineraries and recommendations anytime.
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={{ width: "100%" }}>
                    <Text>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter email address"
                        value={user.email}
                        onChangeText={(e) => setUser({ ...user, email: e })}
                    />
                </View>

                <View style={{ width: "100%", position: "relative" }}>
                    <Text>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="* * * * * *"
                        secureTextEntry={!showPassword}
                        value={user.password}
                        onChangeText={(e) => setUser({ ...user, password: e })}
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
                        <View
                            style={[styles.checkbox, rememberMe && styles.checkboxSelected]}
                        >
                            {rememberMe && <Feather name="check" size={14} color="#fff" />}
                        </View>
                        <Text style={styles.rememberText}>Remember me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push("/auth/forget_pass")}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.registerBtn, loading && { opacity: 0.7 }]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                            <Text style={styles.registerText}>Log In</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.registerBtn, loading && { opacity: 0.7 }]}
                    onPress={() => router.replace("/(tabs)/home")}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.registerText}>Home</Text>
                    )}
                </TouchableOpacity>

                <View style={{ width: "100%", marginTop: 30, height: 40 }}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <View
                            style={{ height: 2, backgroundColor: "#808182", width: 100 }}
                        ></View>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "500",
                                color: "#6a707c",
                                paddingHorizontal: 10,
                            }}
                        >
                            Or Login with
                        </Text>
                        <View
                            style={{ height: 2, backgroundColor: "#808182", width: 100 }}
                        ></View>
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
                        <Text
                            onPress={() => router.push("/auth/register")}
                            style={{ color: "#F86241", borderBottomWidth: 2 }}
                        >
                            Register
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;


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
