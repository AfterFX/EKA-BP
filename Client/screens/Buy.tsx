import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View, StyleSheet, Button, Dimensions, Platform, TouchableOpacity, ImageBackground} from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

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
  Line,
} from '../components/styles';


import {
    attack,
    AnimValues,
    Avoid,
    AnimationStates,
    HealthBar
} from '../components/Animation'

// credentials context
import { Health } from '../components/Health';



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


const Buy = () => {
    const [selectedPrinter, setSelectedPrinter] = React.useState();

    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url, // iOS only
        });
    }

    const printToFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({
            html
        });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: 'com.microsoft.excel.xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', });
    }

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
    }

    return (
        <View style={styles.container}>
            <Button title='Generate Excel' onPress={shareExcel} />
        </View>
    );
};
// console.log(Dimensions.get('window'))
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#196b61',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    skill_radius: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 40,
        width: 40

    },
    skillsContainer: {
        display: "flex",
        position: "absolute",
        width: (Dimensions.get('window').width),
        height: 60,
        bottom: 10,
        maxWidth: 400,
        backgroundColor: '#726477',
        borderWidth: 2,
        borderColor: '#ffffff',


    },
    skills: {
        alignItems: 'center',
        flex:2,
        flexDirection:"row",
        justifyContent:'space-between',
        paddingLeft: 2,
        paddingRight: 2
    },
    skill_title: {
        fontSize: 8,
        color: "#fff",
        borderBottomWidth: 2,
        borderRightWidth: 2,
        width: 25,
        borderColor: "#ee8989"
    },
    skillImage: {
        height: 50,
        width: 50
    },
    meteor: {
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: '#ff592c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    damageContainer: {
        position: "absolute",
        marginTop: -20,
        marginLeft: 50
    },
    damageText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#ffffff"
    }
});

export default Buy;