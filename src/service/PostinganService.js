import { getDatabase, ref, set } from "firebase/database";
import realDb from "@/config/database";

const uploadRealtimeDatabase = ({
    idPost,
    tag
  }) => {
    set(ref(realDb, 'posts/' + idPost + '/like/'), {
      total: 0
    });
    if(tag){
        tag.map(async item => {
            const tagRef = ref(realDb, 'tags/' + item.replace('#', '') + '/' + idPost);
            set(tagRef, true);
        })
    }
  }

export default uploadRealtimeDatabase;
