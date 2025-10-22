import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Share, Alert, ScrollView } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import ImageView from "react-native-image-viewing";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import Entypo from '@expo/vector-icons/Entypo';
import MapView, { Marker } from "react-native-maps";


// const data = [
//     { label: 'Item 1', value: '1' },
//     { label: 'Item 2', value: '2' },
//     { label: 'Item 3', value: '3' },
//     { label: 'Item 4', value: '4' },
//     { label: 'Item 5', value: '5' },
//     { label: 'Item 6', value: '6' },
//     { label: 'Item 7', value: '7' },
//     { label: 'Item 8', value: '8' },
// ];

const images = [
    { uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4" },
    { uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34" },
    { uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111" },
    { uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111" },
    { uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111" },
];

const carouselImages = images.map((image) => image.uri);
const width = Dimensions.get("window").width;

const SetPlanScreen = () => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [activeTab, setActiveTab] = useState("Overview");

    const onDateChange = (date, type) => {
        if (type === "END_DATE") {
            setSelectedEndDate(date);
        } else {
            setSelectedStartDate(date);
            setSelectedEndDate(null);
        }
    };

    const minDate = new Date();
    const maxDate = new Date(minDate);
    maxDate.setFullYear(maxDate.getFullYear() + 2);

    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    const endDate = selectedEndDate ? selectedEndDate.toString() : "";

    const [visible, setIsVisible] = useState(false);
    const imageRows = useMemo(() => {
        const rows = [];
        for (let index = 0; index < images.length; index += 3) {
            rows.push(images.slice(index, index + 3));
        }
        return rows;
    }, []);

    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'React Native | A framework for building native apps using React',
            });
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    return (
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={{ marginLeft: 20 }}>
                    <Text style={styles.headline}>Where to Next?</Text>
                    <Text style={styles.description}>
                        Help us understand your travel style so we can create perfect itineraries just for you.
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    {/* {renderLabel()}
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
                    /> */}
                    {/* calendar  
                    <Calendar
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
                    {/* <CalendarPicker
                        startFromMonday={true}
                        allowRangeSelection={true}
                        minDate={minDate}
                        maxDate={maxDate}
                        todayBackgroundColor="#f2e6ff"
                        selectedDayColor="#7300e6"
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={onDateChange}
                    /> */}
                    {/* <View>
                        <Text>SELECTED START DATE: {startDate}</Text>
                        <Text>SELECTED END DATE: {endDate}</Text>
                    </View> */}

                    <TouchableOpacity
                        style={styles.imagePreview}
                        onPress={() => setIsVisible(true)}
                        activeOpacity={0.8}
                    >
                        {imageRows.map((row, rowIndex) => (
                            <View
                                style={[styles.imageRow, rowIndex === imageRows.length - 1 && styles.imageRowLast]}
                                key={`row-${rowIndex}`}
                            >
                                {row.map((img, index) => (
                                    <View key={`${img.uri}-${index}`}>
                                        <Image source={{ uri: img.uri }} style={styles.previewImage} />
                                        <TouchableOpacity onPress={onShare}>
                                            <Entypo
                                                style={{ position: "absolute", bottom: 0, right: 0 }}
                                                name="share"
                                                size={24}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </TouchableOpacity>

                    <ImageView
                        images={images}
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setIsVisible(false)}
                    />

                    {/* <Carousel
                        ref={ref}
                        width={width}
                        height={width / 2}
                        data={carouselImages}
                        onProgressChange={(_, absoluteProgress) => {
                            progress.value = absoluteProgress;
                        }}
                        renderItem={({ item }) => (
                            <View style={styles.carouselSlide}>
                                <Image
                                    source={{ uri: item }}
                                    style={styles.carouselImage}
                                    resizeMode="cover"
                                />
                            </View>
                        )}
                    /> */}
                </View>

                {/* Tabs Header */}
                <View style={styles.tabHeader}>
                    {["Overview", "Details", "Reviews"].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === tab && styles.activeTabText,
                                ]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tab Content */}
                <View style={styles.tabContent}>
                    {activeTab === "Overview" && (
                        <Text style={styles.text}>
                            This is the Overview section — show summary info here.
                        </Text>
                    )}
                    {activeTab === "Details" && (
                        <Text style={styles.text}>
                            Here are more details about the item, product, or destination.
                        </Text>
                    )}
                    {activeTab === "Reviews" && (
                        <Text style={styles.text}>
                            User reviews and comments would appear here.
                        </Text>
                    )}
                </View>
            </View>
            {/* Map Section */}
            <View style={styles.mapContainer}>
                <Text style={styles.mapTitle}>Explore Destination</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 23.8103, // Example: Dhaka
                        longitude: 90.4125,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 23.8103, longitude: 90.4125 }}
                        title="Dhaka"
                        description="Example location"
                    />
                </MapView>
            </View>

        </ScrollView>
    );
};

export default SetPlanScreen;

const styles = StyleSheet.create({
    scrollContainer: { flex: 1, backgroundColor: "#F86241" },
    container: { flex: 1, alignItems: "baseline", justifyContent: "flex-start", paddingTop: 100 },
    headline: { fontSize: 30, fontWeight: "600", color: "#fff" },
    description: { fontSize: 14, color: "#fff", fontWeight: "300", marginRight: 50 },
    inputContainer: {
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
        gap: 25,
    },
    imagePreview: { width: "100%", borderRadius: 12, overflow: "hidden" },
    imageRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
    imageRowLast: { marginBottom: 0 },
    previewImage: { width: width / 3 - 16, aspectRatio: 1, borderRadius: 8 },
    tabHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingBottom: 10,
        marginTop: 20,
    },
    tabButton: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
    activeTab: { backgroundColor: "#F86241" },
    tabText: { color: "#6a707c", fontWeight: "500" },
    activeTabText: { color: "#fff", fontWeight: "600" },
    tabContent: { padding: 20 },
    text: { fontSize: 16, color: "#333" },
    mapContainer: {
        width: "100%",
        height: 350,
        marginTop: 30,
        marginBottom: 60,
        borderRadius: 15,
        overflow: "hidden",
        alignSelf: "center",
        backgroundColor: "#fff",
    },
    mapTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        paddingVertical: 10,
        textAlign: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },

});
