import * as React from 'react';
import {View, StyleSheet, Button, TouchableOpacity, Dimensions, Alert, ScrollView} from 'react-native';
import { Chip, Text } from 'react-native-paper';
import Datatable from './Datatable';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import {saveNewPrice} from "../components/functions";
import Dialog from "react-native-dialog";
import {Cell, Col, Cols, Row, Rows, Table, TableWrapper} from "react-native-table-component";


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

interface MyProps {

}

interface MyState {
    data: any,
    prices: any,
    table: object,
    dialogVisible: boolean,
    itemTable: object,
    itemTotalPriceTable: object
    isTotal: boolean
}

export default class App extends React.Component<MyProps, MyState> {

    constructor(props) {
        super(props);

        this.state = {
            data : null,
            prices: null,
            table: {},
            dialogVisible: false,
            itemTable: {},
            itemTotalPriceTable: {},
            isTotal: false
        };
    }





    componentDidMount() {
        this.history().then(r => this.setState({ data : r }));
        this.loadPrices().then(r => this.setState({ prices : JSON.parse(r) }));

    }

    // componentDidUpdate(previousState){
    //     if(previousState.data !== this.state.data){
    //         // this.setState({
    //         //     data: this.state.data
    //         // });
    //         console.log("aaaa")
    //     }
    // }

