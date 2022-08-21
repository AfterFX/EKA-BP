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
import {countTotal, destroy, payTotal, price, print, saveNewPrice} from "../components/functions";
import Dialog from "react-native-dialog";
import {StatusBar} from "expo-status-bar";
import {useRef} from "react";
import {StatusBarHeight, TextLink, TextLinkContent} from "../components/styles";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/AntDesign";
import {Col, Cols, Table, TableWrapper} from "react-native-table-component";
import {State, TapGestureHandler} from "react-native-gesture-handler";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const prices = {
    "s_a1": 10,
    "r_a1": 20,
    "s_a2": 30,
    "r_a2": 40,
    "s_b2": 50,
    "r_b2": 60,
    "s_lpm_800": "",
    "r_lpm_800": "",
    "s_lsd_800": 0,
    "r_lsd_800": 0,
    "s_sd_800": 0,
    "r_sd_800": 0,
    "s_ap_800": 0,
    "r_ap_800": 0,
    "s_pm_800": 0,
    "r_pm_800": 0,
    "s_knauf_800": 0,
    "r_knauf_800": 0,

    "s_lsd_1000": 0,
    "r_lsd_1000": 0,
    "s_sd_1000": 0,
    "r_sd_1000": 0,
    "s_pm_1000": 0,
    "r_pm_1000": 0,
    "s_knauf_1000": "",
    "r_knauf_1000": "",
    "s_cp1_1000": 0,
    "r_cp1_1000": 0,
    "s_cp6_1000": 0,
    "r_cp6_1000": 0,

    "s_sd_1140": 0,
    "r_sd_1140": 0,
    "s_cp3_1140": 0,
    "r_cp3_1140": 0,
    "s_cp9_1140": 0,
    "r_cp9_1140": 0,

    "s_paroc": 0,
    "r_paroc": 0,

    "s_knauf": 0,
    "r_knauf": 0,

    "s_600x800": 0,
    "r_600x800": 0,
    "s_800x800": 0,
    "r_800x800": 0,
    "s_1100x1100": 0,
    "r_1100x1100": 0,
    "s_1000x1000": 0,
    "r_1000x1000": 0,
    "s_1200x1200": 0,
    "r_1200x1200": 0,
    "s_1100x1300": 0,
    "r_1100x1300": 0,
    "s_1200x1600": 0,
    "r_1200x1600": 0,
    "s_1600x3000": 0,
    "r_1600x3000": 0,


    "s_apvadai_800x1200_white": 0,
    "r_apvadai_800x1200_white": 0,
    "s_apvadai_800x1200_black": 0,
    "r_apvadai_800x1200_black": 0,
    "s_apvadai_600x800_white": 0,
    "r_apvadai_600x800_white": 0,
    "s_apvadai_600x800_black": 0,
    "r_apvadai_600x800_black": 0,
    "s_apvadai_800x2000_mix": 0,
    "r_apvadai_800x2000_mix": 0,

    "s_dekos_800x1200": 0,
    "r_dekos_800x1200": 0,
    "s_dekos_1000x1200": 0,
    "r_dekos_1000x1200": 0,

    "s_plokste_800x1200_p": 0,
    "r_plokste_800x1200_p": 0,
    "s_plokste_800x1200_s": 0,
    "r_plokste_800x1200_s": 0,

    "s_srotas": 0,
    "r_srotas": 0
}


interface MyProps {

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
    getEditableElement: string,
    size: number,
    visible: boolean,
    isTouchEnded: boolean,
    error: null
}

