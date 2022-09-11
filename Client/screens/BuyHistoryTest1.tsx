import * as React from 'react';
import {View, StyleSheet, Button, TouchableOpacity, Dimensions, Alert} from 'react-native';
import { Chip, Text } from 'react-native-paper';
import Datatable from './Datatable';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import {saveNewPrice} from "../components/functions";
import Dialog from "react-native-dialog";
import {Cell, Col, Cols, Row, Rows, Table, TableWrapper} from "react-native-table-component";


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data : null,
            table: {},
            dialogVisible: false,
            tableTitle: ['A1', 'A2', 'B', '', 'LSD', 'SD', 'SD AP', 'PM', 'KNAUF', '', 'LSD, FIN', 'SD, perimetriniai', 'PM, perimetriniai, SD AP', '', 'CP1', 'CP6'],
            tableData: [
                ['kiekis', '0', '0', '0', '', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '0', '0'],
                ['kaina',  '1', '1', '1', '', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1'],
                ['viso',   '0', '0', '0', '', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '0', '0'],
                ['kiekis', '0', '0', '0', '', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '0', '0'],
                ['kaina',  '1', '1', '1', '', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1'],
                ['viso',   '0', '0', '0', '', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '0', '0']
            ]
        };
    }


    componentDidMount() {
        this.history().then(r => this.setState({ data : r }));

    }

    // componentDidUpdate(previousState){
    //     if(previousState.data !== this.state.data){
    //         // this.setState({
    //         //     data: this.state.data
    //         // });
    //         console.log("aaaa")
    //     }
    // }

    elementButton = (value) => (

            <View>
                <Text>text</Text>
            </View>

    );

    _alertIndex(value) {
        Alert.alert(`This is column ${value}`);
    }

    showPriceEditor = async () => {
        this.setState({ dialogVisible: true })
    }
    handleCancel = async () => {
        this.setState({ dialogVisible: false })
    };

    history = async () => {
        return  await AsyncStorage.getItem('@BuyHistory')
        // console.log(JSON.parse([BuyHistory]))
    }
    handleSave = async () => {
        // await saveNewPrice(this.state.editableProperty, this.state.OnChangePrice)
        // await this.getStorage();//Refreshing numbers after save
        return this.setState({ dialogVisible: false })
    };


    resultOfTheDay = () => {
        let content = JSON.parse(this.state.data);
        const table: never[] = [];

        const generateState = (property: string, units: number) =>  {
            return this.setState((previousState) => {
                return {
                    table: {
                        ...previousState.table,
                        [property]: {
                            units: units
                        }
                    }
                }
            })
        }


        content.map(function(arr: any){
            Object.entries(arr.table).forEach(([key, val]) => {
                table.push({
                    table: {
                        [key]:{
                            units: content.reduce((total, thing) => {
                                generateState(key, total + (thing.table[key]?.units != undefined ? Number(thing.table[key]?.units) : 0))
                                return total + (thing.table[key]?.units != undefined ? Number(thing.table[key]?.units) : 0)
                            }, 0),
                        }
                    }

                });
            });
        })
    }

    render() {
        /*let datatable = Array(21)
          .fill()
          .map((obj, id) => ({
            id: id + 1,
            email: 'email' + (id + 1) + '@host.com',
          }));*/

        let datatable = [
            {
                _id: '5d406a171ed43384972f04b5',
                index: 0,
                age: 28,
                eyeColor: 'brown',
                name: {
                    first: 'Myra',
                    last: 'Navarro',
                },
                company: 'SUSTENZA',
                email: 'myra.navarro@sustenza.net',
            },
            {
                _id: '5d406a170db0f4b04d9a9acf',
                index: 1,
                age: 23,
                eyeColor: 'blue',
                name: {
                    first: 'Harriett',
                    last: 'Tanner',
                },
                company: 'VALPREAL',
                email: 'harriett.tanner@valpreal.com',
            },
            {
                _id: '5d406a17e95da8ff80a759c5',
                index: 2,
                age: 39,
                eyeColor: 'blue',
                name: {
                    first: 'Vega',
                    last: 'Hanson',
                },
                company: 'BEDLAM',
                email: 'vega.hanson@bedlam.tv',
            },
            {
                _id: '5d406a175505da190e6875ec',
                index: 3,
                age: 31,
                eyeColor: 'blue',
                name: {
                    first: 'Rosemary',
                    last: 'Fields',
                },
                company: 'QUAILCOM',
                email: 'rosemary.fields@quailcom.me',
            },
            {
                _id: '5d406a17ea96044c027f4e50',
                index: 4,
                age: 27,
                eyeColor: 'brown',
                name: {
                    first: 'Dale',
                    last: 'Wilkinson',
                },
                company: 'QIAO',
                email: 'dale.wilkinson@qiao.org',
            },
            {
                _id: '5d406a17c5fff1ff6653a555',
                index: 5,
                age: 25,
                eyeColor: 'blue',
                name: {
                    first: 'Beatrice',
                    last: 'Contreras',
                },
                company: 'ZENOLUX',
                email: 'beatrice.contreras@zenolux.us',
            },
            {
                _id: '5d406a17a199efcba25e1f26',
                index: 6,
                age: 34,
                eyeColor: 'blue',
                name: {
                    first: 'Hancock',
                    last: 'Wynn',
                },
                company: 'PLASMOS',
                email: 'hancock.wynn@plasmos.co.uk',
            },
            {
                _id: '5d406a17019a2a4544a4f134',
                index: 7,
                age: 40,
                eyeColor: 'blue',
                name: {
                    first: 'Brown',
                    last: 'Stanton',
                },
                company: 'SNACKTION',
                email: 'brown.stanton@snacktion.name',
            },
            {
                _id: '5d406a17e516dd71af8210d4',
                index: 8,
                age: 39,
                eyeColor: 'blue',
                name: {
                    first: 'Barnes',
                    last: 'Dunn',
                },
                company: 'PORTALINE',
                email: 'barnes.dunn@portaline.ca',
            },
            {
                _id: '5d406a17516936a025b73c33',
                index: 9,
                age: 34,
                eyeColor: 'green',
                name: {
                    first: 'Blanche',
                    last: 'Cherry',
                },
                company: 'ISOSWITCH',
                email: 'blanche.cherry@isoswitch.io',
            },
            {
                _id: '5d406a17527a4d2c6a7897dd',
                index: 10,
                age: 33,
                eyeColor: 'blue',
                name: {
                    first: 'Gilliam',
                    last: 'Farley',
                },
                company: 'AMTAS',
                email: 'gilliam.farley@amtas.biz',
            },
            {
                _id: '5d406a175ff11478c416c30b',
                index: 11,
                age: 26,
                eyeColor: 'brown',
                name: {
                    first: 'Laura',
                    last: 'Short',
                },
                company: 'FISHLAND',
                email: 'laura.short@fishland.info',
            },
            {
                _id: '5d406a1738181b471847339a',
                index: 12,
                age: 20,
                eyeColor: 'brown',
                name: {
                    first: 'Moreno',
                    last: 'Barber',
                },
                company: 'KEENGEN',
                email: 'moreno.barber@keengen.net',
            },
            {
                _id: '5d406a17a6bcae6fe3ad1735',
                index: 13,
                age: 30,
                eyeColor: 'brown',
                name: {
                    first: 'Fischer',
                    last: 'French',
                },
                company: 'INCUBUS',
                email: 'fischer.french@incubus.com',
            },
            {
                _id: '5d406a17600ca53e8f63f263',
                index: 14,
                age: 30,
                eyeColor: 'brown',
                name: {
                    first: 'Donaldson',
                    last: 'Carr',
                },
                company: 'SUNCLIPSE',
                email: 'donaldson.carr@sunclipse.tv',
            },
            {
                _id: '5d406a17530655789a27174f',
                index: 15,
                age: 35,
                eyeColor: 'green',
                name: {
                    first: 'Sophia',
                    last: 'Payne',
                },
                company: 'PRISMATIC',
                email: 'sophia.payne@prismatic.me',
            },
            {
                _id: '5d406a175dbc687b4c7669d8',
                index: 16,
                age: 34,
                eyeColor: 'green',
                name: {
                    first: 'Simone',
                    last: 'Pollard',
                },
                company: 'DIGIGEN',
                email: 'simone.pollard@digigen.org',
            },
            {
                _id: '5d406a179f35ed326a6a5567',
                index: 17,
                age: 28,
                eyeColor: 'green',
                name: {
                    first: 'Yvette',
                    last: 'Daugherty',
                },
                company: 'CHILLIUM',
                email: 'yvette.daugherty@chillium.us',
            },
        ];



        let page = 1;

        return (
            <View style={styles.container}>
                <View>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <View style={{width: window.width-50}}>
                            <Dialog.Title>Edit price</Dialog.Title>
                            <Dialog.Description>
                                <View style={styles.table_container}>
                                    <Table style={{flexDirection: 'row', width: window.width-100}} borderStyle={{borderWidth: 1}}>
                                        {/* Left Wrapper */}
                                        <TableWrapper style={{width: 160}}>
                                            <Cell data="" style={styles.singleHead}/>
                                            <TableWrapper style={{flexDirection: 'row'}}>
                                                <Col data={['H1', 'H2', 'H3']} style={styles.head} heightArr={[120, 150, 150]} textStyle={styles.text} />
                                                <Col data={this.state.tableTitle} style={styles.title} heightArr={[30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]} textStyle={styles.titleText}/>
                                            </TableWrapper>
                                        </TableWrapper>

                                        {/* Right Wrapper */}
                                        <TableWrapper style={{flex:1}}>
                                            <Cols data={this.state.tableData} heightArr={[40, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]} textStyle={styles.text}/>
                                        </TableWrapper>
                                    </Table>
                                </View>
                            </Dialog.Description>
                        </View>
                        <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                        <Dialog.Button label="Save" onPress={this.handleSave} />
                    </Dialog.Container>
                </View>
                {this.state.data ?
                    <Datatable
                        columns={[
                            /*{
                              name: 'Email',
                              selector: 'email',
                              cell: ({ email }) => <Chip mode="outlined">{email}</Chip>,
                            },*/
                            {
                                name: 'Nr.',
                                selector: 'id',
                            },
                            {
                                name: 'Kiekis',
                                selector: 'countTotal',
                            },
                            {
                                name: 'Suma',
                                selector: 'payTotal',
                                cell: (row: any) => (
                                    <>
                                        <Text>€{row.payTotal}</Text>
                                    </>
                                ),
                            },
                            // {
                            //     name: 'Data',
                            //     selector: 'date',
                            // },
                            {
                                name: 'Laikas',
                                selector: 'time',
                            },
                            {
                                name: '',
                                selector: '',
                                cell: (row) => (
                                    <>
                                        <TouchableOpacity onPress={() => console.log(row)}>
                                            <Text>Rodyti</Text>
                                        </TouchableOpacity>
                                    </>
                                ),
                            },
                            /*{
                              name: 'Full name',
                              selector: 'name.last',
                              cell: (row) => `${row.name.first} ${row.name.last}`,
                            },
                            {
                              name: 'Full name',
                              selector: 'name.last',
                              cell: (row) => (
                                <Text>
                                  {row.name.first} {row.name.last}
                                </Text>
                              ),
                            },
                            {
                              name: 'Full name',
                              selector: 'name.last',
                              cell: ({ name: { first, last } }) => (
                                <Text>
                                  {first} {last}
                                </Text>
                              ),
                            },*/
                        ]}
                        defaultSortField={'name.last'}
                        defaultSortAsc={true}
                        data={JSON.parse(this.state.data)}
                        page={page}
                        perPage={5}
                        paginationComponentOptions={(currentPage, totalPage) =>
                            `${currentPage} di ${totalPage}`
                        }
                        style={{ backgroundColor: '#fff' }}
                    /> : <></>}
                <Button
                    onPress={() => this.resultOfTheDay()}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Button
                    onPress={() => console.log("|")}
                    title="console clr"
                    color="green"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Button
                    onPress={() => console.log(this.state.table)}
                    title="console clr"
                    color="green"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Button
                    onPress={() => this.showPriceEditor()}
                    title="Open modal"
                    color="green"
                    accessibilityLabel="Open modal"
                />
            </View>
        );
    }
//     Object {
//     "s_a1": Object {
//     "totalPrice": 100,
//     "units": "2",
// },
// }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 34,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    table_container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
    head: { flex: 1, backgroundColor: '#c8e1ff' },
    title: { flex: 2, backgroundColor: '#f6f8fa' },
    titleText: { marginRight: 6, textAlign:'right' },
    text: { textAlign: 'center' },
    btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
    btnText: { textAlign: 'center' }
});
