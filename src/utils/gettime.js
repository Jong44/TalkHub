import moment from 'moment-timezone';
import 'moment/locale/id';

moment.locale('id');

export default function getTime(timestamp) {
    // Merubah timestamp dari firestore menjadi waktu yang lalu misal 10 menit lalu atau 1 jam lalu dst
    const time = moment(timestamp.toDate()).fromNow();
    return time;
}