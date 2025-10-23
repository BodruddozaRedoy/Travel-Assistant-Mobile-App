import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
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

    const [selected, setSelected] = useState<string[]>([]);
    const sheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ["40%", "80%"], []);

    const toggleChoice = (item: string) => {
        setSelected((prev) =>
            prev.includes(item)
                ? prev.filter((c) => c !== item)
                : [...prev, item]
        );
    };

    return (
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
              <Text style={styles.headline}>Let's Personalize Your Adventure</Text>
              <Text style={styles.description}>
                  Help us understand your travel style so we can create perfect itineraries just for you.
              </Text>
          </View>

          {/* Main content */}
          <View style={styles.contentContainer}>
              <Text style={styles.subHeading}>Your selected interests</Text>

              {/* Selected list preview */}
              <ScrollView
                  contentContainerStyle={styles.choicesContainer}
                  showsVerticalScrollIndicator={false}
              >
                  {selected.length === 0 ? (
                      <Text style={styles.emptyText}>No selections yet — tap “Edit” to add some!</Text>
                  ) : (
                      selected.map((item, index) => (
                          <View key={index} style={[styles.choiceItem, styles.selectedChoice]}>
                              <Text style={[styles.choiceText, { color: "#fff" }]}>{item}</Text>
                              <AntDesign name="check" size={16} color="#fff" />
                          </View>
                      ))
                  )}
              </ScrollView>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                  <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => sheetRef.current?.expand()}
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

          {/* Bottom Sheet */}
          <BottomSheet ref={sheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose>
              <View style={styles.sheetContainer}>
                  <Text style={styles.sheetHeading}>Choose your interests</Text>
                  <ScrollView
                      contentContainerStyle={styles.sheetChoices}
                      showsVerticalScrollIndicator={false}
                  >
                      {chooseList.map((item, index) => {
                          const isSelected = selected.includes(item);
                          return (
                              <TouchableOpacity
                                  key={index}
                                  style={[
                                      styles.sheetItem,
                                      isSelected && { backgroundColor: "#F86241", borderColor: "#F86241" },
                                  ]}
                                  onPress={() => toggleChoice(item)}
                                  activeOpacity={0.8}
                              >
                                  <Text
                                      style={[
                                          styles.sheetItemText,
                                          { color: isSelected ? "#fff" : "#222" },
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
              </View>
          </BottomSheet>
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
    sheetContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    sheetHeading: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
        textAlign: "center",
        marginBottom: 16,
    },
    sheetChoices: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        paddingBottom: 30,
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
    sheetItemText: {
        fontSize: 15,
        fontWeight: "500",
        marginRight: 8,
    },
});
