import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

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
        "Camping in Nature",
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headline}>Let's Personalize Your Adventure</Text>
                <Text style={styles.description}>
                    Help us understand your travel style so we can create perfect itineraries just for you.
                </Text>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.subHeading}>Choose what you like!</Text>

                <ScrollView
                    contentContainerStyle={styles.choicesContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {chooseList.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.choiceItem}>
                            <Text style={styles.choiceText}>{item}</Text>
                            <AntDesign name="plus" size={18} color="#F86241" />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => router.replace("/itineraries/setPlan")}
                >
                    <Text style={styles.nextButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChooseScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F86241",
        paddingTop: 80,
    },
    header: {
        paddingHorizontal: 24,
    },
    headline: {
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: "#fff",
        opacity: 0.9,
        marginRight: 40,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 30,
        padding: 15,
    },
    subHeading: {
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        color: "#222",
        marginBottom: 20,
    },
    choicesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 5,
        paddingBottom: 30,
    },
    choiceItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: "#F86241",
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 16,
        margin: 5,
        backgroundColor: "#fff",
    },
    choiceText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#222",
        marginRight: 8,
    },
    nextButton: {
        backgroundColor: "#F86241",
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 10,
    },
    nextButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
});
