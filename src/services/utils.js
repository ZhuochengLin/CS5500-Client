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
    return url.slice(0, uploadIdx+6) + `/w_150,h_150,c_fill,g_face,r_max` + url.slice(uploadIdx+6);
}
export const getDateYYYYMMDD = (date) => {
    return date.split("T")[0];
}
export const getDate = (date) => {
    date = new Date(date);
    return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
