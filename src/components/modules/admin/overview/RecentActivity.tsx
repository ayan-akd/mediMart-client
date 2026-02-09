"use client";
import { TOrder } from "@/types";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  ShoppingCart 
} from "lucide-react";

interface RecentActivityProps {
  orders: TOrder[];
}

export default function RecentActivity({ orders }: RecentActivityProps) {
  const recentActivities = useMemo(() => {
    return orders
      .filter(order => order.status) // Filter out orders without status
      .sort((a, b) => new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime())
      .slice(0, 8)
      .map((order) => {
        let icon;
        let color;
        let action;

        // Use non-null assertion since we filtered out orders without status
        const status = order.status!;

        switch (status) {
          case "Processing":
            icon = <Clock className="h-4 w-4" />;
            color = "text-orange-500";
            action = "Order placed and being processed";
            break;
          case "Shipped":
            icon = <Truck className="h-4 w-4" />;
            color = "text-blue-500";
            action = "Order shipped";
            break;
          case "Delivered":
            icon = <CheckCircle className="h-4 w-4" />;
            color = "text-green-500";
            action = "Order delivered successfully";
            break;
          case "Cancelled":
          case "Failed":
            icon = <XCircle className="h-4 w-4" />;
            color = "text-red-500";
            action = `Order ${status.toLowerCase()}`;
            break;
          case "Pending":
            icon = <Clock className="h-4 w-4" />;
            color = "text-yellow-500";
            action = "Order pending";
            break;
          case "Paid":
            icon = <CheckCircle className="h-4 w-4" />;
            color = "text-green-500";
            action = "Payment completed";
            break;
          default:
            icon = <Package className="h-4 w-4" />;
            color = "text-gray-500";
            action = "Order status updated";
        }

        return {
          id: order._id,
          orderId: order.orderId,
          action,
          icon,
          color,
          status: status,
          date: new Date(order.createdAt as Date),
          amount: order.totalPrice,
          itemCount: order.medicines?.length || 0,
        };
      });
  }, [orders]);

  if (recentActivities.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        <div className="text-center">
          <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">No recent activity</p>
          <p className="text-xs">Your order activities will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className={`flex-shrink-0 ${activity.color}`}>
            {activity.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium">
                {activity.action}
              </p>
              <Badge variant="outline" className="text-xs">
                {activity.orderId}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {activity.itemCount} items • ${activity.amount.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.date.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
