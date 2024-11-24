import { StyleSheet, FlatList, Text, View, Pressable, Image, ScrollView, Dimensions} from 'react-native';
import React, {useState} from 'react';
import langs from './langLookup.json';
import {langLookupMap} from './langLookup.js';
import {Picker} from '@react-native-picker/picker';


const langsArray = Object.entries(langLookupMap)
.filter(([langCode, values]) => values.translatDict !== undefined)
.map(([langCode, values]) => ({ langCode, ...values }))

export default function PatientInfoScreen(props) {
    const [pinnedLang, setPinnedLang] = useState('mx');
    const [selectedLang, setSelectedLang] = useState('mx');
    const [showLangs, setShowLangs] = useState(false);
    const [showGenders, setShowGenders] = useState(false);
    const [favoriteLangs, setFavoriteLangs] = useState([]);
    const [selectedGender, setSelectedGender] = useState('Female');
    const handleFavorite = (langCode) => {
        if (favoriteLangs.includes(langCode)) {
            setFavoriteLangs(favoriteLangs.filter((i) => i !== langCode));
        } else {
            setFavoriteLangs([...favoriteLangs, langCode]);
        }
    }

    const sortedLangsArray = [...langsArray].sort((a, b) => {
        if (pinnedLang == a.langCode) {
            return -1;
        } else if (pinnedLang == b.langCode) {
            return 1;
        } else if (favoriteLangs.includes(a.langCode) && !favoriteLangs.includes(b.langCode)) {
            return -1;
        } else if (!favoriteLangs.includes(a.langCode) && favoriteLangs.includes(b.langCode)) {
            return 1;
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    const handleLangSelect = (langCode, langName, langFlag, langDict) => {
        if (showLangs === true) {
            setSelectedLang(langCode);
            setShowLangs(false);
        }
        else {
            setShowLangs(true);
            setShowGenders(false);
        }
        // props.navigation.navigate("Details",
        // {
        //     langCode: langCode,
        //     langName: langName,
        //     langFlag: langFlag,
        //     langDict: langDict
        // });
    };

    const handleGenderSelect = (gender) => {
        if (showGenders === true) {
            setSelectedGender(gender);
            setShowGenders(false);
        }
        else {
            setShowLangs(false);
            setShowGenders(true);
        }
    };

    const langList =
        <View style={styles.container}>
            <Text style={styles.title}>Patient Info</Text>
            <Text style={styles.label}>Patient Language</Text>
            <FlatList
                style={styles.flatList}
                data={sortedLangsArray}
                keyExtractor={item => item.langCode}
                renderItem={({item}) =>
                    <Pressable style={(item.langCode == selectedLang || showLangs) ? styles.showLangContainer : styles.hideLangContainer} onPress={() => handleLangSelect(item.langCode, item.name, item.flag, item.translatDict)}>
                        <View style={styles.buttonContainer}>
                            <Image source={item.flag} style={styles.flagIcon} />
                            <Text style={styles.item}>{item.name}</Text>
                            <Pressable style={styles.star} onPress={() => setPinnedLang(item.langCode)}>
                                {
                                    (item.langCode == pinnedLang) ? (
                                        <Text style={{fontSize: 18}}>⭐</Text>
                                    ) :
                                    (
                                        <Text style={{fontSize: 18}}>☆</Text>
                                    )
                                }
                            </Pressable>
                            <Pressable style={styles.heart} onPress={() => handleFavorite(item.langCode)}>
                                {
                                    (favoriteLangs.includes(item.langCode) || item.langCode == pinnedLang) ? (
                                        <Text style={{fontSize: 18}}>❤️</Text>
                                    ) :
                                    (
                                        <Text style={{fontSize: 18}}>🩶</Text>
                                    )
                                }
                            </Pressable>
                        </View>
                    </Pressable>
                }
            />
            <Text style={styles.label}>Patient Gender</Text>
            <FlatList
                style={styles.flatList}
                data={['Male', 'Female', 'Other']}
                renderItem={({item}) =>
                    <Pressable style={(item == selectedGender || showGenders) ? styles.showLangContainer : styles.hideLangContainer} onPress={() => handleGenderSelect(item)}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.item}>{item}</Text>
                        </View>
                    </Pressable>
                }
            />
        </View>
   return langList;
};

const styles = StyleSheet.create({
    pickersContainer: {
        flex: 1
    },
    pickerContainer: {
        flex: 1,
        alignItems: 'left',
    },
    container: {
        paddingTop: 22,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        position: 'absolute',
        width: '100%'
    },
    showLangContainer: {
        height: 60,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginHorizontal: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    hideLangContainer: {
        height: 0,
        overflow: 'hidden',
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
        marginLeft: 5,
        marginTop: 3,
        flex: 1
    },
    pickerContainer: {
        flexDirection: 'colunn',
        alignItems: 'left',
        flex: 1
    },
    flagIcon: {
        width: 22,
        height: 22,
        borderRadius: 10,
        marginRight: 10,
        marginTop: 3,
    },
    flatList: {
        height: '50%'
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 5,
        marginHorizontal: 30,
        textAlign: 'center'
    },
});
