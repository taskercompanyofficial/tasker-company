import { ComplaintStatusOptions } from "@/lib/otpions";
import React from "react";


export default function Status({ status }: { status: string }) {
    const statusOption = ComplaintStatusOptions.find(option => option.value === status) || ComplaintStatusOptions[0];

    return (
        <div>
            <div
                className="text-white rounded shadow py-0.5 px-2"
                style={{ backgroundColor: `rgb(${statusOption.color})` }}
            >
                {statusOption.label}
            </div>
        </div>
    );
}
