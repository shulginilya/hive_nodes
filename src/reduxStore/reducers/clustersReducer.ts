import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";
import { makeRequest } from '@/utils/requestUtil';
import { RootState } from "@/reduxStore/store";
import {
    ClustersArrayType,
    NodeType,
    HttpRequestStatus,
} from "@/types";

/*
    State structure definition
*/
const clusters: ClustersArrayType = [
    {
        id: 'cluster_1',
        name: 'Cluster 1',
        nodes: []
    }
];
interface initialStateType {
    clustersData: ClustersArrayType,
    status: HttpRequestStatus.idle | HttpRequestStatus.loading | HttpRequestStatus.succeeded | HttpRequestStatus.failed,
    error: string | null;
};
const initialState: initialStateType = {
    clustersData: clusters,
    status: HttpRequestStatus.idle,
    error: null,
};

/*
    Load nodes from the server
*/
export const fetchNodes = createAsyncThunk('nodes/fetchNodes', async () => {
    const nodesData = await makeRequest({
        url: '/nodes'
    });
    return nodesData;
});

/*
    Reducer definition
*/
export const clustersReducer = createSlice({
    name: "clusters",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchNodes.pending, (state) => {
                state.status = HttpRequestStatus.loading;
            })
            .addCase(fetchNodes.fulfilled, (state, action: PayloadAction<NodeType[]>) => {
                state.status = HttpRequestStatus.succeeded;
                const nodes = action.payload;
                state.clustersData[0].nodes = nodes;
            })
            .addCase(fetchNodes.rejected, (state) => {
                state.status = HttpRequestStatus.failed;
                state.error = 'api error';
            })
    }
});

export const selectData = (state: RootState) => state.clusters;

export default clustersReducer.reducer;
