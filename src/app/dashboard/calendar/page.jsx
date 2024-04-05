import RFullCalendar from "@/app/_components/FullCalendar"
import { format } from "date-fns";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import axios from 'axios';

async function fetchData(start, end)  {
    try {
        const { data } = await axios.post('/api/test', {
            start: start,
            end: end
         });
         console.log(data)
         return data;
    } catch (e) {
        console.log(e)
    }
    
}

export default async function Page() {
    const res = await fetch("http://localhost:3400/api/test", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            start: format(new Date(), 'yyyy-MM-dd'),
            end: format(new Date(), 'yyyy-MM-dd')
        }),
    });
    const user = await res.json();
   
    


    return (
        <div>
            <RFullCalendar  />
        </div>
    )
}
