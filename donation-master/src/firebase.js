import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, getDoc, doc, updateDoc, getDocs, collection, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { generatePassword, randomNumber } from './modules/random';

const firebaseConfig = {
    apiKey: "AIzaSyCOpArtYL2kncWFHx4YSzQPnmk0w4HrxEs",
    authDomain: "do-nation-web.firebaseapp.com",
    projectId: "do-nation-web",
    storageBucket: "do-nation-web.appspot.com",
    messagingSenderId: "882359419027",
    appId: "1:882359419027:web:22634e4c2aef1ca5860d66",
    measurementId: "G-0B8BZ62THE"
};

// Initialising app
const app = initializeApp(firebaseConfig);
getAnalytics(app)

// Initialising services
const db = getFirestore();
export const auth = getAuth()

export async function signupUser(email, password) {
    try {
        localStorage.setItem('auth-type', 'user')
        await createUserWithEmailAndPassword(auth, email, password)
        return { success: true }
    } catch (error) {
        localStorage.removeItem('auth-type')
        return { success: false, error: error.code || 'Some error occured...' }
    }
}

export async function loginUser(email, password) {
    try {
        localStorage.setItem('auth-type', 'user')
        await signInWithEmailAndPassword(auth, email, password)
        return { success: true }
    } catch (error) {
        localStorage.removeItem('auth-type')
        return { success: false, error: error.code || 'Some error occured...' }
    }
}

export async function logout() {
    try {
        await signOut(auth)
        localStorage.removeItem('auth-type')
        return { success: true }
    } catch { return { success: false } }
}

export async function getUserData(uid) {
    try {
        const info = await getDoc(doc(db, `/users/${uid}`))
        return { success: info.exists(), data: info.data() }
    } catch { return { success: false } }
}

export async function setUserData(uid, name, image, mobile, address, pincode) {
    try {
        const ref = doc(db, `/users/${uid}`)
        const info = await getDoc(ref)
        if (info.exists()) await updateDoc(ref, { name, image, mobile, address, pincode })
        else await setDoc(ref, { name, image, mobile, address, pincode })
        return { success: true }
    } catch { return { success: false } }
}

export async function initiateDonation(uid, description) {
    try {
        const ref = doc(db, `/users/${uid}`)
        const info = await getDoc(ref)
        const donation = { id: randomNumber(6), description, status: 'pending', uid, date: Date.now() }
        if (info.exists()) {
            var donations = info.data().donations || []
            donations.push(donation)
            await updateDoc(ref, { donations })
        }
        return { success: true, donations }
    } catch (error) { return { success: false } }
}

export async function acceptDonation(uid, id, ngoId) {
    try {
        const ref = doc(db, `/users/${uid}`)
        const info = await getDoc(ref)
        if (info.exists()) {
            const donations = info.data().donations || []
            for (let i = 0; i < donations.length; i++) {
                const donation = donations[i]
                if (donation.status === 'pending' && donation.id === id) {
                    const password = generatePassword()
                    donation.status = 'accepted'
                    donation.ngo = ngoId
                    donation.password = password
                    donations[i] = donation
                    await updateDoc(ref, { donations })
                    return { success: true, password }
                }
            }
        }
        return { success: false }
    } catch { return { success: false } }
}

export async function completeDonation(uid, id, password) {
    try {
        const ref = doc(db, `/users/${uid}`)
        const info = await getDoc(ref)
        if (info.exists()) {
            const donations = info.data().donations || []
            for (let i = 0; i < donations.length; i++) {
                const donation = donations[i]
                if (donation.status === 'accepted' && donation.id === id && donation.password === password) {
                    donation.status = 'donated'
                    donations[i] = donation
                    await updateDoc(ref, { donations })
                    return { success: true }
                }
            }
        }
        return { success: false }
    } catch { return { success: false } }
}

export async function getAllDonations(pincode) {
    try {
        const { docs } = await getDocs(collection(db, '/users'))
        let donations = []
        docs.forEach(doc => {
            const { name, pincode: userPincode, mobile, address, image, donations: userDonations } = doc.data()
            if (userPincode === pincode) {
                userDonations?.forEach((donation, i) => {
                    userDonations[i] = { ...donation, uid: doc.id, name, mobile, address, image }
                })
                donations.push(...(userDonations || []))
            }
        })
        return { success: Boolean(donations.length), donations }
    } catch { return { success: false } }
}

export async function signupNgo(email, password) {
    try {
        localStorage.setItem('auth-type', 'ngo')
        await createUserWithEmailAndPassword(auth, email, password)
        return { success: true }
    } catch (error) {
        return { success: false, error: error.code || 'Some error occured...' }
    }
}

export async function loginNgo(email, password) {
    try {
        localStorage.setItem('auth-type', 'ngo')
        await signInWithEmailAndPassword(auth, email, password)
        return { success: true }
    } catch (error) {
        localStorage.removeItem('auth-type')
        return { success: false, error: error.code || 'Some error occured...' }
    }
}

export async function getNgos(pincode = 'all') {
    try {
        const { docs } = await getDocs(collection(db, '/ngos'))
        let ngos = []
        docs.forEach(doc => {
            const data = doc.data()
            if (pincode === 'all' || data.pincode === pincode) ngos.push(data)
        })
        return { success: Boolean(ngos.length), ngos }
    } catch { return { success: false } }
}

export async function getAllEvents() {
    try {
        const { docs } = await getDocs(collection(db, '/ngos'))
        let events = []
        docs.forEach(doc => {
            const { name, image, events: ngoEvents } = doc.data()
            ngoEvents?.forEach((event, i) => {
                ngoEvents[i] = { ...event, name, ngoImage: image }
            })
            events.push(...(ngoEvents || []))
        })
        return { success: Boolean(events.length), events }
    } catch { return { success: false } }
}

export async function getNgoData(uid) {
    try {
        const info = await getDoc(doc(db, `/ngos/${uid}`))
        return { success: info.exists(), data: info.data() }
    } catch { return { success: false } }
}

export async function setNgoData(uid, name, website, image, description, mobile, address, pincode) {
    try {
        const ref = doc(db, `/ngos/${uid}`)
        const info = await getDoc(ref)
        if (info.exists()) await updateDoc(ref, { name, website, image, description, mobile, address, pincode })
        else await setDoc(ref, { name, website, image, description, mobile, address, pincode })
        return { success: true }
    } catch { return { success: false } }
}

export async function setEvent(uid, title, description, image, url) {
    try {
        const ref = doc(db, `/ngos/${uid}`)
        const info = await getDoc(ref)
        const event = { title, description, image, url, date: Date.now() }
        if (info.exists()) {
            const events = info.data().events || []
            events.push(event)
            await updateDoc(ref, { events })
            return { success: true, events }
        }
        return { success: false, error: 'Complete your profile first' }
    } catch { return { success: false, error: 'Some error occurred...' } }
}