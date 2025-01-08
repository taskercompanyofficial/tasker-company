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
  { value: "open", label: "Open" },
  { value: "part-demand", label: "Part Demand" },
  { value: "service-lifting", label: "Service Lifting" },
  { value: "party-lifting", label: "Party Lifting" },
  { value: "unit-in-service-center", label: "Unit in service center" },
  { value: "installation-pending", label: "Installation Pending" },
  { value: "in-progress", label: "In Process" },
  { value: "deliverd", label: "Deliverd" },
  { value: "close-pending-by-brand", label: "Closing Pending by Brand" },
  { value: "feedback-pending", label: "Feedback Pending" },
  { value: "completed", label: "Completed" },
  { value: "closed", label: "Closed" },
  { value: "cancelled", label: "Cancelled" },
];

export const warrantyTypeOptions = [
  { value: "warrenty-card", label: "Warrenty Card" },
  { value: "jobsheet", label: "Jobsheet" },
  { value: "invoice", label: "Invoice" },
  { value: "delivery-challan", label: "Delivery Challan" },
  { value: "service-challan", label: "Service Challan" },
  { value: "defective-part", label: "Defective Part" },
  { value: "indoor", label: "Indoor" },
  { value: "outdoor", label: "Outdoor" },
  { value: "ind-sr", label: "Ind-SR" },
  { value: "out-sr", label: "Out-SR" },
];

export const complaintTypeOptions = [
  // Free Installation, paid installation, warranty, revenue, serivce, warrenty+revenue, others
  { value: "free-installation", label: "Free Installation" },
  { value: "paid-installation", label: "Paid Installation" },
  { value: "warranty", label: "Warranty" },
  { value: "revenue", label: "Revenue" },
  { value: "service", label: "Service" },
  { value: "warrenty-revenue", label: "Warrenty+Revenue" },
  { value: "other", label: "Other" },
];
