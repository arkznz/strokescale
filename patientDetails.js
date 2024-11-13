import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function PatientDetailsScreen({route, navigation}) {
    const {langCode, langName, langFlag, langDict} = route.params;
    const [gender, setGender] = useState('Female');
    const [age, setAge] = useState(50);
    const [pareticHand, setPareticHand] = useState('Left');
    const ages = [...Array(111).keys()].map(i => i + 10);
    const goToPatientQuestions = () => {
        navigation.navigate("Questions", {
            gender: gender,
            age: age.toString(),
            pareticHand: pareticHand,
            langCode: langCode,
            langName: langName,
            langFlag: langFlag,
            langDict: langDict
        })
      };
    const patientDetails =
        <View style={styles.container}>
            <Text style={styles.title}>Patient Details</Text>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Patient Language</Text>
                <Pressable style={styles.itemContainer} onPress={() => navigation.navigate("Language")}>
                <View style={styles.buttonContainer}>
                    <Image source={langFlag} style={styles.flagIcon} />
                    <Text style={styles.item}>{langName}</Text>
                </View>
                </Pressable>
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Patient Gender</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                >
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Paretic Side</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={pareticHand}
                    onValueChange={(itemValue, itemIndex) => setPareticHand(itemValue)}
                >
                    <Picker.Item label="Left" value="Left" />
                    <Picker.Item label="Right" value="Right" />
                    <Picker.Item label="Other" value="Left" />
                </Picker>
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Patient Age</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={age}
                    onValueChange={(itemValue, itemIndex) => setAge(itemValue)}
                >
                    {ages.map((age) => (
                        <Picker.Item label={age.toString()} value={age} key={age} />
                    ))}
                </Picker>
            </View>
            <View style={styles.pickerContainer}>
                <Pressable style={styles.itemContainer} onPress={() => goToPatientQuestions()}>
                <View style={styles.buttonContainer}>
                    <Text >Done</Text>
                </View>
                </Pressable>
            </View>
        </View>
    return patientDetails;
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    itemContainer: {
        width: 200,
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 20,
    },
    heart: {
        alignSelf: 'flex-end',
        marginRight: 5
    },
    item: {
        color: 'black',
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginTop: 3
    },
    // pickerContainer: {
    //     flexDirection: 'colunn',
    //     alignItems: 'left',
    //     marginVertical: 10,
    // },
    // picker: {
    //     width: 200,
    //     height: 50,
    //     borderRadius: 5,
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    // },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 5,
        marginRight: 10,
    },
    flagIcon: {
        width: 17,
        height: 17,
        borderRadius: 10,
        marginRight: 10,
        marginTop: 3
    }
});
