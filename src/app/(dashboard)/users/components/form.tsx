"use client";
import { toast } from "sonner";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import useForm from "@/hooks/use-fom";
import { API_URL, WORKERS } from "@/lib/apiEndPoints";
import SubmitBtn from "@/components/ui/submit-button";
import { useSession } from "next-auth/react";
import { TextareaInput } from "@/components/TextareaInput";
import { useRouter } from "next/navigation";
import { dataTypeIds, workersType } from "@/types";
import { FileUpload } from "@/components/file-upload";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { SelectInput } from "@/components/SelectInput";
import { getRoleOptions } from "@/lib/otpions";
import useFetch from "@/hooks/usefetch";
import SearchSelect from "@/components/ui/search-select";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function Form({
  rowCurrent,
  endPoint,
}: {
  endPoint?: string;
  rowCurrent?: workersType;
}) {
  const router = useRouter();
  const session = useSession();
  const {
    data: branchesData,
    error: branchesError,
    isLoading: branchesLoading,
  } = useFetch<dataTypeIds[]>(`${API_URL}/fetch-branches`);
  const [citiesUrl, setCitiesUrl] = useState<string>(
    `${API_URL}/fetch-cities?country_id=167`,
  );
  const {
    data: statesData,
    error: statesError,
    isLoading: statesLoading,
  } = useFetch<dataTypeIds[]>(`${API_URL}/fetch-states?country_id=167`);
  const {
    data: citiesData,
    error: citiesError,
    isLoading: citiesLoading,
  } = useFetch<dataTypeIds[]>(citiesUrl);
  const token = session.data?.token || "";
  const {
    data: formData,
    setData: setformData,
    processing,
    post,
    errors,
  } = useForm({
    full_name: rowCurrent?.full_name || "",
    father_name: rowCurrent?.father_name || "",
    contact_email: rowCurrent?.contact_email || "",
    phone_number: rowCurrent?.phone_number || "",
    secondary_phone_number: rowCurrent?.secondary_phone_number || "",
    password: "",
    full_address: rowCurrent?.full_address || "",
    state: rowCurrent?.state || "",
    city: rowCurrent?.city || "",
    salary: rowCurrent?.salary || "",
    branch_id: rowCurrent?.branch_id || "",
    cnic_front: null as File | null,
    cnic_back: null as File | null,
    account_maintanance_certificate: null as File | null,
    blank_check: null as File | null,
    reference_1_name: rowCurrent?.reference_1_name || "",
    reference_1_number: rowCurrent?.reference_1_number || "",
    reference_1_cnic: null as File | null,
    reference_2_name: rowCurrent?.reference_2_name || "",
    reference_2_number: rowCurrent?.reference_2_number || "",
    reference_2_cnic: null as File | null,
    profile_image: null as File | null,
    role: rowCurrent?.role || "",
    status: rowCurrent?.status || "",
    is_verified: rowCurrent?.is_verified || "",
    notification: rowCurrent?.notification || "",
  });

  const path = endPoint || API_URL + WORKERS;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value);
      }
    });

    post(
      path,
      {
        onSuccess: (response) => {
          toast.success(response.message);
          router.push("/users");
          router.refresh();
        },
        onError: (error) => {
          toast.error(error.message || "Something went wrong");
        },
      },
      token,
    );
  };

  const handleFileSelect = (file: File | null, field: string) => {
    if (file) {
      setformData({ ...formData, [field]: file });
    }
  };
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setformData({ ...formData, [field]: file });
    }
  };
  return (
    <div className="relative rounded bg-white p-4 shadow-sm dark:bg-slate-950">
      <div className="mb-6">
        <FileUpload
          onFileSelect={(file) => handleFileSelect(file, "profile_image")}
          accept="image/*"
        />
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-bold">Personal Information</Label>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <LabelInputContainer
                type="text"
                id="full-name"
                placeholder="Enter full name"
                label="Full Name"
                value={formData.full_name}
                onChange={(e) => setformData("full_name", e.target.value)}
                errorMessage={errors.full_name}
                required
              />
              <LabelInputContainer
                type="text"
                id="father-name"
                placeholder="Enter father's name"
                label="Father Name"
                value={formData.father_name}
                onChange={(e) => setformData("father_name", e.target.value)}
                errorMessage={errors.father_name}
                required
              />
              <LabelInputContainer
                type="email"
                id="contact-email"
                placeholder="Enter email address"
                label="Contact Email"
                value={formData.contact_email}
                onChange={(e) => setformData("contact_email", e.target.value)}
                errorMessage={errors.contact_email}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <LabelInputContainer
                type="tel"
                id="phone-number"
                placeholder="Enter phone number"
                label="Phone Number"
                value={formData.phone_number}
                onChange={(e) => setformData("phone_number", e.target.value)}
                errorMessage={errors.phone_number}
                required
              />
              <LabelInputContainer
                type="tel"
                id="secondary-phone-number"
                placeholder="Enter secondary phone number"
                label="Secondary Phone Number"
                value={formData.secondary_phone_number}
                onChange={(e) =>
                  setformData("secondary_phone_number", e.target.value)
                }
                errorMessage={errors.secondary_phone_number}
              />
              <LabelInputContainer
                type="text"
                id="salary"
                placeholder="Enter salary"
                label="Salary"
                value={formData.salary}
                onChange={(e) => setformData("salary", e.target.value)}
                errorMessage={errors.salary}
                required
              />
              <LabelInputContainer
                type="password"
                id="password"
                placeholder="Enter password"
                label="Password"
                value={formData.password}
                onChange={(e) => setformData("password", e.target.value)}
                errorMessage={errors.password}
                required
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {!branchesLoading && branchesData ? (
                <SearchSelect
                  options={branchesData}
                  label="Branch"
                  value={formData.branch_id}
                  onChange={(e) => setformData("branch_id", e)}
                  className="mt-2"
                  error={errors.branch_id}
                  width="full"
                />
              ) : (
                <div className="mt-2 space-y-1">
                  <Skeleton className="h-3 w-[20%]" />
                  <Skeleton className="h-10 w-full" />
                </div>
              )}
              {!statesLoading && statesData ? (
                <SearchSelect
                  options={statesData}
                  label="State"
                  value={formData.state}
                  onChange={(e) => {
                    setformData("state", e);
                    setCitiesUrl(
                      `${API_URL}/fetch-cities?country_id=167&state_id=${e}`,
                    );
                  }}
                  className="mt-2"
                  error={errors.state}
                  width="full"
                />
              ) : (
                <div className="mt-2 space-y-1">
                  <Skeleton className="h-3 w-[20%]" />
                  <Skeleton className="h-10 w-full" />
                </div>
              )}
              {!citiesLoading && citiesData ? (
                <SearchSelect
                  options={citiesData}
                  label="City"
                  value={formData.city}
                  onChange={(e) => setformData("city", e)}
                  className="mt-2"
                  error={errors.city}
                  width="full"
                />
              ) : (
                <div className="mt-2 space-y-1">
                  <Skeleton className="h-3 w-[20%]" />
                  <Skeleton className="h-10 w-full" />
                </div>
              )}
            </div>

            <div className="mt-4">
              <TextareaInput
                id="full-address"
                placeholder="Enter complete address"
                label="Full Address"
                value={formData.full_address}
                onChange={(e) => setformData("full_address", e.target.value)}
                errorMessage={errors.full_address}
                required
              />
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-lg font-bold">Account Information</Label>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <LabelInputContainer
                type="file"
                id="cnic-front"
                onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) {
                    handleImageChange(e, "cnic_front");
                  }
                }}
                label="CNIC Front"
                accept="image/*"
                required
              />
              <LabelInputContainer
                type="file"
                id="cnic-back"
                onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) {
                    handleImageChange(e, "cnic_back");
                  }
                }}
                label="CNIC Back"
                accept="image/*"
                required
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <LabelInputContainer
                type="file"
                id="account-maintenance-certificate"
                onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) {
                    handleImageChange(e, "account_maintanance_certificate");
                  }
                }}
                label="Account Maintenance Certificate"
                accept=".pdf,.doc,.docx"
                required
              />
              <LabelInputContainer />
              <LabelInputContainer
                type="file"
                id="blank-check"
                onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) {
                    handleFileSelect(e.target.files[0], "blank_check");
                  }
                }}
                label="Blank Check"
                accept="image/*"
                required
              />
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-lg font-bold">References</Label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <LabelInputContainer
                type="text"
                id="reference-1-name"
                placeholder="Enter reference name"
                label="Reference 1 Name"
                value={formData.reference_1_name}
                onChange={(e) =>
                  setformData("reference_1_name", e.target.value)
                }
                errorMessage={errors.reference_1_name}
                required
              />
              <LabelInputContainer
                type="tel"
                id="reference-1-number"
                placeholder="Enter reference number"
                label="Reference 1 Number"
                value={formData.reference_1_number}
                onChange={(e) =>
                  setformData("reference_1_number", e.target.value)
                }
                errorMessage={errors.reference_1_number}
                required
              />
              <LabelInputContainer
                type="file"
                id="reference-1-cnic"
                onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) {
                    handleFileSelect(e.target.files[0], "reference_1_cnic");
                  }
                }}
                label="Reference 1 CNIC"
                accept="image/*"
                required
              />
              <LabelInputContainer
                type="text"
                id="reference-2-name"
                placeholder="Enter reference name"
                label="Reference 2 Name"
                value={formData.reference_2_name}
                onChange={(e) =>
                  setformData("reference_2_name", e.target.value)
                }
                errorMessage={errors.reference_2_name}
                required
              />
              <LabelInputContainer
                type="tel"
                id="reference-2-number"
                placeholder="Enter reference number"
                label="Reference 2 Number"
                value={formData.reference_2_number}
                onChange={(e) =>
                  setformData("reference_2_number", e.target.value)
                }
                errorMessage={errors.reference_2_number}
                required
              />
              <LabelInputContainer
                type="file"
                id="reference-2-cnic"
                onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) {
                    handleFileSelect(e.target.files[0], "reference_2_cnic");
                  }
                }}
                label="Reference 2 CNIC"
                accept="image/*"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <SelectInput
                label="Role"
                options={getRoleOptions}
                onChange={(e) => setformData("role", e)}
                selected={formData.role}
              />
              <SelectInput
                label="Status"
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                  { label: "Pending", value: "pending" },
                  { label: "Rejected", value: "rejected" },
                  { label: "Suspended", value: "suspended" },
                ]}
                onChange={(e) => setformData("status", e)}
                selected={formData.status}
              />
              <SelectInput
                label="Is Verified"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
                onChange={(e) => setformData("is_verified", e)}
                selected={formData.is_verified}
              />
              <SelectInput
                label="Notification"
                options={[
                  { label: "Email", value: "email" },
                  { label: "SMS", value: "sms" },
                  { label: "Both", value: "both" },
                ]}
                onChange={(e) => setformData("notification", e)}
                selected={formData.notification}
              />
            </div>
          </div>
        </div>

        <SubmitBtn
          processing={processing}
          label={rowCurrent ? `Update User` : "Create User"}
          className="w-full"
        />
      </form>
    </div>
  );
}
