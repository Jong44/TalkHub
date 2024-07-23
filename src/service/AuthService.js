import db from '@/config/firestore'
import app from "@/config/firebase";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from '@firebase/firestore';


const response = {
    status: null,
    message: null,
    data: null
}

const registerWithEmailAndPassword = async ({fullname, email, password }) => {
    const auth = getAuth(app);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);

        response.status = "success";
        response.message = "Berhasil membuat akun! Silahkan cek email anda untuk verifikasi akun";
        response.data = user;

    } catch (error) {
        response.status = "error";
        response.data = error.message;
    }

    return response;
};

const loginWithEmailAndPassword = async ({ email, password }) => {
    const auth = getAuth(app);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user.emailVerified) {
                    response.status = "error";
                    response.message = "Silahkan cek email anda untuk verifikasi akun";
                } else {
                    response.status = "success";
                    response.message = "Berhasil login";
                    response.data = user
                }
            } else {
                response.status = "error";
                response.message = "User tidak ditemukan";
            }
        });
    } catch (error) {
        response.status = "error";
        response.data = error.message;
    }

    return response;
}

const logout = async () => {
    const auth = getAuth(app);

    try {
        await auth.signOut();
        response.status = "success";
        response.message = "Berhasil logout";
    } catch (error) {
        response.status = "error";
        response.message = error.message;
    }

    return response;
}

const getUser = async () => {
    const auth = getAuth(app);

    onAuthStateChanged(auth, async (currentUser) => {
        if(currentUser){
            response.status = "success";
            response.data = currentUser.uid;
        }else{
            response.status = "error";
            response.message = "User tidak ditemukan";
        }
    });

    return response;
}



module.exports = {
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    logout,
    getUser
}