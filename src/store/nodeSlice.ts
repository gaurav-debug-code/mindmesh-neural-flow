
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Node {
  id: string;
  title: string;
  description: string;
  category: string;
  position: [number, number, number];
  createdAt: string;
  updatedAt: string;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

interface NodeState {
  nodes: Node[];
  edges: Edge[];
  loading: boolean;
  error: string | null;
}

const initialState: NodeState = {
  nodes: [],
  edges: [],
  loading: false,
  error: null,
};

export const nodeSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Omit<Node, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newNode: Node = {
        ...action.payload,
        id: `node-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.nodes.push(newNode);
    },
    updateNode: (state, action: PayloadAction<{ id: string, updates: Partial<Node> }>) => {
      const { id, updates } = action.payload;
      const index = state.nodes.findIndex(node => node.id === id);
      if (index !== -1) {
        state.nodes[index] = {
          ...state.nodes[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
      state.edges = state.edges.filter(
        edge => edge.source !== action.payload && edge.target !== action.payload
      );
    },
    addEdge: (state, action: PayloadAction<Omit<Edge, 'id'>>) => {
      const newEdge: Edge = {
        ...action.payload,
        id: `edge-${Date.now()}`,
      };
      state.edges.push(newEdge);
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      state.edges = state.edges.filter(edge => edge.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addNode,
  updateNode,
  removeNode,
  addEdge,
  removeEdge,
  setLoading,
  setError,
} = nodeSlice.actions;

export default nodeSlice.reducer;
