
import translateData from '@/utils/translateData';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
    // const {start, end} = await request.json()
    const { searchParams } = new URL(request.url)
    const start = searchParams.get('start');
    const end  = searchParams.get('end');
    let _start = start.split('T')[0].split('-').join('')
    let _end = end.split('T')[0].split('-').join('')
  
    try {
        const result = await fetch('https://dglocal.oncloud.gr/s1services/JS/Production/calls.getMeetings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start: _start,
                end: _end
            })
        })
        let buffer;
        try {
            buffer = await translateData(result)
          
        } catch (e) {
            console.log(e)
        }
       
        return Response.json({
            success: true,
            events: buffer.data
    
        })
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
  
}


export async function POST(request) {
    const session = await getServerSession(authOptions)
   
    let userId = session.user.id
    const {event} = await request.json()
    let start = event.start;
    let end = event.end;

    if(!event.key) {
        return Response.json({
            success: false,
            message: 'No key provided.'
        })
    }
    const softone = await fetch('https://dglocal.oncloud.gr/s1services', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...event,
            service: "setData",
            clientID: userId,
            appId: '1001',
            OBJECT: "SOMEETING",
            KEY: event.key,
            data: {
                SOACTION: [
                    {
                        FROMDATE: start,
                        FINALDATE: end,
                    }
                ]
            }
        })
    })
  
    let buffer = await translateData(softone)
    console.log(buffer)
    return Response.json({
        success: true,
        message: 'Επιτυχής αλλαγή στο σύστημα.'
    })
}