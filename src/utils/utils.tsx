import Moment from "moment";
const  _colors = [
    "#4C9141",
    "#E63244",
    "#826C34",
    "#BDECB6",
    "#A5A5A5",
    "#424632",
    "#31372B",
    "#C7B446",
    "#8F8B66",
    "#474A51",
    "#D0D0D0",
    "#969992",
    "#F54021",
    "#E4A010",
    "#1D1E33",
    "#F5D033",
    "#CB3234",
    "#1C542D",
    "#7F7679",
    "#332F2C",
    "#B32428",
    "#9DA1AA",
    "#8A6642",
    "#1F3A3D",
    "#F44611",
    "#8A9597",
    "#6C4675",
    "#2F353B",
    "#252850",
    "#B8B799",
    "#424632",
    "#497E76",
    "#316650",
    "#C7B446",
    "#FFFF00",
    "#6C4675",
    "#1E213D",
    "#25221B",
    "#686C5E",
    "#308446",
    "#EAE6CA",
    "#DC9D00",
    "#A18594",
    "#4C514A",
    "#82898F",
    "#CB2821",
    "#9DA1AA",
    "#1E5945",
    "#6D3F5B",
    "#015D52",
    "#924E7D",
    "#955F20",
    "#592321",
    "#2C5545",
    "#0E294B",
    "#1E5945",
    "#F6F6F6",
    "#F5D033",
    "#CAC4B0",
    "#734222",
    "#57A639",
    "#6C3B2A",
    "#4C9141",
    "#F5D033",
    "#763C28",
    "#DE4C8A",
    "#A18594",
    "#256D7B",
    "#734222",
    "#E6D690",
    "#EA899A",
    "#5B3A29",
    "#4C514A",
    "#403A3A",
    "#E5BE01",
    "#3B83BD",
    "#C51D34",
    "#999950",
    "#FFFF00",
    "#755C48",
    "#231A24",
    "#DC9D00",
    "#8A9597",
    "#6D3F5B",
    "#45322E",
    "#C35831",
    "#45322E",
    "#DE4C8A",
    "#434B4D",
    "#9E9764",
    "#CBD0CC",
    "#193737",
    "#D84B20",
    "#CB3234",
    "#DE4C8A",
    "#2F4538",
    "#FAD201",
    "#8A9597",
    "#686C5E",
    "#316650",
    "#84C3BE",
    "#A03472",
    "#DE4C8A",
    "#641C34",
    "#1D1E33",
    "#1C1C1C",
    "#CFD3CD",
    "#6F4F28",
    "#2F353B",
    "#1E213D",
    "#9B111E",
    "#434B4D",
    "#25221B",
    "#B32428",
    "#015D52",
    "#F80000",
    "#6C7156",
    "#CAC4B0",
    "#49678D",
    "#F3A505",
    "#5E2129",
    "#CB3234",
    "#CFD3CD",
    "#1B5583",
    "#A03472",
    "#B32428",
    "#E6D690",
    "#1D1E33",
    "#8F8B66",
    "#47402E",
    "#C2B078",
    "#231A24",
    "#F8F32B",
    "#A03472",
    "#721422",
    "#E1CC4F",
    "#1F3438",
    "#6A5D4D",
    "#20214F",
    "#293133",
    "#8F8F8F",
    "#909090",
    "#E7EBDA",
    "#6A5D4D",
    "#35682D",
    "#763C28",
    "#955F20",
    "#E63244",
    "#EA899A",
    "#2271B3",
]

const yearList = () => {
    var presentYear = Moment().add(50, 'years').get('year');
    var startYear = Moment().subtract(50, 'years');
    var years = [];

    while (startYear.get('year') <= presentYear) {
        years.push({
            label: startYear.get('year').toString(),
            value: startYear.get('year').toString(),
        });
        startYear.add(1, 'years');
    }

    years = years.reverse();

    return years;
};


const toIsoFormat = (date) => {
    var d = new Date(date)
    // Padding functions
    function pad(n) {return (n<10? '0' :  '') + n}
    function padd(n){return (n<100? '0' : '') + pad(n)}

    return (d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getDate()) +
        'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' +
        pad(d.getUTCSeconds()) +  'Z');
}


