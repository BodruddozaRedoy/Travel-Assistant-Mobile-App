import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

interface User {
    name?: string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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

    const [selected, setSelected] = useState<string[]>([]);
    const refRBSheet = useRef<any>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const userString = await AsyncStorage.getItem("user");
                if (userString) {
                    setUser(JSON.parse(userString));
                }
            } catch (error) {
                console.error("Error loading user:", error);
            }
        };
        getUser();
    }, []);

    const toggleChoice = (item: string) => {
        setSelected((prev) =>
            prev.includes(item)
                ? prev.filter((c) => c !== item)
                : [...prev, item]
        );
    };

    const handleEditPress = () => {
        refRBSheet.current?.open();
    };

    const handleDone = () => {
        refRBSheet.current?.close();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headline}>Let's Personalize Your Adventure</Text>
                <Text style={styles.description}>
                    Help us understand your travel style so we can create perfect itineraries just for you.
                </Text>
            </View>

            <View style={styles.contentContainer}>
                {user?.name && <Text style={styles.userName}>{user.name}</Text>}
                <Text style={styles.subHeading}>Your selected interests</Text>

                <ScrollView
                    contentContainerStyle={styles.choicesContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {selected.length === 0 ? (
                        <Text style={styles.emptyText}>No selections yet — tap "Edit" to add some!</Text>
                    ) : (
                        selected.map((item, index) => (
                            <View key={index} style={[styles.choiceItem, styles.selectedChoice]}>
                                <Text style={[styles.choiceText, { color: "#fff" }]}>{item}</Text>
                                <AntDesign name="check" size={16} color="#fff" />
                            </View>
                        ))
                    )}
                </ScrollView>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={handleEditPress}
                    >
                        <AntDesign name="edit" size={18} color="#F86241" />
                        <Text style={[styles.actionText, { color: "#F86241" }]}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.continueButton]}
                        onPress={() => router.replace("/itineraries/setPlan")}
                    >
                        <Text style={[styles.actionText, { color: "#fff" }]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <RBSheet
                ref={refRBSheet}
                height={SCREEN_HEIGHT * 0.7}
                openDuration={300}
                closeDuration={250}
                closeOnPressMask={true}
                closeOnPressBack={true}
                // dragFromTopOnly={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: "#DDD",
                        width: 60,
                        height: 6,
                        marginVertical: 8,
                    },
                    container: {
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: "#fff",
                    },
                }}
                draggable={true}
            >
                <View style={styles.sheetWrapper}>
                    <View style={styles.sheetHeader}>
                        <Text style={styles.sheetHeading}>Choose your interests</Text>
                        <TouchableOpacity onPress={handleDone} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <AntDesign name="close" size={24} color="#222" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.sheetScrollView}
                        contentContainerStyle={styles.sheetChoices}
                        showsVerticalScrollIndicator={false}
                        bounces={true}
                    >
                        {chooseList.map((item, index) => {
                            const isSelected = selected.includes(item);
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.sheetItem,
                                        isSelected && styles.sheetItemSelected,
                                    ]}
                                    onPress={() => toggleChoice(item)}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.sheetItemText,
                                            isSelected && styles.sheetItemTextSelected,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                    <AntDesign
                                        name={isSelected ? "minus" : "plus"}
                                        size={18}
                                        color={isSelected ? "#fff" : "#F86241"}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={handleDone}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>
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
        padding: 20,
    },
    userName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
        marginBottom: 10,
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
        paddingBottom: 20,
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
    selectedChoice: {
        backgroundColor: "#F86241",
        borderColor: "#F86241",
    },
    choiceText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#222",
        marginRight: 8,
    },
    emptyText: {
        fontSize: 14,
        color: "#999",
        fontStyle: "italic",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "auto",
        gap: 12,
    },
    actionButton: {
        flex: 1,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 14,
    },
    editButton: {
        borderWidth: 1.5,
        borderColor: "#F86241",
        backgroundColor: "#fff",
    },
    continueButton: {
        backgroundColor: "#F86241",
    },
    actionText: {
        fontWeight: "700",
        fontSize: 15,
        marginLeft: 8,
    },
    sheetWrapper: {
        flex: 1,
        paddingHorizontal: 20,
    },
    sheetHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 15,
    },
    sheetHeading: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
    },
    sheetScrollView: {
        flex: 1,
    },
    sheetChoices: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        paddingBottom: 10,
    },
    sheetItem: {
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
    sheetItemSelected: {
        backgroundColor: "#F86241",
        borderColor: "#F86241",
    },
    sheetItemText: {
        fontSize: 15,
        fontWeight: "500",
        marginRight: 8,
        color: "#222",
    },
    sheetItemTextSelected: {
        color: "#fff",
    },
    buttonContainer: {
        paddingTop: 15,
        paddingBottom: 20,
    },
    doneButton: {
        backgroundColor: "#F86241",
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: "center",
    },
    doneButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});