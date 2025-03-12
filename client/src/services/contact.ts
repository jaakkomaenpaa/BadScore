import { ContactData } from '@/types/misc'
import { API_URL } from '../config'
import axios from 'axios'

const URL = `${API_URL}/contact`

const sendMail = async (data: ContactData): Promise<any> => {
  console.log('data', data)

  const response = await axios.post(URL, data, {
    headers: {
      'Content-Type': 'application/json',
    },
    maxRedirects: 0,
  })
  return response.data
}

const service = {
  sendMail,
}

export default service
