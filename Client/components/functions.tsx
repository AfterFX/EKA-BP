import prices from "../price.json";
import * as Print from "expo-print";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pricesIndex from "../price.json";

const getStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@Price')
        jsonValue != null ? JSON.parse(jsonValue) : await AsyncStorage.mergeItem('@Price', JSON.stringify(pricesIndex) ); //            JSON.stringify({s_a1: 50 })
        return jsonValue != null ? JSON.parse(jsonValue) : pricesIndex;
    } catch(e) {
        // read error
    }
}



export const price = (property: any, newPriceObject: any, storedPrices: any) => {
    // console.log("dfrghdft", storedPrices)
    let result = newPriceObject[property] * storedPrices?.[property]
    return (newPriceObject[property])? Math.round(result * 100) / 100: "";
}

export const countTotal = (number: Array<String>, storedPrices: any) => {
    let countTotal = 0;
    Object.keys(number).map(function(key, index) {
        if(price(key, number, storedPrices) > 0)
            countTotal += (number[key])? Math.round(number[key] * 100) / 100: "";
    });
    return countTotal;
}

export const payTotal = (number: Array<String>, storedPrices: any) => {
    let totalPrice = 0;
    Object.keys(number).map(function(key, index) {
        if(price(key, number, storedPrices) > 0)
            totalPrice += price(key, number, storedPrices);
    });
    return totalPrice;
}

export const saveNewPrice = async (element: any, value: any) => {
    const field = element;
    const obj = {};
    obj[field] = value;
    try {
        await AsyncStorage.mergeItem(
            '@Price',
            JSON.stringify(obj) //            JSON.stringify({s_a1: 50 })
        );
    } catch(e) {
        //save error
    }
}

export const print = async (number: String, onChangeNumber: (value: any[]) => void, setIsMain: (value: (((prevState: boolean) => boolean) | boolean)) => void, storedPrices: { [p: string]: string }) => {
        await Print.printAsync({
        html: createDynamicTable(number, storedPrices).html,
    }).then(() => {
       return onChangeNumber([])
    }).then(() => {
       // return setIsMain(true)
    });
}

export const destroy = async (onChangeNumber: (value: (((prevState: Array<String>) => Array<String>) | Array<String>)) => void) => {
    return onChangeNumber([]);
}


