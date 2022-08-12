import * as React from 'react';
import {Button, Text, View} from "react-native";
import TextField from "../components/TextField";
import {price} from "../components/functions";


interface MyProps {

}

interface MyState {
    foo: boolean,
    text: string,
    result: any,
    table: any,
    priceList: any
}
export class Buy1 extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        super(props);

        this.state = {
            foo: false,
            text: '',
            result: '',
            table: {s_a1: {},
                s_a2: {}},
            priceList: {
                s_a1: 12,
                s_a2: 540,
            }
        };
    }



    componentDidMount() {
        console.log('componentDidMount() lifecycle');

        // Trigger update
        this.setState({ foo: !this.state.foo });
    }
    OnChange = (element: string, value: any) =>{
        // this.setState({ ChangeNumber: [...this.state.ChangeNumber, {[element]: value} ] }) //simple value
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
                <Text>{this.state.table[element]['totalPrice']}</Text>
            </View>
        )
    }

    render() {

        return (
        <View style={{top: 100}}>
            {this.input('s_a1')}
            {this.input('s_a2')}
            {this.result('s_a1')}
            {this.result('s_a2')}
            {/*<Button*/}
            {/*    onPress={() => console.log(this.state.ChangeNumber)}*/}
            {/*    title="Learn More"*/}
            {/*    color="#841584"*/}
            {/*    accessibilityLabel="Learn more about this purple button"*/}
            {/*/>*/}
        </View>
        )
    }
}
