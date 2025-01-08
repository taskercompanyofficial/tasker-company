import React from 'react'
import Form from './form'
import { complaintsCreateMeta } from '@/lib/Meta'
import { Metadata } from 'next'
import { API_URL } from '@/lib/apiEndPoints'
import { fetchData } from '@/app/dataFetch/fetchData'

export const metadata: Metadata = {
    title: `${complaintsCreateMeta.title} | Tasker Company`,
    description: complaintsCreateMeta.description,
}

export default async function page() {
    const resposne = await fetchData({ endPoint: API_URL + '/fetch-workers?status=active&role=technician' })
    return (
        <div>
            <Form technician={resposne?.data} />
        </div>
    )
}
