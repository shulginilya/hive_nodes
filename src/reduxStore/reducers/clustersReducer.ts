import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";
import { makeRequest } from '@/utils/requestUtil';
import { RootState } from "@/reduxStore/store";
import {
    ClustersArrayType,
    HttpRequestStatus,
    FetchClientsReturnType,
    FetchNodesReturnType,
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
export const fetchClients = createAsyncThunk('clients/fetchClients', async (nodeName: string) => {
    const clientsData = await makeRequest({
        url: `/nodes/${nodeName}/clients`
    });
    return {
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
                const clusterKey = state.clustersData.findIndex(cluster => cluster.id === clusterId);
                if (clusterKey > -1) {
                    state.clustersData[clusterKey].nodes = nodesData;
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
                    nodeName
                } = action.payload;
                const nodeKey = state.clustersData[0].nodes.findIndex(node => node.name === nodeName);
                if (nodeKey > -1) {
                    state.clustersData[0].nodes[nodeKey].clients = clientsData;
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
