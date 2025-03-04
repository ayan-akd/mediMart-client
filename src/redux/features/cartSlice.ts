import { IMedicine } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IMedicineOrder extends IMedicine {
  orderQuantity: number;
}

interface InitialState {
  medicines: IMedicineOrder[];
  city: string;
  address: string;
  prescription?: string;
  couponApplied: boolean;
}
const initialState: InitialState = {
  medicines: [],
  city: "",
  address: "",
  prescription: "",
  couponApplied: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addMedicineToCart: (state, action) => {
      const medicineToAdd = state.medicines.find(
        (medicine) => medicine._id === action.payload._id
      );
      if (medicineToAdd && medicineToAdd.orderQuantity) {
        medicineToAdd.orderQuantity += 1;
        return;
      }
      state.medicines.push({ ...action.payload, orderQuantity: 1 });
    },
    incrementQuantity: (state, action) => {
      const medicineToIncrement = state.medicines.find(
        (medicine) => medicine._id === action.payload
      );

      if (
        medicineToIncrement &&
        medicineToIncrement.orderQuantity < medicineToIncrement.quantity
      ) {
        medicineToIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementQuantity: (state, action) => {
      const medicineToDecrement = state.medicines.find(
        (medicine) => medicine._id === action.payload
      );

      if (medicineToDecrement && medicineToDecrement.orderQuantity > 1) {
        medicineToDecrement.orderQuantity -= 1;
        return;
      }
    },
    removeMedicineFromCart: (state, action) => {
      state.medicines = state.medicines.filter(
        (medicine) => medicine._id !== action.payload
      );
    },
    applyCoupon: (state) => {
      state.couponApplied = true;
    },

    removeCoupon: (state) => {
      state.couponApplied = false;
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    updatePrescription: (state, action) => {
      state.prescription = action.payload;
    },
    clearCart: (state) => {
      state.medicines = [];
      state.city = "";
      state.address = "";
    },
  },
});

//medicines

export const orderedMedicineSelector = (state: RootState) => {
  return state.cart.medicines;
};

export const orderSelector = (state: RootState) => {
  return {
    medicines: state.cart.medicines.map((medicine) => ({
      medicine: medicine._id,
      quantity: medicine.orderQuantity,
    })),
    city: state.cart.city,
    address: state.cart.address,
    prescription: state.cart.prescription,
  };
};

//payment
export const subTotalSelector = (state: RootState) => {
  return state.cart.medicines.reduce(
    (acc, medicine) => acc + medicine.price * medicine.orderQuantity,
    0
  );
};

export const deliveryCostSelector = (state: RootState) => {
  if (
    state.cart.city &&
    state.cart.city === "Dhaka" &&
    state.cart.medicines.length > 0
  ) {
    return 60;
  } else if (
    state.cart.city &&
    state.cart.city !== "Dhaka" &&
    state.cart.medicines.length > 0
  ) {
    return 120;
  } else {
    return 0;
  }
};

export const discountSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  return state.cart.couponApplied ? subTotal * 0.1 : 0;
};

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = deliveryCostSelector(state);
  const discount = discountSelector(state);
  return subTotal + shippingCost - discount;
};

//address
export const citySelector = (state: RootState) => {
  return state.cart.city;
};

export const addressSelector = (state: RootState) => {
  return state.cart.address;
};

export const {
  addMedicineToCart,
  incrementQuantity,
  decrementQuantity,
  removeMedicineFromCart,
  updateCity,
  updateAddress,
  clearCart,
  updatePrescription,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
