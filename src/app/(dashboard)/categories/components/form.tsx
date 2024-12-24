"use client";
import { toast } from "sonner";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import useForm from "@/hooks/use-fom";
import { API_URL, CATEGORIES } from "@/lib/apiEndPoints";
import SubmitBtn from "@/components/ui/submit-button";
import { useSession } from "next-auth/react";
import KeywordInput from "@/components/keywords";
import { TextareaInput } from "@/components/TextareaInput";
import { SelectInput } from "@/components/SelectInput";
import { useRouter } from "next/navigation";
import { CategoriesType } from "@/types";
import { FileUpload } from "@/components/file-upload";

export default function Form({
  rowCurrent,
  endPoint,
}: {
  endPoint?: string;
  rowCurrent?: CategoriesType;
}) {
  const router = useRouter();
  const session = useSession();
  const token = session.data?.token || "";
  const { data, setData, processing, post, put, errors } = useForm({
    name: rowCurrent?.name || "",
    description: rowCurrent?.description || "",
    keywords: rowCurrent?.keywords || "",
    status: rowCurrent?.status || "",
    image: null as File | null,
    hero_image: null as File | null,
  });

  const handleKeywordsChange = (value: string) => {
    setData("keywords", value);
  };
  const path = endPoint ? endPoint : API_URL + CATEGORIES;
  const method = endPoint ? put : post;
  const createTracker = async (event: React.FormEvent) => {
    event.preventDefault();
    method(
      path,
      {
        onSuccess: (response) => {
          toast.success(response.message);
          router.push(`/categories/${response.data.slug}`);
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
      setData({ ...data, image: file });
    }
  };
  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setData({ ...data, hero_image: files[0] });
    }
  };
  return (
    <div className="relative rounded bg-white p-2 dark:bg-slate-950">
      <FileUpload onFileSelect={handleFileSelect} />
      <form className="mt-2 space-y-2" onSubmit={createTracker}>
        <div className="w-full space-y-2">
          <LabelInputContainer
            type="text"
            autoFocus
            id="category-name"
            placeholder="Category name"
            label="Name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            errorMessage={errors.name}
            required
          />
          <LabelInputContainer
            type="file"
            onChange={handleImageChange}
            accept="image/png,image/svg,image/jpeg,image/webp"
            id="category-name"
            placeholder="image"
            label="Image"
            errorMessage={errors.image}
          />
          <TextareaInput
            label="Description"
            placeholder="Enter your small description..."
            maxLength={250}
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            errorMessage={errors.description}
            className="bg-gray-50"
          />
          <KeywordInput
            value={data.keywords}
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
            selected={data.status}
            onChange={(status) => setData({ ...data, status })}
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
