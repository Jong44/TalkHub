import app from '@/config/firebase';
import db from '@/config/firestore';
import { doc, getDoc } from '@firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const WithAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [authorized, setAuthorized] = useState(false);

        const alertEror = (message) => {
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
            

        useEffect(() => {
            const auth = getAuth(app);
            const checkAuth = async () => {
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const userDoc = await getDoc(doc(db, "users", user.uid));
                        if (userDoc.exists()) {
                            setAuthorized(true);
                        } else {
                            alertEror("User tidak ditemukan");
                            router.push("/auth/login");
                        }
                        if (!user.emailVerified) {
                            alertEror("Silahkan cek email anda untuk verifikasi akun");
                            router.push("/auth/login");
                        }else{
                            setAuthorized(true);
                        }
                    } else {
                        alertEror("Silahkan login terlebih dahulu");
                        router.push("/auth/login");
                    }
                    setLoading(false);
                });
            };

            checkAuth();
        }, [router]);

        if (loading) {
            return (
              <div className=" w-full h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-color"></div>
              </div>
            );
          }

        return <WrappedComponent {...props} />
    }
}

export default WithAuth