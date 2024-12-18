import { Button } from "@/components/ui/button";
import Form from "./Form";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { FaPlus } from "react-icons/fa";

export default function Create() {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex w-full items-center gap-1 sm:w-fit"
        >
          <FaPlus />
          Add New Branch
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Add Branch</CredenzaTitle>
          <CredenzaDescription>
            Add a new branch to access complaints via custom branches.
          </CredenzaDescription>
        </CredenzaHeader>
        <Form />
      </CredenzaContent>
    </Credenza>
  );
}
