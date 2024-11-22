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
            <View style= {styles.pickersContainer}>
                <View style={styles.pickerContainer}>
                    <Pressable style={styles.itemContainer} onPress={() => navigation.navigate("Language")}>
                    <View style={styles.buttonContainer}>
                        <Image source={langFlag} style={styles.flagIcon} />
                        <Text style={styles.langText}>{langName}</Text>
                    </View>
                    </Pressable>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Gender</Text>
                    <Text style={styles.label}>Paretic Side</Text>
                    <Text style={styles.label}>Age</Text>
                </View>
                <View style={styles.pickerContainer}>
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
            </View>
            <View style={styles.spacer} />
            <Pressable style={styles.doneContainer} onPress={() => goToPatientQuestions()}>
                <Text >Done</Text>
            </Pressable>
        </View>
    return patientDetails;
};
const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        flex: 1,
        justifyContent: 'flex-start'
    },
    pickersContainer: {
        height: 240
    },
    labelContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    itemContainer: {
        height: 60,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginHorizontal: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    spacer: { flex: 1, },
    doneContainer: {
        height: 80,
        borderRadius: 30,
        backgroundColor: 'deepskyblue',
        padding: 30,
        alignItems: 'center',
        width: '90%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    pickerContainer: {
        flexDirection: 'colunn',
        alignItems: 'left',
    },
    // picker: {
    //     width: 200,
    //     height: 50,
    //     borderRadius: 5,
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    // },
    langText: { 
        flex: 1, 
        textAlign: 'center'
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 5,
        marginHorizontal: 30
    },
    flagIcon: {
        width: 22,
        height: 22,
        borderRadius: 10,
        marginRight: 10,
        marginTop: 3
    }
});
