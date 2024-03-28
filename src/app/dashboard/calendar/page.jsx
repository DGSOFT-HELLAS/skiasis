import RFullCalendar from "@/app/_components/FullCalendar"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"


const Page = async () => {

    const session = await getServerSession(authOptions);
    // console.log('do we have the session?')
    // console.log(session)


    return (
        <div>
            <RFullCalendar  />
        </div>
    )
}

export default Page;