const formatAMPM = (date) => {

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    hours = hours.toString().padStart(2, '0');


    return  [hours, minutes, ampm];
}
const isNumber = (v: unknown) => typeof v === 'number' && !Number.isNaN(v);
function isValidDate(dateString) {
    //format yyyy-mm-dd
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString?.toString()?.match(regEx)) return false;
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false;
    return d?.toISOString()?.slice(0,10) === dateString;
}
const formatData = (data, numColumns) => {
    const amountFullRows = Math.floor(data.length / numColumns);
    let amountItemsLastRow = data.length - amountFullRows * numColumns;

    while (amountItemsLastRow !== numColumns && amountItemsLastRow !== 0) {
        data.push({key: `empty-${amountItemsLastRow}`, empty: true});
        amountItemsLastRow++;
    }
    return data;
};
const cleanNonNumericChars = (text) =>  {
    if (!text || typeof text !== 'string') {
        text = String(text);
    }
    // Remove non numeric and non .- chars
    text = text.replace(/[^\d.,-]/g, '');

    // replace "," with "."
    text = text.replace(',', '.');

    // Remove extra periods ('.', only one, at most left allowed in the string)
    let splitText = text.split('.');
    text =
        splitText.shift() +
        (splitText.length
            ? '.' + splitText[0].slice(0,2)
            : '');

    // Remove '-' signs if there is more than one, or if it is not most left char
    for (var i = 1; i < text.length; i++) {
        var char = text.substr(i, 1);
        if (char == '-') {
            text = text.substr(0, i) + text.substr(i + 1);
            // decrement value to avoid skipping character
            i--;
        }
    }

    // Remove leading zeros
    text = text.replace(/^(-)?0+(?=\d)/, '$1'); //?=\d is a positive lookahead, which matches any digit 0-9

    return text;
}



function isDiff(access: any[], originalAccess: any[]) {

    var a = [], diff = [];

    for (var i = 0; i < access.length; i++) {
        a[access[i]] = true;
    }

    for (var i = 0; i < originalAccess.length; i++) {
        if (a[originalAccess[i]]) {
            delete a[originalAccess[i]];
        } else {
            a[originalAccess[i]] = true;
        }
    }



    for (var k in a) {
        if(k){
            diff.push(k);
        }

    }


    return diff.length;
}
 const currency = (number: number) => {
    var formatter = new Intl.NumberFormat('fil-PH', {
        style: 'currency',
        currency: 'PHP',
    });
    return formatter.format(number);
};
function toFixed(x) {
    if (Math.abs(x) < 1.0) {
        let e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10,e-1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        let e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10,e);
            x += (new Array(e+1)).join('0');
        }
    }
    return x;
}

function toFixedTrunc(x, n) {
    x = toFixed(x)

    // From here on the code is the same than the original answer
    const v = (typeof x === 'string' ? x : x.toString()).split('.');
    if (n <= 0) return v[0];
    let f = v[1] || '';
    if (f.length > n) return `${v[0]}.${f.substr(0,n)}`;
    while (f.length < n) f += '0';
    return `${v[0]}.${f}`
}
const recursionObject = (obj, fn) => {
    for (const [key, value] of Object.entries(obj)) {
        if( value && typeof value === "object"){
            recursionObject(value, fn)
        }else{
            fn(value, key)
        }
    }

}
function fuzzysearch (needle, haystack) {
    var _needle = needle?.toLowerCase()
    var _haystack = haystack?.toLowerCase()
    var hlen = haystack?.length;
    var nlen = needle?.length;
    if (nlen > hlen) {
        return false;
    }
    if (nlen === hlen) {
        return _needle === _haystack;
    }
    outer: for (var i = 0, j = 0; i < nlen; i++) {
        var nch = _needle.charCodeAt(i);
        while (j < hlen) {
            if (_haystack.charCodeAt(j++) === nch) {
                continue outer;
            }
        }
        return false;
    }
    return true;
}
const datesArray =Array.from(Array(60), (_, i) => {
    return {
        label: i.toString().length == 1 ? "0" +(i).toString() : (i).toString(),
        value: i.toString().length == 1 ? "0" +(i).toString() : (i).toString(),
    }
});

const hoursArray =Array.from(Array(12), (_, i) => {
    return {
        label: (i+1).toString().length == 1 ? "0" +(i+1).toString() : (i+1).toString(),
        value: (i+1).toString().length == 1 ? "0" +(i+1).toString() : (i+1).toString(),
    }
});
const monthsArray = [
    {label: 'January', value: '01'},
    {label: 'February', value: '02'},
    {label: 'March', value: '03'},
    {label: 'April', value: '04'},
    {label: 'May', value: '05'},
    {label: 'June', value: '06'},
    {label: 'July', value: '07'},
    {label: 'August', value: '08'},
    {label: 'September', value: '09'},
    {label: 'October', value: '10'},
    {label: 'November', value: '11'},
    {label: 'December', value: '12'},
];
const ampmArray = [
    {
        label: "pm",
        value: "pm"
    },
    {
        label: "am",
        value: "am"
    }
]
const birthyearList = () => {
    var presentYear = Moment().get('year');
    var startYear = Moment().subtract(120, 'years');
    var years = [];

    while (startYear.get('year') <= presentYear) {
        years.push({
            label: startYear.get('year').toString(),
            value: startYear.get('year').toString(),
        });
        startYear.add(1, 'years');
    }

    years = years.reverse();

    return years;
};

export {
    _colors,
    formatData,
    datesArray,
    hoursArray,
    ampmArray,
    monthsArray,
    fuzzysearch,
    recursionObject,
    birthyearList,
    toFixedTrunc,
    currency,
    isDiff,
    cleanNonNumericChars,
    isNumber,
    yearList,
    toIsoFormat,
    formatAMPM,
    isValidDate
}
