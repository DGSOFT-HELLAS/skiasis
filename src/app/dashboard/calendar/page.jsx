import RFullCalendar from "@/app/_components/FullCalendar"
import { format } from "date-fns";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import axios from 'axios';



export default async function Page() {
   
   
    


    return (
        <div>
            <RFullCalendar  />
        </div>
    )
}
