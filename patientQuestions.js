import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
//import { BottomSheet } from 'react-native-gesture-handler';


const Card = ({ title, content }) => {
return (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardContent}>{content}</Text>
    </View>
);
};

const Circle = ({ score }) => {
    const color = score === "" ? 'grey' : 'green';
    return (
      <View style={[styles.circle, { backgroundColor: color }]}>
        <Text style={styles.text}>{score}</Text>
      </View>
    );
  };

export default function PatientQuestionsScreen({route, navigation}) {
    const {gender, age, pareticHand, langCode, langName, langFlag, langDict} = route.params;
    const getTranslatFromQuestion = (questionDict) => {
        opt = questionDict.opt;
        if (opt == null) {
            return questionDict.phr.translat;
        }
        else if (opt === "paretic_hand") {
            if (pareticHand === "Right") {
                return questionDict.phr.r.translat;
            } else {
                return questionDict.phr.l.translat;
            }
        }
    }
    console.log(langDict);
    const langquestionsArray = Object.keys(langDict)
    .filter(key => key !== 'sol') // Filter out the "sol" key
    .map((key) => ({
        questionCode: key,
        questions: langDict[key]
    }))
    .sort((a, b) => {
        a = a.questionCode.replace(/\D/g,'')
        b = b.questionCode.replace(/\D/g,'')
        if (Number(a) > Number(b)) {
            return 1;
        } else if (Number(a) < Number(b)) {
            return -1;
        } else {
            return a.localeCompare(b);
        }
    });
    const [selectedValue, setSelectedValue] = useState(1);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const toggleBottomSheet = () => {
        setIsBottomSheetOpen(true);
      };
    const patientQuestions =
        <View style={styles.container}>
            <Text style={styles.title}>Patient Questions</Text>
            <FlatList
                data={langquestionsArray}
                renderItem={({item, index}) => (
                <Card
                    left={Circle({score: ""})}
                    key={item.questionCode}
                    title={item.questionCode}
                    content={item.questions.map((q, i) =>
                        <Text key = {`translat_${item.questionCode}_${i}`} >{getTranslatFromQuestion(q)}</Text>
                    )}
                >
                <Pressable key={`score_button_${item.questionCode}`} style={styles.score} onPress={() => toggleBottomSheet()}>
                    <Text key={`score_value_${item.questionCode}`}> Click Me!</Text>
                </Pressable>
                </Card>
                )}
                numColumns={2}
            />
        </View>
    /* <Modal visible={isBottomSheetOpen} animationType="slide">
                    <BottomSheet>
                        <Picker selectedValue={selectedValue} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                            <Picker.Item label="1" value={1} />
                            <Picker.Item label="2" value={2} />
                            <Picker.Item label="3" value={3} />
                            <Picker.Item label="4" value={4} />
                        </Picker>
                    </BottomSheet>
                </Modal> */

    return patientQuestions;
};

const styles = StyleSheet.create({
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    score: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    card: {
        width: '45%',
        height: 300,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 5,
        marginVertical: 5
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardContent: {
        fontSize: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'right',
    }
});
