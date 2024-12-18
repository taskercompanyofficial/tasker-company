import React from "react";
import { Button, type ButtonProps } from "./button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface SubmitBtnProps extends ButtonProps {
  processing: boolean; // Adds a processing state
  label: string; // Adds a label for the button
}

const SubmitBtn: React.FC<SubmitBtnProps> = ({
  processing,
  label,
  ...props
}) => {
  return (
    <Button {...props} disabled={processing}>
      {processing ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default SubmitBtn;
