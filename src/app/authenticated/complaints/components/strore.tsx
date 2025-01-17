"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchSelect from "@/components/ui/search-select";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { SelectInput } from "@/components/SelectInput";

type ApplianceType =
  | "AC"
  | "Washing Machine"
  | "Refrigerator"
  | "Oven"
  | "Microwave"
  | "Water Dispenser";
type ProductType =
  | "Indoor Unit"
  | "Outdoor Unit"
  | "Top Load"
  | "Front Load"
  | "Double Door"
  | "Single Door"
  | "Built-in"
  | "Counter Top"
  | "Bottom Load";

interface Part {
  id: number;
  name: string;
  quantity: number;
  used: boolean;
  appliance: ApplianceType;
  product: ProductType;
}

const PRODUCTS: Record<ApplianceType, ProductType[]> = {
  AC: ["Indoor Unit", "Outdoor Unit"],
  "Washing Machine": ["Top Load", "Front Load"],
  Refrigerator: ["Double Door", "Single Door"],
  Oven: ["Built-in", "Counter Top"],
  Microwave: ["Counter Top"],
  "Water Dispenser": ["Bottom Load", "Top Load"],
} as const;

const APPLIANCE_PARTS: Record<
  ApplianceType,
  Partial<Record<ProductType, string[]>>
> = {
  AC: {
    "Indoor Unit": ["Evaporator Coil", "Blower Motor", "PCB", "Display"],
    "Outdoor Unit": ["Compressor", "Condenser", "Fan Motor", "Capacitor"],
  },
  "Washing Machine": {
    "Top Load": ["Agitator", "Lid Switch", "Timer", "Drain Pump"],
    "Front Load": ["Door Lock", "Drum", "Shock Absorbers", "Belt"],
  },
  Refrigerator: {
    "Double Door": ["Compressor", "Defrost Timer", "Fan Motor", "Thermostat"],
    "Single Door": ["Compressor", "Door Seal", "Thermostat", "Shelf"],
  },
  Oven: {
    "Built-in": ["Heating Element", "Thermostat", "Control Panel", "Fan"],
    "Counter Top": ["Timer", "Heating Element", "Door Switch", "Tray"],
  },
  Microwave: {
    "Counter Top": ["Magnetron", "Turntable", "Door Switch", "Control Panel"],
  },
  "Water Dispenser": {
    "Bottom Load": ["Compressor", "Water Pump", "Cooling Tank", "Filter"],
    "Top Load": ["Tap", "Float Valve", "Water Tank", "Filter"],
  },
} as const;

const BRANDS = [
  "Samsung",
  "LG",
  "Haier",
  "Dawlance",
  "Orient",
  "PEL",
  "Gree",
  "Kenwood",
] as const;

type Brand = (typeof BRANDS)[number];

interface BrandPart {
  id: number;
  brand: Brand;
  appliance: ApplianceType;
  product: ProductType;
  part: string;
  quantity: number;
  isCustom?: boolean;
}

