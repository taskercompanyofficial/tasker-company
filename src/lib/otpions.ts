export const getRoleOptions = [
  { value: "branch-manager", label: "Branch Manager" },
  { value: "technician", label: "Technician" },
  { value: "accountant", label: "Accountant" },
  { value: "receptionist", label: "Receptionist" },
  { value: "driver", label: "Driver" },
  { value: "sales-manager", label: "Sales Manager" },
  { value: "sales-executive", label: "Sales Executive" },
  { value: "sales-assistant", label: "Sales Assistant" },
  { value: "cso", label: "CSO" },
  { value: "csr", label: "CSR" },
];

export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "paused", label: "Paused" },
];
export const ComplaintStatusOptions = [
  { value: "open", label: "Open", color: "255, 159, 67" },
  { value: "part-demand", label: "Part Demand", color: "234, 84, 85" },
  { value: "service-lifting", label: "Service Lifting", color: "46, 204, 113" },
  { value: "party-lifting", label: "Party Lifting", color: "52, 152, 219" },
  { value: "unit-in-service-center", label: "Unit in Service Center", color: "155, 89, 182" },
  { value: "installation-pending", label: "Installation Pending", color: "230, 126, 34" },
  { value: "in-progress", label: "In Progress", color: "241, 196, 15" },
  { value: "delivered", label: "Delivered", color: "26, 188, 156" },
  { value: "close-pending-by-brand", label: "Closing Pending by Brand", color: "231, 76, 60" },
  { value: "feedback-pending", label: "Feedback Pending", color: "149, 165, 166" },
  { value: "completed", label: "Completed", color: "39, 174, 96" },
  { value: "closed", label: "Closed", color: "41, 128, 185" },
  { value: "cancelled", label: "Cancelled", color: "192, 57, 43" }
];

export const warrantyTypeOptions = [
  { value: "warrenty-card", label: "Warrenty Card" },
  { value: "jobsheet", label: "Jobsheet" },
  { value: "invoice", label: "Invoice" },
  { value: "delivery-challan", label: "Delivery Challan" },
  { value: "service-challan", label: "Service Challan" },
  { value: "defective-part", label: "Defective Part" },
  { value: "defective-picture", label: "Defective Picture" },
  { value: "indoor", label: "Indoor" },
  { value: "outdoor", label: "Outdoor" },
  { value: "ind-sr", label: "Ind-SR" },
  { value: "out-sr", label: "Out-SR" },
];

export const complaintTypeOptions = [
  // Free Installation, paid installation, warranty, revenue, serivce, warrenty+revenue, others
  { value: "free-installation", label: "Free Installation",  },
  { value: "paid-installation", label: "Paid Installation" },
  { value: "warranty", label: "Warranty" },
  { value: "revenue", label: "Revenue" },
  { value: "service", label: "Service" },
  { value: "warrenty-revenue", label: "Warrenty+Revenue" },
  { value: "other", label: "Other" },
];
