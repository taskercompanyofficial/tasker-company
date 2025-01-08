import { Button } from '@/components/ui/button';
import { SelectInput } from '@/components/SelectInput';
import { warrantyTypeOptions } from '@/lib/otpions';
import { Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';

export default function FilesForm({
    data,
    setData,
    errors,
}: {
    data: any;
    setData: (data: any) => void;
    errors: any;
}) {
    const handleRemoveFile = (index: number) => {
        const updatedFiles = [...data.files];
        updatedFiles.splice(index, 1);
        setData({ ...data, files: updatedFiles });
    };

    const handleFileChange = (index: number, file: File) => {
        const updatedFiles = [...data.files];
        updatedFiles[index].file = file;
        updatedFiles[index].url = URL.createObjectURL(file); // Create a preview URL
        setData({ ...data, files: updatedFiles });
    };

    const handleAddFile = (type: string) => {
        // Find the count of files with the same type
        const count = data.files.filter((file: any) => file.type === type).length;

        // Create a new file entry
        const newFile = {
            id: Date.now(),
            file: null,
            url: '',
            name: `${type}-${count + 1}`, // Increment the name
            type,
        };

        setData({ ...data, files: [...data.files, newFile] });
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <SelectInput
                    options={warrantyTypeOptions}
                    onChange={(e) => handleAddFile(e)}
                    label="Select File Type"
                    selected={data.warranty_type}
                />
            </div>
            <div className="bg-muted w-full shadow-inset p-4 rounded-md h-[300px] overflow-y-auto flex flex-wrap gap-2">
                {data.files.map((file: any, index: number) => (
                    <div
                        key={file.id}
                        className="w-[120px] h-[150px] relative bg-white rounded-md p-2 group"
                    >
                        <Image
                            className="w-full h-[100px] object-cover rounded-md"
                            src={file.url || '/placeholder.png'}
                            alt={file.name}
                            width={100}
                            height={100}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-2 rounded-md transition-opacity">
                            <Trash2
                                className="text-red-500 cursor-pointer"
                                onClick={() => handleRemoveFile(index)}
                            />
                            <label htmlFor={`file-input-${file.id}`} className="cursor-pointer">
                                <Upload className="text-white" />
                            </label>
                            <input
                                id={`file-input-${file.id}`}
                                type="file"
                                className="hidden"
                                onChange={(e) =>
                                    e.target.files && handleFileChange(index, e.target.files[0])
                                }
                            />
                        </div>
                        <p className="text-center text-sm mt-2 truncate">{file.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
