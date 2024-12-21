"use client";
import { toast } from "sonner";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import useForm from "@/hooks/use-fom";
import { API_URL, SUBSERVICES } from "@/lib/apiEndPoints";
import SubmitBtn from "@/components/ui/submit-button";
import { useSession } from "next-auth/react";
import KeywordInput from "@/components/keywords";
import { TextareaInput } from "@/components/TextareaInput";
import { SelectInput } from "@/components/SelectInput";
import { useRouter } from "next/navigation";
import { dataTypeIds, SubServicesType } from "@/types";
import useFetch from "@/hooks/usefetch";
import SearchSelect from "@/components/ui/search-select";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { FileUpload } from "@/components/file-upload";

export default function Form({
  rowCurrent,
  endPoint,
}: {
  endPoint?: string;
  rowCurrent?: SubServicesType;
}) {
  const [servicesUrl, setServicesUrl] = useState<string>(
    `${API_URL}/fetch-services-ids`,
  );
  const { data, isLoading, error } = useFetch<dataTypeIds[]>(
    `${API_URL}/fetch-categories-ids`,
  );
  const {
    data: services,
    isLoading: servicesLoading,
    error: servicesError,
  } = useFetch<dataTypeIds[]>(servicesUrl);
  const router = useRouter();
  const session = useSession();
  const token = session.data?.token || "";
  const {
    data: formData,
    setData: setformData,
    processing,
    post,
    put,
    errors,
  } = useForm({
    category_id: rowCurrent?.category_id || "",
    service_id: rowCurrent?.service_id || "",
    name: rowCurrent?.name || "",
    price: rowCurrent?.price || "",
    discount: rowCurrent?.discount || "",
    description: rowCurrent?.description || "",
    keywords: rowCurrent?.keywords || "",
    status: rowCurrent?.status || "",
    image: null as File | null,
    hero_image: null as File | null,
  });

  const handleKeywordsChange = (value: string) => {
    setformData("keywords", value);
  };
  const path = endPoint ? endPoint : API_URL + SUBSERVICES;
  const method = endPoint ? put : post;
  const createTracker = async (event: React.FormEvent) => {
    event.preventDefault();
    method(
      path,
      {
        onSuccess: (response) => {
          toast.success(response.message);
          router.push(`/sub-services/${response.data.slug}`);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
      token,
    );
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setformData({ ...formData, hero_image: file });
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setformData({ ...formData, image: file });
    }
  };
  const handleCategoryChange = (id: string) => {
    setformData("category_id", id);
    const newServicesUrl = `${API_URL}/fetch-services-ids?category_id=${id}`;
    setServicesUrl(newServicesUrl);
  };
  return (
    <div className="relative rounded bg-white p-2 dark:bg-slate-950">
      <FileUpload onFileSelect={handleFileSelect} />
      <form className="mt-2 space-y-2" onSubmit={createTracker}>
        <div className="w-full space-y-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {!isLoading && data ? (
              <SearchSelect
                options={data}
                label="Category"
                value={formData.category_id}
                onChange={(e) => handleCategoryChange(e)}
                description="Choose the Category where you want to add this service"
                width="full"
              />
            ) : (
              <div className="space-y-1">
                <Skeleton className="h-3 w-[20%]" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}
            {!servicesLoading && services ? (
              <SearchSelect
                options={services}
                label="Service"
                value={formData.service_id}
                onChange={(e) => setformData("service_id", e)}
                description="Choose the Service where you want to add this sub service"
                width="full"
              />
            ) : (
              <div className="space-y-1">
                <Skeleton className="h-3 w-[20%]" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}
          </div>
          <LabelInputContainer
            type="text"
            autoFocus
            id="service-name"
            placeholder="service name"
            label="Name"
            value={formData.name}
            onChange={(e) => setformData("name", e.target.value)}
            errorMessage={errors.name}
            required
          />{" "}
          <LabelInputContainer
            type="file"
            onChange={handleImageChange}
            accept="image/png,image/svg,image/jpeg,image/webp"
            id="service-name"
            placeholder="image"
            label="Image"
            errorMessage={errors.image}
          />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <LabelInputContainer
              type="number"
              id="service-price"
              placeholder="Enter price"
              label="Price"
              value={formData.price}
              onChange={(e) => setformData("price", e.target.value)}
              errorMessage={errors.price}
              required
            />
            <LabelInputContainer
              type="number"
              id="service-discount"
              placeholder="Enter discount"
              label="Discount (optional)"
              value={formData.discount}
              onChange={(e) => setformData("discount", e.target.value)}
              errorMessage={errors.discount}
            />
          </div>
          <TextareaInput
            label="Description"
            placeholder="Enter your small description..."
            maxLength={250}
            value={formData.description}
            onChange={(e) => setformData("description", e.target.value)}
            errorMessage={errors.description}
            className="bg-gray-50"
          />
          <KeywordInput
            value={formData.keywords}
            onChange={handleKeywordsChange}
            label="Enter keywords"
            placeholder="Type and press Enter..."
            errorMessage={errors.keywords}
            allowCustomTags={true}
            maxValue={15}
          />
          <SelectInput
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            selected={formData.status}
            onChange={(status) => setformData({ ...formData, status })}
            placeholder="Select Status"
            label="Select Status"
          />
        </div>
        <SubmitBtn
          processing={processing}
          label={rowCurrent ? `Update ${rowCurrent?.name}` : "Crate New"}
          className="w-full"
        />
      </form>
    </div>
  );
}
