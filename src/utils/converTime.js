import moment from "moment";
import 'moment/locale/id';

export default function convertTime(timestamp) {
    // convert firestore timestamp "1721824871925" to time ago format "10 minutes ago"
    const time = moment(timestamp).fromNow();
    return time;
}