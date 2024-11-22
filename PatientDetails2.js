import { StyleSheet, FlatList, Text, View, Pressable, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import langs from './langLookup.json';
import {langLookupMap} from './langLookup.js';

const langsArray = Object.entries(langLookupMap)
.filter(([langCode, values]) => values.translatDict !== undefined)
.map(([langCode, values]) => ({ langCode, ...values }))

export default function PatientLanguageScreen(props) {
    const [favoriteLangs, setFavoriteLangs] = useState([]);
    const handleFavorite = (langCode) => {
        if (favoriteLangs.includes(langCode)) {
            setFavoriteLangs(favoriteLangs.filter((i) => i !== langCode));
        } else {
            setFavoriteLangs([...favoriteLangs, langCode]);
        }
    }

    const sortedLangsArray = [...langsArray].sort((a, b) => {
        if (favoriteLangs.includes(a.langCode) && !favoriteLangs.includes(b.langCode)) {
            return -1;
        } else if (!favoriteLangs.includes(a.langCode) && favoriteLangs.includes(b.langCode)) {
            return 1;
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    const handleLangSelect = (langCode, langName, langFlag, langDict) => {
        props.navigation.navigate("Details",
        {
            langCode: langCode,
            langName: langName,
            langFlag: langFlag,
            langDict: langDict
        });
    };

    const langList =
        <View style={styles.container}>
            <FlatList
                style= {styles.flatList}
                data={sortedLangsArray}
                keyExtractor={item => item.langCode}
                renderItem={({item}) =>
                    <Pressable style={styles.itemContainer} onPress={() => handleLangSelect(item.langCode, item.name, item.flag, item.translatDict)}>
                        <View style={styles.buttonContainer}>
                            <Image source={item.flag} style={styles.flagIcon} />
                            <Text style={styles.item}>{item.name}</Text>
                            <Pressable style={styles.heart} onPress={() => handleFavorite(item.langCode)}>
                                {favoriteLangs.includes(item.langCode) ? (
                                <Text style={{fontSize: 18}}>❤️</Text>
                                    ) : (
                                        <Text style={{fontSize: 18}}>🩶</Text>
                                    )
                                }
                            </Pressable>
                        </View>
                    </Pressable>
                }
                ListHeaderComponent={() => <Text style={styles.title}>Patient Language</Text>}
            />
        </View>
    return langList;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22, 
        height: 100
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
        marginTop: 3
    },
    flagIcon: {
        width: 22,
        height: 22,
        borderRadius: 10,
        marginRight: 10,
        marginTop: 3
    },
    flatList: {
        height: 100, 
        borderWidth: 1,
        flex: 1
    }
});
