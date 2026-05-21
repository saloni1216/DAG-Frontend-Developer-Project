from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
from collections import deque

app = FastAPI()

# FIX 1: CORS Middleware (Iske bina connection failed aayega)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'message': 'Backend is running!'}


@app.post('/pipelines/parse')
def parse_pipeline(nodes: List[Dict[str, Any]] = Body(...), edges: List[Dict[str, Any]] = Body(...)):
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # DAG Logic (Kahn's Algorithm)
    adj = {node['id']: [] for node in nodes}
    in_degree = {node['id']: 0 for node in nodes}
    for edge in edges:
        u, v = edge['source'], edge['target']
        if u in adj and v in in_degree:
            adj[u].append(v)
            in_degree[v] += 1
            
    queue = deque([n for n in in_degree if in_degree[n] == 0])
    visited_count = 0
    while queue:
        u = queue.popleft()
        visited_count += 1
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0: queue.append(v)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': visited_count == num_nodes
    }