import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppStore } from "./store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export const useAppDispatch = useDispatch.withTypes<ThunkDispatch<RootState, any, AnyAction>>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
