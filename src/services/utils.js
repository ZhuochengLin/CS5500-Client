export const MY = "my";
export const USER_FIELDS = ["username", "password", "email", "bio", "firstName", "lastName",
    "profilePhoto", "headerImage", "dateOfBirth"]
export const DUMMY_USER = {
    username: "lin", firstName: "Zhuocheng", lastName: "Lin",
    headerImage: "", profilePhoto: "", bio: "Hello it's me", dateOfBirth: "1997-01-01",
    email: "xxx@gmail.com"
}
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const roundedImage = (url) => {
    const uploadIdx = url.indexOf("upload");
    return url.slice(0, uploadIdx+6) + "/w_150,h_150,c_fill,g_face,r_max" + url.slice(uploadIdx+6);
}
export const getDateYYYYMMDD = (date) => {
    return date.split("T")[0];
}
export const getDate = (date) => {
    date = new Date(date);
    return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
export const daysOld = (tuit) => {
    const now = new Date();
    const nowMillis = now.getTime();
    const posted = new Date(tuit.postedOn);
    const postedMillis = posted.getTime();
    const oldMillis = nowMillis - postedMillis;
    let old = 0.0;
    const secondsOld = oldMillis / 1000.0;
    const minutesOld = secondsOld / 60.0;
    const hoursOld = minutesOld / 60.0;
    const daysOld = hoursOld / 24.0;
    if (daysOld > 1) {
        old = Math.round(daysOld) + 'd';
    } else if (hoursOld > 1) {
        old = Math.round(hoursOld) + 'h';
    } else if (minutesOld > 1) {
        old = Math.round(minutesOld) + 'm';
    } else if (secondsOld > 1) {
        old = Math.round(secondsOld) + 's';
    }
    return old;
}