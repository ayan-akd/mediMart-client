import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IMedicine } from "@/types";
import { getLowStockMedicines } from "@/services/medicines";

interface Notification {
  id: string;
  message: string;
  medicine: IMedicine;
  read: boolean; // Track if the notification is read
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

// Async thunk to fetch low-stock medicines
export const fetchLowStockMedicines = createAsyncThunk(
  "notification/fetchLowStockMedicines",
  async () => {
    const medicines: IMedicine[] = await getLowStockMedicines();

    return medicines.map((medicine) => ({
      id: medicine._id as string,
      message: `Stock is low for ${medicine.name} (${medicine.quantity} left).`,
      medicine,
      read: false, // Default to unread
    }));
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    markAllAsRead: (state) => {
      state.notifications.forEach((notif) => {
        notif.read = true;
      });
      state.unreadCount = 0; // Reset unread count when all are marked as read
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLowStockMedicines.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.length;
    });
  },
});

export const { markAllAsRead } = notificationSlice.actions;

export const notificationsSelector = (state: RootState) =>
  state.notification.notifications;
export const unreadCountSelector = (state: RootState) =>
  state.notification.unreadCount;

export default notificationSlice.reducer;
