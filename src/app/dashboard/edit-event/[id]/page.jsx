
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EventEdit from "@/app/_components/EventEdit";
import { fetchMeetingInfo } from "@/actions/events";



export default async function Page({params}) {
    const SOACTION = params.id;
    const {user} = await getServerSession(authOptions);
    const authId = user.id;
    const data = await fetchMeetingInfo(SOACTION, authId);

    return (
        <div className="editform_container" >
            <div className="editform" >
            <EventEdit event={data[0]} soaction={SOACTION}/>
            </div>
        </div>
    );
}