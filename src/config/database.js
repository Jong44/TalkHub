import { getDatabase } from "firebase/database";
import app from "./firebase";

const realDb = getDatabase(app);

export default realDb;