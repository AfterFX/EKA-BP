import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
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
    ScrollView, TextInput
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
    Line, TextLinkContent, TextLink,
} from '../components/styles';


import {useState} from "react";
import createDynamicTable from "../components/printTable";
import prices from "../price.json";
import {price, payTotal, countTotal, print, destroy} from "../components/functions";
import TextField from "../components/TextField";


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

    const elementCol = (value: any) => (
            <View style={styles.colBlue}>
                <Text>{value}</Text>
            </View>
    );


    const handleChange = (name: any, value: any) => {
        onChangeNumber({
            ...number,
            [name]: value,
        });
    };
    const elementInput = (id: any) =>{
    return (

            <TextField
                style={styles.textField}
                value={number[id]}
                label=""
                errorText={error}
                onChangeText={newNumber => handleChange(id, newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />

    )};

    const elementResult = (element: any) =>{
        return (
            <View style={styles.colResult}>
                <Text>{price(element, number)}</Text>
            </View>
        )
    };




    const t = (value: any) => (
        <View>
            <Text>{value}</Text>
        </View>
    );


    let state = {
        tableTitle_1: [t('EUR A1'), t('EUR A'), t('EUR B')],
        tableTitle_2: [t('LPM'), t('LSD'), t('SD'), t('SD AP'), t('PM'), t('KNAUF')],
        tableTitle_3: ['', t('LSD, FIN'), t('SD, PRM'), t('PM, PRM'), t('KNAUF'), t('CP1'), t('CP6')],
        tableTitle_4: ['', t('LSD, SD'), t('CP3'), t('CP9')],
        tableTitle_5: ['', t('PAROC')],
        tableTitle_6: ['', t('KNAUF')],
        tableTitle_7: ['', t('6x8'), t('8x8'), t('11x11'), t('1x1'), t('12x12'), t('1x13'), t('12x16'), t('16x30')],
        tableTitle_8: ['', t('šviesūs'), t('tamsūs'), t('šviesūs'), t('tamsūs'), t('800x2000')],
        tableTitle_9: ['', t('8x12'), t('1x12')],
        tableTitle_10: ['', t('2,8 - 3,2'), t('6 - 10')],
        tableTitle_11: ['', t('Padėklai')],
        tableData: [
                [elementCol('Kiekis')],
            [elementCol('Kaina € /vnt')],
            [elementCol('Suma')],
            [elementCol('Kiekis')],
            [elementCol('Kaina € /vnt')],
            [elementCol('Suma')],
        ],
        tableData_1: [
                [elementInput('s_a1'), elementInput('s_a2'), elementInput('s_b2')],
            [prices['s_a1'], prices['s_a2'], prices['s_b2']],
            [elementResult('s_a1'), elementResult('s_a2'), elementResult('s_b2')],
            [elementInput('r_a1'), elementInput('r_a2'), elementInput('r_b2')],
            [prices['r_a1'], prices['r_a2'], prices['r_b2']],
            [elementResult('r_a1'), elementResult('r_a2'), elementResult('r_b2')],
        ],
        tableData_2: [
            ['', elementInput('s_lpm_800'), elementInput('s_lsd_800'), elementInput('s_sd_800'), elementInput('s_ap_800'), elementInput('s_pm_800'), elementInput('s_knauf_800')],
            ['', prices['s_lpm_800'], prices['s_lsd_800'], prices['s_sd_800'], prices['s_ap_800'], prices['s_pm_800'], prices['s_knauf_800']],
            ['', elementResult('s_lpm_800'), elementResult('s_lsd_800'), elementResult('s_sd_800'), elementResult('s_ap_800'), elementResult('s_pm_800'), elementResult('s_knauf_800')],
            ['', elementInput('r_lpm_800'), elementInput('r_lsd_800'), elementInput('r_sd_800'), elementInput('r_ap_800'), elementInput('r_pm_800'), elementInput('r_knauf_800')],
            ['', prices['r_lpm_800'], prices['r_lsd_800'], prices['r_sd_800'], prices['r_ap_800'], prices['r_pm_800'], prices['r_knauf_800']],
            ['', elementResult('r_lpm_800'), elementResult('r_lsd_800'), elementResult('r_sd_800'), elementResult('r_ap_800'), elementResult('r_pm_800'), elementResult('r_knauf_800')],
        ],
        tableData_3: [
            ['', elementInput('s_lsd_1000'), elementInput('s_sd_1000'), elementInput('s_pm_1000'), elementInput('s_knauf_1000'), elementInput('s_cp1_1000'), elementInput('s_cp6_1000')],
            ['', prices['s_lsd_1000'], prices['s_sd_1000'], prices['s_pm_1000'], prices['s_knauf_1000'], prices['s_cp1_1000'], prices['s_cp6_1000']],
            ['', elementResult('s_lsd_1000'), elementResult('s_sd_1000'), elementResult('s_pm_1000'), elementResult('s_knauf_1000'), elementResult('s_cp1_1000'), elementResult('s_cp6_1000') ],
            ['', elementInput('r_lsd_1000'), elementInput('r_sd_1000'), elementInput('r_pm_1000'), elementInput('r_knauf_1000'), elementInput('r_cp1_1000'), elementInput('r_cp6_1000')],
            ['', prices['r_lsd_1000'], prices['r_sd_1000'], prices['r_pm_1000'], prices['r_knauf_1000'], prices['r_cp1_1000'], prices['r_cp6_1000']],
            ['', elementResult('r_lsd_1000'), elementResult('r_sd_1000'), elementResult('r_pm_1000'), elementResult('r_knauf_1000'), elementResult('r_cp1_1000'), elementResult('r_cp6_1000')],
        ],
        tableData_4: [
            ['', elementInput('s_sd_1140'), elementInput('s_cp3_1140'), elementInput('s_cp9_1140')],
            ['', prices['s_sd_1140'], prices['s_cp3_1140'], prices['s_cp9_1140']],
            ['', elementResult('s_sd_1140'), elementResult('s_cp3_1140'), elementResult('s_cp9_1140')],
            ['', elementInput('r_sd_1140'), elementInput('r_cp3_1140'), elementInput('r_cp9_1140')],
            ['', prices['r_sd_1140'], prices['r_cp3_1140'], prices['r_cp9_1140']],
            ['', elementResult('r_sd_1140'), elementResult('r_cp3_1140'), elementResult('r_cp9_1140')],
        ],
        tableData_5: [
            ['', elementInput('s_paroc')],
            ['', prices['s_paroc']],
            ['', elementResult('s_paroc')],
            ['', elementInput('r_paroc')],
            ['', prices['r_paroc']],
            ['', elementResult('r_paroc')],
        ],
        tableData_6: [
            ['', elementInput('s_knauf')],
            ['', prices['s_knauf']],
            ['', elementResult('s_knauf')],
            ['', elementInput('r_knauf')],
            ['', prices['r_knauf']],
            ['', elementResult('r_knauf')],
        ],
        tableData_7: [
            ['', elementInput('s_600x800'), elementInput('s_800x800'), elementInput('s_1100x1100'), elementInput('s_1000x1000'), elementInput('s_1200x1200'), elementInput('s_1100x1300'), elementInput('s_1200x1600'), elementInput('s_1600x3000')],
            ['', prices['s_600x800'], prices['s_800x800'], prices['s_1100x1100'], prices['s_1000x1000'], prices['s_1200x1200'], prices['s_1100x1300'], prices['s_1200x1600'], prices['s_1600x3000']],
            ['', elementResult('s_600x800'), elementResult('s_800x800'), elementResult('s_1100x1100'), elementResult('s_1000x1000'), elementResult('s_1200x1200'), elementResult('s_1100x1300'), elementResult('s_1200x1600'), elementResult('s_1600x3000')],
            ['', elementInput('r_600x800'), elementInput('r_800x800'), elementInput('r_1100x1100'), elementInput('r_1000x1000'), elementInput('r_1200x1200'), elementInput('r_1100x1300'), elementInput('r_1200x1600'), elementInput('r_1600x3000')],
            ['', prices['r_600x800'], prices['r_800x800'], prices['r_1100x1100'], prices['r_1000x1000'], prices['r_1200x1200'], prices['r_1100x1300'], prices['r_1200x1600'], prices['r_1600x3000']],
            ['', elementResult('r_600x800'), elementResult('r_800x800'), elementResult('r_1100x1100'), elementResult('r_1000x1000'), elementResult('r_1200x1200'), elementResult('r_1100x1300'), elementResult('r_1200x1600'), elementResult('r_1600x3000')],
        ],
        tableData_8: [
            ['', elementInput('s_apvadai_800x1200_white'), elementInput('s_apvadai_800x1200_black'), elementInput('s_apvadai_600x800_white'), elementInput('s_apvadai_600x800_black'), elementInput('s_apvadai_800x2000_mix')],
            ['', prices['s_apvadai_800x1200_white'], prices['s_apvadai_800x1200_black'], prices['s_apvadai_600x800_white'], prices['s_apvadai_600x800_black'], prices['s_apvadai_800x2000_mix']],
            ['', elementResult('s_apvadai_800x1200_white'), elementResult('s_apvadai_800x1200_black'), elementResult('s_apvadai_600x800_white'), elementResult('s_apvadai_600x800_black'), elementResult('s_apvadai_800x2000_mix')],
            ['', elementInput('r_apvadai_800x1200_white'), elementInput('r_apvadai_800x1200_black'), elementInput('r_apvadai_600x800_white'), elementInput('r_apvadai_600x800_black'), elementInput('r_apvadai_800x2000_mix')],
            ['', prices['r_apvadai_800x1200_white'], prices['r_apvadai_800x1200_black'], prices['r_apvadai_600x800_white'], prices['r_apvadai_600x800_black'], prices['r_apvadai_800x2000_mix']],
            ['', elementResult('r_apvadai_800x1200_white'), elementResult('r_apvadai_800x1200_black'), elementResult('r_apvadai_600x800_white'), elementResult('r_apvadai_600x800_black'), elementResult('r_apvadai_800x2000_mix')],
        ],
        tableData_9: [
            ['', elementInput('s_dekos_800x1200'), elementInput('s_dekos_1000x1200')],
            ['', prices['s_dekos_800x1200'], prices['s_dekos_1000x1200']],
            ['', elementResult('s_dekos_800x1200'), elementResult('s_dekos_1000x1200')],
            ['', elementInput('r_dekos_800x1200'), elementInput('r_dekos_1000x1200')],
            ['', prices['r_dekos_800x1200'], prices['r_dekos_1000x1200']],
            ['', elementResult('r_dekos_800x1200'), elementResult('r_dekos_1000x1200')],
        ],
        tableData_10: [
            ['', elementInput('s_plokste_800x1200_p'), elementInput('s_plokste_800x1200_s')],
            ['', prices['s_plokste_800x1200_p'], prices['s_plokste_800x1200_s']],
            ['', elementResult('s_plokste_800x1200_p'), elementResult('s_plokste_800x1200_s')],
            ['', elementInput('r_plokste_800x1200_p'), elementInput('r_plokste_800x1200_s')],
            ['', prices['r_plokste_800x1200_p'], prices['r_plokste_800x1200_s']],
            ['', elementResult('r_plokste_800x1200_p'), elementResult('r_plokste_800x1200_s')],
        ],
        tableData_11: [
            ['', elementInput('s_remontas')],
            ['', prices['s_remontas']],
            ['', elementResult('s_remontas')],
            ['', elementInput('r_remontas')],
            ['', prices['r_remontas']],
            ['', elementResult('r_remontas')],
        ]
    }

    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const { width } = useWindowDimensions();
    const flex = [1, 1, 1, 1, 1, 1];

    return (
        <View style={styles.container}>
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
                        <Text>bendras kiekis: {countTotal(number)}</Text>
                        <Text>bendra suma: {payTotal(number)}</Text>
                        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
                            {/* Left Wrapper */}

                                <TouchableOpacity onPress={() => print(number)}>
                                    <TableWrapper style={{width: 40, position: "relative"}}>
                                        <Cell data="Print" style={styles.singleHead}/>
                                    </TableWrapper>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => destroy(onChangeNumber)}>
                                    <TableWrapper style={{width: 40, position: "relative"}}>
                                        <Cell data="Destroy" style={styles.singleHead}/>
                                    </TableWrapper>
                                </TouchableOpacity>



                            {/* Right Wrapper */}
                            <TableWrapper style={{flex:1}}>
                                <Cols data={[['Sveiki'], ['Remontas']]} heightArr={[20]} style={styles.styleCol1} textStyle={styles.textCol1}/>
                                <Cols data={state.tableData} heightArr={[40, 25, 25, 25]} flexArr={flex} textStyle={styles.text}/>

                            </TableWrapper>
                        </Table>
                    <ScrollView horizontal={false}>
                        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
                                    {/* Left Wrapper */}
                        <TableWrapper style={{width: 80}}>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={['1200x800']} style={styles.head} heightArr={[226, 60]} textStyle={styles.text1} />
                                <Col data={state.tableTitle_1} style={styles.title1} heightArr={[25, 25, 25]} textStyle={styles.titleText}/>
                                <Col data={['']} style={styles.line} heightArr={[2]} textStyle={styles.titleText}/>
                                <Col data={state.tableTitle_2} style={styles.title2} heightArr={[25, 25, 25, 25, 25, 25]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={['1200x1000']} style={styles.head} heightArr={[151, 60]} textStyle={styles.text1} />
                                <Col data={state.tableTitle_3} style={styles.title1} heightArr={[1, 25, 25, 25, 25, 25, 25]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={['1140']} style={styles.head} heightArr={[76, 60]} textStyle={styles.text1} />
                                <Col data={state.tableTitle_4} style={styles.title1} heightArr={[1, 25, 25, 25]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={['']} style={styles.head} heightArr={[26, 60]} textStyle={styles.text1} />
                                <Col data={state.tableTitle_5} style={styles.title1} heightArr={[1, 25, 25, 25]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={['']} style={styles.head} heightArr={[26, 60]} textStyle={styles.text1} />
                                <Col data={state.tableTitle_6} style={styles.title1} heightArr={[1, 25, 25, 25]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={['Nestandartai']} style={styles.head} heightArr={[201, 60]} textStyle={styles.textNstandart} />
                                <Col data={state.tableTitle_7} style={styles.title1} heightArr={[1, 25, 25, 25, 25, 25, 25, 25, 25]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={['Šarnyrai']} style={styles.head} heightArr={[126, 60]} textStyle={styles.text1} />
                                <Col data={state.tableTitle_8} style={styles.title1} heightArr={[1, 25, 25, 25, 25, 25, 25, 25]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={['Dekos']} style={styles.head} heightArr={[51, 60]} textStyle={styles.text1} />
                                <Col data={state.tableTitle_9} style={styles.title1} heightArr={[1, 25, 25, 25, 25, 25, 25, 25]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={['Plokštė']} style={styles.head} heightArr={[51, 60]} textStyle={styles.text1} />
                                <Col data={state.tableTitle_10} style={styles.title1} heightArr={[1, 25, 25, 25, 25, 25, 25, 25]} textStyle={styles.titleText}/>
                            </TableWrapper>
                            <TableWrapper style={{flexDirection: 'row'}}>
                                <Col data={['']} style={styles.head} heightArr={[26, 60]} textStyle={styles.text1} />
                                <Col data={state.tableTitle_11} style={styles.title1} heightArr={[1, 25, 25, 25, 25, 25, 25, 25]} textStyle={styles.titleText}/>
                            </TableWrapper>
                        </TableWrapper>

                                    {/* Right Wrapper */}
                        <TableWrapper style={{flex:1}}>
                            <Cols data={state.tableData_1} heightArr={[25, 25, 25]} flexArr={flex} textStyle={styles.text}/>
                            <Cols data={state.tableData_2} heightArr={[1, 25, 25, 25, 25, 25, 25]} flexArr={flex} textStyle={styles.text}/>
                            <Cols data={state.tableData_3} heightArr={[1, 25, 25, 25, 25, 25, 25]} flexArr={flex} textStyle={styles.text}/>
                            <Cols data={state.tableData_4} heightArr={[1, 25, 25, 25]} flexArr={flex} textStyle={styles.text}/>
                            <Cols data={state.tableData_5} heightArr={[1, 25]} flexArr={flex} textStyle={styles.text}/>
                            <Cols data={state.tableData_6} heightArr={[1, 25]} flexArr={flex} textStyle={styles.text}/>
                            <Cols data={state.tableData_7} heightArr={[1, 25, 25, 25, 25, 25, 25, 25, 25, 25]} flexArr={flex} textStyle={styles.text}/>
                            <Cols data={state.tableData_8} heightArr={[1, 25, 25, 25, 25, 25]} flexArr={flex} textStyle={styles.text}/>
                            <Cols data={state.tableData_9} heightArr={[1, 25, 25, 25]} flexArr={flex} textStyle={styles.text}/>
                            <Cols data={state.tableData_10} heightArr={[1, 25, 25]} flexArr={flex} textStyle={styles.text}/>
                            <Cols data={state.tableData_11} heightArr={[1, 25]} flexArr={flex} textStyle={styles.text}/>
                        </TableWrapper>

                    </Table>
                        <TextLink onPress={() => setIsMain(true)}>
                            <TextLinkContent>Back to main </TextLinkContent>
                        </TextLink>
                    </ScrollView>
                    </>
                )}
        </View>
    );
};
// console.log(Dimensions.get('window'))

const styles = StyleSheet.create({

    container: { flex: 1, padding: 16, paddingTop: 80 },
    singleHead: { width: 80, height: 60 },
    head: { flex: 1, backgroundColor: '#D0D0D0FF'},
    line: { position: 'absolute', flexDirection: 'column',  top: 75, width: 60, right: 0 },
    title1: { position: 'relative', flexDirection: 'column', flex: 3},
    title2: { position: 'absolute', flexDirection: 'column', top: 76, width: 60, right: 0 },
    // title3: {  width: 60, right: 0 },
    titleText: { marginRight: 6, textAlign:'right' },
    text: { textAlign: 'center' },
    text1: { textAlign: 'center', width: 71, height: 70,  transform: [{ rotate: '-90deg' }] },
    textNstandart: { textAlign: 'center', width: 82, height: 82,  transform: [{ rotate: '-90deg' }] },
    content: {
        paddingTop: 0,
        paddingHorizontal: 0,
    },
    title: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    textField: {
        backgroundColor: '#f3dd90',
        marginBottom: 0,

    },
    styleCol1: { backgroundColor: '#c8e1ff' },
    textCol1: { textAlign: 'center', fontWeight: "bold" },


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
});

export default Buy;