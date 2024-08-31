
import { FormData } from '@/components/ContactForm'


export function sendEmail(data: FormData) {
    const apiEndPoint = 'api/email'
    fetch(apiEndPoint, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        alert(response.message)
    })
    .catch(err => {
        alert(err)
    })
  
}

