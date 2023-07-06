export enum HttpRequestStatus {
    idle = 'idle',
    loading = 'loading',
    succeeded = 'succeeded',
    failed = 'failed'
};

enum NodeState {
    running = 'RUNNING',
    error = 'ERROR',
};

export type ClusterObjectsType = {
    [key: string]: ClusterType
};

export interface NodeType {
    name: string;
    state: NodeState.running | NodeState.error;
    metrics: {
        msgSec: string;
        uptime: number;
        connectedClients: number;
    };
    clients: ClientType[];
};

export interface ClientType {
    clientId: string;
    connectedNode: string;
    metaData: {
        clientIp: string;
    }
};

export interface ClusterType {
    name: string;
    nodes: NodeType[];
};

export interface FetchClientsReturnType {
    clusterId: string;
    nodeName: string;
    clientsData: ClientType[];
};

export interface FetchNodesReturnType {
    clusterId: string;
    nodesData: NodeType[];
};

export interface FetchClientsParamsType {
    clusterId: string;
    nodeName: string;
};