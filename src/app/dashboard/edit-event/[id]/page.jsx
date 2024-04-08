
import translateData from "@/utils/translateData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EventEdit from "@/app/_components/EventEdit";

const fetchData = async (SOACTION, authId) => {
   
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


export default async function Page({params}) {
    const SOACTION = params.id;
    const {user} = await getServerSession(authOptions);
    const authId = user.id;

   
    
    const data = await fetchData(SOACTION, authId);

    return (
        <div>
            <EventEdit event={data[0]}/>
        </div>
    );
}