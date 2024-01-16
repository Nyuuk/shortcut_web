import dayjs from "dayjs";
import "dayjs/locale/id"; // Impor locale untuk Bahasa Indonesia
import utc from "dayjs/plugin/utc"; // Impor plugin utc untuk bekerja dengan waktu UTC
import timezone from "dayjs/plugin/timezone"; // Impor plugin timezone untuk bekerja dengan zona waktu

export default function convertToWIB(isoDateString) {
    const utcDateTime = new Date(isoDateString);
    const options = {
        timeZone: "Asia/Jakarta",
        hour12: false,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const wibDateTime = utcDateTime.toLocaleString("id-ID", options);
    return wibDateTime;
}

export function convertWibWithManualOutput(utcTime) {
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const utcDateTime = dayjs.utc(utcTime);
    const wibDateTime = utcDateTime
        .tz("Asia/Jakarta")
        .format("DD MMM YYYY HH:mm [WIB]");

    // console.log(wibDateTime); // Output: 12 Jan 2024 20:30 WIB
    return wibDateTime;
}

export function formatTimeAgo(wibDateTimeString) {
    const wibDate = customStringToDate(wibDateTimeString);

    // Memeriksa apakah wibDate adalah objek Date yang valid
    if (isNaN(wibDate.getTime())) {
        return "Invalid Date";
    }

    const now = new Date();
    const secondsAgo = Math.floor((now - wibDate) / 1000);

    if (secondsAgo < 60) {
        return secondsAgo + (secondsAgo === 1 ? " second ago" : " seconds ago");
    } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return minutesAgo + (minutesAgo === 1 ? " minute ago" : " minutes ago");
    } else if (secondsAgo < 86400) {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return hoursAgo + (hoursAgo === 1 ? " hour ago" : " hours ago");
    } else if (secondsAgo < 2592000) {
        const daysAgo = Math.floor(secondsAgo / 86400);
        return daysAgo + (daysAgo === 1 ? " day ago" : " days ago");
    } else {
        // You may add more conditions for months, years, etc. based on your requirements
        const dateFormatter = new Intl.DateTimeFormat("id-ID", {
            weekday: "long",
            month: "long",
            day: "numeric",
        });
        return dateFormatter.format(wibDate);
    }
}

// Fungsi untuk mengonversi string waktu ke objek Date
function customStringToDate(dateString) {
    // Pisahkan komponen tanggal dan waktu
    // ['Jumat,', '12', 'Januari', '2024', 'pukul', '09.59']
    const [day, dayNumber, month, year, pk, time] = dateString.split(" ");

    // Ubah nama bulan ke format numerik
    const monthNumber = new Date(Date.parse(month + " 1, 2000")).getMonth() + 1;

    // Pisahkan jam dan menit
    const [hour, minute] = time.split(".");

    // Buat objek Date
    const dateObject = new Date(
        `${year}-${
            monthNumber.toString().length === 1
                ? "0" + monthNumber
                : monthNumber
        }-${dayNumber}T${hour}:${minute}:00`
    );

    return dateObject;
}
