import * as React from 'react';
import {View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { Chip, Text } from 'react-native-paper';
import Datatable from './Datatable';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data : null,
            table: {
                s_a1:  {
                    "totalPrice": 0,
                    "units": 0,
                },
                s_a2:  {
                    "totalPrice": 0,
                    "units": 0,
                },
            }
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




    history = async () => {
        return  await AsyncStorage.getItem('@BuyHistory')
        // console.log(JSON.parse([BuyHistory]))
    }

    resultOfTheDay = () => {
        let content = JSON.parse(this.state.data);

        // let sum = content.reduce(function(prev, current) {
        //     console.log()
        //     return prev + +current.id
        // }, 0);
        // console.log(sum)

        // content.reduce(function(prev, current) {
        //     console.log(current.table["s_a1"])
        //     return prev + +current.id
        // }, 0);

        // content.map(function(d){
        //
        //     [d.table].forEach(v => {console.log(v)})
        // })
        let lol: any
        let lol1: any
        // content.map(function(d){
        //     Object.entries(d.table).forEach(([key, val]) => {
        //         // console.log(key); // the name of the current key.
        //         // console.log(val.units); // the value of the current key.
        //
        //
        //     });
        //
        // })

        // https://stackoverflow.com/questions/15748656/javascript-reduce-on-object
        //https://stackoverflow.com/questions/60089494/reduce-and-sum-array-of-objects-js
            Object.entries(content).forEach(([key, val]) => {
                // console.log(key); // the name of the current key.
                // console.log(val); // the value of the current key.
                Object.entries(val.table).forEach(([key1, val1]) => {
                    // console.log(key1); // the name of the current key.
                    // console.log(val.table); // the value of the current key.


            });

        const models = [
            { id: 1, name: "samsung", seller_id: 1, count: 56 },
            { id: 1, name: "samsung", seller_id: 2, count: 68 },
            { id: 2, name: "nokia", seller_id: 2, count: 45 },
            { id: 2, name: "nokia", seller_id: 3, count: 49 }
        ];

        const arr = content.reduce((acc, item) => {
            let existItem = acc.find(({id}) => item.id === id);
            if(existItem) {
                existItem.count += item.count;
            } else {
                acc.push(item);
            }
            return acc;
        }, []);

        // console.log(arr);






        // console.log(lol1)





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
                                        <TouchableOpacity onPress={() => console.log(row.id)}>
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
});
