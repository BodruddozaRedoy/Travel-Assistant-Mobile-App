import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputKeyPressEventData, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import CalendarPicker from "react-native-calendar-picker";

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' }, 
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];



const SetPlanScreen = () => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const onDateChange = (date, type) => {
        if (type === "END_DATE") {
            setSelectedEndDate(date);
        } else {
            setSelectedStartDate(date);
            setSelectedEndDate(null);
        }
    };

    const minDate = new Date(); // Today
    const maxDate = new Date(minDate); // Allow selections up to two years ahead
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    const endDate = selectedEndDate ? selectedEndDate.toString() : "";
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
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [selected, setSelected] = useState('');

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={{ marginLeft: 20 }}>
                <Text style={styles.headline}>Where to Next?</Text>
                <Text style={styles.description}>
                    Help us understand your travel style so we can create perfect itineraries just for you.
                </Text>
            </View>

            <View style={styles.inputContainer}>

                {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#F86241' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={isFocus ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
                {/* calendar  */}
                {/* <Calendar
                    markingType={'period'}
                    markedDates={{
                        '2025-10-22': { marked: true, dotColor: '#50cebb' },
                        '2025-10-23': { marked: true, dotColor: '#50cebb' },
                        '2025-10-24': { startingDay: true, color: '#50cebb', textColor: 'white' },
                        '2025-10-25': { color: '#70d7c7', textColor: 'white' },
                        '2025-10-26': { color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white' },
                        '2025-10-27': { color: '#70d7c7', textColor: 'white' },
                        '2025-10-28': { endingDay: true, color: '#50cebb', textColor: 'white' }
                    }}
                /> */}
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    todayBackgroundColor="#f2e6ff"
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={onDateChange}
                />
                <View>
                    <Text>SELECTED START DATE: {startDate}</Text>
                    <Text>SELECTED END DATE: {endDate}</Text>
                </View>
            </View>
        </View>
    )
}

export default SetPlanScreen

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
    Dcontainer: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: "100%"
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    }
})
