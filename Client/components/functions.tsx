import prices from "../price.json";
import * as Print from "expo-print";
import createDynamicTable from "./printTable";


export const price = (element: number, number: any[]) => {
    let result = number[element] * prices[element];
    return (number[element])? Math.round(result * 100) / 100: "";
}

export const countTotal = (number: Array<String>) => {
    let countTotal = 0;
    Object.keys(number).map(function(key, index) {
        if(price(key, number) > 0)
            countTotal += (number[key])? Math.round(number[key] * 100) / 100: "";
    });
    return countTotal;
}

export const payTotal = (number: Array<String>) => {
    let totalPrice = 0;
    Object.keys(number).map(function(key, index) {
        if(price(key, number) > 0)
            totalPrice += price(key, number);
    });
    return totalPrice;
}

export const print = async (number: Array<String>) => {
    await Print.printAsync({
        html: createDynamicTable(number).html,
    });
}

export const destroy = async (onChangeNumber: (value: (((prevState: Array<String>) => Array<String>) | Array<String>)) => void) => {
    return onChangeNumber([]);
}