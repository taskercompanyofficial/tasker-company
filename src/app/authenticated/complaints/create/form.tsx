"use client"
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import React, { useState } from 'react'
import BasicForm from '../components/basic-form'
import { ComplaintsType, dataTypeIds } from '@/types'
import useForm from '@/hooks/use-fom'
import ComplaintDetailsForm from '../components/complaint-details-form'
import { Button, buttonVariants } from '@/components/ui/button'
import SubmitBtn from '@/components/ui/submit-button'
import { Credenza, CredenzaContent, CredenzaFooter, CredenzaTitle, CredenzaDescription, CredenzaHeader, CredenzaTrigger, CredenzaClose } from '@/components/ui/credenza'
import FilesForm from '../components/files-form'
import { SelectInput } from '@/components/SelectInput'
import { ComplaintStatusOptions, complaintTypeOptions } from '@/lib/otpions'

export default function Form({ complaint, technician }: { complaint?: ComplaintsType, technician?: dataTypeIds[] }) {
    const [tab, setTab] = useState("basic")
    const { data, setData, processing, post, errors, put, reset } = useForm({
        brand_complaint_no: complaint?.brand_complaint_no || "",
        applicant_name: complaint?.applicant_name || "",
        applicant_email: complaint?.applicant_email || "",
        applicant_phone: complaint?.applicant_phone || "",
        applicant_whatsapp: complaint?.applicant_whatsapp || "",
        applicant_adress: complaint?.applicant_adress || "",
        description: complaint?.description || "",
        branch_id: complaint?.branch_id || "",
        brand_id: complaint?.brand_id || "",
        product: complaint?.product || "",
        model: complaint?.model || "",
        serial_number_ind: complaint?.serial_number_ind || "",
        serial_number_oud: complaint?.serial_number_oud || "",
        mq_nmb: complaint?.mq_nmb || "",
        p_date: complaint?.p_date || "",
        complete_date: complaint?.complete_date || "",
        amount: complaint?.amount || "",
        technician: complaint?.technician || "",
        status: complaint?.status || "",
        complaint_type: complaint?.complaint_type || "",
        provided_services: complaint?.provided_services || "",
        warranty_type: complaint?.warranty_type || "",
        extra: complaint?.extra || "",
        happy_call_remarks: complaint?.happy_call_remarks || "",
        files: complaint?.files || [
        ],
    });
    return (
        <div className="shadow-md rounded-lg p-4 bg-white  dark:bg-slate-950">
            <Tabs defaultValue="basic" value={tab} onValueChange={setTab}>
                <div className="flex justify-between items-center">
                    <TabsList>
                        {["basic", "advanced", "files"].map((tab) => (
                            <TabsTrigger key={tab} value={tab}  >{tab.charAt(0).toUpperCase() + tab.slice(1)}</TabsTrigger>
                        ))}
                    </TabsList>
                    <div className="flex justify-end gap-2 mt-2 items-center">
                        <SelectInput
                            options={ComplaintStatusOptions}
                            selected={data.status}
                            onChange={(e) => setData({ ...data, status: e })}
                        />
                        <SubmitBtn className={`${buttonVariants({ effect: "shineHover" })}`} processing={processing} size={"sm"} label={complaint ? "Save Changes" : "Create Complaint"} />
                    </div>
                </div>
                <Separator className="my-2" />
                <TabsContent value="basic">
                    <BasicForm data={data} setData={setData} errors={errors} />
                </TabsContent>
                <TabsContent value="advanced">
                    <ComplaintDetailsForm data={data} setData={setData} errors={errors} technician={technician} />
                </TabsContent>
                <TabsContent value="files">
                    <FilesForm data={data} setData={setData} errors={errors} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
