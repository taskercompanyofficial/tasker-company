"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { toast } from "sonner";
import myAxios from "@/lib/axios.config";
import { LOGOUT_URL } from "@/lib/apiEndPoints";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
export default function UserLogout({ token }: { token: string }) {
  const [logoutOpen, setLogOutOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const logoutUser = async () => {
    setLoading(true);
    myAxios
      .post(
        LOGOUT_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        toast.success("Successfully LoggedOut");
        signOut({
          callbackUrl: "/login",
          redirect: true,
        });
      })
      .catch((err) => {
        toast.error("Something went wrong.Please try again!");
      });
    signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };
  return (
    <>
      <Link
        href="#"
        className="flex cursor-pointer items-center rounded px-2 py-1 hover:bg-accent"
        onClick={() => setLogOutOpen(true)}
      >
        <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
        Logout
      </Link>
      <Credenza open={logoutOpen} onOpenChange={setLogOutOpen}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>Are you absolutely sure?</CredenzaTitle>
            <CredenzaDescription>
              {token}
              This action expire your session and you have to login back to
              access your dashboard.
            </CredenzaDescription>
          </CredenzaHeader>
          <div className="mb-2 flex flex-col gap-4">
            <Button
              className="w-full"
              disabled={loading}
              variant="destructive"
              onClick={logoutUser}
            >
              {loading ? "Processing.." : "Yes Logout"}
            </Button>
            <CredenzaClose className="w-full">Cancel</CredenzaClose>
          </div>
        </CredenzaContent>
      </Credenza>
    </>
  );
}
