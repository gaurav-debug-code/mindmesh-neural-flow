
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  addNode,
  updateNode,
  removeNode,
  addEdge,
  removeEdge,
  Node,
  Edge,
} from '../store/nodeSlice';

export const useNodes = () => {
  const dispatch = useDispatch();
  const { nodes, edges, loading, error } = useSelector((state: RootState) => state.nodes);

  const createNode = (nodeData: Omit<Node, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch(addNode(nodeData));
  };

  const editNode = (id: string, updates: Partial<Node>) => {
    dispatch(updateNode({ id, updates }));
  };

  const deleteNode = (id: string) => {
    dispatch(removeNode(id));
  };

  const createEdge = (edgeData: Omit<Edge, 'id'>) => {
    dispatch(addEdge(edgeData));
  };

  const deleteEdge = (id: string) => {
    dispatch(removeEdge(id));
  };

  return {
    nodes,
    edges,
    loading,
    error,
    createNode,
    editNode,
    deleteNode,
    createEdge,
    deleteEdge,
  };
};
