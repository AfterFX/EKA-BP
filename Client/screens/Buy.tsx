import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import Slider from '@react-native-community/slider';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Dimensions,
    Alert,
    Platform,
    TouchableOpacity,
    ImageBackground,
    useWindowDimensions,
    ScrollView, TextInput, Animated, SafeAreaView
} from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';
import * as Print from 'expo-print';


// Required to save to cache
import * as FileSystem from 'expo-file-system';
// ExcelJS
import ExcelJS from 'exceljs';
// Share excel via share dialog
import * as Sharing from 'expo-sharing';
// From @types/node/buffer
import { Buffer as NodeBuffer } from 'buffer';

import {
    Avatar,
    WelcomeImage,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    InnerContainer,
    WelcomeContainer,
    ButtonText,
    Line, TextLinkContent, TextLink, priceText, PriceView,
    StatusBarHeight
} from '../components/styles';


import {useRef, useState} from "react";
import {price, payTotal, countTotal, print, destroy} from "../components/functions";

import prices from "../price.json";
import TextField from "../components/TextField";
import Dialog from "react-native-dialog";

import Icon from 'react-native-vector-icons/AntDesign';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

// This returns a local uri that can be shared
const generateShareableExcel = async (): Promise<string> => {
    const now = new Date();
    const fileName = 'YourFilename.xlsx';
    const fileUri = FileSystem.cacheDirectory + fileName;
    return new Promise<string>((resolve, reject) => {
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Me';
        workbook.created = now;
        workbook.modified = now;
        // Add a sheet to work on
        const worksheet = workbook.addWorksheet('My Sheet', {});
        // Just some columns as used on ExcelJS Readme
        worksheet.columns = [
            { header: 'Id', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 32 },
            { header: 'D.O.B.', key: 'dob', width: 10, }
        ];
        // Add some test data
        worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
        worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1969, 2, 3) });

        // Test styling

        // Style first row
        worksheet.getRow(1).font = {
            name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true
        };
        // Style second column
        worksheet.eachRow((row, rowNumber) => {
            row.getCell(2).font = {
                name: 'Arial Black',
                color: { argb: '#FF00FF00' },
                family: 2,
                size: 14,
                bold: true
            };
            row.getCell("D").font = {
                name: 'Arial Black',
                color: { argb: '6A006A00' },
                family: 2,
                size: 5,
                bold: true
            };
        });

        // Write to file
        workbook.xlsx.writeBuffer().then((buffer: ExcelJS.Buffer) => {
            // Do this to use base64 encoding
            const nodeBuffer = NodeBuffer.from(buffer);
            const bufferStr = nodeBuffer.toString('base64');
            FileSystem.writeAsStringAsync(fileUri, bufferStr, {
                encoding: FileSystem.EncodingType.Base64
            }).then(() => {
                resolve(fileUri);
            });
        });
    });
}

const shareExcel = async () => {
    const shareableExcelUri: string = await generateShareableExcel();
    Sharing.shareAsync(shareableExcelUri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Android
        dialogTitle: 'Your dialog title here', // Android and Web
        UTI: 'com.microsoft.excel.xlsx' // iOS
    }).catch(error => {
        console.error('Error', error);
    }).then(() => {
        console.log('Return from sharing dialog');
    });
}
function _alertIndex(value: string) {
    Alert.alert(`This is column ${value}`);
}
const elementButton = (value: string) => (
    <TouchableOpacity onPress={() => _alertIndex(value)}>
        <View style={styles.btn}>
            <Text style={styles.btnText}>button</Text>
        </View>
    </TouchableOpacity>
);