export const createDynamicTable = (number: any, storedPrices: any) => {
    const priceTotal = (element: any) => {
        let result = number[element] * storedPrices[element];
        return (number[element])? Math.round(result * 100) / 100: '';
    }
    const todayDate = new Date().toISOString().slice(0, 10);

    const priceBox = 'border-left: 1px dashed #000000; border-right: 1px dashed #000000; border-top: 1px solid #000000; font-size: 10px;';
    const InputBox = 'border-left: 2px solid #000000; border-top: 1px solid #000000; font-size: 10px;';
    const totalPriceLeftSideBox = 'border-top: 1px solid #000000; font-size: 10px;';
    const totalPriceRightSideBox = 'border-top: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px;';
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <style>
            body,div,table,thead,tbody,tfoot,tr,th,td,p { font-family:"Calibri"; font-size:small }
            a.comment-indicator:hover + comment { background:#ffd; position:absolute; display:block; border:1px solid black; padding:0.5em;  }
            a.comment-indicator { background:red; display:inline-block; border:1px solid black; width:0.5em; height:0.5em;  }
            comment { display:none;  }
        </style>
    </head>
    
    <body>
    <table align="left" cellspacing="0" border="0">
        <colgroup width="102"></colgroup> 
        <colgroup width="72"></colgroup>  
        <colgroup width="173"></colgroup> 
        <colgroup span="2" width="49"></colgroup> 
        <colgroup width="49"></colgroup> 
        <colgroup width="46"></colgroup> 
        <colgroup width="50"></colgroup> 
        <colgroup width="48"></colgroup> 
        <colgroup width="50"></colgroup> 
        <tr>
            <td colspan=3 height="21" align="left" valign=middle><b>PREKI&#370; DEFEKTAVIMO AKTAS</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=6 align="center" valign=middle bgcolor="#BDD7EE"><b>UAB &quot;Baltic Pallets&quot; Kaunas Elektr&#279;n&#371; g. 16</b></td>
        </tr>

        <tr>
            <td  align="center" valign=bottom><br></td>
            <td align="left" valign=middle><br></td>
            <td align="left" valign=middle><b><br></b></td>
            <td style="height: 25px; border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 20px" colspan=6 align="center" valign=middle>${todayDate}</td>
        </tr>

        <tr>
            <td height="7" align="left" valign=middle><b><br></b></td>
            <td align="left" valign=middle><b><br></b></td>
            <td align="left" valign=middle sdnum="1033;0;#,##0.00&quot; &euro;&quot;;[RED]#,##0.00&quot; &euro;&quot;"><br></td>
            <td align="left" valign=middle sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><br></td>
            <td align="left" valign=middle sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><br></td>
            <td align="left" valign=middle sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><br></td>
            <td align="center" valign=bottom><b><br></b></td>
            <td align="left" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><b><br></b></td>
            <td align="left" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><b><br></b></td>
        </tr>
        <tr>
            <td height="17" align="center" valign=bottom><br></td>
            <td align="left" valign=middle><br></td>
            <td align="left" valign=middle><br></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=3 align="center" valign=middle bgcolor="#BDD7EE"><b>Sveiki pad&#279;klai</b></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=3 align="center" valign=middle bgcolor="#BDD7EE"><b>Remontuotini </b></td>
        </tr>
        <tr>
            <td height="28" align="center" valign=bottom><br></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="center" valign=middle bgcolor="#D9D9D9"><b>PREK&#278;S r&#363;&scaron;is</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE">Kiekis</td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE">Kaina &euro; /vnt</td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE"><i>Suma</i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE">Kiekis</td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE">Kaina &euro; /vnt</td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE"><i>Suma</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 10px" rowspan=9 align="center" valign=middle bgcolor="#D9D9D9"><b>800x1200</b></td>
            <td style="font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><b>EUR-A 1</b></td>
            <td style="font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="border-left: 2px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_a1'] || ''}</b></td>
            <td style="border-left: 1px dashed #000000; border-right: 1px dashed #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_a1']}</td>
            <td style="font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_a1')}</i></td>
            <td style="border-left: 2px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_a1'] || ''}</b></td>
            <td style="border-left: 1px dashed #000000; border-right: 1px dashed #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_a1']}</td>
            <td style="border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_a1')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><b>EUR-A </b></td>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_a2'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_a2']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_a2')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_a2'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_a1']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_a2')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><b>EUR-B</b></td>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_b2'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_b2']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_b2')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_b2'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_b2']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_b2')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px double #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><b>LPM</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px double #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;"  align="center" valign=middle bgcolor="#FFE796"><b>${number['s_lpm_800'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_lpm_800']}</td>
            <td style="${totalPriceLeftSideBox}  border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_lpm_800')}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_lpm_800'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_lpm_800']}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_lpm_800')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">LSD</td>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_lsd_800'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_lsd_800']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_lsd_800')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_lsd_800'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_lsd_800']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_lsd_800')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">SD           </td>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_sd_800'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_sd_800']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_sd_800')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_sd_800'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_sd_800']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_sd_800')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">SD AP        </td>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_ap_800'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_ap_800']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_ap_800')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_ap_800'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_ap_800']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_ap_800')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">PM           </td>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_pm_800'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_pm_800']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_pm_800')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_pm_800'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_pm_800']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_pm_800')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><b>Knauf</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_knauf_800'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_knauf_800']}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_knauf_800')}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_knauf_800'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_knauf_800']}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_knauf_800')}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 10px" rowspan=6 align="center" valign=middle bgcolor="#D9D9D9"><b>1000x1200</b></td>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1000 x 1200 mm. LSD, FIN</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_lsd_1000'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_lsd_1000']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_lsd_1000')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_lsd_1000'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_lsd_1000']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_lsd_1000')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1000 x 1200 mm. SD, perimetriniai</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_sd_1000'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_sd_1000']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_sd_1000')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_sd_1000'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_sd_1000']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_sd_1000')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1000 x 1200 mm. PM, perimetriniai, SD AP</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_pm_1000'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_pm_1000']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_pm_1000')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_pm_1000'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_pm_1000']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_pm_1000')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1000 x 1200 mm. Knauf</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_knauf_1000'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_knauf_1000']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_knauf_1000')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_knauf_1000'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_knauf_1000']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_knauf_1000')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1000x1200x138 mm. CP1</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_cp1_1000'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_cp1_1000']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_cp1_1000')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_cp1_1000'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_cp1_1000']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_cp1_1000')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1000x1200x156 mm. CP6</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_cp6_1000'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_cp6_1000']}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_cp6_1000')}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_cp6_1000'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_cp6_1000']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_cp6_1000')}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 10px" rowspan=3 align="center" valign=middle bgcolor="#D9D9D9"><b>1140x1140</b></td>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b>LSD, SD 1140 x 1140 mm. </b></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_sd_1140'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_sd_1140']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_sd_1140')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_sd_1140'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_sd_1140']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_sd_1140')}</i></td>
        </tr>
        <tr>
      
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">CP3, 1140x1140x138 mm. </td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_cp3_1140'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_cp3_1140']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_cp3_1140')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_cp3_1140'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_cp3_1140']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_cp3_1140')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">CP9, 1140x1140x156 mm. </td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_cp9_1140'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_cp9_1140']}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_cp9_1140')}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_cp9_1140'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_cp9_1140']}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_cp9_1140')}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 10px" align="center" valign=bottom bgcolor="#D9D9D9"><b>PAROC</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1200 x 1750 mm.; 1200 x 1800 mm. &quot;Paroc&quot; </td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_paroc'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_paroc']}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_paroc')}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_paroc'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_paroc']}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_paroc')}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 10px" align="center" valign=bottom bgcolor="#D9D9D9"><b>KNAUF</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b>&quot;Knauf&quot; pad&#279;klas nuo gipso </b></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_knauf'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_knauf']}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_knauf')}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_knauf'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_knauf']}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_knauf')}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 10px" rowspan=8 height="160" align="center" valign=middle bgcolor="#D9D9D9"><b>Nestandartai</b></td>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle>600 x 800 mm. LSD, SD</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_600x800'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_600x800']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_600x800')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_600x800'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_600x800']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_600x800')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle>800 x 800 mm.;  LSD, SD</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_800x800'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_800x800']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_800x800')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_800x800'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_800x800']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_800x800')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle>1100X1100 LSD,SD</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_1100x1100'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_1100x1100']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_1100x1100')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_1100x1100'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_1100x1100']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_1100x1100')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b>1000 x 1000 mm.  LSD, SD</b></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_1000x1000'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_1000x1000']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_1000x1000')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_1000x1000'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_1000x1000']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_1000x1000')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1200 x 1200 mm., LSD, SD</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_1200x1200'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_1200x1200']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_1200x1200')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_1200x1200'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_1200x1200']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_1200x1200')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1100 x 1300 mm., CP7,PRS,SD,LSD</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_1100x1300'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_1100x1300']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_1100x1300')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_1100x1300'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_1100x1300']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_1100x1300')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">x1200 &hellip;1600 mm., LSD, SD, PM</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_1200x1600'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_1200x1600']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_1200x1600')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_1200x1600'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_1200x1600']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_1200x1600')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">x1600 &hellip;3000 mm., LSD, SD, PM</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_1600x3000'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_1600x3000']}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_1600x3000')}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_1600x3000'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_1600x3000']}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_1600x3000')}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 10px" rowspan=5 height="100" align="center" valign=middle bgcolor="#D9D9D9"><b>&Scaron;arnyrai</b></td>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Pad&#279;kl&#371; apvadai 800 x 1200 mm. (&scaron;vies&#363;s)</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_apvadai_800x1200_white'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_apvadai_800x1200_white']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_apvadai_800x1200_white')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_apvadai_800x1200_white'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_apvadai_800x1200_white']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_apvadai_800x1200_white')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Pad&#279;kl&#371; apvadai 800 x 1200 mm. (tams&#363;s)</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_apvadai_800x1200_black'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_apvadai_800x1200_black']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_apvadai_800x1200_black')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_apvadai_800x1200_black'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_apvadai_800x1200_black']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_apvadai_800x1200_black')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Pad&#279;kl&#371; apvadai 600 x 800 mm. (&scaron;vies&#363;s)</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_apvadai_600x800_white'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_apvadai_600x800_white']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_apvadai_600x800_white')}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['r_apvadai_600x800_white'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_apvadai_600x800_white']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_apvadai_600x800_white')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Pad&#279;kl&#371; apvadai 600 x 800 mm.(tams&#363;s)</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_apvadai_600x800_black'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_apvadai_600x800_black']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_apvadai_600x800_black')}</i></td>
            <td style="${InputBox}" align="center" valign=bottom bgcolor="#FFE796"><b>${number['r_apvadai_600x800_black'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_apvadai_600x800_black']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_apvadai_600x800_black')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Pad&#279;kl&#371; apvadai nestandartiniai</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_apvadai_800x2000_mix'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_apvadai_800x2000_mix']}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_apvadai_800x2000_mix')}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=bottom bgcolor="#FFE796"><b>${number['r_apvadai_800x2000_mix'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_apvadai_800x2000_mix']}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_apvadai_800x2000_mix')}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 10px" rowspan=2 height="20" align="center" valign=middle bgcolor="#D9D9D9"><b>Dekos</b></td>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Dekos 800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_dekos_800x1200'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_dekos_800x1200']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_dekos_800x1200')}</i></td>
            <td style="${InputBox}" align="center" valign=bottom bgcolor="#FFE796"><b>${number['r_dekos_800x1200'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_dekos_800x1200']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_dekos_800x1200')}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Dekos 1000 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_dekos_1000x1200'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_dekos_1000x1200']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_dekos_1000x1200')}</i></td>
            <td style="${InputBox}" align="center" valign=bottom bgcolor="#FFE796"><b>${number['r_dekos_1000x1200'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['r_dekos_1000x1200']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_dekos_1000x1200')}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 10px" rowspan=2 height="20" align="center" valign=middle bgcolor="#D9D9D9"><b>Plok&scaron;t&#279;</b></td>
            <td style="border-top: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle>MPP gaminys 1,  2,8 - 3,2 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_plokste_800x1200_p'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_plokste_800x1200_p']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_plokste_800x1200_p')}</i></td>
            <td style="${InputBox}" align="center" valign=bottom bgcolor="#FFE796"><b>${number['r_plokste_800x1200_p'] || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle>${prices['r_plokste_800x1200_p']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_plokste_800x1200_p')}</i></td>
        </tr>
        <tr>
            <td style="font-size: 10px" border-bottom: 1px solid #000000; colspan=2 align="left" valign=middle>MPP gaminys 2,  6 - 10 mm.</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_plokste_800x1200_s'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_plokste_800x1200_s']}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_plokste_800x1200_s')}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=bottom bgcolor="#FFE796"><b>${number['r_plokste_800x1200_s'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle>${prices['r_plokste_800x1200_s']}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_plokste_800x1200_s')}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000;  border-bottom: 1px solid #000000; border-right: 2px solid #000000; font-size: 10px" height="20" align="center" valign=middle bgcolor="#D9D9D9"><b>Mediniai pad&#279;klai</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Mediniai pad&#279;klai</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${number['s_remontas'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${prices['s_remontas']}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('s_remontas')}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=bottom bgcolor="#FFE796"><b>${number['r_remontas'] || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle>${prices['r_remontas']}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${priceTotal('r_remontas')}</i></td>
        </tr>
        <tr>
            <td height="20" align="left" valign=top><br></td>
            <td align="left" valign=top><br></td>

            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=1 align="center" valign=middle bgcolor="#FFFFFF"><b>Vnt.</b></td>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=6 align="center" valign=middle><b>Suma: EUR</b></td>
            <td align="center" valign=middle><i><br></i></td>
            <td align="center" valign=middle><b><br></b></td>
            <td align="center" valign=middle><br></td>
            <td align="center" valign=middle><i><br></i></td>
        </tr>
        <tr>
            <td height="20" align="left" valign=top><br></td>
            <td align="left" valign=top><br></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 30px" colspan=1 align="center" valign=middle><b>${countTotal(number, storedPrices)}</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 30px" colspan=6 align="center" valign=middle><b>${payTotal(number, storedPrices)}</b></td>
            <td align="center" valign=middle><i><br></i></td>
            <td align="center" valign=middle><b><br></b></td>
            <td align="center" valign=middle><br></td>
            <td align="center" valign=middle><i><br></i></td>
        </tr>
    </table>

 
    <!-- ************************************************************************** -->
    </body>
    </html>`;
    // <body>
    //
    //   <h2>HTML Table</h2>
    //
    //   <table>
    //     <tr>
    //       <th>Company</th>
    //       <th>Contact</th>
    //       <th>Country</th>
    //     </tr>
    //     ${table}
    //   </table>
    //
    //   </body>
    return {html: html};
};