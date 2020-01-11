const INVALID_DATE_STRING = new Date("X").toString();
const sizeUnit = ["B", "KB", "MB", "GB", "TB", "PB"];
// fillingInt
const fi = (num, length = 2) => "0".repeat(length).concat(num).substr(-length);

const _conversion = {
    TYPE: {
        PERCENTAGE: "percentage",
        SIZE: "size",
        TIME: "time"
    },
    percentageConversion: (value, precision = 2) => `${Number(value).toFixed(precision)}%`,
    sizeConversion(value) {
        let num = Number(value);
        if (Number.isNaN(num)) return "Null";
        let i = 0;
        while (num >= 1024 && num % 1024 >= 0 && i < sizeUnit.length) {
            num /= 1024;
            i += 1;
        }
        return `${num.toFixed(2)} ${sizeUnit[i]}`
    },
    timeConversion(value) {
        const timestamp = Number(value);
        if (!timestamp) return INVALID_DATE_STRING;
        const d = new Date(timestamp * 1000);
        return d.toString() === INVALID_DATE_STRING ?
            INVALID_DATE_STRING :
            `${d.getFullYear()}-${fi(d.getMonth() + 1)}-${fi(d.getDate())} ${fi(d.getHours())}:${fi(d.getMinutes())}:${fi(d.getSeconds())}`
    }
};

const conversion = function conversion(type, value) {
    if (this instanceof conversion) {
        throw new TypeError("Illegal constructor")
    }
    switch (type) {
        case _conversion.TYPE.PERCENTAGE:
            return _conversion.percentageConversion(value);
        case _conversion.TYPE.SIZE:
            return _conversion.sizeConversion(value);
        case _conversion.TYPE.TIME:
            return _conversion.timeConversion(value);
        default:
            return value
    }
};
Object.defineProperty(conversion, "TYPE", {value: _conversion.TYPE});

export default conversion
