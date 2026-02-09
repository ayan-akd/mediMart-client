"use client";
import { IMedicine, TOrder, IUser } from "@/types";
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
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useMemo } from "react";
import RevenueChart from "./RevenueChart";
import OrderStatusChart from "./OrderStatusChart";
import CategoryDistribution from "./CategoryDistribution";
import TopMedicines from "./TopMedicines";

interface AdminOverviewProps {
  medicines: IMedicine[];
  orders: TOrder[];
  users: IUser[];
}

export default function AdminOverview({ medicines, orders, users }: AdminOverviewProps) {
  // Calculate statistics
  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter(order => order.status === "Delivered")
      .reduce((sum, order) => sum + order.totalPrice, 0);

    const totalOrders = orders.length;
    const totalUsers = users.length;
    const totalMedicines = medicines.length;

    const lowStockMedicines = medicines.filter(medicine => medicine.quantity < 10).length;
    const outOfStockMedicines = medicines.filter(medicine => medicine.quantity === 0).length;

    const pendingOrders = orders.filter(order => order.status === "Processing").length;
    const deliveredOrders = orders.filter(order => order.status === "Delivered").length;

    const activeUsers = users.filter(user => user.status === "active").length;
    const blockedUsers = users.filter(user => user.status === "blocked").length;

    // Calculate growth (mock data - in real app, compare with previous period)
    const revenueGrowth = 12.5; // Mock percentage
    const orderGrowth = 8.3;
    const userGrowth = 15.2;

    return {
      totalRevenue,
      totalOrders,
      totalUsers,
      totalMedicines,
      lowStockMedicines,
      outOfStockMedicines,
      pendingOrders,
      deliveredOrders,
      activeUsers,
      blockedUsers,
      revenueGrowth,
      orderGrowth,
      userGrowth,
    };
  }, [medicines, orders, users]);

  // Recent orders for table
  const recentOrders = useMemo(() => {
    return orders
      .sort((a, b) => new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime())
      .slice(0, 5);
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{stats.revenueGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{stats.orderGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{stats.userGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        {/* Total Medicines */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Medicines</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMedicines}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <AlertTriangle className="h-3 w-3 mr-1 text-orange-500" />
              {stats.lowStockMedicines} low stock items
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
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
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.blockedUsers} blocked users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.outOfStockMedicines}</div>
            <p className="text-xs text-muted-foreground">
              Need restocking
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart orders={orders} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderStatusChart orders={orders} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Medicine Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryDistribution medicines={medicines} />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Top Selling Medicines</CardTitle>
          </CardHeader>
          <CardContent>
            <TopMedicines orders={orders} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>{order.user?.name || 'N/A'}</TableCell>
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
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt as Date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
