import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  User,
  FileText,
  Info,
} from "lucide-react";

export default function ViewComplaint({ complaint }: { complaint: any }) {
  return (
    <div className="space-y-6">
      <pre>{JSON.stringify(complaint, null, 2)}</pre>
     
    </div>
  );
}
