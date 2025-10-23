import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useMemo, useRef, useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Dropdown } from "react-native-element-dropdown";
import ImageView from "react-native-image-viewing";
import MapView, { Marker } from "react-native-maps";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

const data = [
    { label: "Hiking Adventures", value: "1" },
    { label: "Cultural Trips", value: "2" },
    { label: "Food Tours", value: "3" },
    { label: "Mountain Expeditions", value: "4" },
    { label: "Festival Getaways", value: "5" },
];

const images = [
    { uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4" },
    { uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34" },
    { uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111" },
    { uri: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" },
    { uri: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg" },
    { uri: "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png" },
];

const carouselImages = images.map((image) => image.uri);

const SetPlanScreen = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [visible, setIsVisible] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [activeTab, setActiveTab] = useState("Overview");

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

    const onDateChange = (date, type) => {
        if (type === "END_DATE") {
            setSelectedEndDate(date);
            setCalendarVisible(false);
        } else {
            setSelectedStartDate(date);
            setSelectedEndDate(null);
        }
    };

    const onShare = async (imgUri: string) => {
        try {
            await Share.share({
                message: `Check out this amazing place!`,
                url: imgUri, // Only works fully on iOS and some Android versions
            });

        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    const minDate = new Date();
    const maxDate = new Date(minDate);
    maxDate.setFullYear(maxDate.getFullYear() + 2);

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headline}>Where to Next?</Text>
                    <Text style={styles.description}>
                        Help us understand your travel style so we can create perfect itineraries just for you.
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: "#F86241" }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? "Select category" : "..."}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? "#F86241" : "black"}
                                // name="Safety"
                                size={20}
                            />
                        )}
                    />

                    <View style={styles.dateFieldsContainer}>
                        <TouchableOpacity
                            style={styles.dateField}
                            onPress={() => setCalendarVisible(true)}
                        >
                            <AntDesign name="calendar" size={18} color="#F86241" />
                            <Text style={styles.dateFieldText}>
                                {formatDate(selectedStartDate) || "Start Date"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dateField}
                            onPress={() => setCalendarVisible(true)}
                        >
                            <AntDesign name="calendar" size={18} color="#F86241" />
                            <Text style={styles.dateFieldText}>
                                {formatDate(selectedEndDate) || "End Date"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Modal visible={calendarVisible} transparent animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.calendarModal}>
                                <Text style={styles.modalTitle}>Select Travel Dates</Text>
                                <CalendarPicker
                                    startFromMonday
                                    allowRangeSelection
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    todayBackgroundColor="#FDE9E3"
                                    selectedDayColor="#F86241"
                                    selectedDayTextColor="#fff"
                                    onDateChange={onDateChange}
                                    textStyle={{ color: "#000" }}
                                />
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setCalendarVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity
                        style={styles.imagePreview}
                        onPress={() => setIsVisible(true)}
                        activeOpacity={0.85}
                    >
                        {imageRows.map((row, rowIndex) => (
                            <View
                                style={[styles.imageRow, rowIndex === imageRows.length - 1 && styles.imageRowLast]}
                                key={`row-${rowIndex}`}
                            >
                                {row.map((img, index) => (
                                    <View key={`${img.uri}-${index}`} style={styles.imageWrapper}>
                                        <Image source={{ uri: img.uri }} style={styles.previewImage} />
                                        <TouchableOpacity onPress={() => onShare(img.uri)} style={styles.shareButton}>
                                            <Entypo name="share" size={18} color="#fff" />
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

                    <View style={styles.carouselWrapper}>
                        <Carousel
                            ref={ref}
                            width={width - 40}
                            height={200}
                            data={carouselImages}
                            style={{ alignSelf: "center" }}
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
                        />

                        <Pagination.Basic
                            progress={progress}
                            data={carouselImages}
                            dotStyle={styles.dotStyle}
                            containerStyle={styles.dotContainer}
                        />
                    </View>

                </View>

                <View style={styles.tabHeader}>
                    {["Overview", "Details", "Reviews"].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.tabContent}>
                    {activeTab === "Overview" && (
                        <Text style={styles.tabBodyText}>
                            Discover breathtaking destinations, unique experiences, and curated adventures designed just for you.
                        </Text>
                    )}
                    {activeTab === "Details" && (
                        <Text style={styles.tabBodyText}>
                            Get detailed information about routes, activities, and travel guides that match your interests.
                        </Text>
                    )}
                    {activeTab === "Reviews" && (
                        <Text style={styles.tabBodyText}>
                            See what fellow travelers have said about their experiences and plan confidently.
                        </Text>
                    )}
                </View>
            </View>

            <View style={styles.mapContainer}>
                <Text style={styles.mapTitle}>Explore Destination</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 23.781035718597142,
                        longitude: 90.40754759626876,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 23.781035718597142, longitude: 90.40754759626876 }}
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
    container: { flex: 1, paddingTop: 90 },
    header: { paddingHorizontal: 24 },
    headline: { fontSize: 30, fontWeight: "700", color: "#fff", marginBottom: 8 },
    description: { fontSize: 15, color: "#fff", opacity: 0.9, marginBottom: 20 },
    inputContainer: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 20,
    },
    dropdown: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 20,
    },
    placeholderStyle: { fontSize: 14, color: "#888" },
    selectedTextStyle: { fontSize: 14, color: "#333" },
    inputSearchStyle: { height: 40, fontSize: 14 },
    icon: { marginRight: 10 },
    dateFieldsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        gap: 10,
    },
    dateField: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        gap: 8,
    },
    dateFieldText: { color: "#333", fontSize: 14, fontWeight: "500" },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    calendarModal: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalTitle: { fontSize: 18, fontWeight: "600", color: "#333", marginBottom: 10 },
    closeButton: {
        backgroundColor: "#F86241",
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
    },
    closeButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
    imagePreview: { width: "100%", borderRadius: 12, overflow: "hidden", marginTop: 20 },
    imageRow: { flexDirection: "row", justifyContent: "center", marginBottom: 12, gap: 5 },
    imageRowLast: { marginBottom: 0 },
    imageWrapper: { position: "relative" },
    previewImage: { width: width / 3 - 14, aspectRatio: 1, borderRadius: 8 },
    shareButton: {
        position: "absolute",
        bottom: 6,
        right: 6,
        backgroundColor: "#F86241",
        padding: 6,
        borderRadius: 20,
    },
    carouselSlide: { borderRadius: 12, overflow: "hidden" },
    carouselImage: { width: "100%", height: "100%", borderRadius: 12 },
    tabHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 10,
        backgroundColor: "#fff",
    },
    tabButton: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
    activeTab: { backgroundColor: "#F86241" },
    tabText: { color: "#6a707c", fontWeight: "500" },
    activeTabText: { color: "#fff", fontWeight: "600" },
    tabContent: { backgroundColor: "#fff", paddingHorizontal: 24, paddingVertical: 20 },
    tabBodyText: { fontSize: 16, color: "#333", lineHeight: 24 },
    mapContainer: {
        width: "100%",
        height: 360,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#fff",
        marginTop: 30,
        marginBottom: 60,
    },
    mapTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        textAlign: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    map: { width: "100%", height: "100%" },
    carouselWrapper: {
        marginTop: 20,
        alignItems: "center",
    },
    dotContainer: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    dotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#F86241",
        marginHorizontal: 4,
    },

});
