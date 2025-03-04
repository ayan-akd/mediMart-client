import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  addressSelector,
  applyCoupon,
  citySelector,
  deliveryCostSelector,
  discountSelector,
  grandTotalSelector,
  IMedicineOrder,
  orderSelector,
  removeCoupon,
  subTotalSelector,
  updateAddress,
  updateCity,
  updatePrescription,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cities } from "@/constants/cities";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOrder } from "@/services/OrderService";

const urlPattern = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
);

export default function OrderSummaryCard({
  itemCarts,
}: {
  itemCarts: IMedicineOrder[];
}) {
  const dispatch = useAppDispatch();
  const subTotal = useAppSelector(subTotalSelector);
  const deliveryCost = useAppSelector(deliveryCostSelector);
  const order = useAppSelector(orderSelector);
  const cityOfOrder = useAppSelector(citySelector);
  const addressOfOrder = useAppSelector(addressSelector);
  const total = useAppSelector(grandTotalSelector);
  const discount = useAppSelector(discountSelector);
  const [couponCode, setCouponCode] = useState("");
  const {user} = useUser();
  const router = useRouter();
  const prescriptionExists = itemCarts.some(
    (item) => item.prescriptionRequired
  );
  const handlePrescription = (prescription: string) => {
    dispatch(updatePrescription(prescription));
  };
  const handleCitySelect = (city: string) => {
    dispatch(updateCity(city));
  };

  const handleShippingAddress = (address: string) => {
    dispatch(updateAddress(address));
  };

  const handleCoupon = () => {
    if (couponCode === "MEDI10") {
      dispatch(applyCoupon());
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code");
    }
  };
  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponCode("");
  };

  const handleOrder = async () => {
    const orderLoading = toast.loading("Placing Order...");
    try {
      if (!user) {
        router.push("/login");
        throw new Error("Please login to place order");
      }
      if (user.role === "admin") {
        throw new Error("Admin cannot place order");
      }
      if (!cityOfOrder) {
        throw new Error("Please select a city");
      }
      if (!addressOfOrder) {
        throw new Error("Please enter a delivery address");
      }
      if (prescriptionExists && !order.prescription) {
        throw new Error("Please upload prescription");
      }
      if (prescriptionExists && order.prescription) {
        if (!urlPattern.test(order.prescription)) {
          throw new Error("Please enter a valid image URL");
        }
      }
      
      const orderData = {
        ...order,
        prescription: prescriptionExists ? order.prescription : "",
        totalPrice: total,
        user: user._id,
      };
      const res = await createOrder(orderData);
      if (res.success) {
        toast.success("Order Placed Successfully", { id: orderLoading });
        setTimeout(() => {
          window.location.href = res.data.payment.checkout_url;
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold ">Order Summary</h2>

      {/* Coupon Code */}
      <div className="space-y-4 mb-6">
  <label className="font-medium">Coupon Code</label>
  <div className="flex gap-2 mt-2">
    <div className="relative flex-1">
      <Input 
        placeholder="Enter 'MEDI10' for 10% discount" 
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      {useAppSelector(state => state.cart.couponApplied) && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
          onClick={handleRemoveCoupon}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
    <Button onClick={handleCoupon}>Apply</Button>
  </div>
</div>

      {/* Delivery Address */}
      <div className="space-y-4 mb-6">
        <label className="font-medium">Delivery Address</label>
        <div className="space-y-2 mt-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between",
                  !cityOfOrder && "text-muted-foreground"
                )}
              >
                {cityOfOrder || "Select city"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search city..." />
                <CommandList>
                  <CommandEmpty>No city found.</CommandEmpty>
                  <CommandGroup>
                    {cities.map((city) => (
                      <CommandItem
                        key={city}
                        value={city}
                        onSelect={() => {
                          handleCitySelect(city);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            city === cityOfOrder ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {city}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Textarea
            className="mt-2"
            value={addressOfOrder}
            onChange={(e) => handleShippingAddress(e.target.value)}
            placeholder="Enter your detailed address"
          />
        </div>
      </div>

      {/* Prescription Upload */}
      {prescriptionExists && (
        <div className="space-y-4 mb-6">
          <label className="font-medium">Upload Prescription</label>
          <Input
            placeholder="Enter your prescription image link"
            className="mt-2"
            value={order.prescription}
            onChange={(e) => handlePrescription(e.target.value)}
          />
        </div>
      )}

      {/* Order Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">${subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-semibold">${deliveryCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
      <Button onClick={handleOrder} className="w-full">
        Order Now
      </Button>
    </Card>
  );
}
