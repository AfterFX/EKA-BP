import prices from "../price.json";
import * as Print from "expo-print";


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

export const print = async (number: Array<String>, onChangeNumber: (value: (((prevState: Array<String>) => Array<String>) | Array<String>)) => void, setIsMain: (value: (((prevState: boolean) => boolean) | boolean)) => void) => {
    await Print.printAsync({
        html: createDynamicTable(number).html,
    }).then(() => {
       return onChangeNumber([])
    }).then(() => {
       // return setIsMain(true)
    });
}

export const destroy = async (onChangeNumber: (value: (((prevState: Array<String>) => Array<String>) | Array<String>)) => void) => {
    return onChangeNumber([]);
}



export const createDynamicTable = (number) => {
    const priceTotal = (element) => {
        let result = number[element] * prices[element];
        return (number[element])? Math.round(result * 100) / 100: '';
    }
    const priceBox = 'border-left: 1px dashed #000000; border-right: 1px dashed #000000; font-size: 10px';
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
            <td colspan=3 height="21" align="left" valign=middle><b><font face="Times New Roman">PREKI&#370; DEFEKTAVIMO AKTAS</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=6 align="center" valign=middle bgcolor="#BDD7EE"><b><font face="Times New Roman">UAB &quot;Baltic Pallets&quot; Kaunas Elektr&#279;n&#371; g. 16</font></b></td>
        </tr>
        <tr>
            <td height="21" align="center" valign=bottom><font face="Times New Roman"><br></font></td>
            <td align="left" valign=middle><font face="Times New Roman"><br></font></td>
            <td align="left" valign=middle><b><font face="Times New Roman"><br></font></b></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=6 align="center" valign=middle bgcolor="#BDD7EE"><b><font face="Times New Roman">2022 m. April 15 d.</font></b></td>
        </tr>
        <tr>
            <td height="19" align="center" valign=bottom><font face="Times New Roman"><br></font></td>
            <td align="left" valign=middle><font face="Times New Roman"><br></font></td>
            <td align="left" valign=middle><b><font face="Times New Roman"><br></font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=3 align="center" valign=middle sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><font face="Times New Roman">Kvito Nr.</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=3 align="center" valign=bottom><i><font face="Times New Roman" color="#000000"><br></font></i></td>
        </tr>
        <tr>
            <td colspan=2 height="18" align="left" valign=middle><b><font face="Times New Roman"><br></font></b></td>
            <td align="left" valign=middle sdnum="1033;0;#,##0.00&quot; &euro;&quot;;[RED]#,##0.00&quot; &euro;&quot;"><font face="Times New Roman"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=3 align="center" valign=middle sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><font face="Times New Roman">Laikas</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=3 align="center" valign=bottom><i><font face="Times New Roman" color="#000000"><br></font></i></td>
        </tr>
        <tr>
            <td height="7" align="left" valign=middle><b><font face="Times New Roman"><br></font></b></td>
            <td align="left" valign=middle><b><font face="Times New Roman"><br></font></b></td>
            <td align="left" valign=middle sdnum="1033;0;#,##0.00&quot; &euro;&quot;;[RED]#,##0.00&quot; &euro;&quot;"><font face="Times New Roman"><br></font></td>
            <td align="left" valign=middle sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><font face="Times New Roman"><br></font></td>
            <td align="left" valign=middle sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><font face="Times New Roman"><br></font></td>
            <td align="left" valign=middle sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><font face="Times New Roman"><br></font></td>
            <td align="center" valign=bottom><b><font face="Times New Roman" color="#000000"><br></font></b></td>
            <td align="left" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><b><font face="Times New Roman"><br></font></b></td>
            <td align="left" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><b><font face="Times New Roman"><br></font></b></td>
        </tr>
        <tr>
            <td height="17" align="center" valign=bottom><font face="Times New Roman"><br></font></td>
            <td align="left" valign=middle><font face="Times New Roman"><br></font></td>
            <td align="left" valign=middle><font face="Times New Roman"><br></font></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=3 align="center" valign=middle bgcolor="#BDD7EE"><b><font face="Times New Roman">Sveiki pad&#279;klai</font></b></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=3 align="center" valign=middle bgcolor="#BDD7EE"><b><font face="Times New Roman">Remontuotini </font></b></td>
        </tr>
        <tr>
            <td height="28" align="center" valign=bottom><font face="Times New Roman" size=1><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="center" valign=middle bgcolor="#D9D9D9"><b><font face="Times New Roman" size=1>PREK&#278;S r&#363;&scaron;is</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE"><font face="Times New Roman" size=1>Kiekis</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE"><font face="Times New Roman" size=1>Kaina &euro; /vnt</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE"><i><font face="Times New Roman" size=1>Suma</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE"><font face="Times New Roman" size=1>Kiekis</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE"><font face="Times New Roman" size=1>Kaina &euro; /vnt</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE"><i><font face="Times New Roman" size=1>Suma</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" rowspan=9 height="180" align="center" valign=middle bgcolor="#D9D9D9"><b><font face="Times New Roman">800x1200</font></b></td>
            <td style="font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Times New Roman">EUR-A 1</font></b></td>
            <td style="font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">800 x 1200 mm.</font></td>
            <td style="border-left: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_a1'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_a1']}</font></td>
            <td style="font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_a1')}</font></i></td>
            <td style="font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_a1'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['r_a1']}</font></td>
            <td style="font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_a1')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Times New Roman">EUR-A </font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">800 x 1200 mm.</font></td>
            <td style="border-left: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_a2'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_a2']}</font></td>
            <td style="font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_a2')}</font></i></td>
            <td style="font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_a2'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['r_a1']}</font></td>
            <td style="font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_a2')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Times New Roman">EUR-B</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">800 x 1200 mm.</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_b2'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_b2']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_b2')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_b2'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['r_b2']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_b2')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 2px double #000000; border-left: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Times New Roman">LPM</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px double #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">800 x 1200 mm.</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px double #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_lpm_800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_lpm_800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px double #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_lpm_800')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px double #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_lpm_800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['r_lpm_800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 2px double #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_lpm_800')}</font></i></td>
        </tr>
        <tr>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">LSD</font></td>
            <td style="border-bottom: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">800 x 1200 mm.</font></td>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_lsd_800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_lsd_800']}</font></td>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_lsd_800')}</font></i></td>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_lsd_800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['r_lsd_800']}</font></td>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_lsd_800')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">SD           </font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">800 x 1200 mm.</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman" color="#333333">${number['s_sd_800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_sd_800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_sd_800')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman" color="#333333">${number['r_sd_800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['r_sd_800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_sd_800')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">SD AP        </font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">800 x 1200 mm.</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman" color="#333333">${number['s_ap_800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_ap_800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_ap_800')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman" color="#333333">${number['r_ap_800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_ap_800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_ap_800')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">PM           </font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">800 x 1200 mm.</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_pm_800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_pm_800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_pm_800')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman" color="#333333">${number['r_pm_800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_pm_800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_pm_800')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Times New Roman">Knauf</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 10px" align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">800 x 1200 mm.</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_knauf_800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_knauf_800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_knauf_800')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_knauf_800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_knauf_800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_knauf_800')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" rowspan=6 height="120" align="center" valign=middle bgcolor="#D9D9D9"><b><font face="Times New Roman">1000x1200</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">1000 x 1200 mm. LSD, FIN</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_lsd_1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_lsd_1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_lsd_1000')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_lsd_1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_lsd_1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_lsd_1000')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">1000 x 1200 mm. SD, perimetriniai</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_sd_1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_sd_1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_sd_1000')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_sd_1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['r_sd_1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_sd_1000')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">1000 x 1200 mm. PM, perimetriniai, SD AP</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_pm_1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_pm_1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_pm_1000')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_pm_1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_pm_1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_pm_1000')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">1000 x 1200 mm. Knauf</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_knauf_1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_knauf_1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_knauf_1000')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_knauf_1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_knauf_1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_knauf_1000')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">1000x1200x138 mm. CP1</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_cp1_1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_cp1_1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_cp1_1000')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_cp1_1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_cp1_1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_cp1_1000')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">1000x1200x156 mm. CP6</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_cp6_1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_cp6_1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_cp6_1000')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_cp6_1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_cp6_1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_cp6_1000')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" height="20" align="center" valign=middle bgcolor="#D9D9D9"><b><font face="Times New Roman">1140x1140</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Times New Roman">LSD, SD 1140 x 1140 mm. </font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_sd_1140'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_sd_1140']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_sd_1140')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_sd_1140'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_sd_1140']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_sd_1140')}</font></i></td>
        </tr>
        <tr>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" rowspan=2 height="40" align="center" valign=middle bgcolor="#D9D9D9"><b><font face="Times New Roman"><br></font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">CP3, 1140x1140x138 mm. </font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_cp3_1140'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_cp3_1140']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_cp3_1140')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_cp3_1140'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_cp3_1140']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_cp3_1140')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">CP9, 1140x1140x156 mm. </font></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_cp9_1140'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_cp9_1140']}</font></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_cp9_1140')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_cp9_1140'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_cp9_1140']}</font></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_cp9_1140')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" height="20" align="center" valign=bottom bgcolor="#D9D9D9"><b><font face="Times New Roman">PAROC</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">1200 x 1750 mm.; 1200 x 1800 mm. &quot;Paroc&quot; </font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_paroc'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_paroc']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_paroc')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_paroc'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_paroc']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_paroc')}</font></i></td>
        </tr>
        <tr>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" height="20" align="center" valign=bottom bgcolor="#D9D9D9"><b><font face="Times New Roman">KNAUF</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Times New Roman">&quot;Knauf&quot; pad&#279;klas nuo gipso </font></b></td>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_knauf'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_knauf']}</font></td>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_knauf')}</font></i></td>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_knauf'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_knauf']}</font></td>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_knauf')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" rowspan=8 height="160" align="center" valign=middle bgcolor="#D9D9D9"><b><font face="Times New Roman">Nestandartai</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle><font face="Times New Roman">600 x 800 mm. LSD, SD</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_600x800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_600x800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_600x800')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_600x800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_600x800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_600x800')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle><font face="Times New Roman">800 x 800 mm.;  LSD, SD</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_800x800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_800x800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_800x800')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_800x800'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_800x800']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_800x800')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle><font face="Times New Roman">1100X1100 LSD,SD</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_1100x1100'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_1100x1100']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_1100x1100')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_1100x1100'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_1100x1100']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_1100x1100')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Times New Roman">1000 x 1000 mm.  LSD, SD</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman" color="#333333">${number['s_1000x1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_1000x1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_1000x1000')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman" color="#333333">${number['r_1000x1000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_1000x1000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_1000x1000')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">1200 x 1200 mm., LSD, SD</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_1200x1200'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_1200x1200']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_1200x1200')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_1200x1200'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_1200x1200']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_1200x1200')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">1100 x 1300 mm., CP7,PRS,SD,LSD</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_1100x1300'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_1100x1300']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_1100x1300')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_1100x1300'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_1100x1300']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_1100x1300')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">x1200 &hellip;1600 mm., LSD, SD, PM</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_1200x1600'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['s_1200x1600']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_1200x1600')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_1200x1600'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_1200x1600']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_1200x1600')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">x1600 &hellip;3000 mm., LSD, SD, PM</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_1600x3000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_1600x3000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_1600x3000')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_1600x3000'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_1600x3000']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_1600x3000')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" rowspan=5 height="100" align="center" valign=middle bgcolor="#D9D9D9"><b><font face="Times New Roman">&Scaron;arnyrai</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">Pad&#279;kl&#371; apvadai 800 x 1200 mm. (&scaron;vies&#363;s)</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_apvadai_800x1200_white'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_apvadai_800x1200_white']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_apvadai_800x1200_white')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_apvadai_800x1200_white'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_apvadai_800x1200_white']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_apvadai_800x1200_white')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">Pad&#279;kl&#371; apvadai 800 x 1200 mm. (tams&#363;s)</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_apvadai_800x1200_black'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_apvadai_800x1200_black']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_apvadai_800x1200_black')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_apvadai_800x1200_black'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_apvadai_800x1200_black']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_apvadai_800x1200_black')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">Pad&#279;kl&#371; apvadai 600 x 800 mm. (&scaron;vies&#363;s)</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_apvadai_600x800_white'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_apvadai_600x800_white']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_apvadai_600x800_white')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_apvadai_600x800_white'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_apvadai_600x800_white']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_apvadai_600x800_white')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">Pad&#279;kl&#371; apvadai 600 x 800 mm.(tams&#363;s)</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_apvadai_600x800_black'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_apvadai_600x800_black']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_apvadai_600x800_black')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=bottom bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_apvadai_600x800_black'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_apvadai_600x800_black']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_apvadai_600x800_black')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">Pad&#279;kl&#371; apvadai nestandartiniai</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_apvadai_800x2000_mix'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_apvadai_800x2000_mix']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_apvadai_800x2000_mix')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=bottom bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_apvadai_800x2000_mix'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['r_apvadai_800x2000_mix']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_apvadai_800x2000_mix')}</font></i></td>
        </tr>
        <tr>
            <td style="border-left: 1px solid #000000; font-size: 10px" rowspan=2 height="20" align="center" valign=middle bgcolor="#D9D9D9"><b><font face="Times New Roman">Dekos</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">Dekos 800 x 1200 mm.</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_dekos_800x1200'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_dekos_800x1200']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_dekos_800x1200')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="center" valign=bottom bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_dekos_800x1200'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['r_dekos_800x1200']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_dekos_800x1200')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">Dekos 1000 x 1200 mm.</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_dekos_1000x1200'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_dekos_1000x1200']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_dekos_1000x1200')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="center" valign=bottom bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_dekos_1000x1200'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">${prices['r_dekos_1000x1200']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_dekos_1000x1200')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" rowspan=2 height="20" align="center" valign=middle bgcolor="#D9D9D9"><b><font face="Times New Roman">Plok&scaron;t&#279;</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle><font face="Times New Roman" color="#000000">MPP gaminys 1,  2,8 - 3,2 mm.</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_plokste_800x1200_p'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_plokste_800x1200_p']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_plokste_800x1200_p')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="center" valign=bottom bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_plokste_800x1200_p'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle><font face="Times New Roman">${prices['r_plokste_800x1200_p']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_plokste_800x1200_p')}</font></i></td>
        </tr>
        <tr>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle><font face="Times New Roman" color="#000000">MPP gaminys 2,  6 - 10 mm.</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_plokste_800x1200_s'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_plokste_800x1200_s']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_plokste_800x1200_s')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="center" valign=bottom bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_plokste_800x1200_s'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle><font face="Times New Roman">${prices['r_plokste_800x1200_s']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_plokste_800x1200_s')}</font></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" height="20" align="center" valign=middle bgcolor="#D9D9D9"><b><font face="Times New Roman">Mediniai pad&#279;klai</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman">Mediniai pad&#279;klai</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFE796"><b><font face="Times New Roman">${number['s_remontas'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333">${prices['s_remontas']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('s_remontas')}</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="center" valign=bottom bgcolor="#FFE796"><b><font face="Times New Roman">${number['r_remontas'] || ''}</font></b></td>
            <td style="${priceBox}" align="center" valign=middle><font face="Times New Roman">${prices['r_remontas']}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><i><font face="Times New Roman">${priceTotal('r_remontas')}</font></i></td>
        </tr>
        <tr>
            <td height="20" align="center" valign=bottom><font face="Times New Roman"><br></font></td>
            <td align="left" valign=middle><font face="Times New Roman"><br></font></td>
            <td align="left" valign=middle><font face="Times New Roman"><br></font></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; font-size: 10px" align="center" valign=bottom><b><font face="Times New Roman" color="#000000"><br></font></b></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333"><br></font></td>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="center" valign=bottom><i><font face="Times New Roman" color="#000000"><br></font></i></td>
            <td style="border-top: 1px solid #000000; font-size: 10px" align="center" valign=bottom><b><font face="Times New Roman" color="#000000"><br></font></b></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle><font face="Times New Roman"><br></font></td>
            <td style="border-top: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=bottom><i><font face="Times New Roman" color="#000000"><br></font></i></td>
        </tr>
        <tr>
            <td height="20" align="left" valign=top><font face="Times New Roman" color="#FF0000"><br></font></td>
            <td align="left" valign=top><font face="Times New Roman" color="#FF0000"><br></font></td>
            <td align="right" valign=middle><font face="Times New Roman"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE"><b><font face="Times New Roman">0</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#FFFFFF"><font face="Times New Roman" color="#333333"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE"><i><font face="Times New Roman">0</font></i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE"><b><font face="Times New Roman">0</font></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle><font face="Times New Roman"><br></font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle bgcolor="#BDD7EE"><i><font face="Times New Roman">0</font></i></td>
        </tr>
        <tr>
            <td height="20" align="left" valign=top><font face="Times New Roman" color="#FF0000"><br></font></td>
            <td align="left" valign=top><font face="Times New Roman" color="#FF0000"><br></font></td>
            <td align="left" valign=middle><font face="Times New Roman"><br></font></td>
            <td style="border-left: 1px solid #000000; font-size: 10px" align="center" valign=bottom><b><font face="Times New Roman"><br></font></b></td>
            <td align="center" valign=middle><font face="Times New Roman"><br></font></td>
            <td align="center" valign=middle><b><i><font face="Times New Roman"><br></font></i></b></td>
            <td align="center" valign=bottom><b><font face="Times New Roman"><br></font></b></td>
            <td align="center" valign=middle><font face="Times New Roman"><br></font></td>
            <td style="border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle><b><i><font face="Times New Roman"><br></font></i></b></td>
        </tr>
        <tr>
            <td height="20" align="left" valign=top><font face="Times New Roman"><br></font></td>
            <td align="left" valign=top><font face="Times New Roman"><br></font></td>
            <td align="right" valign=middle><font face="Times New Roman">Viso preki&#371;</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=2 align="center" valign=middle bgcolor="#BDD7EE"><b><font face="Times New Roman">${countTotal(number)}</font></b></td>
            <td align="center" valign=middle><i><font face="Times New Roman"><br></font></i></td>
            <td align="center" valign=middle><b><font face="Times New Roman"><br></font></b></td>
            <td align="center" valign=middle><font face="Times New Roman"><br></font></td>
            <td style="border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle><i><font face="Times New Roman"><br></font></i></td>
        </tr>
        <tr>
            <td height="20" align="left" valign=top><font face="Times New Roman"><br></font></td>
            <td align="left" valign=top><font face="Times New Roman"><br></font></td>
            <td align="right" valign=middle><font face="Times New Roman">Viso EUR</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" colspan=2 align="center" valign=middle bgcolor="#BDD7EE"><b><font face="Times New Roman">${payTotal(number)}</font></b></td>
            <td style="border-bottom: 1px solid #000000; font-size: 10px" align="center" valign=middle><i><font face="Times New Roman"><br></font></i></td>
            <td style="border-bottom: 1px solid #000000; font-size: 10px" align="center" valign=middle><b><font face="Times New Roman"><br></font></b></td>
            <td style="border-bottom: 1px solid #000000; font-size: 10px" align="center" valign=middle><font face="Times New Roman"><br></font></td>
            <td style="border-bottom: 1px solid #000000; border-right: 1px solid #000000; font-size: 10px" align="center" valign=middle><i><font face="Times New Roman"><br></font></i></td>
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