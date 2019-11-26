const sizeUnit = ["B", "KB", "MB", "GB", "TB", "PB"];

export default {
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
    timeConversion: value => Number.parseInt(value) ?
        new Date(value * 1000).toLocaleString(undefined, {hour12: false}) :
        "Null",
}
