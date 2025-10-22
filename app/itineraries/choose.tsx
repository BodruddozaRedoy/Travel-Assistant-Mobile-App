import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputKeyPressEventData, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router } from "expo-router";

const ChooseScreen = () => {
    const chooseList = [
        "Hiking & Trekking",
        "Art",
        "Mountaineering",
        "Animals",
        "Solo Adventure",
        "Local Festivals & Events",
        "Food & Drink",
        "Swimming",
        "Camping in Nature"
    ]

    return (
        <View style={styles.container}>
            <View style={{ marginLeft: 20 }}>
                <Text style={styles.headline}>Let's Personalize Your Adventure</Text>
                <Text style={styles.description}>
                    Help us understand your travel style so we can create perfect itineraries just for you.
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 30, fontWeight: 600, textAlign: "center" }}>Choose What you like!</Text>
                <View>

                </View>


            </View>
        </View>
    )
}

export default ChooseScreen

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
})
