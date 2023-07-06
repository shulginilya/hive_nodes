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

export type ClustersArrayType = ClusterType[];

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

interface ClusterType {
    id: string;
    name: string;
    nodes: NodeType[];
};

export interface FetchClientsReturnType {
    nodeName: string;
    clientsData: ClientType[];
};

export interface FetchNodesReturnType {
    clusterId: string;
    nodesData: NodeType[];
};