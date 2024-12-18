"use client";
import { toast } from "sonner";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import useForm from "@/hooks/use-fom";
import { API_URL, SERVICES } from "@/lib/apiEndPoints";
import SubmitBtn from "@/components/ui/submit-button";
import { useSession } from "next-auth/react";
import KeywordInput from "@/components/keywords";
import { TextareaInput } from "@/components/TextareaInput";
import { SelectInput } from "@/components/SelectInput";
import { useRouter } from "next/navigation";
import { dataTypeIds, ServicesType } from "@/types";
import useFetch from "@/hooks/usefetch";
import SearchSelect from "@/components/ui/search-select";
import { Skeleton } from "@/components/ui/skeleton";
import { FileUpload } from "@/components/file-upload";

export default function Form({
  rowCurrent,
  endPoint,
}: {
  endPoint?: string;
  rowCurrent?: ServicesType;
}) {
  const { data, isLoading, error } = useFetch<dataTypeIds[]>(
    `${API_URL}/fetch-categories-ids`,
  );
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
    name: rowCurrent?.name || "",
    description: rowCurrent?.description || "",
    keywords: rowCurrent?.keywords || "",
    status: rowCurrent?.status || "",
    image: null as File | null,
    hero_image: null as File | null,
  });

  const handleKeywordsChange = (value: string) => {
    setformData("keywords", value);
  };
  const path = endPoint ? endPoint : API_URL + SERVICES;
  const method = endPoint ? put : post;
  const createTracker = async (event: React.FormEvent) => {
    event.preventDefault();
    method(
      path,
      {
        onSuccess: (response) => {
          toast.success(response.message);
          router.push(`/services/${response.data.slug}`);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
      token,
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setformData({ ...formData, image: file });
    }
  };
  const handleFileSelect = (file: File | null) => {
    if (file) {
      setformData({ ...formData, hero_image: file });
    }
  };

  return (
    <div className="relative rounded bg-white p-2 dark:bg-slate-950">
      <FileUpload onFileSelect={handleFileSelect} />
      <form className="mt-2 space-y-2" onSubmit={createTracker}>
        <div className="w-full space-y-2">
          {!isLoading && data ? (
            <SearchSelect
              options={data}
              label="Category"
              value={formData.category_id}
              onChange={(e) => setformData("category_id", e)}
              description="Choose the Category where you want to add this service"
              width="full"
            />
          ) : (
            <Skeleton className="h-10 w-full" />
          )}
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
          />
          <LabelInputContainer
            type="file"
            onChange={handleImageChange}
            accept="image/png,image/svg,image/jpeg,image/webp"
            id="service-name"
            placeholder="image"
            label="Image"
            errorMessage={errors.image}
          />
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
