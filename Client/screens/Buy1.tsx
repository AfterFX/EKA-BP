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
    ChangeNumber: any,
    price: any
}
export class Buy1 extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        super(props);

        this.state = {
            foo: false,
            text: '',
            result: '',
            ChangeNumber: [],
            price: {
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
                ChangeNumber: {
                    ...previousState.ChangeNumber,
                    [element]: value
                }
            }
        });

        this.setState({ text: value })
        this.setState({ result: value*2 })
    }
    input = (element: string) =>{
        console.log(this.state.ChangeNumber)
        return (
            <TextField style={{width: 250, height: 20}}
                       value={this.state.ChangeNumber[element]}
                       label=""
                       onChangeText={newNumber => this.OnChange(element, newNumber)}
                       textAlign={"center"}
                       keyboardType={"phone-pad"}
            />
        )
    }

    result = (element: string) =>{
        console.log(element)
        return (
            <View style={{width: 250, height: 20}}>
                <Text>{this.state.ChangeNumber[element] * this.state.price['s_a1']}</Text>
            </View>
        )
    }

    render() {

        return (
        <View style={{top: 100}}>
            {this.input('a1')}
            {this.input('a2')}
            {this.result('a1')}
            {this.result('a2')}
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