export class Buy1 extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        super(props);

        this.state = {
            isMain: true,
            foo: false,
            text: '',
            result: '',
            table: {},
            priceList: prices,
            dialogVisible: false,
            OnChangePrice: '',
            getEditableElement: '',
            size: 25,
            visible: false,
            isTouchEnded: true,
            error: null
        };
    }

    componentDidMount() {
        console.log('componentDidMount() lifecycle');

        // Trigger update
        this.setState({ foo: !this.state.foo });
    }


    flex = [1, 1, 1, 1, 1, 1];

    tableState = () => {
       return {
           tableTitle_1: [this.t('EUR A1', false), this.t('EUR A', false), this.t('EUR B', false), this.t('', true), this.t('LSD', true), this.t('SD', false), this.t('SD AP', false), this.t('PM', false), this.t('KNAUF', true)],
           tableTitle_3: [this.t('LSD, FIN', false), this.t('SD, perimetriniai', false), this.t('PM, perimetriniai, SD AP', false), this.t('', false), this.t('CP1', false), this.t('CP6', true)],
           tableTitle_4: [this.t('LSD, SD', false), this.t('CP3', false), this.t('CP9', true)],
           tableTitle_5: [this.t('PAROC', true)],
           tableTitle_6: [this.t('KNAUF', true)],
           tableTitle_7: [this.t('600x800', false), this.t('800x800', false), this.t('1000x1000', false), this.t('', false), this.t('1200x1200', false), this.t('1100x1300', false), this.t('Nestandartiniai padėlai', true)],
           tableTitle_8: [this.t('800x1200 (šviesūs)', false), this.t('800x1200 (tamsūs)', false), this.t('600x800 (šviesūs)', false), this.t('600x800 (tamsūs)', false), this.t('nestandartai 800x2000', true)],
           tableTitle_9: [this.t('800x1200', false), this.t('1000x1200', true)],
           tableTitle_10: [this.t('2,8 - 3,2', false), this.t('6 - 10', true)],
           tableTitle_11: [this.t('Mediniai padėklai', true)],
           tableData: [
               [this.elementCol('Kiekis')],
               [this.elementCol('Kaina € /vnt')],
               [this.elementCol('Suma')],
               [this.elementCol('Kiekis')],
               [this.elementCol('Kaina € /vnt')],
               [this.elementCol('Suma')],
           ],
           tableData_1: [
               this.s_800x1200(),
               [this.elementPrice('s_a1', false), this.elementPrice('s_a2', false), this.elementPrice('s_b2', false), this.elementPrice('s_lpm_800', true), this.elementPrice('s_lsd_800', true), this.elementPrice('s_sd_800', false), this.elementPrice('s_ap_800', false), this.elementPrice('s_pm_800', false), this.elementPrice('s_knauf_800', true)],
               this.s_sum_800x1200(),
               this.r_800x1200(),
               [this.elementPrice('r_a1', false), this.elementPrice('r_a2', false), this.elementPrice('r_b2', false), this.elementPrice('r_lpm_800', true), this.elementPrice('r_lsd_800', true), this.elementPrice('r_sd_800', false), this.elementPrice('r_ap_800', false), this.elementPrice('r_pm_800', false), this.elementPrice('r_knauf_800', true)],
               this.r_sum_800x1200(),
           ],
           tableData_3: [
               this.s_1000x1200(),
               [this.elementPrice('s_lsd_1000', false), this.elementPrice('s_sd_1000', false), this.elementPrice('s_pm_1000', false), this.elementPrice('s_knauf_1000', false), this.elementPrice('s_cp1_1000', false), this.elementPrice('s_cp6_1000', true)],
               this.s_sum_1000x1200(),
               this.r_1000x1200(),
               [this.elementPrice('r_lsd_1000', false), this.elementPrice('r_sd_1000', false), this.elementPrice('r_pm_1000', false), this.elementPrice('r_knauf_1000', false), this.elementPrice('r_cp1_1000', false), this.elementPrice('r_cp6_1000', true)],
               this.r_sum_1000x1200(),
           ],
           tableData_4: [
               this.s_1140x1140(),
               [this.elementPrice('s_sd_1140', false), this.elementPrice('s_cp3_1140', false), this.elementPrice('s_cp9_1140', true)],
               this.s_sum_1140x1140(),
               this.r_1140x1140(),
               [this.elementPrice('r_sd_1140', false), this.elementPrice('r_cp3_1140', false), this.elementPrice('r_cp9_1140', true)],
               this.r_sum_1140x1140(),
           ],
           tableData_5: [
               this.s_paroc(),
               [this.elementPrice('s_paroc', true)],
               this.s_sum_paroc(),
               this.r_paroc(),
               [this.elementPrice('r_paroc', true)],
               this.r_sum_paroc(),
           ],
           tableData_6: [
               this.s_knauf(),
               [this.elementPrice('s_knauf', true)],
               this.s_sum_knauf(),
               this.r_knauf(),
               [this.elementPrice('r_knauf', true)],
               this.r_sum_knauf(),
           ],
           tableData_7: [
               this.s_Nstandart(),
               [this.elementPrice('s_600x800', false), this.elementPrice('s_800x800', false), this.elementPrice('s_1000x1000', false), this.elementPrice('', false), this.elementPrice('s_1200x1200', false), this.elementPrice('s_1100x1300',false), this.elementPrice('s_1600x3000', true)],
               this.s_sum_Nstandart(),
               this.r_Nstandart(),
               [this.elementPrice('r_600x800', false), this.elementPrice('r_800x800', false), this.elementPrice('r_1000x1000', false), this.elementPrice('', false), this.elementPrice('r_1200x1200', false), this.elementPrice('r_1100x1300', false), this.elementPrice('r_1600x3000', true)],
               this.r_sum_Nstandart(),
           ],
           tableData_8: [
               this.s_apvadai(),
               [this.elementPrice('s_apvadai_800x1200_white', false), this.elementPrice('s_apvadai_800x1200_black', false), this.elementPrice('s_apvadai_600x800_white', false), this.elementPrice('s_apvadai_600x800_black', false), this.elementPrice('s_apvadai_800x2000_mix', true)],
               this.s_sum_apvadai(),
               this.r_apvadai(),
               [this.elementPrice('r_apvadai_800x1200_white', false), this.elementPrice('r_apvadai_800x1200_black', false), this.elementPrice('r_apvadai_600x800_white', false), this.elementPrice('r_apvadai_600x800_black', false), this.elementPrice('r_apvadai_800x2000_mix', true)],
               this.r_sum_apvadai(),
           ],
           tableData_9: [
               this.s_dekos(),
               [this.elementPrice('s_dekos_800x1200', false), this.elementPrice('s_dekos_1000x1200', true)],
               this.s_sum_dekos(),
               this.r_dekos(),
               [this.elementPrice('r_dekos_800x1200', false), this.elementPrice('r_dekos_1000x1200', true)],
               this.r_sum_dekos(),
           ],
           tableData_10: [
               this.s_plokste(),
               [this.elementPrice('s_plokste_800x1200_p', false), this.elementPrice('s_plokste_800x1200_s', true)],
               this.s_sum_plokste(),
               this.r_plokste(),
               [this.elementPrice('r_plokste_800x1200_p', false), this.elementPrice('r_plokste_800x1200_s', true)],
               this.r_sum_plokste(),
           ],
           tableData_11: [
               this.s_srotas(),
               [this.elementPrice('s_srotas', true)],
               this.s_sum_srotas(),
               this.r_srotas(),
               [this.elementPrice('r_srotas', true)],
               this.r_sum_srotas(),
           ]
       }
    }

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

    showPriceEditor = async (element: string) => {
        setOnChangePrice(this.state.priceList[element])
        setGetEditableElement(element);//sets editor what shows
        setDialogVisible(true);
    };

    elementInput = (id: any, underline: boolean) => {
        return (

            <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table[id]}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                onChangeText={newNumber => this.OnChange(id, newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />

        )
    };

    s_800x1200 = () => {
        console.log(this.state.table['s_a1'])
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_a1']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_a1', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_a2']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_a2', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_b2']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_b2', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_lpm_800']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_lpm_800', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,
            <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table['s_lsd_800']}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                onChangeText={newNumber => this.OnChange('s_lsd_800', newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />, <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table['s_sd_800']}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                onChangeText={newNumber => this.OnChange('s_sd_800', newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />, <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table['s_ap_800']}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                onChangeText={newNumber => this.OnChange('s_ap_800', newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />, <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table['s_pm_800']}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                onChangeText={newNumber => this.OnChange('s_pm_800', newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />, <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table['s_knauf_800']}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                onChangeText={newNumber => this.OnChange('s_knauf_800', newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />]





    };

    s_1000x1200 = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_lsd_1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_lsd_1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_sd_1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_sd_1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_pm_1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_pm_1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_knauf_1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_knauf_1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,
        <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_cp1_1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_cp1_1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_cp6_1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_cp6_1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };


    s_1140x1140 = () => {
        // [this.elementInput('', false), this.elementInput('', false), this.elementInput('', true)]
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_sd_1140']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_sd_1140', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_cp3_1140']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_cp3_1140', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_cp9_1140']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_cp9_1140', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    s_paroc = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_paroc']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_paroc', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    s_knauf = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_knauf']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_knauf', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    s_Nstandart = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_600x800']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_600x800', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_800x800']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_800x800', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_1000x1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_1000x1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_1200x1200']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_1200x1200', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_1100x1300']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_1100x1300', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_1600x3000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_1600x3000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    s_apvadai = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_apvadai_800x1200_white']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_apvadai_800x1200_white', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_apvadai_800x1200_black']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_apvadai_800x1200_black', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_apvadai_600x800_white']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_apvadai_600x800_white', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_apvadai_600x800_black']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_apvadai_600x800_black', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_apvadai_800x2000_mix']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_apvadai_800x2000_mix', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    s_dekos = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_dekos_800x1200']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_dekos_800x1200', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_dekos_1000x1200']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_dekos_1000x1200', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    s_plokste = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_plokste_800x1200_p']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_plokste_800x1200_p', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_plokste_800x1200_s']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_plokste_800x1200_s', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    s_srotas = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['s_srotas']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('s_srotas', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    r_800x1200 = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_a1']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_a1', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_a2']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_a2', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_b2']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_b2', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_lpm_800']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_lpm_800', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,
            <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table['r_lsd_800']}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                onChangeText={newNumber => this.OnChange('r_lsd_800', newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />, <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table['r_sd_800']}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                onChangeText={newNumber => this.OnChange('r_sd_800', newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />, <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table['r_ap_800']}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                onChangeText={newNumber => this.OnChange('r_ap_800', newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />, <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table['r_pm_800']}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                onChangeText={newNumber => this.OnChange('r_pm_800', newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />, <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table['r_knauf_800']}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                onChangeText={newNumber => this.OnChange('r_knauf_800', newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />]





    };

    r_1000x1200 = () => {
        //               [this.elementInput('', false), this.elementInput('', false), this.elementInput('', false), this.elementInput('', false), this.elementInput('', false), this.elementInput('', true)],
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_lsd_1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_lsd_1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_sd_1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_sd_1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_pm_1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_pm_1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_knauf_1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_knauf_1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_cp1_1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_cp1_1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_cp6_1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_cp6_1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    r_1140x1140 = () => {
        // [this.elementResult('', false), this.elementResult('', false), this.elementResult('', true)],
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_sd_1140']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_sd_1140', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_cp3_1140']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_cp3_1140', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />, <TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_cp9_1140']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_cp9_1140', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };


    r_paroc = () => {
        // [this.elementResult('', false), this.elementResult('', false), this.elementResult('', true)],
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_paroc']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_paroc', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    r_knauf = () => {
        // [this.elementResult('', false), this.elementResult('', false), this.elementResult('', true)],
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_knauf']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_knauf', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };


    r_Nstandart = () => {
        // [this.elementInput('', false), this.elementInput('', false), this.elementInput('', false), this.elementInput('', false), this.elementInput('', false), this.elementInput('', false), this.elementInput('', true)]
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_600x800']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_600x800', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_800x800']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_800x800', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_1000x1000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_1000x1000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_1200x1200']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_1200x1200', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_1100x1300']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_1100x1300', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_1600x3000']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_1600x3000', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,]
    };

    r_apvadai = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_apvadai_800x1200_white']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_apvadai_800x1200_white', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_apvadai_800x1200_black']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_apvadai_800x1200_black', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_apvadai_600x800_white']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_apvadai_600x800_white', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_apvadai_600x800_black']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_apvadai_600x800_black', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_apvadai_800x2000_mix']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_apvadai_800x2000_mix', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    r_dekos = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_dekos_800x1200']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_dekos_800x1200', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_dekos_1000x1200']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_dekos_1000x1200', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    r_plokste = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_plokste_800x1200_p']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_plokste_800x1200_p', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />,<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_plokste_800x1200_s']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_plokste_800x1200_s', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    r_srotas = () => {
        const underline = false
        return [<TextField
            style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
            value={this.state.table['r_srotas']}
            label=""
            errorText={this.state.error}
            fontSizeC={(this.state.size*0.56)}
            onChangeText={newNumber => this.OnChange('r_srotas', newNumber)}
            textAlign={"center"}
            keyboardType={"phone-pad"}
        />]
    };

    elementInput1 = (id: any, underline: boolean) => {
        return (

            <TextField
                style={[styles.textField, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}
                value={this.state.table[id]}
                label=""
                errorText={this.state.error}
                fontSizeC={(this.state.size*0.56)}
                onChangeText={newNumber => this.OnChange(id, newNumber)}
                textAlign={"center"}
                keyboardType={"phone-pad"}
            />

        )
    };

    s_sum_800x1200 = () => {
        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_a1']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_a2']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_b2']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_lpm_800']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_lsd_800']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_sd_800']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_ap_800']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_pm_800']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_knauf_800']?.['totalPrice']}</Text>
        </View>]
    };

    s_sum_1000x1200 = () => {
        //                [this.elementResult('', false), this.elementResult('', false), this.elementResult('', false), this.elementResult('', false), this.elementResult('', false), this.elementResult('', true)],
        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_lsd_1000']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_sd_1000']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_pm_1000']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_knauf_1000']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_cp1_1000']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_cp6_1000']?.['totalPrice']}</Text>
        </View>]
    };


    s_sum_1140x1140 = () => {
        const underline = false;
        // [this.elementResult('', false), this.elementResult('', false), this.elementResult('', true)]        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_sd_1140']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_cp3_1140']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_cp9_1140']?.['totalPrice']}</Text>
        </View>]
    };

    s_sum_paroc = () => {
        const underline = false;
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_paroc']?.['totalPrice']}</Text>
        </View>]
    };

    s_sum_knauf = () => {
        const underline = false;
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_knauf']?.['totalPrice']}</Text>
        </View>]
    };

    s_sum_Nstandart = () => {
        const underline = false;
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_600x800']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_800x800']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_1000x1000']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_1200x1200']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_1100x1300']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_1600x3000']?.['totalPrice']}</Text>
        </View>,]
    };

    s_sum_apvadai = () => {
        const underline = false;
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_apvadai_800x1200_white']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_apvadai_800x1200_black']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_apvadai_600x800_white']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_apvadai_600x800_black']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_apvadai_800x2000_mix']?.['totalPrice']}</Text>
        </View>]
    };

    s_sum_dekos = () => {
        const underline = false;
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_dekos_800x1200']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_dekos_1000x1200']?.['totalPrice']}</Text>
        </View>]
    };

    s_sum_plokste = () => {
        const underline = false;
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_plokste_800x1200_p']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_plokste_800x1200_s']?.['totalPrice']}</Text>
        </View>]
    };

    s_sum_srotas = () => {
        const underline = false;
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['s_srotas']?.['totalPrice']}</Text>
        </View>]
    };

    r_sum_800x1200 = () => {
        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_a1']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_a2']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_b2']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_lpm_800']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_lsd_800']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_sd_800']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_ap_800']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_pm_800']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_knauf_800']?.['totalPrice']}</Text>
        </View>]
    };

    r_sum_1000x1200 = () => {
        // [this.elementResult('', false), this.elementResult('', false), this.elementResult('', false), this.elementResult('', false), this.elementResult('', false), this.elementResult('', true)]
        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_lsd_1000']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_sd_1000']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_pm_1000']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_knauf_1000']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_cp1_1000']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_cp6_1000']?.['totalPrice']}</Text>
        </View>]
    };

    r_sum_1140x1140 = () => {
        // [this.elementResult('', false), this.elementResult('', false), this.elementResult('', true)],
        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_sd_1140']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_cp3_1140']?.['totalPrice']}</Text>
        </View>, <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_cp9_1140']?.['totalPrice']}</Text>
        </View>]
    };

    r_sum_paroc = () => {
        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_paroc']?.['totalPrice']}</Text>
        </View>]
    };

    r_sum_knauf = () => {
        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_knauf']?.['totalPrice']}</Text>
        </View>]
    };

    r_sum_Nstandart = () => {
        // [this.elementResult('', false), this.elementResult('', false), this.elementResult('', false), this.elementResult('', false), this.elementResult('', false), this.elementResult('', false), this.elementResult('', true)]
        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_600x800']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_800x800']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_1000x1000']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_1200x1200']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_1100x1300']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_1600x3000']?.['totalPrice']}</Text>
        </View>,]
    };

    r_sum_apvadai = () => {
        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_apvadai_800x1200_white']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_apvadai_800x1200_black']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_apvadai_600x800_white']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_apvadai_600x800_black']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_apvadai_800x2000_mix']?.['totalPrice']}</Text>
        </View>]
    };

    r_sum_dekos = () => {
        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_dekos_800x1200']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_dekos_1000x1200']?.['totalPrice']}</Text>
        </View>]
    };

    r_sum_plokste = () => {
        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_plokste_800x1200_p']?.['totalPrice']}</Text>
        </View>,<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_plokste_800x1200_s']?.['totalPrice']}</Text>
        </View>]
    };

    r_sum_srotas = () => {
        const underline = false
        return [<View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
            <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table['r_srotas']?.['totalPrice']}</Text>
        </View>]
    };

    elementResult = (element: any, underline: boolean) => {
        return (
            <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
                <Text style={{fontSize: (this.state.size > 40? 22 : this.state.size*0.56)}}>{this.state.table[element]?.['totalPrice']}</Text>
            </View>
        )
    };

    elementPrice = (element: string, underline: boolean) => (
        <this.DoubleTapButton onDoubleTap={() => this.showPriceEditor(element)}>
            <View style={[styles.colResult, {height: '100%', justifyContent: 'center'}, underline ? {borderBottomWidth: 2} : {borderBottomWidth: 0}]}>
                <Text style={{fontSize: (this.state.size*0.56), textAlign: "center"}}>{this.state.priceList[element]}</Text>
            </View>
        </this.DoubleTapButton>
    );

    OnChange = (element: string, value: any) =>{
        this.setState((previousState) => {
            return {
                table: {
                    ...previousState.table,
                    [element]: {"units": value, "totalPrice": value*this.state.priceList[element] }
                }
            }
        });

        this.setState({ text: value })
        this.setState({ result: value*2 })
    }
    input = (element: string) =>{
        return (
            <TextField style={{width: 250, height: 20}}
                       value={this.state.table[element]}
                       label=""
                       onChangeText={newNumber => this.OnChange(element, newNumber)}
                       textAlign={"center"}
                       keyboardType={"phone-pad"}
            />
        )
    }

    result = (element: string) =>{
        return (
            <View style={{width: 250, height: 20}}>
                <Text>{this.state.table[element]?.['totalPrice']}</Text>
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
        // await saveNewPrice(getEditableElement, OnChangePrice)
        // await getStorage();//Refreshing numbers after save
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


    // console.log(JSON.stringify(this.state.table, null, ' '))
    render() {

        return (
        <View style={[styles.container]}>
            {/*price editor*/}
            <View>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Edit price</Dialog.Title>
                    <Dialog.Input value={this.state.OnChangePrice || ''} onChangeText={newValue => (this.ChangePrice(newValue))} keyboardType={"phone-pad"} style={{width: 100, alignSelf: 'center', textAlign: 'center'}}/>
                    <Dialog.Description>
                        {this.state.getEditableElement}
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
                    <Text style={[this.ObjectResize().text, {textAlign: 'center'}]}>Viso prekių: {countTotal({"s_a1": "20", "s_a2": "1"}, this.state.priceList)}</Text>
                    <Text style={[this.ObjectResize().text, {textAlign: 'center'}]}>Viso EUR: {payTotal({"s_a1": "20", "s_a2": "1"}, this.state.priceList)}</Text>
                    <TouchableOpacity onPress={() => this.ToggleVisible()} style={{ }}>
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
                                onPress={() => print({"s_a1": "1", "s_a2": "1"}, this.state.OnChangePrice, this.state.isMain, this.state.priceList)}
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
                                onPress={() => destroy(this.state.OnChangePrice)}
                            >
                            </Icon.Button>
                        </TouchableOpacity>

                        {/* Right Wrapper */}
                        <TableWrapper style={{flex:1}}>
                            <Cols data={[['Sveiki'], ['Remontas']]} heightArr={[this.state.size]} style={{backgroundColor: '#c8e1ff', height: this.state.size}} textStyle={{ textAlign: 'center', fontWeight: "bold", fontSize: (this.state.size*0.56) }}/>
                            <Cols data={this.tableState().tableData} heightArr={[this.state.size+10]} flexArr={this.flex} textStyle={styles.text}/>

                        </TableWrapper>
                    </Table>
                    <ScrollView horizontal={false}>
                        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
                            {/* Left Wrapper */}
                            <TableWrapper style={{width: 200}}>
                                <TableWrapper style={{flexDirection: 'row'}}>
                                    <Col data={[this.headText('800x1200')]} heightArr={[9*this.state.size, 60]} />
                                    <Col data={this.tableState().tableTitle_1} style={this.ObjectResize().title1} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} textStyle={styles.titleText}/>
                                </TableWrapper>
                                <TableWrapper style={{flexDirection: 'row'}}>
                                    <Col data={[this.headText('1000x1200')]} style={styles.head} heightArr={[6*this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                    <Col data={this.tableState().tableTitle_3} style={this.ObjectResize().title1} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} textStyle={styles.titleText}/>
                                </TableWrapper>
                                <TableWrapper style={{flexDirection: 'row'}}>
                                    <Col data={[this.headText('1140')]} style={styles.head} heightArr={[3*this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                    <Col data={this.tableState().tableTitle_4} style={this.ObjectResize().title1} heightArr={[this.state.size, this.state.size, this.state.size]} textStyle={styles.titleText}/>
                                </TableWrapper>
                                <TableWrapper style={{flexDirection: 'row'}}>
                                    <Col data={[this.headText('')]} style={styles.head} heightArr={[this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                    <Col data={this.tableState().tableTitle_5} style={this.ObjectResize().title1} heightArr={[this.state.size]} textStyle={styles.titleText}/>
                                </TableWrapper>
                                <TableWrapper style={{flexDirection: 'row'}}>
                                    <Col data={[this.headText('')]} style={styles.head} heightArr={[this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                    <Col data={this.tableState().tableTitle_6} style={this.ObjectResize().title1} heightArr={[this.state.size]} textStyle={styles.titleText}/>
                                </TableWrapper>
                                <TableWrapper style={{flexDirection: 'row'}}>
                                    <Col data={[this.headText('Nestandartai')]} style={styles.head} heightArr={[7*this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                    <Col data={this.tableState().tableTitle_7} style={this.ObjectResize().title1} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} textStyle={styles.titleText}/>
                                </TableWrapper>
                                <TableWrapper style={{flexDirection: 'row'}}>
                                    <Col data={[this.headText('Šarnyrai')]} style={styles.head} heightArr={[5*this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                    <Col data={this.tableState().tableTitle_8} style={this.ObjectResize().title1} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} textStyle={styles.titleText}/>
                                </TableWrapper>
                                <TableWrapper style={{flexDirection: 'row'}}>
                                    <Col data={[this.headText('Dekos')]} style={styles.head} heightArr={[2*this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                    <Col data={this.tableState().tableTitle_9} style={this.ObjectResize().title1} heightArr={[this.state.size, this.state.size]} textStyle={styles.titleText}/>
                                </TableWrapper>
                                {/*<TableWrapper style={{flexDirection: 'row'}}>*/}
                                {/*    <Col data={[headText('Plokštė')]} style={styles.head} heightArr={[2*size, 60]} textStyle={this.ObjectResize().text1} />*/}
                                {/*    <Col data={state.tableTitle_10} style={ObjectResize().title1} heightArr={[size, size]} textStyle={styles.titleText}/>*/}
                                {/*</TableWrapper>*/}
                                <TableWrapper style={{flexDirection: 'row'}}>
                                    <Col data={[this.headText('')]} style={styles.head} heightArr={[this.state.size, 60]} textStyle={this.ObjectResize().text1} />
                                    <Col data={this.tableState().tableTitle_11} style={this.ObjectResize().title1} heightArr={[this.state.size]} textStyle={styles.titleText}/>
                                </TableWrapper>
                            </TableWrapper>

                            {/* Right Wrapper */}
                            <TableWrapper style={{flex:1}}>
                                <Cols data={this.tableState().tableData_1} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                <Cols data={this.tableState().tableData_3} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                <Cols data={this.tableState().tableData_4} heightArr={[this.state.size, this.state.size, this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                <Cols data={this.tableState().tableData_5} heightArr={[this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                <Cols data={this.tableState().tableData_6} heightArr={[this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                <Cols data={this.tableState().tableData_7} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                <Cols data={this.tableState().tableData_8} heightArr={[this.state.size, this.state.size, this.state.size, this.state.size, this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                <Cols data={this.tableState().tableData_9} heightArr={[this.state.size, this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
                                {/*<Cols data={state.tableData_10} heightArr={[size, size]} flexArr={flex} textStyle={ObjectResize().priceText}/>*/}
                                <Cols data={this.tableState().tableData_11} heightArr={[this.state.size]} flexArr={this.flex} textStyle={this.ObjectResize().priceText}/>
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
                                    onTouchEnd={() => this.setState({ isTouchEnded: true })}
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
