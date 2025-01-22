"use client";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextareaInput } from "@/components/TextareaInput";

interface VisitDetails {
  visitType: string;
  duration: string;
  partsReplaced: string[];
}

interface User {
  name: string;
  avatar?: string;
  role: string;
}

interface Remark {
  id: string;
  type: "technician" | "cso" | "customer";
  user: User;
  content: string;
  timestamp: string;
  visitDetails?: VisitDetails;
}

export default function Remarks() {
  const [newRemark, setNewRemark] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [reviewReason, setReviewReason] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const session = useSession();
  const token = session.data?.user?.token || "";

  const dummyRemarks: Remark[] = [
    {
      id: "1",
      type: "technician",
      user: {
        name: "John Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        role: "Senior Technician",
      },
      content:
        "Initial diagnosis complete. Found faulty power supply unit that needs replacement.",
      timestamp: "2024-02-15 09:30 AM",
      visitDetails: {
        visitType: "Initial Diagnosis",
        duration: "45 minutes",
        partsReplaced: [],
      },
    },
    {
      id: "2",
      type: "technician",
      user: {
        name: "John Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        role: "Senior Technician",
      },
      content:
        "Replaced power supply unit and performed system tests. All functions working normally.",
      timestamp: "2024-02-16 02:15 PM",
      visitDetails: {
        visitType: "Repair",
        duration: "1.5 hours",
        partsReplaced: ["Power Supply Unit"],
      },
    },
    {
      id: "3",
      type: "cso",
      user: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        role: "Customer Service",
      },
      content:
        "Called customer for feedback. Customer confirmed device is working properly.",
      timestamp: "2024-02-17 11:45 AM",
    },
  ];

  const handleAddRemark = async () => {
    try {
      if (!newRemark.trim()) {
        toast.error("Please enter a remark");
        return;
      }
      toast.success("Remark added successfully");
      setNewRemark("");
    } catch (error) {
      toast.error("Failed to add remark");
      console.error(error);
    }
  };

  const handleEditRemark = async (id: string) => {
    try {
      if (!editContent.trim()) {
        toast.error("Please enter a remark");
        return;
      }
      toast.success("Remark updated successfully");
      setEditingId(null);
      setEditContent("");
    } catch (error) {
      toast.error("Failed to update remark");
      console.error(error);
    }
  };

  const handleSubmitReview = () => {
    if (!selectedRating) {
      toast.error("Please select a rating");
      return;
    }
    if (selectedRating <= 8 && !reviewReason) {
      toast.error("Please provide a reason for the low rating");
      return;
    }
    toast.success("Review submitted successfully");
  };

  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="all" className="flex flex-col sm:flex-row gap-4 h-[500px]">
        <TabsList className="flex md:h-full min-w-[120px] md:min-w-[200px] flex-row sm:flex-col justify-start space-y-2 bg-gray-100">
          <TabsTrigger value="all" className="w-full justify-start text-sm md:text-base">
            All Remarks
          </TabsTrigger>
          <TabsTrigger value="technician" className="w-full justify-start text-sm md:text-base">
            Technician Visits
          </TabsTrigger>
          <TabsTrigger value="cso" className="w-full justify-start text-sm md:text-base">
            CSO Remarks
          </TabsTrigger>
          <TabsTrigger value="review" className="w-full justify-start text-sm md:text-base">
            Customer Review
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-1 bg-gray-100 p-2 rounded border border-gray-200 h-[500px]">
          <TabsContent value="all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">All Remarks & Updates</h2>
                <span className="text-sm text-muted-foreground">
                  {dummyRemarks.length} entries
                </span>
              </div>

              <Separator />

              <TextareaInput
                placeholder="Add your remark..."
                value={newRemark}
                onChange={(e) => setNewRemark(e.target.value)}
                className="w-full flex-1"
              />
              <Button onClick={handleAddRemark}>Add Remark</Button>

              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyRemarks.map((remark) => (
                      <TableRow key={remark.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={remark.user.avatar} />
                              <AvatarFallback>
                                {remark.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {remark.user.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {remark.user.role}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs capitalize">
                            {remark.type}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-md">
                          {editingId === remark.id ? (
                            <div className="flex gap-2">
                              <LabelInputContainer
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                onClick={() => handleEditRemark(remark.id)}
                              >
                                Save
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setEditingId(null);
                                  setEditContent("");
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <p>{remark.content}</p>
                              {remark.visitDetails && (
                                <div className="mt-1 text-xs text-muted-foreground">
                                  <p>
                                    Visit Type: {remark.visitDetails.visitType}
                                  </p>
                                  <p>
                                    Duration: {remark.visitDetails.duration}
                                  </p>
                                  {remark.visitDetails.partsReplaced.length >
                                    0 && (
                                    <p>
                                      Parts Replaced:{" "}
                                      {remark.visitDetails.partsReplaced.join(
                                        ", ",
                                      )}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {remark.timestamp}
                        </TableCell>
                        <TableCell>
                          {editingId !== remark.id && (
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setEditingId(remark.id);
                                setEditContent(remark.content);
                              }}
                            >
                              Edit
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="technician">
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 text-lg font-semibold">
                Technician Visit History
              </h3>
              {dummyRemarks
                .filter((remark) => remark.type === "technician")
                .map((remark) => (
                  <div
                    key={remark.id}
                    className="mb-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={remark.user.avatar} />
                          <AvatarFallback>
                            {remark.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{remark.user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {remark.timestamp}
                          </p>
                        </div>
                      </div>
                      {remark.visitDetails && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                          {remark.visitDetails.visitType}
                        </span>
                      )}
                    </div>
                    <p className="mt-2">{remark.content}</p>
                    {remark.visitDetails && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>Duration: {remark.visitDetails.duration}</p>
                        {remark.visitDetails.partsReplaced.length > 0 && (
                          <p>
                            Parts Replaced:{" "}
                            {remark.visitDetails.partsReplaced.join(", ")}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="cso">
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 text-lg font-semibold">
                Customer Service Updates
              </h3>
              {dummyRemarks
                .filter((remark) => remark.type === "cso")
                .map((remark) => (
                  <div
                    key={remark.id}
                    className="mb-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-900"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={remark.user.avatar} />
                        <AvatarFallback>
                          {remark.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{remark.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {remark.timestamp}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2">{remark.content}</p>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="review">
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 text-lg font-semibold">Customer Review</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Rating
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className={`h-10 w-10 rounded-full border-2 transition-colors ${
                          selectedRating === rating
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-blue-500"
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedRating <= 8 && selectedRating > 0 && (
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Please tell us why:
                    </label>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead>Selection</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Primary Reason</TableCell>
                          <TableCell>
                            <select
                              className="w-full rounded-md border border-gray-300 p-2"
                              value={reviewReason}
                              onChange={(e) => setReviewReason(e.target.value)}
                            >
                              <option value="">Select a reason</option>
                              <option value="service-quality">
                                Service Quality
                              </option>
                              <option value="response-time">
                                Response Time
                              </option>
                              <option value="technician-behavior">
                                Technician Behavior
                              </option>
                              <option value="price">Price</option>
                              <option value="other">Other</option>
                            </select>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Additional Comments
                  </label>
                  <textarea
                    className="w-full rounded-md border border-gray-300 p-2"
                    rows={3}
                    placeholder="Please provide any additional feedback..."
                    value={additionalComments}
                    onChange={(e) => setAdditionalComments(e.target.value)}
                  />
                </div>

                <Button onClick={handleSubmitReview} className="w-full">
                  Submit Review
                </Button>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
