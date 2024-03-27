import {cookies} from 'next/headers'
import { NextResponse } from 'next/server'

export async function middleware(request) {

  
      // let clientID = cookies().get('clientID')
      // if(!clientID){
      //   return NextResponse.redirect(new URL('/', request.url))
      // }

}


export const config = {
  matcher: '/dashboard/:path*',
}
