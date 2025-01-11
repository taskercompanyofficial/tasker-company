"use client";

import { API_URL, BRANDS } from "@/lib/apiEndPoints";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { BrandsType } from "@/types";
import Form from "../create/Form";
import { Button } from "@/components/ui/button";

export default function BrandsUpdate({
  rowCurrent,
}: {
  rowCurrent: BrandsType;
}) {
  const endPoint = `${API_URL + BRANDS}/${rowCurrent.id}`;

  return (
    <>
      <Button variant="ghost" size="sm" className="m-0 w-full py-1">
        Edit
      </Button>
      <Credenza>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>{rowCurrent.name}</CredenzaTitle>
          </CredenzaHeader>
          <Form rowCurrent={rowCurrent} endPoint={endPoint} />
        </CredenzaContent>
      </Credenza>
    </>
  );
}
