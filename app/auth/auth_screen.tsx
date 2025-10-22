import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from 'react'
import { router } from "expo-router";

export default function AuthScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/loginScreen.png")}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>Join Us and Start Your Adventure!</Text>
            <Text style={styles.subtitle}>Create an account or log in to access your personalized travel itineraries and recommendations.</Text>
            <TouchableOpacity
                onPress={() => router.push("/auth/register")}
                style={styles.nextBtn}
            >
                <Text style={styles.nextText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push("/auth/login")}
                style={styles.loginBtn}
            >
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
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


    footer: {
        width: "100%",
        alignItems: "center",
    },
    backBtn: {
        marginBottom: 15,
    },
    backText: {
        fontSize: 16,
        color: "#999",
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
    loginBtn: {
        borderWidth: 2,
        borderColor: "#F86241",
        paddingVertical: 15,
        borderRadius: 30,
        width: "100%",
        alignItems: "center",
        marginTop: 30
    },
    loginText: {
        color: "#F86241",
        fontWeight: "600",
        fontSize: 16,
    }
});