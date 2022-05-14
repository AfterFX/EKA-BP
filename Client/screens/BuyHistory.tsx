/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';

const Separator = (props) =>
    <View style={{ height: '100%', width: 1, backgroundColor: 'grey' }} />

export default class App extends Component {
    constructor(props) {
        super(props);

        this.fields = [
            { key: 'code', title: 'MARCA', width: 200 },
            { key: 'responsable', title: 'RESPONSABLE', width: 150 },
            { key: 'piezas', title: 'PZA', width: 100 },
            { key: 'peso', title: 'KG', width: 100 },
            { key: 'inicio', title: 'INICIO', width: 100 },
            { key: 'termino', title: 'ENTREGA', width: 100 },
            { key: 'hab', title: 'HABILITADO', width: 100 },
            { key: 'arm', title: 'ARMADO', width: 100 },
            { key: 'bar', title: 'BARRENADO', width: 100 },
            { key: 'sol', title: 'SOLDADO', width: 100 },
            { key: 'insp', title: 'LIBERACIÓN', width: 100 },
        ];

        this.rows = Array.apply(null, Array(125)).map(
            (item, idx) => ({
                code: `TEST-MARK-AREA-X-ITEM-${idx}`,
                responsable: `RESPONSABLE-${idx}`,
                piezas: 1,
                peso: idx * 312,
                inicio: '2019-02-01',
                termino: '2019-04-30',
                hab: 0,
                arm: 0,
                bar: 0,
                sol: 0,
                insp: 0,
            })
        );

        this.state = {
            data: this.rows.map(row =>
                this.fields.map(field => row[field.key])
            ),
            tableHead: this.fields.map(field => field.title),
            widthArr: this.fields.map(field => field.width)
        };
    }


    render() {
        const fields = this.state.data;
        const state = this.state;
        const tableData = [];
        for (let i = 0; i < this.rows.length; i += 1) {
            const rowData = [];
            for (let j = 0; j < this.fields.length; j += 1) {
                rowData.push(`${i}:${j}`);
            }
            tableData.push(rowData);
        }

        return (
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{borderColor: '#C1C0B9'}}>
                            <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.headerText}/>
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderColor: '#C1C0B9'}}>
                                {
                                    tableData.map((rowData, index) => (
                                        <Row
                                            key={index}
                                            data={this.state.data[index]}
                                            widthArr={state.widthArr}
                                            style={[styles.row, index%2 && {backgroundColor: '#212733'}]}
                                            textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#212732'
    },
    header: {
        height: 50,
        backgroundColor: '#242b38'
    },
    headerText: {
        textAlign: 'center',
        fontWeight: '100',
        color: 'white',
    },
    text: {
        textAlign: 'center',
        fontWeight: '100',
        color: '#fefefe',
    },
    dataWrapper: {
        marginTop: -1
    },
    row: {
        height: 40,
        backgroundColor: '#2c3445'
    }
});
