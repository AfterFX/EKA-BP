import * as React from 'react';
import {
    Animated,
    Button,
    Dimensions, ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import TextField from "../components/TextField";
import {countTotal, destroyStorage, payTotal, price, print, saveNewPrice} from "../components/functions";
import Dialog from "react-native-dialog";
import {StatusBar} from "expo-status-bar";
import {useEffect, useRef} from "react";
import {StatusBarHeight, TextLink, TextLinkContent} from "../components/styles";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/AntDesign";
import {Col, Cols, Table, TableWrapper} from "react-native-table-component";
import {State, TapGestureHandler} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pricesIndex from "../price.json";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

interface MyProps {
    route: any
}

interface MyState {
    isMain: boolean,
    foo: boolean,
    text: string,
    result: any,
    table: any,
    priceList: any
    dialogVisible: boolean,
    OnChangePrice: string,
    getEditableProperty: string,
    size: number,
    visible: boolean,
    isTouchEnded: boolean,
    error: null,
    editableProperty: string,
    counter: number
}

export class Buy extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isMain: true,
            foo: false,
            text: '',
            result: '',
            table: {},
            priceList: '',
            dialogVisible: false,
            OnChangePrice: '',
            getEditableProperty: '',
            size: 25,
            visible: false,
            isTouchEnded: true,
            error: null,
            editableProperty: '',
            counter: 0
        };
    }

    async componentDidMount() {

        console.log('componentDidMount() lifecycle');
        this.getStorage().then(() => console.log("prices loaded..."))
        this.props.route.params?.isMain ? this.setState({isMain: !this.state.isMain}) : false; //comes from history
        // Trigger update
        this.setState({foo: !this.state.foo});

        await AsyncStorage.getItem('@windowSize').then((r) => console.log(this.setState({size: Math.round(r) || 25})))

    }

    getStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@Price')
            jsonValue != null ? JSON.parse(jsonValue) : await AsyncStorage.mergeItem('@Price', JSON.stringify(pricesIndex) ); //            JSON.stringify({s_a1: 50 })
            // setStoredPrices(jsonValue != null ? JSON.parse(jsonValue) : pricesIndex)
            this.setState({ priceList: jsonValue != null ? JSON.parse(jsonValue) : pricesIndex })
            return jsonValue != null ? JSON.parse(jsonValue) : pricesIndex;
        } catch(e: any) {
            console.log("getStorage error: ", e)
        }
    }

    resetHistory = async () => {
        const date = new Date();
        const todayDate = date.toISOString().slice(0, 10);
        await AsyncStorage.getItem('@BuyHistory').then((r) => {
            const BuyHistory = JSON.parse(r)
            if(BuyHistory != null){
                if(BuyHistory[0]["date"] != todayDate){
                    console.log("2")
                    return AsyncStorage.removeItem('@BuyHistory')
                }
            }
        })

    }

    tableState=(dir: string)=>{

        switch(dir) {

            case 'tableTitle_1':
                return [this.t('EUR A1', false), this.t('EUR A', false), this.t('EUR B', false), this.t('', true), this.t('LSD', true), this.t('SD', false), this.t('SD AP', false), this.t('PM', false), this.t('KNAUF', true)]
            case 'tableTitle_3':
                return [this.t('LSD, FIN', false), this.t('SD, perimetriniai', false), this.t('PM, perimetriniai, SD AP', false), this.t('', false), this.t('CP1', false), this.t('CP6', true)]

            case 'tableTitle_4':
                return [this.t('LSD, SD', false), this.t('CP3', false), this.t('CP9', true)]
            case 'tableTitle_5':
                return [this.t('PAROC', true)]
            case 'tableTitle_6':
                return [this.t('KNAUF', true)]
            case 'tableTitle_7':
                return [this.t('600x800', false), this.t('800x800', false), this.t('1000x1000', false), this.t('', false), this.t('1200x1200', false), this.t('1100x1300', false), this.t('Nestandartiniai padėlai', true)]
            case 'tableTitle_8':
                return [this.t('800x1200 (šviesūs)', false), this.t('800x1200 (tamsūs)', false), this.t('600x800 (šviesūs)', false), this.t('600x800 (tamsūs)', false), this.t('nestandartai 800x2000', true)]
            case 'tableTitle_9':
                return [this.t('800x1200', false), this.t('1000x1200', true)]
            case 'tableTitle_10':
                return [this.t('2,8 - 3,2', false), this.t('6 - 10', true)]
            case 'tableTitle_11':
                return [this.t('Mediniai padėklai', true)]
            case 'tableData':
                return [
                    [this.elementCol('Kiekis')],
                    [this.elementCol('Kaina € /vnt')],
                    [this.elementCol('Suma')],
                    [this.elementCol('Kiekis')],
                    [this.elementCol('Kaina € /vnt')],
                    [this.elementCol('Suma')],
                ]
            case 'tableData_1':
                return [
                    [this.elementInput('s_a1', false), this.elementInput('s_a2', false), this.elementInput('s_b2', false), this.elementInput('s_lpm_800', true), this.elementInput('s_lsd_800', true), this.elementInput('s_sd_800', false), this.elementInput('s_ap_800', false), this.elementInput('s_pm_800', false), this.elementInput('s_knauf_800', true)],
                    [this.elementPrice('s_a1', false), this.elementPrice('s_a2', false), this.elementPrice('s_b2', false), this.elementPrice('s_lpm_800', true), this.elementPrice('s_lsd_800', true), this.elementPrice('s_sd_800', false), this.elementPrice('s_ap_800', false), this.elementPrice('s_pm_800', false), this.elementPrice('s_knauf_800', true)],
                    [this.elementResult('s_a1', false), this.elementResult('s_a2', false), this.elementResult('s_b2', false), this.elementResult('s_lpm_800', true), this.elementResult('s_lsd_800', true), this.elementResult('s_sd_800', false), this.elementResult('s_ap_800', false), this.elementResult('s_pm_800', false), this.elementResult('s_knauf_800', true)],
                    [this.elementInput('r_a1', false), this.elementInput('r_a2', false), this.elementInput('r_b2', false), this.elementInput('r_lpm_800', true), this.elementInput('r_lsd_800', true), this.elementInput('r_sd_800', false), this.elementInput('r_ap_800', false), this.elementInput('r_pm_800', false), this.elementInput('r_knauf_800', true)],
                    [this.elementPrice('r_a1', false), this.elementPrice('r_a2', false), this.elementPrice('r_b2', false), this.elementPrice('r_lpm_800', true), this.elementPrice('r_lsd_800', true), this.elementPrice('r_sd_800', false), this.elementPrice('r_ap_800', false), this.elementPrice('r_pm_800', false), this.elementPrice('r_knauf_800', true)],
                    [this.elementResult('r_a1', false), this.elementResult('r_a2', false), this.elementResult('r_b2', false), this.elementResult('r_lpm_800', true), this.elementResult('r_lsd_800', true), this.elementResult('r_sd_800', false), this.elementResult('r_ap_800', false), this.elementResult('r_pm_800', false), this.elementResult('r_knauf_800', true)]
                ]
            case 'tableData_3':
                return [
                    [this.elementInput('s_lsd_1000', false), this.elementInput('s_sd_1000', false), this.elementInput('s_pm_1000', false), this.elementInput('s_knauf_1000', false), this.elementInput('s_cp1_1000', false), this.elementInput('s_cp6_1000', true)],
                    [this.elementPrice('s_lsd_1000', false), this.elementPrice('s_sd_1000', false), this.elementPrice('s_pm_1000', false), this.elementPrice('s_knauf_1000', false), this.elementPrice('s_cp1_1000', false), this.elementPrice('s_cp6_1000', true)],
                    [this.elementResult('s_lsd_1000', false), this.elementResult('s_sd_1000', false), this.elementResult('s_pm_1000', false), this.elementResult('s_knauf_1000', false), this.elementResult('s_cp1_1000', false), this.elementResult('s_cp6_1000', true)],
                    [this.elementInput('r_lsd_1000', false), this.elementInput('r_sd_1000', false), this.elementInput('r_pm_1000', false), this.elementInput('r_knauf_1000', false), this.elementInput('r_cp1_1000', false), this.elementInput('r_cp6_1000', true)],
                    [this.elementPrice('r_lsd_1000', false), this.elementPrice('r_sd_1000', false), this.elementPrice('r_pm_1000', false), this.elementPrice('r_knauf_1000', false), this.elementPrice('r_cp1_1000', false), this.elementPrice('r_cp6_1000', true)],
                    [this.elementResult('r_lsd_1000', false), this.elementResult('r_sd_1000', false), this.elementResult('r_pm_1000', false), this.elementResult('r_knauf_1000', false), this.elementResult('r_cp1_1000', false), this.elementResult('r_cp6_1000', true)]
                ]
            case 'tableData_4':
                return [
                    [this.elementInput('s_sd_1140', false), this.elementInput('s_cp3_1140', false), this.elementInput('s_cp9_1140', true)],
                    [this.elementPrice('s_sd_1140', false), this.elementPrice('s_cp3_1140', false), this.elementPrice('s_cp9_1140', true)],
                    [this.elementResult('s_sd_1140', false), this.elementResult('s_cp3_1140', false), this.elementResult('s_cp9_1140', true)],
                    [this.elementInput('r_sd_1140', false), this.elementInput('r_cp3_1140', false), this.elementInput('r_cp9_1140', true)],
                    [this.elementPrice('r_sd_1140', false), this.elementPrice('r_cp3_1140', false), this.elementPrice('r_cp9_1140', true)],
                    [this.elementResult('r_sd_1140', false), this.elementResult('r_cp3_1140', false), this.elementResult('r_cp9_1140', true)]
                ]
            case 'tableData_5':
                return [
                    [this.elementInput('s_paroc', true)],
                    [this.elementPrice('s_paroc', true)],
                    [this.elementResult('s_paroc', true)],
                    [this.elementInput('r_paroc', true)],
                    [this.elementPrice('r_paroc', true)],
                    [this.elementResult('r_paroc', true)]
                ]
            case 'tableData_6':
                return [
                    [this.elementInput('s_knauf', true)],
                    [this.elementPrice('s_knauf', true)],
                    [this.elementResult('s_knauf', true)],
                    [this.elementInput('r_knauf', true)],
                    [this.elementPrice('r_knauf', true)],
                    [this.elementResult('r_knauf', true)]
                ]
            case 'tableData_7':
                return [
                    [this.elementInput('s_600x800', false), this.elementInput('s_800x800', false), this.elementInput('s_1000x1000', false), this.elementInput('', false), this.elementInput('s_1200x1200', false), this.elementInput('s_1100x1300', false), this.elementInput('s_1600x3000', true)],
                    [this.elementPrice('s_600x800', false), this.elementPrice('s_800x800', false), this.elementPrice('s_1000x1000', false), this.elementPrice('', false), this.elementPrice('s_1200x1200', false), this.elementPrice('s_1100x1300',false), this.elementPrice('s_1600x3000', true)],
                    [this.elementResult('s_600x800', false), this.elementResult('s_800x800', false), this.elementResult('s_1000x1000', false), this.elementResult('', false), this.elementResult('s_1200x1200', false), this.elementResult('s_1100x1300', false), this.elementResult('s_1600x3000', true)],
                    [this.elementInput('r_600x800', false), this.elementInput('r_800x800', false), this.elementInput('r_1000x1000', false), this.elementInput('', false), this.elementInput('r_1200x1200', false), this.elementInput('r_1100x1300', false), this.elementInput('r_1600x3000', true)],
                    [this.elementPrice('r_600x800', false), this.elementPrice('r_800x800', false), this.elementPrice('r_1000x1000', false), this.elementPrice('', false), this.elementPrice('r_1200x1200', false), this.elementPrice('r_1100x1300', false), this.elementPrice('r_1600x3000', true)],
                    [this.elementResult('r_600x800', false), this.elementResult('r_800x800', false), this.elementResult('r_1000x1000', false), this.elementResult('', false), this.elementResult('r_1200x1200', false), this.elementResult('r_1100x1300', false), this.elementResult('r_1600x3000', true)]
                ]
            case 'tableData_8':
                return [
                    [this.elementInput('s_apvadai_800x1200_white', false), this.elementInput('s_apvadai_800x1200_black', false), this.elementInput('s_apvadai_600x800_white', false), this.elementInput('s_apvadai_600x800_black', false), this.elementInput('s_apvadai_800x2000_mix', true)],
                    [this.elementPrice('s_apvadai_800x1200_white', false), this.elementPrice('s_apvadai_800x1200_black', false), this.elementPrice('s_apvadai_600x800_white', false), this.elementPrice('s_apvadai_600x800_black', false), this.elementPrice('s_apvadai_800x2000_mix', true)],
                    [this.elementResult('s_apvadai_800x1200_white', false), this.elementResult('s_apvadai_800x1200_black', false), this.elementResult('s_apvadai_600x800_white', false), this.elementResult('s_apvadai_600x800_black', false), this.elementResult('s_apvadai_800x2000_mix', true)],
                    [this.elementInput('r_apvadai_800x1200_white', false), this.elementInput('r_apvadai_800x1200_black', false), this.elementInput('r_apvadai_600x800_white', false), this.elementInput('r_apvadai_600x800_black', false), this.elementInput('r_apvadai_800x2000_mix', true)],
                    [this.elementPrice('r_apvadai_800x1200_white', false), this.elementPrice('r_apvadai_800x1200_black', false), this.elementPrice('r_apvadai_600x800_white', false), this.elementPrice('r_apvadai_600x800_black', false), this.elementPrice('r_apvadai_800x2000_mix', true)],
                    [this.elementResult('r_apvadai_800x1200_white', false), this.elementResult('r_apvadai_800x1200_black', false), this.elementResult('r_apvadai_600x800_white', false), this.elementResult('r_apvadai_600x800_black', false), this.elementResult('r_apvadai_800x2000_mix', true)]
                ]
            case 'tableData_9':
                return [
                    [this.elementInput('s_dekos_800x1200', false), this.elementInput('s_dekos_1000x1200', true)],
                    [this.elementPrice('s_dekos_800x1200', false), this.elementPrice('s_dekos_1000x1200', true)],
                    [this.elementResult('s_dekos_800x1200', false), this.elementResult('s_dekos_1000x1200', true)],
                    [this.elementInput('r_dekos_800x1200', false), this.elementInput('r_dekos_1000x1200', true)],
                    [this.elementPrice('r_dekos_800x1200', false), this.elementPrice('r_dekos_1000x1200', true)],
                    [this.elementResult('r_dekos_800x1200', false), this.elementResult('r_dekos_1000x1200', true)]
                ]
            case 'tableData_10':
                return [
                    [this.elementInput('s_plokste_800x1200_p', false), this.elementInput('s_plokste_800x1200_s', true)],
                    [this.elementPrice('s_plokste_800x1200_p', false), this.elementPrice('s_plokste_800x1200_s', true)],
                    [this.elementResult('s_plokste_800x1200_p', false), this.elementResult('s_plokste_800x1200_s', true)],
                    [this.elementInput('r_plokste_800x1200_p', false), this.elementInput('r_plokste_800x1200_s', true)],
                    [this.elementPrice('r_plokste_800x1200_p', false), this.elementPrice('r_plokste_800x1200_s', true)],
                    [this.elementResult('r_plokste_800x1200_p', false), this.elementResult('r_plokste_800x1200_s', true)]
                ]
            case 'tableData_11':
                return [
                    [this.elementInput('s_remontas', true)],
                    [this.elementPrice('s_remontas', true)],
                    [this.elementResult('s_remontas', true)],
                    [this.elementInput('r_remontas', true)],
                    [this.elementPrice('r_remontas', true)],
                    [this.elementResult('r_remontas', true)]
                ]
            default:
                return "lol";

        }

    }
    flex = [1, 1, 1, 1, 1, 1];

    DoubleTapButton({ onDoubleTap, children }) {
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

    t = (value: any, underline: boolean) => (
        <View style={[{height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={[{fontSize: (this.state.size*0.56), padding: 2}]}>{value}</Text>
        </View>
    );

    headText = (text: string) => (
        <View style={[styles.head, {height: '100%', borderBottomWidth: 2, justifyContent: 'center'}]}>
            <Text style={{ textAlign: 'center', width: 200, height: 184+(this.state.size/1.5),  transform: [{ rotate: '-90deg' }], fontSize: (this.state.size*0.56) }}>{text}</Text>
        </View>
        // text1: { textAlign: 'center', width: 200, height: 184+(size/1.5),  transform: [{ rotate: '-90deg' }], fontSize: (size*0.56) },

    );

    elementCol = (value: any) => (
        <View style={styles.colBlue}>
            <Text style={{fontSize: this.state.size*0.51}}>{value}</Text>
        </View>
    );

    showPriceEditor = async (property: string) => {
        this.setState({ OnChangePrice: this.state.priceList[property] })
        this.setState({ editableProperty: property })//sets editor what shows
        this.setState({ dialogVisible: true })
    };

    inputChangePrice = async (property: any, newNumber: any) => {
        const re = /^[0-9]*\.?[0-9]*$/;
        if (newNumber === '' || re.test(newNumber))
            this.OnChange(property, newNumber)
    };

    elementInput = (property: any, underline: boolean) => {
        // console.log( this.state.counter++)
        return (

            <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table[property]?.units}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                // onChangeText={newNumber => this.OnChange(property, newNumber)}
                onChangeText={newNumber => this.inputChangePrice(property, newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />

        )
    };

    elementResult = (property: any, underline: boolean) =>{
        return (
            <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
                <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table[property]?.['totalPrice'] || ''}</Text>
            </View>
        )
    };

    elementPrice = (property: string, underline: boolean) => (
        <this.DoubleTapButton onDoubleTap={() => this.showPriceEditor(property)}>
            <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
                <Text style={{fontSize: (this.state.size*0.56), textAlign: "center"}}>{this.state.priceList[property]}</Text>
            </View>
        </this.DoubleTapButton>
    );

    OnChange = (property: string, value: any) =>{
        this.setState((previousState) => {
            return {
                table: {
                    ...previousState.table,
                    [property]: {"units": value, "totalPrice": value*this.state.priceList[property] }
                }
            }
        });

        this.setState({ text: value })
        this.setState({ result: value*2 })
    }
    input = (property: string) =>{
        return (
            <TextField style={{width: 250, height: 20}}
                       value={this.state.table[property]}
                       label=""
                       onChangeText={newNumber => this.OnChange(property, newNumber)}
                       textAlign={"center"}
                       keyboardType={"phone-pad"}
            />
        )
    }

    result = (property: string) =>{
        return (
            <View style={{width: 250, height: 20}}>
                <Text>{this.state.table[property]?.['totalPrice']}</Text>
            </View>
        )
    }


    ChangePrice = async (value: string) => {
        const re = /^[0-9]*\.?[0-9]*$/;
        if (value === '' || re.test(value))
            this.setState({ OnChangePrice: value })
    };

    handleCancel = async () => {
        this.setState({ dialogVisible: false })
    };

    handleSave = async () => {
        await saveNewPrice(this.state.editableProperty, this.state.OnChangePrice)
        await this.getStorage();//Refreshing numbers after save
        return this.setState({ dialogVisible: false })
    };

    ObjectResize = () => {
        return StyleSheet.create({
            priceText: {
                textAlign: "center",
                fontSize: (this.state.size*0.56)
            },
            text1: { textAlign: 'center', width: 200, height: 184+(this.state.size/1.5),  transform: [{ rotate: '-90deg' }], fontSize: (this.state.size*0.56) },
            title1: { position: 'relative', flexDirection: 'column', flex: 9-((this.state.size/10)-2)},
            text: { fontSize: (this.state.size*0.56)},
            singleHead: {maxHeight: 10.5+(this.state.size*2), width: 100}
        })
    }

    createHistory = async () => {
        const date = new Date();
        const todayDate = date.toISOString().slice(0, 10);
        const time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
        const BuyHistory = await AsyncStorage.getItem('@BuyHistory')

        let myObjArray: any

        if(BuyHistory != null){
            myObjArray = JSON.parse([BuyHistory]);
            let lastKey = myObjArray.slice(-1) || 0
            myObjArray.push({id: Number(lastKey[0].id+1), "date": todayDate, "time": time, "table": this.state.table, "countTotal": countTotal(this.state.table, this.state.priceList), "payTotal": payTotal(this.state.table, this.state.priceList)});
        }else{
            myObjArray = [{id: 1, "date": todayDate, "time": time, "table": this.state.table, "countTotal": countTotal(this.state.table, this.state.priceList), "payTotal": payTotal(this.state.table, this.state.priceList)}];
        }
        return await AsyncStorage.setItem('@BuyHistory', JSON.stringify(myObjArray)).then(() => {this.setState({table: []})});
    };

    // createHistory = async () => {
    //     const todayDate = new Date().toISOString().slice(0, 10);
    //     const BuyHistory = await AsyncStorage.getItem('@BuyHistory')
    //     const BuyHistory2 = [//need add total and units
    //         {id: 1, date: todayDate },
    //         {id: 2, date: todayDate },
    //         {id: 3, date: todayDate }
    //     ]
    //     const myObjArray = (BuyHistory != null ? JSON.parse([BuyHistory]) : BuyHistory2);
    //     let lastElement = myObjArray.slice(-1)
    //     myObjArray.push({id: Number(lastElement[0].id+1), date: todayDate});
    //
    //     // let lastElement = myObjArray.slice(-1)
    //
    //
    //     BuyHistory == await AsyncStorage.setItem('@BuyHistory', JSON.stringify(myObjArray) );
    //     console.log(BuyHistory);
    // };

    // createHistory = async () => {
    //     const date = new Date();
    //     const todayDate = date.toISOString().slice(0, 10);
    //     const time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    //     const BuyHistory = await AsyncStorage.getItem('@BuyHistory')
    //     const freshTableHistory = {[0]: {"date": todayDate, "time": "", "table": ""}};
    //     const myObjArray = (BuyHistory != null ? JSON.parse([BuyHistory]) : freshTableHistory);
    //     const lastKey = Object.keys(myObjArray).pop() || 0;
    //
    //     myObjArray[Number(lastKey)+1] = {"date": todayDate, "time": time, "table": this.state.table};
    //     return await AsyncStorage.setItem('@BuyHistory', JSON.stringify(myObjArray)).then(() => {this.setState({table: []})});
    // };

    fadeAnim = new Animated.Value(0);

    onToggleSnackBar = () => this.setState({ visible: !this.state.visible });

    fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        this.onToggleSnackBar();
        Animated.timing(this.fadeAnim, {
            useNativeDriver: false,
            toValue: 1,
            duration: 1000
        }).start();
    };

    fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(this.fadeAnim, {
            useNativeDriver: false,
            toValue: 0,
            duration: 1000
        }).start(() => {
            this.onToggleSnackBar();
        });
    };



    ToggleVisible = () => {(!this.state.visible)? this.fadeIn() : this.fadeOut()};

    getTest = async () => {
        const BuyHistory  = await AsyncStorage.getItem('@BuyHistory')

        // const parseData = JSON.parse(BuyHistory)
        // const mapData = new Map(parseData)
        const dd = BuyHistory;

        // const lastKey = Object.keys(dd).pop();

        console.log(JSON.parse(dd))

    }


    saveWindowSize = async () => {
        this.setState({ isTouchEnded: true })
        await AsyncStorage.setItem('@windowSize', String(this.state.size))
    }


    // console.log(JSON.stringify(this.state.table, null, ' '))
    render() {
    // console.log(this.state.counter++)
        return (
            <View style={[styles.container]}>
                {/*price editor*/}
                <View>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title>Edit price</Dialog.Title>
                        <Dialog.Input value={(this.state.OnChangePrice).toString() || ''} onChangeText={newValue => (this.ChangePrice(newValue))} keyboardType={"phone-pad"} style={{width: 100, alignSelf: 'center', textAlign: 'center'}}/>
                        <Dialog.Description>
                            {this.state.getEditableProperty}
                        </Dialog.Description>
                        <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                        <Dialog.Button label="Save" onPress={this.handleSave} />
                    </Dialog.Container>
                </View>
                <StatusBar style="dark" />

                {this.state.isMain && (
                    <>
                        {/*<Button title='Generate Excel' onPress={shareExcel}/>*/}
                        <Button title='Naujas pirkimas' onPress={() => this.setState({ isMain: false })}/>
                        {/*    <TextLink onPress={() => setIsMain(false)}>*/}
                        {/*        <TextLinkContent>New Buyer</TextLinkContent>*/}
                        {/*    </TextLink>*/}
                    </>
                )}
                {!this.state.isMain && (
                    <>
                        <Text style={[this.ObjectResize().text, {textAlign: 'center'}]}>Viso prekių: {countTotal(this.state.table, this.state.priceList)}</Text>
                        <Text style={[this.ObjectResize().text, {textAlign: 'center'}]}>Viso EUR: {payTotal(this.state.table, this.state.priceList)}</Text>
                        <TouchableOpacity onPress={() => this.ToggleVisible()} style={{alignSelf: 'flex-end'}}>
                            <Text style={this.ObjectResize().text}>{this.state.visible ? 'Slėpti' : 'Nustatymai'}</Text>
                        </TouchableOpacity>

                        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
                            {/* Left Wrapper */}
                            <TouchableOpacity style={this.ObjectResize().singleHead}>
                                <Icon.Button
                                    name="printer"
                                    size={this.state.size*1.6}
                                    style={styles.singleHeadLeftSide}
                                    borderRadius={0}
                                    color={'red'}
                                    onPress={() => print(this.state.table, this.state.priceList).then(() => {
                                        this.resetHistory().then(() => this.createHistory())
                                    })}
                                >
                                </Icon.Button>
                            </TouchableOpacity>
                            <TouchableOpacity style={[this.ObjectResize().singleHead, {borderTopWidth: 1, borderRightWidth: 1}]}>
                                <Icon.Button
                                    name="delete"
                                    size={this.state.size*1.6}
                                    style={styles.singleHeadRightSide}
                                    borderRadius={0}
                                    color={'green'}
                                    onPress={() => {
                                        this.setState({table: []})
                                        console.log(this.state.table)
                                    }}
                                >
                                </Icon.Button>
                            </TouchableOpacity>

                            {/* Right Wrapper */}
                            <TableWrapper style={{flex:1}}>
                                <Cols data={[['Sveiki'], ['Remontas']]} heightArr={[this.state.size]} style={{backgroundColor: '#c8e1ff', height: this.state.size}} textStyle={{ textAlign: 'center', fontWeight: "bold", fontSize: (this.state.size*0.56) }}/>
                                <Cols data={this.tableState("tableData")} heightArr={[this.state.size+10]} flexArr={this.flex} textStyle={styles.text}/>

                            </TableWrapper>
                        </Table>
                        <ScrollView horizontal={false}>
                            <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
                                {/* Left Wrapper */}
                                <TableWrapper style={{width: 200}}>
                                    <TableWrapper style={{flexDirection: 'row'}}>
                                        <Col data={[this.headText('800x1200')]} heightArr={[9*this.state.size, 60]} />
                                        <Col data={this.tableState("tableTitle_1")} style={this.ObjectResize().title1} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} textStyle={styles.titleText}/>
                                    </TableWrapper>
                                    <TableWrapper style={{flexDirection: 'row'}}>
                                        <Col data={[this.headText('1000x1200')]} style={styles.head} heightArr={[6*this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                        <Col data={this.tableState("tableTitle_3")} style={this.ObjectResize().title1} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} textStyle={styles.titleText}/>
                                    </TableWrapper>
                                    <TableWrapper style={{flexDirection: 'row'}}>
                                        <Col data={[this.headText('1140')]} style={styles.head} heightArr={[3*this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                        <Col data={this.tableState("tableTitle_4")} style={this.ObjectResize().title1} heightArr={[this.state.size, this.state.size, this.state.size]} textStyle={styles.titleText}/>
                                    </TableWrapper>
                                    <TableWrapper style={{flexDirection: 'row'}}>
                                        <Col data={[this.headText('')]} style={styles.head} heightArr={[this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                        <Col data={this.tableState("tableTitle_5")} style={this.ObjectResize().title1} heightArr={[this.state.size]} textStyle={styles.titleText}/>
                                    </TableWrapper>
                                    <TableWrapper style={{flexDirection: 'row'}}>
                                        <Col data={[this.headText('')]} style={styles.head} heightArr={[this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                        <Col data={this.tableState("tableTitle_6")} style={this.ObjectResize().title1} heightArr={[this.state.size]} textStyle={styles.titleText}/>
                                    </TableWrapper>
                                    <TableWrapper style={{flexDirection: 'row'}}>
                                        <Col data={[this.headText('Nestandartai')]} style={styles.head} heightArr={[7*this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                        <Col data={this.tableState("tableTitle_7")} style={this.ObjectResize().title1} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} textStyle={styles.titleText}/>
                                    </TableWrapper>
                                    <TableWrapper style={{flexDirection: 'row'}}>
                                        <Col data={[this.headText('Šarnyrai')]} style={styles.head} heightArr={[5*this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                        <Col data={this.tableState("tableTitle_8")} style={this.ObjectResize().title1} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} textStyle={styles.titleText}/>
                                    </TableWrapper>
                                    <TableWrapper style={{flexDirection: 'row'}}>
                                        <Col data={[this.headText('Dekos')]} style={styles.head} heightArr={[2*this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                        <Col data={this.tableState("tableTitle_9")} style={this.ObjectResize().title1} heightArr={[this.state.size, this.state.size]} textStyle={styles.titleText}/>
                                    </TableWrapper>
                                    {/*<TableWrapper style={{flexDirection: 'row'}}>*/}
                                    {/*    <Col data={[headText('Plokštė')]} style={styles.head} heightArr={[2*size, 60]} textStyle={this.ObjectResize().text1} />*/}
                                    {/*    <Col data={state.tableTitle_10} style={ObjectResize().title1} heightArr={[size, size]} textStyle={styles.titleText}/>*/}
                                    {/*</TableWrapper>*/}
                                    <TableWrapper style={{flexDirection: 'row'}}>
                                        <Col data={[this.headText('')]} style={styles.head} heightArr={[this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                        <Col data={this.tableState("tableTitle_11")} style={this.ObjectResize().title1} heightArr={[this.state.size]} textStyle={styles.titleText}/>
                                    </TableWrapper>
                                </TableWrapper>

                                {/* Right Wrapper */}
                                <TableWrapper style={{flex:1}}>
                                    <Cols data={this.tableState("tableData_1")} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                    <Cols data={this.tableState("tableData_3")} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                    <Cols data={this.tableState("tableData_4")} heightArr={[this.state.size, this.state.size, this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                    <Cols data={this.tableState("tableData_5")} heightArr={[this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                    <Cols data={this.tableState("tableData_6")} heightArr={[this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                    <Cols data={this.tableState("tableData_7")} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                    <Cols data={this.tableState("tableData_8")} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                    <Cols data={this.tableState("tableData_9")} heightArr={[this.state.size, this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                    {/*<Cols data={state.tableData_10} heightArr={[size, size]} flexArr={flex} textStyle={ObjectResize().priceText}/>*/}
                                    <Cols data={this.tableState("tableData_11")} heightArr={[this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                </TableWrapper>

                            </Table>
                            <TextLink onPress={() => this.setState({ isMain: true })}>
                                <TextLinkContent>Back to main </TextLinkContent>
                            </TextLink>
                        </ScrollView>



                <View>
                    {/*{this.input('s_a1')}*/}
                    {/*{this.input('s_a2')}*/}
                    {/*{this.result('s_a1')}*/}
                    {/*{this.result('s_a2')}*/}
                    {/*<Button*/}
                    {/*    onPress={() => console.log(this.state.ChangeNumber)}*/}
                    {/*    title="Learn More"*/}
                    {/*    color="#841584"*/}
                    {/*    accessibilityLabel="Learn more about this purple button"*/}
                    {/*/>*/}
                    {/*<Button*/}
                    {/*    onPress={ this.getTest}*/}
                    {/*    title="Learn More"*/}
                    {/*    color="#841584"*/}
                    {/*    accessibilityLabel="Learn more about this purple button"*/}
                    {/*/>*/}
                </View>

                        {this.state.visible && ( <View style={[styles.settingsContainer, {top: StatusBarHeight+(window.height/2)}]}>
                            <Animated.View
                                style={[
                                    styles.fadingContainer,
                                    {
                                        // Bind opacity to animated value
                                        opacity: this.fadeAnim,
                                    }
                                ]}
                            >

                                <Text onPress={() => this.ToggleVisible()} style={[styles.sizeText, { position: 'absolute', right: 5}]}>X</Text>
                                <Text style={styles.sizeText}>Turinio dydis</Text>
                                <View style={styles.settings}>
                                    <Text style={styles.sizeValue}>{Math.round(this.state.size)}</Text>
                                    <Slider
                                        style={styles.slider}
                                        value={this.state.isTouchEnded ? this.state.size : this.state.size}//not done
                                        minimumValue={25}
                                        maximumValue={50}
                                        minimumTrackTintColor="#FFFFFF"
                                        maximumTrackTintColor="#000000"
                                        onTouchEnd={() => this.saveWindowSize()}
                                        onTouchStart={() => this.setState({ isTouchEnded: false })}
                                        onValueChange={newNumber => (!this.state.isTouchEnded)? this.setState({ size: newNumber }) : this.setState({ size: this.state.size })}
                                        // onSlidingStart={newNumber => setSize(newNumber)}
                                        onSlidingComplete={newNumber => this.setState({ size: newNumber })}
                                    />
                                </View>
                            </Animated.View>
                        </View> ) }
                    </>
                )}
            </View>
        )
    }
}


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