export default function Store() {
  const [parts, setParts] = useState<Part[]>([]);
  const [brandParts, setBrandParts] = useState<BrandPart[]>([]);

  const [selectedAppliance, setSelectedAppliance] =
    useState<ApplianceType>("AC");
  const [selectedProduct, setSelectedProduct] =
    useState<ProductType>("Indoor Unit");

  const [newPart, setNewPart] = useState<{
    name: string;
    quantity: number;
    appliance: ApplianceType;
    product: ProductType;
  }>({
    name: "",
    quantity: 0,
    appliance: selectedAppliance,
    product: selectedProduct,
  });

  const [newBrandPart, setNewBrandPart] = useState<{
    brand: string;
    appliance: ApplianceType;
    product: ProductType;
    part: string;
    quantity: number;
    isCustom: boolean;
  }>({
    brand: "",
    appliance: selectedAppliance,
    product: selectedProduct,
    part: "",
    quantity: 0,
    isCustom: false,
  });

  useEffect(() => {
    setNewPart(prev => ({
      ...prev,
      name: "", // Reset part name when appliance/product changes
      appliance: selectedAppliance,
      product: selectedProduct
    }));
  }, [selectedAppliance, selectedProduct]);

  useEffect(() => {
    setNewBrandPart(prev => ({
      ...prev,
      appliance: selectedAppliance,
      product: selectedProduct,
      part: "" // Reset part when appliance/product changes
    }));
  }, [selectedAppliance, selectedProduct]);

  const handleAddPart = () => {
    if (newPart.name && newPart.quantity > 0) {
      setParts([
        ...parts,
        {
          id: parts.length + 1,
          name: newPart.name,
          quantity: newPart.quantity,
          used: false,
          appliance: selectedAppliance,
          product: selectedProduct,
        },
      ]);
      setNewPart({
        name: "",
        quantity: 0,
        appliance: selectedAppliance,
        product: selectedProduct,
      });
    }
  };

  const handleAddBrandPart = () => {
    if (newBrandPart.brand && newBrandPart.part && newBrandPart.quantity > 0) {
      setBrandParts([
        ...brandParts,
        {
          id: brandParts.length + 1,
          brand: newBrandPart.brand as Brand,
          appliance: newBrandPart.appliance,
          product: newBrandPart.product,
          part: newBrandPart.part,
          quantity: newBrandPart.quantity,
          isCustom: newBrandPart.isCustom,
        },
      ]);
      setNewBrandPart({
        brand: "",
        appliance: selectedAppliance,
        product: selectedProduct,
        part: "",
        quantity: 0,
        isCustom: false,
      });
    }
  };

  return (
    <div className="space-y-6 p-4">
      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory">Store Inventory</TabsTrigger>
          <TabsTrigger value="brand-demands">Brand Part Demands</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-semibold">Parts Inventory</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPart();
              }}
              className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              
              <SelectInput
                options={
                  Object.keys(APPLIANCE_PARTS).map((appliance) => ({
                    label: appliance,
                    value: appliance,
                  })) || []
                }
                onChange={(value: string) =>
                  setSelectedAppliance(value as ApplianceType)
                }
                selected={selectedAppliance}
                label="Search Appliance"
              />

              <SelectInput
                options={
                  PRODUCTS[selectedAppliance]?.map((product) => ({
                    label: product,
                    value: product,
                  })) || []
                }
                onChange={(value: string) =>
                  setSelectedProduct(value as ProductType)
                }
                selected={selectedProduct}
                label="Search Type"
              />
              <SearchSelect
                value={newPart.name}
                onChange={(value: string) =>
                  setNewPart({ ...newPart, name: value })
                }
                options={
                  APPLIANCE_PARTS[selectedAppliance]?.[selectedProduct]?.map(
                    (part) => ({
                      label: part,
                      value: part,
                    }),
                  ) || []
                }
                label="Search parts"
                width="full"
              />

              <LabelInputContainer
                type="number"
                label="Quantity"
                min={0}
                value={newPart.quantity}
                onChange={(e) =>
                  setNewPart({
                    ...newPart,
                    quantity: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Enter quantity"
                className="w-full"
              />
              <br />
              <div className="flex items-center justify-end">
                <Button type="submit">Add</Button>
              </div>
            </form>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Appliance</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Part Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parts.map((part) => (
                    <TableRow key={part.id}>
                      <TableCell>{part.appliance}</TableCell>
                      <TableCell>{part.product}</TableCell>
                      <TableCell>{part.name}</TableCell>
                      <TableCell>{part.quantity}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={part.used}
                          onCheckedChange={() =>
                            setParts(
                              parts.map((p) =>
                                p.id === part.id ? { ...p, used: !p.used } : p,
                              ),
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            setParts(parts.filter((p) => p.id !== part.id))
                          }
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="brand-demands">
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-semibold">Brand Part Demands</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddBrandPart();
              }}
              className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="space-y-2">
                <SearchSelect
                  value={newBrandPart.brand}
                  onChange={(value: string) =>
                    setNewBrandPart({ ...newBrandPart, brand: value })
                  }
                  options={BRANDS.map((brand) => ({
                    label: brand,
                    value: brand,
                  }))}
                  label="Search brands"
                  width="full"
                />
              </div>

              <div className="space-y-2">
                <Label>Appliance Type</Label>
                <Select
                  value={newBrandPart.appliance}
                  onValueChange={(value: ApplianceType) => {
                    setNewBrandPart({
                      ...newBrandPart,
                      appliance: value,
                      product: PRODUCTS[value][0],
                      part: "", // Reset part when appliance changes
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Appliance" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(APPLIANCE_PARTS).map((appliance) => (
                      <SelectItem key={appliance} value={appliance}>
                        {appliance}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Product Type</Label>
                <Select
                  value={newBrandPart.product}
                  onValueChange={(value: ProductType) =>
                    setNewBrandPart({ 
                      ...newBrandPart, 
                      product: value,
                      part: "", // Reset part when product changes
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCTS[newBrandPart.appliance].map((product) => (
                      <SelectItem key={product} value={product}>
                        {product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                {newBrandPart.isCustom ? (
                  <div>
                    <Label>Custom Part Name</Label>
                    <Input
                      value={newBrandPart.part}
                      onChange={(e) =>
                        setNewBrandPart({
                          ...newBrandPart,
                          part: e.target.value,
                        })
                      }
                      placeholder="Enter custom part name"
                    />
                  </div>
                ) : (
                  <SearchSelect
                    value={newBrandPart.part}
                    onChange={(value: string) =>
                      setNewBrandPart({ ...newBrandPart, part: value })
                    }
                    options={
                      APPLIANCE_PARTS[newBrandPart.appliance]?.[
                        newBrandPart.product
                      ]?.map((part) => ({
                        label: part,
                        value: part,
                      })) || []
                    }
                    label="Search parts"
                    width="full"
                  />
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="custom-part"
                    checked={newBrandPart.isCustom}
                    onCheckedChange={(checked: boolean) =>
                      setNewBrandPart({
                        ...newBrandPart,
                        isCustom: checked,
                        part: "",
                      })
                    }
                  />
                  <Label htmlFor="custom-part">Custom part</Label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <LabelInputContainer
                    type="number"
                    label="Quantity"
                    min={0}
                    value={newBrandPart.quantity}
                    onChange={(e) =>
                      setNewBrandPart({
                        ...newBrandPart,
                        quantity: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Enter quantity"
                  />
                  <Button type="submit">Add</Button>
                </div>
              </div>
            </form>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Brand</TableHead>
                    <TableHead>Appliance</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Part Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Custom</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brandParts.map((part) => (
                    <TableRow key={part.id}>
                      <TableCell>{part.brand}</TableCell>
                      <TableCell>{part.appliance}</TableCell>
                      <TableCell>{part.product}</TableCell>
                      <TableCell>{part.part}</TableCell>
                      <TableCell>{part.quantity}</TableCell>
                      <TableCell>{part.isCustom ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            setBrandParts(
                              brandParts.filter((p) => p.id !== part.id),
                            )
                          }
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
