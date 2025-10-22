import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import ImageView from "react-native-image-viewing";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";

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
    {
        uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    },
    {
        uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    },
    {
        uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    },
    {
        uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    },
    {
        uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    },
];

const carouselImages = images.map((image) => image.uri);
const width = Dimensions.get("window").width;



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

    const [visible, setIsVisible] = useState(false);
    const imageRows = useMemo(() => {
        const rows = [];
        for (let index = 0; index < images.length; index += 3) {
            rows.push(images.slice(index, index + 3));
        }
        return rows;
    }, []);

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


    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
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
                                <Image
                                    key={`${img.uri}-${index}`}
                                    source={{ uri: img.uri }}
                                    style={styles.previewImage}
                                />
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


                <Carousel
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
                />

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
        gap: 25
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
    },
    imagePreview: {
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
    },
    imageRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    imageRowLast: {
        marginBottom: 0
    },
    previewImage: {
        width: "50%",
        aspectRatio: 1,
        borderRadius: 8,
        gap: 20
    },
    previewText: {
        paddingVertical: 10,
        textAlign: "center",
        fontWeight: "500",
        color: "#333",
    },
    carouselSlide: {
        flex: 1,
        borderRadius: 16,
        overflow: "hidden",
    },
    carouselImage: {
        width: "100%",
        height: "100%",
    },
    paginationContainer: {
        marginTop: 12,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#F86241",
        marginHorizontal: 4,
    },
})
