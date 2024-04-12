"use server"
import translateData from "@/utils/translateData"

export const fetchMeetingInfo = async (SOACTION, authId) => {
   
    try {
        const result = await fetch('https://dglocal.oncloud.gr/s1services/JS/Production/calls.getMeetingInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientID: authId,
                SOACTION: SOACTION
            })
        })
        let buffer = await translateData(result)
        return buffer;
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}
