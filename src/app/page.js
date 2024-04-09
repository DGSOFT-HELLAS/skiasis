import {redirect} from 'next/navigation'

import {cookies} from 'next/headers'
export default async function Home() {

  const clientID = cookies().get('clientID')
    if(!clientID ) {
        redirect('/login')
    }
   
 
  }
