
import translateData from '@/utils/translateData';

export async function POST(request) {
    const {start, end} = await request.json()
    console.log('start end')
   
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
        // const data = await result.json()
        let buffer;
        try {
            buffer = await translateData(result)
          
        } catch (e) {
            console.log(e)
        }
       
        // console.log(buffer);
        return Response.json({
            success: true,
            events: buffer.data
    
        })
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
  
}
