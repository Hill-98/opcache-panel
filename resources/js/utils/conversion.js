export default class {
    static get TYPE() {
        return {
            PERCENTAGE: "percentage",
            SIZE: "size",
            TIME: "time"
        }
    }

    static percentageConversion(value, precision = 2) {
        return `${value.toFixed(precision)}%`
    }

    static sizeConversion(value) {
        const unit = [
            "B",
            "KB",
            "MB",
            "GB",
            "TB",
            "PB"
        ];
        value = parseInt(value);
        let i = 0;
        while (value >= 1024 && value % 1024 >= 0) {
            value /= 1024;
            i++;
        }
        return `${value.toFixed(2)} ${unit[i]}`
    }

    static timeConversion(value) {
        value = parseInt(value);
        return value === 0 ? "Null" : new Date(value * 1000).toLocaleString(undefined, {hour12: false})
    }
}