    t = (value: any, underline: boolean) => {
        return (
            <View style={[{flex:1,justifyContent: "center",alignItems: "center"}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
                <Text style={[{fontSize: (25*0.56), padding: 2}]}>{value}</Text>
            </View>
        )
    }

    tableTite = () => {
        return [this.t('A1', false), this.t('A2', false), this.t('B', true),
            this.t('LSD', false), this.t('SD', false), this.t('SD AP', false), this.t('PM', false), this.t('KNAUF', true),
            this.t('LSD, FIN', false), this.t('SD, perimetriniai', false), this.t('PM, perimetriniai, SD AP', false), this.t('CP1', false), this.t('CP6', true),
            this.t('LSD, SD', false), this.t('CP3', false), this.t('CP9', true),
            this.t('PAROC', true),
            this.t('KNAUF', true),
            this.t('600x800', false), this.t('8000x800', false), this.t('1000x1000', false), this.t('1200x1200', false), this.t('1100x1300', false), this.t('Nestandartiniai padėklai', true),
            this.t('800x1200 (šviesūs)', false), this.t('800x1200 (tamsūs)', false), this.t('600x800 (šviesūs)', false), this.t('600x800 (tamsūs)', false), this.t('nestandartai 800x2000', true),
            this.t('800x1200', false), this.t('10000x1200', true),
            this.t('Mediniai padėklai', false)]
    }

    MergeRecursive(obj1, obj2) {

        for (const p in obj2) {
            try {
                // Property in destination object set; update its value.
                if ( obj2[p].constructor==Object ) {
                    obj1[p] = this.MergeRecursive(obj1[p], obj2[p]);

                } else {
                    obj1[p] = obj2[p];

                }

            } catch(e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];

            }
        }

        return obj1;
    }



    tableBody = () => {
        if(this.state.dialogVisible){
        const table = this.state.itemTable.table;
        const prices = this.state.prices;
        const itemTotalPriceTable = this.state.itemTotalPriceTable

            if(this.state.isTotal)
                this.MergeRecursive(table, itemTotalPriceTable)




            return [
                ['kiekis', this.t(table["s_a1"]?.units, false),         this.t(table["s_a2"]?.units, false),        this.t(table["s_b2"]?.units, true),         this.t(table["s_lsd_800"]?.units, false),       this.t(table["s_sd_800"]?.units, false),        this.t(table["s_ap_800"]?.units, false),        this.t(table["s_pm_800"]?.units, false),        this.t(table["s_knauf_800"]?.units, true),      this.t(table["s_lsd_1000"]?.units, false),      this.t(table["s_sd_1000"]?.units, false),       this.t(table["s_pm_1000"]?.units, false),       this.t(table["s_cp1_1000"]?.units, false),      this.t(table["s_cp6_1000"]?.units, true),       this.t(table["s_sd_1140"]?.units, false),       this.t(table["s_cp3_1140"]?.units, false),      this.t(table["s_cp9_1140"]?.units, true),       this.t(table["s_paroc"]?.units, true),      this.t(table["s_knauf"]?.units, true),      this.t(table["s_600x800"]?.units, false),       this.t(table["s_800x800"]?.units, false),       this.t(table["s_1000x1000"]?.units, false),         this.t(table["s_1200x1200"]?.units, false),         this.t(table["s_1100x1300"]?.units, false),         this.t(table["s_1600x3000"]?.units, true),      this.t(table["s_apvadai_800x1200_white"]?.units, false),        this.t(table["s_apvadai_800x1200_black"]?.units, false),        this.t(table["s_apvadai_600x800_white"]?.units, false),         this.t(table["s_apvadai_600x800_black"]?.units, false),         this.t(table["s_apvadai_800x2000_mix"]?.units, true),       this.t(table["s_dekos_800x1200"]?.units, false),        this.t(table["s_dekos_1000x1200"]?.units, true),        this.t(table["s_srotas"]?.units, false)],
                ['kaina',  this.t(prices["s_a1"], false),               this.t(prices["s_a2"], false),              this.t(prices["s_b2"], true),               this.t(prices["s_lsd_800"], false),             this.t(prices["s_sd_800"], false),              this.t(prices["s_ap_800"], false),              this.t(prices["s_pm_800"], false),              this.t(prices["s_knauf_800"], true),            this.t(prices["s_lsd_1000"], false),            this.t(prices["s_sd_1000"], false),             this.t(prices["s_pm_1000"], false),             this.t(prices["s_cp1_1000"], false),            this.t(prices["s_cp6_1000"], true),             this.t(prices["s_sd_1140"], false),             this.t(prices["s_cp3_1140"], false),            this.t(prices["s_cp9_1140"], true),             this.t(prices["s_paroc"], true),            this.t(prices["s_knauf"], true),            this.t(prices["s_600x800"], false),             this.t(prices["s_800x800"], false),             this.t(prices["s_1000x1000"], false),               this.t(prices["s_1200x1200"], false),               this.t(prices["s_1100x1300"], false),               this.t(prices["s_1600x3000"], true),            this.t(prices["s_apvadai_800x1200_white"], false),              this.t(prices["s_apvadai_800x1200_black"], false),              this.t(prices["s_apvadai_600x800_white"], false),               this.t(prices["s_apvadai_600x800_black"], false),               this.t(prices["s_apvadai_800x2000_mix"], true),             this.t(prices["s_dekos_800x1200"], false),              this.t(prices["s_dekos_1000x1200"], true),              this.t(prices["s_srotas"], false)],
                ['viso',   this.t(table["s_a1"]?.totalPrice, false),    this.t(table["s_a2"]?.totalPrice, false),   this.t(table["s_b2"]?.totalPrice, true),    this.t(table["s_lsd_800"]?.totalPrice, false),  this.t(table["s_sd_800"]?.totalPrice, false),   this.t(table["s_ap_800"]?.totalPrice, false),   this.t(table["s_pm_800"]?.totalPrice, false),   this.t(table["s_knauf_800"]?.totalPrice, true), this.t(table["s_lsd_1000"]?.totalPrice, false), this.t(table["s_sd_1000"]?.totalPrice, false),  this.t(table["s_pm_1000"]?.totalPrice, false),  this.t(table["s_cp1_1000"]?.totalPrice, false), this.t(table["s_cp6_1000"]?.totalPrice, true),  this.t(table["s_sd_1140"]?.totalPrice, false),  this.t(table["s_cp3_1140"]?.totalPrice, false), this.t(table["s_cp9_1140"]?.totalPrice, true),  this.t(table["s_paroc"]?.totalPrice, true), this.t(table["s_knauf"]?.totalPrice, true), this.t(table["s_600x800"]?.totalPrice, false),  this.t(table["s_800x800"]?.totalPrice, false),  this.t(table["s_1000x1000"]?.totalPrice, false),    this.t(table["s_1200x1200"]?.totalPrice, false),    this.t(table["s_1100x1300"]?.totalPrice, false),    this.t(table["s_1600x3000"]?.totalPrice, true), this.t(table["s_apvadai_800x1200_white"]?.totalPrice, false),   this.t(table["s_apvadai_800x1200_black"]?.totalPrice, false),   this.t(table["s_apvadai_600x800_white"]?.totalPrice, false),    this.t(table["s_apvadai_600x800_black"]?.totalPrice, false),    this.t(table["s_apvadai_800x2000_mix"]?.totalPrice, true),  this.t(table["s_dekos_800x1200"]?.totalPrice, false),   this.t(table["s_dekos_1000x1200"]?.totalPrice, true),   this.t(table["s_srotas"]?.totalPrice, false)],

                ['kiekis', this.t(table["r_a1"]?.units, false),         this.t(table["r_a2"]?.units, false),        this.t(table["r_b2"]?.units, true),         this.t(table["r_lsd_800"]?.units, false),       this.t(table["r_sd_800"]?.units, false),        this.t(table["r_ap_800"]?.units, false),        this.t(table["r_pm_800"]?.units, false),        this.t(table["r_knauf_800"]?.units, true),      this.t(table["r_lsd_1000"]?.units, false),      this.t(table["r_sd_1000"]?.units, false),       this.t(table["r_pm_1000"]?.units, false),       this.t(table["r_cp1_1000"]?.units, false),      this.t(table["r_cp6_1000"]?.units, true),       this.t(table["r_sd_1140"]?.units, false),       this.t(table["r_cp3_1140"]?.units, false),      this.t(table["r_cp9_1140"]?.units, true),       this.t(table["r_paroc"]?.units, true),      this.t(table["r_knauf"]?.units, true),      this.t(table["r_600x800"]?.units, false),       this.t(table["r_800x800"]?.units, false),       this.t(table["r_1000x1000"]?.units, false),         this.t(table["r_1200x1200"]?.units, false),         this.t(table["r_1100x1300"]?.units, false),         this.t(table["r_1600x3000"]?.units, true),      this.t(table["r_apvadai_800x1200_white"]?.units, false),        this.t(table["r_apvadai_800x1200_black"]?.units, false),        this.t(table["r_apvadai_600x800_white"]?.units, false),         this.t(table["r_apvadai_600x800_black"]?.units, false),         this.t(table["r_apvadai_800x2000_mix"]?.units, true),       this.t(table["r_dekos_800x1200"]?.units, false),        this.t(table["r_dekos_1000x1200"]?.units, true),        this.t(table["r_srotas"]?.units, false)],
                ['kaina',  this.t(prices["r_a1"], false),               this.t(prices["r_a2"], false),              this.t(prices["r_b2"], true),               this.t(prices["r_lsd_800"], false),             this.t(prices["r_sd_800"], false),              this.t(prices["r_ap_800"], false),              this.t(prices["r_pm_800"], false),              this.t(prices["r_knauf_800"], true),            this.t(prices["r_lsd_1000"], false),            this.t(prices["r_sd_1000"], false),             this.t(prices["r_pm_1000"], false),             this.t(prices["r_cp1_1000"], false),            this.t(prices["r_cp6_1000"], true),             this.t(prices["r_sd_1140"], false),             this.t(prices["r_cp3_1140"], false),            this.t(prices["r_cp9_1140"], true),             this.t(prices["r_paroc"], true),            this.t(prices["r_knauf"], true),            this.t(prices["r_600x800"], false),             this.t(prices["r_800x800"], false),             this.t(prices["r_1000x1000"], false),               this.t(prices["r_1200x1200"], false),               this.t(prices["r_1100x1300"], false),               this.t(prices["r_1600x3000"], true),            this.t(prices["r_apvadai_800x1200_white"], false),              this.t(prices["r_apvadai_800x1200_black"], false),              this.t(prices["r_apvadai_600x800_white"], false),               this.t(prices["r_apvadai_600x800_black"], false),               this.t(prices["r_apvadai_800x2000_mix"], true),             this.t(prices["r_dekos_800x1200"], false),              this.t(prices["r_dekos_1000x1200"], true),              this.t(prices["r_srotas"], false)],
                ['viso',   this.t(table["r_a1"]?.totalPrice, false),    this.t(table["r_a2"]?.totalPrice, false),   this.t(table["r_b2"]?.totalPrice, true),    this.t(table["r_lsd_800"]?.totalPrice, false),  this.t(table["r_sd_800"]?.totalPrice, false),   this.t(table["r_ap_800"]?.totalPrice, false),   this.t(table["r_pm_800"]?.totalPrice, false),   this.t(table["r_knauf_800"]?.totalPrice, true), this.t(table["r_lsd_1000"]?.totalPrice, false), this.t(table["r_sd_1000"]?.totalPrice, false),  this.t(table["r_pm_1000"]?.totalPrice, false),  this.t(table["r_cp1_1000"]?.totalPrice, false), this.t(table["r_cp6_1000"]?.totalPrice, true),  this.t(table["r_sd_1140"]?.totalPrice, false),  this.t(table["r_cp3_1140"]?.totalPrice, false), this.t(table["r_cp9_1140"]?.totalPrice, true),  this.t(table["r_paroc"]?.totalPrice, true), this.t(table["r_knauf"]?.totalPrice, true), this.t(table["r_600x800"]?.totalPrice, false),  this.t(table["r_800x800"]?.totalPrice, false),  this.t(table["r_1000x1000"]?.totalPrice, false),    this.t(table["r_1200x1200"]?.totalPrice, false),    this.t(table["r_1100x1300"]?.totalPrice, false),    this.t(table["r_1600x3000"]?.totalPrice, true), this.t(table["r_apvadai_800x1200_white"]?.totalPrice, false),   this.t(table["r_apvadai_800x1200_black"]?.totalPrice, false),   this.t(table["r_apvadai_600x800_white"]?.totalPrice, false),    this.t(table["r_apvadai_600x800_black"]?.totalPrice, false),    this.t(table["r_apvadai_800x2000_mix"]?.totalPrice, true),  this.t(table["r_dekos_800x1200"]?.totalPrice, false),   this.t(table["r_dekos_1000x1200"]?.totalPrice, true),   this.t(table["r_srotas"]?.totalPrice, false)],
            ]
        }else{
            return [
                ['kiekis', this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, true), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, true), this.t(0, false)],
                ['kaina',  this.t(1, false), this.t(1, false), this.t(1, true), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, true), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, true), this.t(1, false), this.t(1, false), this.t(1, true), this.t(1, true), this.t(1, true), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, true), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, true), this.t(1, false), this.t(1, true), this.t(1, false)],
                ['viso',   this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, true), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, true), this.t(0, false)],
                ['kiekis', this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, true), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, true), this.t(0, false)],
                ['kaina',  this.t(1, false), this.t(1, false), this.t(1, true), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, true), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, true), this.t(1, false), this.t(1, false), this.t(1, true), this.t(1, true), this.t(1, true), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, true), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, false), this.t(1, true), this.t(1, false), this.t(1, true), this.t(1, false)],
                ['viso',   this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, true), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, false), this.t(0, true), this.t(0, false), this.t(0, true), this.t(0, false)]
            ]
        }


    }


    headText = (text: string) => (
        <View style={[styles.head, {height: '100%', borderBottomWidth: 2, justifyContent: 'center'}]}>
            <Text style={{ textAlign: 'center', width: 200, height: 184+(25/1.5),  transform: [{ rotate: '-90deg' }], fontSize: (25*0.56) }}>{text}</Text>
        </View>
        // text1: { textAlign: 'center', width: 200, height: 184+(size/1.5),  transform: [{ rotate: '-90deg' }], fontSize: (size*0.56) },

    );

    showDialog = async (table: object, isTotal: boolean) => {
        if(!isTotal){
            this.setState({ dialogVisible: true, itemTable: table, isTotal })
        }else{
            this.setState({ dialogVisible: true, isTotal })
        }
    }
    handleCancel = async () => {
        this.setState({ dialogVisible: false })
    };

    history = async () => {
        return  await AsyncStorage.getItem('@BuyHistory')
    }

    loadPrices = async () => {
        return  await AsyncStorage.getItem('@Price')
    }


    resultOfTheDay = () => {
        let content = JSON.parse(this.state.data);
        const table: never[] = [];

        const units = (property: string, units: number) =>  {
            return this.setState((previousState) => {
                return {
                    itemTable: {
                        table: {
                            ...previousState.itemTable.table,
                            [property]: {
                                units: units
                            }
                        }
                    }
                }
            })
        }

        const itemTotalPriceTable = (property: string, units: number) =>  {
            return this.setState((previousState) => {
                return {

                    itemTotalPriceTable: {
                        ...previousState.itemTotalPriceTable,
                        [property]: {
                            totalPrice: units
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
                                units(key, total + (thing.table[key]?.units != undefined ? Number(thing.table[key]?.units) : 0))
                                return total + (thing.table[key]?.units != undefined ? Number(thing.table[key]?.units) : 0)
                            }, 0),
                        }
                    }

                })
            });
        })

        content.map(function(arr: any){
            Object.entries(arr.table).forEach(([key, val]) => {
                table.push({
                    itemTotalPriceTable: {
                        [key]:{
                            units: content.reduce((total, thing) => {
                                itemTotalPriceTable(key, total + (thing.table[key]?.totalPrice != undefined ? Number(thing.table[key]?.totalPrice) : 0))
                                return total + (thing.table[key]?.totalPrice != undefined ? Number(thing.table[key]?.totalPrice) : 0)
                            }, 0),
                        }
                    }
                })
            });
        })

        return table;
    }

    render() {
        let page = 1;
        console.log(this.state.itemTable)
        return (
            <View style={styles.container}>
                <View>
                    {this.state.itemTable ?
                        <Dialog.Container visible={this.state.dialogVisible}>
                            <View style={{width: window.width - 50, height: window.height - 200}}>
                                <ScrollView horizontal={false}>
                                    <Dialog.Title>Istorija</Dialog.Title>
                                    <View style={{flexDirection: 'row',}}>
                                        <Text style={{flex: 1}}>Kiekis: {this.state.itemTable.countTotal}</Text>
                                        <Text style={{flex: 1, textAlign: "right"}}>Data: {this.state.itemTable.date}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row',}}>
                                        <Text style={{flex: 1}}>Suma: €{this.state.itemTable.payTotal}</Text>
                                        <Text style={{flex: 1, textAlign: "right"}}>Laikas: {this.state.itemTable.time}</Text>
                                    </View>
                                    <Dialog.Description>
                                        <View style={styles.table_container}>
                                            <Table style={{flexDirection: 'row', width: window.width - 100}}
                                                   borderStyle={{borderWidth: 1}}>
                                                {/* Left Wrapper */}
                                                <TableWrapper style={{width: 200}}>
                                                    <Cell data="" style={styles.singleHead}/>
                                                    <TableWrapper style={{flexDirection: 'row'}}>
                                                        <Col
                                                            data={[this.headText('800x1200'), this.headText('1000x1200'), this.headText('1140'), this.headText(''), this.headText(''), this.headText('Nestandartai'), this.headText('Šarnyrai'), this.headText('Dekos'), '']}
                                                            style={styles.head} width={20}
                                                            heightArr={[240, 150, 90, 30, 30, 180, 150, 60, 30]}
                                                            textStyle={styles.text}/>
                                                        <Col data={this.tableTite()} style={styles.title}
                                                             heightArr={[30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]}
                                                             textStyle={styles.titleText}/>
                                                    </TableWrapper>
                                                </TableWrapper>

                                                {/* Right Wrapper */}
                                                <TableWrapper style={{flex: 1}}>
                                                    <Cols data={this.tableBody()}
                                                          heightArr={[40, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]}
                                                          textStyle={styles.text}/>
                                                </TableWrapper>
                                            </Table>
                                        </View>
                                    </Dialog.Description>
                                </ScrollView>
                            </View>
                            <Dialog.Button label="Uždaryti" onPress={this.handleCancel}/>
                        </Dialog.Container>
                    : <Text> </Text>}
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
                                        <TouchableOpacity onPress={() => this.showDialog(row, false)}>
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
                    onPress={() => console.log(this.state.itemTotalPriceTable)}
                    title="itemTotalPriceTable state"
                    color="green"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Button
                    onPress={() => console.log(this.state.data)}
                    title="data state"
                    color="green"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Button
                    onPress={() => this.showDialog({}, true)}
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
    singleHead: { width: 200, height: 40, backgroundColor: '#c8e1ff' },
    head: { flex: 1, backgroundColor: '#c8e1ff' },
    title: { flex: 9, backgroundColor: '#f6f8fa' },
    titleText: { marginRight: 6, textAlign:'right' },
    text: { textAlign: 'center' },
    btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
    btnText: { textAlign: 'center' }
});