const Buy = ({ navigation }) => {
    const [isMain, setIsMain] = useState(true);
    const [number, onChangeNumber] = useState<Array<String>>([]);
    const [error, setError] = useState<string | null>(null)
    const [size, setSize] = useState(25);

    //settings
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isTouchEnded, setIsTouchEnded] = useState(true);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [editElement, setEditElement] = useState();


    const { width, height } = useWindowDimensions();



    const elementCol = (value: any) => (
            <View style={styles.colBlue}>
                <Text style={{fontSize: (size*0.51)}}>{value}</Text>
            </View>
    );


    const handleChange = (name: any, value: any) => {
        onChangeNumber({
            ...number,
            [name]: value,
        });
    };
    const elementInput = (id: any, underline: boolean) =>{
    return (

            <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={number[id]}
                label=""
                errorText={error}
                fontSizeC={(size*0.56)}
                onChangeText={newNumber => handleChange(id, newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />

    )};

    const elementResult = (element: any, underline: boolean) =>{
        return (
            <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
                <Text style={{fontSize: (size > 40? 22 : size*0.56)}}>{price(element, number)}</Text>
            </View>
        )
    };

    function DoubleTapButton({ onDoubleTap, children }) {
        const onHandlerStateChange = ({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
                onDoubleTap && onDoubleTap();
            }
        };

        return (
            <TapGestureHandler
                onHandlerStateChange={onHandlerStateChange}
                numberOfTaps={2}>
                {children}
            </TapGestureHandler>
        );
    }

    const showPriceEditor = (element: any) => {
        setEditElement(element);//sets editor what shows
        setDialogVisible(true);
    };

    const handleCancel = () => {
        return setDialogVisible(false);
    };

    const handleSave = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        return setDialogVisible(false);
    };

    const elementPrice = (element: any, underline: boolean) => (
        <DoubleTapButton onDoubleTap={() => showPriceEditor(element)}>
            <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
                <Text style={{fontSize: (size*0.56), textAlign: "center"}}>{prices[element]}</Text>
            </View>
        </DoubleTapButton>
    );

    const t = (value: any, underline: boolean) => (
        <View style={[{height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={[{fontSize: (size*0.56), padding: 2}]}>{value}</Text>
        </View>
    );

    const headText = (text: string) => (
        <View style={[styles.head, {height: '100%', borderBottomWidth: 2, justifyContent: 'center'}]}>
            <Text style={{ textAlign: 'center', width: 200, height: 184+(size/1.5),  transform: [{ rotate: '-90deg' }], fontSize: (size*0.56) }}>{text}</Text>
        </View>
    // text1: { textAlign: 'center', width: 200, height: 184+(size/1.5),  transform: [{ rotate: '-90deg' }], fontSize: (size*0.56) },

);

    const ObjectResize = () => {
        return StyleSheet.create({
            priceText: {
                textAlign: "center",
                fontSize: (size*0.56)
            },
            text1: { textAlign: 'center', width: 200, height: 184+(size/1.5),  transform: [{ rotate: '-90deg' }], fontSize: (size*0.56) },
            title1: { position: 'relative', flexDirection: 'column', flex: 9-((size/10)-2)},
            text: { fontSize: (size*0.56)},
            singleHead: {maxHeight: 10.5+(size*2), width: 100}
        })
    }



    let state = {
        tableTitle_1: [t('EUR A1', false), t('EUR A', false), t('EUR B', false), t('LPM', true), t('LSD', false), t('SD', false), t('SD AP', false), t('PM', false), t('KNAUF', true)],
        tableTitle_3: [t('LSD, FIN', false), t('SD, perimetriniai', false), t('PM, perimetriniai, SD AP', false), t('KNAUF', false), t('CP1', false), t('CP6', true)],
        tableTitle_4: [t('LSD, SD', false), t('CP3', false), t('CP9', true)],
        tableTitle_5: [t('PAROC', true)],
        tableTitle_6: [t('KNAUF', true)],
        tableTitle_7: [t('600x800', false), t('800x800', false), t('1100x1100', false), t('1000x1000', false), t('1200x1200', false), t('1000x1300', false), t('1200x1600', false), t('1600x3000', true)],
        tableTitle_8: [t('800x1200 (šviesūs)', false), t('800x1200 (tamsūs)', false), t('600x800 (šviesūs)', false), t('600x800 (tamsūs)', false), t('nestandartai 800x2000', true)],
        tableTitle_9: [t('800x1200', false), t('1000x1200', true)],
        tableTitle_10: [t('2,8 - 3,2', false), t('6 - 10', true)],
        tableTitle_11: [t('Padėklai', true)],
        tableData: [
                [elementCol('Kiekis')],
            [elementCol('Kaina € /vnt')],
            [elementCol('Suma')],
            [elementCol('Kiekis')],
            [elementCol('Kaina € /vnt')],
            [elementCol('Suma')],
        ],
        tableData_1: [
                [elementInput('s_a1', false), elementInput('s_a2', false), elementInput('s_b2', false), elementInput('s_lpm_800', true), elementInput('s_lsd_800', false), elementInput('s_sd_800', false), elementInput('s_ap_800', false), elementInput('s_pm_800', false), elementInput('s_knauf_800', true)],
            [elementPrice('s_a1', false), elementPrice('s_a2', false), elementPrice('s_b2', false), elementPrice('s_lpm_800', true), elementPrice('s_lsd_800', false), elementPrice('s_sd_800', false), elementPrice('s_ap_800', false), elementPrice('s_pm_800', false), elementPrice('s_knauf_800', true)],
            [elementResult('s_a1', false), elementResult('s_a2', false), elementResult('s_b2', false), elementResult('s_lpm_800', true), elementResult('s_lsd_800', false), elementResult('s_sd_800', false), elementResult('s_ap_800', false), elementResult('s_pm_800', false), elementResult('s_knauf_800', true)],
            [elementInput('r_a1', false), elementInput('r_a2', false), elementInput('r_b2', false), elementInput('r_lpm_800', true), elementInput('r_lsd_800', false), elementInput('r_sd_800', false), elementInput('r_ap_800', false), elementInput('r_pm_800', false), elementInput('r_knauf_800', true)],
            [elementPrice('r_a1', false), elementPrice('r_a2', false), elementPrice('r_b2', false), elementPrice('r_lpm_800', true), elementPrice('r_lsd_800', false), elementPrice('r_sd_800', false), elementPrice('r_ap_800', false), elementPrice('r_pm_800', false), elementPrice('r_knauf_800', true)],
            [elementResult('r_a1', false), elementResult('r_a2', false), elementResult('r_b2', false), elementResult('r_lpm_800', true), elementResult('r_lsd_800', false), elementResult('r_sd_800', false), elementResult('r_ap_800', false), elementResult('r_pm_800', false), elementResult('r_knauf_800', true)],
        ],
        tableData_3: [
            [elementInput('s_lsd_1000', false), elementInput('s_sd_1000', false), elementInput('s_pm_1000', false), elementInput('s_knauf_1000', false), elementInput('s_cp1_1000', false), elementInput('s_cp6_1000', true)],
            [elementPrice('s_lsd_1000', false), elementPrice('s_sd_1000', false), elementPrice('s_pm_1000', false), elementPrice('s_knauf_1000', false), elementPrice('s_cp1_1000', false), elementPrice('s_cp6_1000', true)],
            [elementResult('s_lsd_1000', false), elementResult('s_sd_1000', false), elementResult('s_pm_1000', false), elementResult('s_knauf_1000', false), elementResult('s_cp1_1000', false), elementResult('s_cp6_1000', true)],
            [elementInput('r_lsd_1000', false), elementInput('r_sd_1000', false), elementInput('r_pm_1000', false), elementInput('r_knauf_1000', false), elementInput('r_cp1_1000', false), elementInput('r_cp6_1000', true)],
            [elementPrice('r_lsd_1000', false), elementPrice('r_sd_1000', false), elementPrice('r_pm_1000', false), elementPrice('r_knauf_1000', false), elementPrice('r_cp1_1000', false), elementPrice('r_cp6_1000', true)],
            [elementResult('r_lsd_1000', false), elementResult('r_sd_1000', false), elementResult('r_pm_1000', false), elementResult('r_knauf_1000', false), elementResult('r_cp1_1000', false), elementResult('r_cp6_1000', true)],
        ],
        tableData_4: [
            [elementInput('s_sd_1140', false), elementInput('s_cp3_1140', false), elementInput('s_cp9_1140', true)],
            [elementPrice('s_sd_1140', false), elementPrice('s_cp3_1140', false), elementPrice('s_cp9_1140', true)],
            [elementResult('s_sd_1140', false), elementResult('s_cp3_1140', false), elementResult('s_cp9_1140', true)],
            [elementInput('r_sd_1140', false), elementInput('r_cp3_1140', false), elementInput('r_cp9_1140', true)],
            [elementPrice('r_sd_1140', false), elementPrice('r_cp3_1140', false), elementPrice('r_cp9_1140', true)],
            [elementResult('r_sd_1140', false), elementResult('r_cp3_1140', false), elementResult('r_cp9_1140', true)],
        ],
        tableData_5: [
            [elementInput('s_paroc', true)],
            [elementPrice('s_paroc', true)],
            [elementResult('s_paroc', true)],
            [elementInput('r_paroc', true)],
            [elementPrice('r_paroc', true)],
            [elementResult('r_paroc', true)],
        ],
        tableData_6: [
            [elementInput('s_knauf', true)],
            [elementPrice('s_knauf', true)],
            [elementResult('s_knauf', true)],
            [elementInput('r_knauf', true)],
            [elementPrice('r_knauf', true)],
            [elementResult('r_knauf', true)],
        ],
        tableData_7: [
            [elementInput('s_600x800', false), elementInput('s_800x800', false), elementInput('s_1100x1100', false), elementInput('s_1000x1000', false), elementInput('s_1200x1200', false), elementInput('s_1100x1300', false), elementInput('s_1200x1600', false), elementInput('s_1600x3000', true)],
            [elementPrice('s_600x800', false), elementPrice('s_800x800', false), elementPrice('s_1100x1100', false), elementPrice('s_1000x1000', false), elementPrice('s_1200x1200', false), elementPrice('s_1100x1300',false), elementPrice('s_1200x1600', false), elementPrice('s_1600x3000', true)],
            [elementResult('s_600x800', false), elementResult('s_800x800', false), elementResult('s_1100x1100', false), elementResult('s_1000x1000', false), elementResult('s_1200x1200', false), elementResult('s_1100x1300', false), elementResult('s_1200x1600', false), elementResult('s_1600x3000', true)],
            [elementInput('r_600x800', false), elementInput('r_800x800', false), elementInput('r_1100x1100', false), elementInput('r_1000x1000', false), elementInput('r_1200x1200', false), elementInput('r_1100x1300', false), elementInput('r_1200x1600', false), elementInput('r_1600x3000', true)],
            [elementPrice('r_600x800', false), elementPrice('r_800x800', false), elementPrice('r_1100x1100', false), elementPrice('r_1000x1000', false), elementPrice('r_1200x1200', false), elementPrice('r_1100x1300', false), elementPrice('r_1200x1600', false), elementPrice('r_1600x3000', true)],
            [elementResult('r_600x800', false), elementResult('r_800x800', false), elementResult('r_1100x1100', false), elementResult('r_1000x1000', false), elementResult('r_1200x1200', false), elementResult('r_1100x1300', false), elementResult('r_1200x1600', false), elementResult('r_1600x3000', true)],
        ],
        tableData_8: [
            [elementInput('s_apvadai_800x1200_white', false), elementInput('s_apvadai_800x1200_black', false), elementInput('s_apvadai_600x800_white', false), elementInput('s_apvadai_600x800_black', false), elementInput('s_apvadai_800x2000_mix', true)],
            [elementPrice('s_apvadai_800x1200_white', false), elementPrice('s_apvadai_800x1200_black', false), elementPrice('s_apvadai_600x800_white', false), elementPrice('s_apvadai_600x800_black', false), elementPrice('s_apvadai_800x2000_mix', true)],
            [elementResult('s_apvadai_800x1200_white', false), elementResult('s_apvadai_800x1200_black', false), elementResult('s_apvadai_600x800_white', false), elementResult('s_apvadai_600x800_black', false), elementResult('s_apvadai_800x2000_mix', true)],
            [elementInput('r_apvadai_800x1200_white', false), elementInput('r_apvadai_800x1200_black', false), elementInput('r_apvadai_600x800_white', false), elementInput('r_apvadai_600x800_black', false), elementInput('r_apvadai_800x2000_mix', true)],
            [elementPrice('r_apvadai_800x1200_white', false), elementPrice('r_apvadai_800x1200_black', false), elementPrice('r_apvadai_600x800_white', false), elementPrice('r_apvadai_600x800_black', false), elementPrice('r_apvadai_800x2000_mix', true)],
            [elementResult('r_apvadai_800x1200_white', false), elementResult('r_apvadai_800x1200_black', false), elementResult('r_apvadai_600x800_white', false), elementResult('r_apvadai_600x800_black', false), elementResult('r_apvadai_800x2000_mix', true)],
        ],
        tableData_9: [
            [elementInput('s_dekos_800x1200', false), elementInput('s_dekos_1000x1200', true)],
            [elementPrice('s_dekos_800x1200', false), elementPrice('s_dekos_1000x1200', true)],
            [elementResult('s_dekos_800x1200', false), elementResult('s_dekos_1000x1200', true)],
            [elementInput('r_dekos_800x1200', false), elementInput('r_dekos_1000x1200', true)],
            [elementPrice('r_dekos_800x1200', false), elementPrice('r_dekos_1000x1200', true)],
            [elementResult('r_dekos_800x1200', false), elementResult('r_dekos_1000x1200', true)],
        ],
        tableData_10: [
            [elementInput('s_plokste_800x1200_p', false), elementInput('s_plokste_800x1200_s', true)],
            [elementPrice('s_plokste_800x1200_p', false), elementPrice('s_plokste_800x1200_s', true)],
            [elementResult('s_plokste_800x1200_p', false), elementResult('s_plokste_800x1200_s', true)],
            [elementInput('r_plokste_800x1200_p', false), elementInput('r_plokste_800x1200_s', true)],
            [elementPrice('r_plokste_800x1200_p', false), elementPrice('r_plokste_800x1200_s', true)],
            [elementResult('r_plokste_800x1200_p', false), elementResult('r_plokste_800x1200_s', true)],
        ],
        tableData_11: [
            [elementInput('s_remontas', true)],
            [elementPrice('s_remontas', true)],
            [elementResult('s_remontas', true)],
            [elementInput('r_remontas', true)],
            [elementPrice('r_remontas', true)],
            [elementResult('r_remontas', true)],
        ]
    }


    const flex = [1, 1, 1, 1, 1, 1];



    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        onToggleSnackBar();
        Animated.timing(fadeAnim, {
            useNativeDriver: false,
            toValue: 1,
            duration: 1000
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            useNativeDriver: false,
            toValue: 0,
            duration: 1000
        }).start(() => {
            onToggleSnackBar();
        });
    };

    const ToggleVisible = () => {(!visible)? fadeIn() : fadeOut()};
    return (
        <View style={[styles.container]}>

            {/*price editor*/}
            <View>
                <Dialog.Container visible={dialogVisible}>
                    <Dialog.Title>Edit price</Dialog.Title>
                    <Dialog.Input  keyboardType={"phone-pad"} style={{width: 100, alignSelf: 'center', textAlign: 'center'}}>{prices[editElement]}</Dialog.Input>
                    <Dialog.Description>
                        {editElement}
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                    <Dialog.Button label="Save" onPress={handleSave} />
                </Dialog.Container>
            </View>

            <StatusBar style="dark" />
                {isMain && (
                    <>
                        <Button title='Generate Excel' onPress={shareExcel}/>
                            <TextLink onPress={() => setIsMain(false)}>
                                <TextLinkContent>New Buyer</TextLinkContent>
                            </TextLink>
                    </>
                )}
                {!isMain && (
                    <>

                        <TouchableOpacity onPress={() => ToggleVisible()} style={{ }}>
                            <Text style={ObjectResize().text}>{visible ? 'Hide' : 'Show'}</Text>
                        </TouchableOpacity>
                        <Text style={ObjectResize().text}>Viso prekių: {countTotal(number)}</Text>
                        <Text style={ObjectResize().text}>Viso EUR: {payTotal(number)}</Text>
                        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
                            {/* Left Wrapper */}
                                <TouchableOpacity style={ObjectResize().singleHead}>
                                        <Icon.Button
                                            name="printer"
                                            size={size*1.6}
                                            style={styles.singleHeadLeftSide}
                                            borderRadius={0}
                                            color={'red'}
                                            onPress={() => print(number, onChangeNumber, setIsMain)}
                                        >
                                        </Icon.Button>
                                </TouchableOpacity>
                                <TouchableOpacity style={[ObjectResize().singleHead, {borderTopWidth: 1, borderRightWidth: 1}]}>
                                    <Icon.Button
                                        name="delete"
                                        size={size*1.6}
                                        style={styles.singleHeadRightSide}
                                        borderRadius={0}
                                        color={'green'}
                                        onPress={() => destroy(onChangeNumber)}
                                    >
                                    </Icon.Button>
                                </TouchableOpacity>

                            {/* Right Wrapper */}
                            <TableWrapper style={{flex:1}}>
                                <Cols data={[['Sveiki'], ['Remontas']]} heightArr={[size]} style={{backgroundColor: '#c8e1ff', height: size}} textStyle={{ textAlign: 'center', fontWeight: "bold", fontSize: (size*0.56) }}/>
                                <Cols data={state.tableData} heightArr={[size+10]} flexArr={flex} textStyle={styles.text}/>

                            </TableWrapper>
                        </Table>
                    <ScrollView horizontal={false}>
                        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
                                    {/* Left Wrapper */}
                        <TableWrapper style={{width: 200}}>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={[headText('800x1200')]} heightArr={[9*size, 60]} />
                                <Col data={state.tableTitle_1} style={ObjectResize().title1} heightArr={[size, size, size, size, size, size, size, size, size]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={[headText('1000x1200')]} style={styles.head} heightArr={[6*size, 60]} textStyle={ObjectResize().text1} />
                                <Col data={state.tableTitle_3} style={ObjectResize().title1} heightArr={[size, size, size, size, size, size, size]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={[headText('1140')]} style={styles.head} heightArr={[3*size, 60]} textStyle={ObjectResize().text1} />
                                <Col data={state.tableTitle_4} style={ObjectResize().title1} heightArr={[size, size, size]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={[headText('')]} style={styles.head} heightArr={[size, 60]} textStyle={ObjectResize().text1} />
                                <Col data={state.tableTitle_5} style={ObjectResize().title1} heightArr={[size]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={[headText('')]} style={styles.head} heightArr={[size, 60]} textStyle={ObjectResize().text1} />
                                <Col data={state.tableTitle_6} style={ObjectResize().title1} heightArr={[size]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={[headText('Nestandartai')]} style={styles.head} heightArr={[8*size, 60]} textStyle={ObjectResize().text1} />
                                <Col data={state.tableTitle_7} style={ObjectResize().title1} heightArr={[size, size, size, size, size, size, size, size]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={[headText('Šarnyrai')]} style={styles.head} heightArr={[5*size, 60]} textStyle={ObjectResize().text1} />
                                <Col data={state.tableTitle_8} style={ObjectResize().title1} heightArr={[size, size, size, size, size]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={[headText('Dekos')]} style={styles.head} heightArr={[2*size, 60]} textStyle={ObjectResize().text1} />
                                <Col data={state.tableTitle_9} style={ObjectResize().title1} heightArr={[size, size]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={[headText('Plokštė')]} style={styles.head} heightArr={[2*size, 60]} textStyle={ObjectResize().text1} />
                                <Col data={state.tableTitle_10} style={ObjectResize().title1} heightArr={[size, size]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={[headText('')]} style={styles.head} heightArr={[size, 60]} textStyle={ObjectResize().text1} />
                                <Col data={state.tableTitle_11} style={ObjectResize().title1} heightArr={[size]} textStyle={styles.titleText}/>
                            </TableWrapper>
                        </TableWrapper>

                                    {/* Right Wrapper */}
                        <TableWrapper style={{flex:1}}>
                            <Cols data={state.tableData_1} heightArr={[size, size, size, size, size, size, size, size, size]} flexArr={flex} textStyle={ObjectResize().priceText}/>
                            <Cols data={state.tableData_3} heightArr={[size, size, size, size, size, size]} flexArr={flex} textStyle={ObjectResize().priceText}/>
                            <Cols data={state.tableData_4} heightArr={[size, size, size]} flexArr={flex} textStyle={ObjectResize().priceText}/>
                            <Cols data={state.tableData_5} heightArr={[size]} flexArr={flex} textStyle={ObjectResize().priceText}/>
                            <Cols data={state.tableData_6} heightArr={[size]} flexArr={flex} textStyle={ObjectResize().priceText}/>
                            <Cols data={state.tableData_7} heightArr={[size, size, size, size, size, size, size, size]} flexArr={flex} textStyle={ObjectResize().priceText}/>
                            <Cols data={state.tableData_8} heightArr={[size, size, size, size, size]} flexArr={flex} textStyle={ObjectResize().priceText}/>
                            <Cols data={state.tableData_9} heightArr={[size, size]} flexArr={flex} textStyle={ObjectResize().priceText}/>
                            <Cols data={state.tableData_10} heightArr={[size, size]} flexArr={flex} textStyle={ObjectResize().priceText}/>
                            <Cols data={state.tableData_11} heightArr={[size]} flexArr={flex} textStyle={ObjectResize().priceText}/>
                        </TableWrapper>

                    </Table>
                        <TextLink onPress={() => setIsMain(true)}>
                            <TextLinkContent>Back to main </TextLinkContent>
                        </TextLink>
                    </ScrollView>
                        {visible && ( <View style={[styles.settingsContainer, {top: StatusBarHeight+(height/2)}]}>
                            <Animated.View
                                style={[
                                    styles.fadingContainer,
                                    {
                                        // Bind opacity to animated value
                                        opacity: fadeAnim,
                                    }
                                ]}
                            >
                                <Text style={styles.sizeText}>Turinio dydis</Text>
                                <View style={styles.settings}>
                                    <Text style={styles.sizeValue}>{Math.round(size)}</Text>
                                    <Slider
                                        style={styles.slider}
                                        value={isTouchEnded ? size : size}//not done
                                        minimumValue={25}
                                        maximumValue={50}
                                        minimumTrackTintColor="#FFFFFF"
                                        maximumTrackTintColor="#000000"
                                        onTouchEnd={() => setIsTouchEnded(true)}
                                        onTouchStart={() => setIsTouchEnded(false)}
                                        onValueChange={newNumber => (!isTouchEnded)? setSize(newNumber) : setSize(size)}
                                        // onSlidingStart={newNumber => setSize(newNumber)}
                                        onSlidingComplete={newNumber => setSize(newNumber)}
                                    />
                                </View>
                            </Animated.View>
                        </View> ) }
                    </>
                )}
        </View>
    );
};
// console.log(Dimensions.get('window'))

const styles = StyleSheet.create({

    container: { flex: 1, padding: 16, paddingTop: 80 },
    singleHeadLeftSide: {width: 110, height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderTopWidth: 1,  },
    singleHeadRightSide: {width: 110, height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' },
    head: { flex: 1, backgroundColor: '#D0D0D0FF'},
    line: { position: 'absolute', flexDirection: 'column',  top: 75, width: 60, right: 0 },
    title2: { position: 'absolute', flexDirection: 'column', top: 76, width: 60, right: 0 },
    // title3: {  width: 60, right: 0 },
    titleText: { marginRight: 6, textAlign:'right' },
    text: { textAlign: 'center' },
    content: {
        paddingTop: 0,
        paddingHorizontal: 0,
    },
    title: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 0
    },
    textField: {
        backgroundColor: '#f3dd90',
        marginBottom: 0,
        width: '100%',
        height: '100%'

    },

    // colBlue: { textAlign: 'center' },
    colBlue: {
        backgroundColor: '#c8e1ff', flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', },
    colYellow: {
        backgroundColor: '#f3dd90', flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', },
    colResult: {
        alignItems: 'center',
    },
    btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
    btnText: { textAlign: 'center' },
    table: { borderLeftWidth: 10, borderColor: "#000000" },
    effect: {
        flex: 1,
        alignItems: 'center',
    },
    Player: {
        position: "absolute",
        bottom: 100
    },
    Buy: {
        position: "absolute",
        top: 100
    },



    fadingContainer: {
        padding: 20,
        backgroundColor: 'rgba(208,222,222,0.9)',
        borderWidth: 1,
        borderRadius: 5
    },
    fadingText: {
        fontSize: 28
    },
    buttonRow: {
        flexBasis: 100,
        justifyContent: "space-evenly",
        marginVertical: 16
    },
    settingsContainer: {zIndex: 1,
        position: 'absolute',
        alignSelf: 'center'
    },
    settings: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'},
    sizeText: {textAlign: "center", fontWeight: 'bold'},
    sizeValue: {paddingBottom: 2},
    slider: {width: 200, height: 40}
});

export default Buy;