import React from 'https://esm.sh/react@18.2.0';

const PartTree = ({ data = {}, onSelect }) => {
  const renderNode = (node) => (
    <li key={node.id} className="ml-2">
      <button
        className="text-blue-600 hover:underline"
        onClick={() => onSelect && onSelect(node)}
      >
        {node.name}
      </button>
      {Array.isArray(node.children) && (
        <ul className="ml-4 list-disc">
          {node.children.map(renderNode)}
        </ul>
      )}
    </li>
  );

  return (
    <ul className="space-y-1">
      {Object.values(data).map((node) => renderNode(node))}
    </ul>
  );
};

export default PartTree;
