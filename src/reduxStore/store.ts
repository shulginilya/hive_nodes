import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import clustersReducer from "@/reduxStore/reducers/clustersReducer";

export const store = configureStore({
    reducer: {
        clusters: clustersReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
