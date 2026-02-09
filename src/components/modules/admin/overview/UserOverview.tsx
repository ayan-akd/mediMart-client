"use client";
import { TOrder } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ShoppingCart,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Heart,
  Star,
  Calendar,
} from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserSpendingChart from "./UserSpendingChart";
import UserOrderStatusChart from "./UserOrderStatusChart";
import FavoriteMedicines from "./FavoriteMedicines";
import RecentActivity from "./RecentActivity";

interface UserOverviewProps {
  orders: TOrder[];
}

export default function UserOverview({ orders }: UserOverviewProps) {

  // Calculate user statistics
  const stats = useMemo(() => {
  const totalOrders = orders.length;
  const totalSpent = orders
    .filter(order => order.status === "Delivered")
    .reduce((sum, order) => sum + order.totalPrice, 0);

  const pendingOrders = orders.filter(order => 
    order.status === "Processing" || order.status === "Pending"
  ).length;
  const deliveredOrders = orders.filter(order => order.status === "Delivered").length;
  const cancelledOrders = orders.filter(order => 
    order.status === "Cancelled" || order.status === "Failed"
  ).length;

  const totalMedicinesBought = orders
    .filter(order => order.status === "Delivered")
    .reduce((sum, order) => {
      return sum + (order.medicines?.reduce((medicineSum, med) => medicineSum + med.quantity, 0) || 0);
    }, 0);

  // Calculate average order value
  const avgOrderValue = deliveredOrders > 0 ? totalSpent / deliveredOrders : 0;

  // Get recent order (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentOrders = orders.filter(order => 
    order.createdAt && new Date(order.createdAt as Date) > thirtyDaysAgo
  ).length;

  // Calculate savings (mock data - could be based on discounts)
  const totalSavings = totalSpent * 0.15; // Assume 15% average savings

  return {
    totalOrders,
    totalSpent,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,
    totalMedicinesBought,
    avgOrderValue,
    recentOrders,
    totalSavings,
  };
}, [orders]);

  // Recent orders for table
  const recentOrders = useMemo(() => {
    return orders
      .sort((a, b) => new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime())
      .slice(0, 5);
  }, [orders]);


  return (
    <div className="space-y-6">

      {/* Main Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {stats.recentOrders} in last 30 days
            </div>
          </CardContent>
        </Card>

        {/* Total Spent */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              Avg: ${stats.avgOrderValue.toFixed(2)} per order
            </div>
          </CardContent>
        </Card>

        {/* Medicines Bought */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medicines Bought</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMedicinesBought}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Heart className="h-3 w-3 mr-1 text-red-500" />
              Health items purchased
            </div>
          </CardContent>
        </Card>

        {/* Savings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${stats.totalSavings.toFixed(2)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              From discounts & offers
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Being processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered Orders</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deliveredOrders}</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled Orders</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cancelledOrders}</div>
            <p className="text-xs text-muted-foreground">
              Cancelled or failed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Your Spending Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <UserSpendingChart orders={orders} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <UserOrderStatusChart orders={orders} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Your Favorite Medicines</CardTitle>
          </CardHeader>
          <CardContent>
            <FavoriteMedicines orders={orders} />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity orders={orders} />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/shop">
              <Button className="w-full h-20 flex flex-col items-center justify-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                <span>Browse Medicines</span>
              </Button>
            </Link>
            <Link href="/dashboard/user/orders">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
                <Package className="h-6 w-6" />
                <span>View All Orders</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                <span>View Cart</span>
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
                <Heart className="h-6 w-6" />
                <span>Update Profile</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Link href="/dashboard/user/orders">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Processing"
                            ? "secondary"
                            : order.status === "Shipped"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.medicines.length} items</TableCell>
                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt as Date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-4">
                Start shopping for medicines to see your orders here.
              </p>
              <Link href="/shop">
                <Button>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
