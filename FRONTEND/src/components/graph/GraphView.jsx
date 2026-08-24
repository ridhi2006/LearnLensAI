import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Play,
  MessageSquare,
  X,
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { MOCK_KNOWLEDGE_GRAPH } from '../../data/mockKnowledgeGraph';
import { useLearning } from '../../context/LearningContext';
import { useToast } from '../../context/ToastContext';

// Custom Node Component
const CustomNode = ({ data, selected }) => {
  const isCenter = data.status === 'main';
  const isWeak = data.status === 'weak';
  const isNext = data.status === 'recommended';

  return (
    <div
      className={`px-4 py-2.5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-xl text-center select-none min-w-[140px] ${
        isCenter
          ? 'bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-lightViolet text-white border-brand-lightViolet/60 shadow-brand-indigo/30'
          : isWeak
          ? 'bg-dark-800 border-amber-500 text-amber-300 shadow-amber-500/10'
          : isNext
          ? 'bg-dark-800 border-brand-cyan text-cyan-300 shadow-brand-cyan/10'
          : 'bg-dark-800 border-slate-700 text-text-primary hover:border-slate-500'
      } ${selected ? 'ring-2 ring-brand-indigo ring-offset-2 ring-offset-dark-900 scale-105' : ''}`}
    >
      <Handle type="target" position={Position.Top} className="!bg-brand-indigo !w-2 !h-2" />
      <div className="flex items-center justify-center gap-1 mb-0.5">
        {isWeak && <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />}
        {isNext && <CircleDot className="w-3 h-3 text-brand-cyan shrink-0" />}
        {!isWeak && !isNext && !isCenter && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
        <span className="text-[10px] uppercase font-mono tracking-wider opacity-75">
          {data.badge}
        </span>
      </div>
      <div className="text-xs font-bold truncate">{data.label}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-brand-violet !w-2 !h-2" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const GraphView = ({ videoId = 'demo-binary-search', onTabChange }) => {
  const initialData = MOCK_KNOWLEDGE_GRAPH[videoId] || MOCK_KNOWLEDGE_GRAPH['demo-binary-search'];
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);
  
  const [selectedNodeData, setSelectedNodeData] = useState(
    initialData.details['node-lower-bound']
  );

  const { jumpToTimestamp } = useLearning();
  const { showToast } = useToast();

  const onNodeClick = useCallback(
    (event, node) => {
      const details = initialData.details[node.id];
      if (details) {
        setSelectedNodeData(details);
      }
    },
    [initialData]
  );

  const handleJumpToVideo = (ts) => {
    jumpToTimestamp(ts, 'overview');
    showToast({
      title: `Jumped to timestamp ${ts}`,
      message: `Now playing video at ${selectedNodeData.title} concept section.`,
      type: 'info'
    });
  };

  const handleAskAI = (topic) => {
    if (onTabChange) {
      onTabChange('tutor');
    }
  };

  return (
    <div className="relative h-[680px] rounded-2xl border border-slate-800 bg-dark-950 overflow-hidden shadow-2xl">
      {/* Top Helper Bar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <div className="px-3 py-1.5 rounded-xl bg-dark-800/90 backdrop-blur-md border border-slate-800 text-xs text-text-secondary flex items-center gap-2 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Click any node to explore its definition, code example & video timestamp.</span>
        </div>
      </div>

      {/* Legend Badge Bar */}
      <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 p-1.5 rounded-xl bg-dark-900/90 border border-slate-800 text-[11px] backdrop-blur-md">
        <span className="flex items-center gap-1 px-2 py-0.5 rounded text-brand-lightViolet font-medium">
          <span className="w-2 h-2 rounded-full bg-brand-indigo" /> Core
        </span>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Mastered
        </span>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded text-amber-300 font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> Needs Revision
        </span>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded text-cyan-300 font-medium">
          <span className="w-2 h-2 rounded-full bg-brand-cyan" /> Next Up
        </span>
      </div>

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background color="#1E293B" gap={20} size={1} />
        <Controls className="!bg-dark-800 !border-slate-700 text-text-primary" />
      </ReactFlow>

      {/* Slide-out Right Detail Panel */}
      <AnimatePresence>
        {selectedNodeData && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-4 right-4 bottom-4 w-80 sm:w-96 z-20 overflow-y-auto"
          >
            <Card padding="lg" className="h-full bg-dark-800/95 border-brand-indigo/40 shadow-2xl backdrop-blur-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-text-muted">Concept Details</span>
                    <h3 className="text-lg font-bold text-text-primary font-heading">
                      {selectedNodeData.title}
                    </h3>
                  </div>
                  <Badge
                    variant={
                      selectedNodeData.statusType === 'weak'
                        ? 'warning'
                        : selectedNodeData.statusType === 'recommended'
                        ? 'cyan'
                        : selectedNodeData.statusType === 'main'
                        ? 'primary'
                        : 'success'
                    }
                    size="sm"
                    dot
                  >
                    {selectedNodeData.status}
                  </Badge>
                </div>

                {/* Definition */}
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                    Definition
                  </span>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {selectedNodeData.definition}
                  </p>
                </div>

                {/* Explanation */}
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                    Algorithmic Logic
                  </span>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {selectedNodeData.explanation}
                  </p>
                </div>

                {/* Code / Math Example */}
                {selectedNodeData.example && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Concrete Trace
                    </span>
                    <pre className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-[11px] font-mono text-text-primary overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {selectedNodeData.example}
                    </pre>
                  </div>
                )}

                {/* Timestamp reference */}
                <div className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between text-xs text-text-muted">
                  <span>Video Location:</span>
                  <span className="font-mono font-bold text-brand-lightViolet">{selectedNodeData.timestamp}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2.5">
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                  onClick={() => handleAskAI(selectedNodeData.title)}
                >
                  Ask AI
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Play className="w-3.5 h-3.5 text-red-400" />}
                  onClick={() => handleJumpToVideo(selectedNodeData.timestamp)}
                >
                  Jump to {selectedNodeData.timestamp}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
