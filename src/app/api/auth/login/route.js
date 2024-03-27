import axios from 'axios';
import {cookies} from 'next/headers'
export async function POST(req) {
    
    const {username, password} = await req.json();
    console.log('are we here?')
    console.log(password, username)

    try {
        //AUTHENTICATE:
        const {data} = await axios.post(`${process.env.SOFT_URL}`, {
                SERVICE: "Login",
                USERNAME: username.trim(),
                PASSWORD: password.trim(),
                APPID: "1001"
        
        })

        console.log('login data')
        console.log(data);
      
        
        const authenticate = await axios.post(`${process.env.SOFT_URL}`, {
                service: "authenticate",
                clientID: data.clientID,	
                COMPANY: "1001",
                BRANCH: "1000",
                MODULE: "0",
                REFID: "262"
        })
        console.log('authenticate')
        console.log(authenticate.data.clientID)
        
        cookies().set('clientID', authenticate.data.clientID)
       
        
        return Response.json({
            success: true,
            user: data,
            clientID: authenticate.data.clientID,
          
        })
       
    } catch (e) {
        return Response.json({
            success: false,
            user: null,
        })
    }
   
  }


