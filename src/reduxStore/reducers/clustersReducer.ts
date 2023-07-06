import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";
import { makeRequest } from '@/utils/requestUtil';
import { RootState } from "@/reduxStore/store";
import {
    ClusterObjectsType,
    HttpRequestStatus,
    FetchClientsReturnType,
    FetchNodesReturnType,
    FetchClientsParamsType,
} from "@/types";

/*
    State structure definition
*/
const clusters: ClusterObjectsType = {
    'cluster_1': {
        name: 'Cluster 1',
        nodes: []
    },
    'cluster_2': {
        name: 'Cluster Empty',
        nodes: []
    }
};
interface initialStateType {
    clustersData: ClusterObjectsType,
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
export const fetchNodes = createAsyncThunk('nodes/fetchNodes', async (clusterId: string) => {
    const nodesData = await makeRequest({
        url: '/nodes'
    });
    return {
        clusterId,
        nodesData
    }
});

/*
    Load clients from the server
*/
export const fetchClients = createAsyncThunk('clients/fetchClients', async (data: FetchClientsParamsType) => {
    const {
        clusterId,
        nodeName,
    } = data;
    const clientsData = await makeRequest({
        url: `/nodes/${nodeName}/clients`
    });
    return {
        clusterId,
        nodeName,
        clientsData
    };
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
            .addCase(fetchNodes.fulfilled, (state, action: PayloadAction<FetchNodesReturnType>) => {
                state.status = HttpRequestStatus.succeeded;
                const {
                    nodesData,
                    clusterId
                } = action.payload;
                if (state.clustersData[clusterId]) {
                    state.clustersData[clusterId].nodes = nodesData;
                }
            })
            .addCase(fetchNodes.rejected, (state) => {
                state.status = HttpRequestStatus.failed;
                state.error = 'api error';
            })
            .addCase(fetchClients.pending, (state) => {
                state.status = HttpRequestStatus.loading;
            })
            .addCase(fetchClients.fulfilled, (state, action: PayloadAction<FetchClientsReturnType>) => {
                state.status = HttpRequestStatus.succeeded;
                const {
                    clientsData,
                    nodeName,
                    clusterId,
                } = action.payload;
                if (state.clustersData[clusterId]) {
                    const nodeKey = state.clustersData[clusterId].nodes.findIndex(node => node.name === nodeName);
                    if (nodeKey > -1) {
                        state.clustersData[clusterId].nodes[nodeKey].clients = clientsData;
                    }
                }
            })
            .addCase(fetchClients.rejected, (state) => {
                state.status = HttpRequestStatus.failed;
                state.error = 'api error';
            })
    }
});

export const selectData = (state: RootState) => state.clusters;

export default clustersReducer.reducer;
