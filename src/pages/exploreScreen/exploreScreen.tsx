

const ExploreScreenPage = () => {
  return (
    <div>
        <h1>Comming soon ..........</h1>
    </div>
  );
};

export default ExploreScreenPage;



// import axios from "axios";
// import { useEffect, useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { v4 as uuidv4 } from "uuid";

// const ItemTypes = { BLOCK: "block" };

// const DraggableBlock = ({ block, index, moveBlock, removeBlock }) => {
//   const [, ref] = useDrag({
//     type: ItemTypes.BLOCK,
//     item: { index },
//   });

//   const [, drop] = useDrop({
//     accept: ItemTypes.BLOCK,
//     hover: (draggedItem) => {
//       if (draggedItem.index !== index) {
//         moveBlock(draggedItem.index, index);
//         draggedItem.index = index;
//       }
//     },
//   });

//   return (
//     <div
//       ref={(node) => ref(drop(node))}
//       className="p-4 border rounded bg-white shadow mb-2"
//     >
//       {block.type === "description" && (
//         <textarea
//           className="w-full p-2 border rounded"
//           value={block.content}
//           onChange={(e) => block.updateContent(e.target.value)}
//           placeholder="Enter description"
//         />
//       )}
//       {block.type === "question" && (
//         <input
//           type="text"
//           className="w-full p-2 border rounded"
//           value={block.content}
//           onChange={(e) => block.updateContent(e.target.value)}
//           placeholder="Enter question"
//         />
//       )}
//       {block.type === "textbox" && (
//         <p className="p-2 border rounded bg-gray-100">User Input Field</p>
//       )}
//       <button className="mt-2 text-red-500" onClick={() => removeBlock(index)}>
//         Delete
//       </button>
//     </div>
//   );
// };

// const ExploreScreenPage = () => {
//   const [blocks, setBlocks] = useState([]);
//   const [selectedPage, setSelectedPage] = useState("");
//   const [selectedBlockType, setSelectedBlockType] = useState("description");

//   useEffect(() => {
//     // Fetch existing journal pages or content blocks
//     axios.get("/api/journal/pages").then((res) => {
//       // Set initial data if needed
//     });
//   }, []);

//   const addBlock = (type) => {
//     setBlocks([
//       ...blocks,
//       {
//         id: uuidv4(),
//         type,
//         content: "",
//         updateContent: (content) => updateBlockContent(id, content),
//       },
//     ]);
//   };

//   const moveBlock = (fromIndex, toIndex) => {
//     const updatedBlocks = [...blocks];
//     const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
//     updatedBlocks.splice(toIndex, 0, movedBlock);
//     setBlocks(updatedBlocks);
//   };

//   const updateBlockContent = (id, content) => {
//     const updatedBlocks = blocks.map((block) =>
//       block.id === id ? { ...block, content } : block
//     );
//     setBlocks(updatedBlocks);
//   };

//   const removeBlock = (index) => {
//     setBlocks(blocks.filter((_, i) => i !== index));
//   };

//   const saveChanges = async () => {
//     await axios.post("/api/journal/update", {
//       pageName: selectedPage,
//       content: blocks,
//     });
//     alert("Saved Successfully!");
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
//         <h1 className="text-2xl font-bold mb-4">Journal Structure Manager</h1>
//         <select
//           value={selectedPage}
//           onChange={(e) => setSelectedPage(e.target.value)}
//           className="mb-4"
//         >
//           <option value="">Select Journal Page</option>
//           <option value="daily_journal">Daily Journal</option>
//           <option value="weekly_reflection">Weekly Reflection</option>
//         </select>
//         <div className="space-y-2">
//           {blocks.map((block, index) => (
//             <DraggableBlock
//               key={block.id}
//               block={block}
//               index={index}
//               moveBlock={moveBlock}
//               removeBlock={removeBlock}
//             />
//           ))}
//         </div>
//         <button
//           className="p-2 bg-primary text-white rounded mb-4"
//           onClick={() => addBlock(selectedBlockType)}
//         >
//           ➕ Add Block
//         </button>
//         <select
//           value={selectedBlockType}
//           onChange={(e) => setSelectedBlockType(e.target.value)}
//           className="mb-4"
//         >
//           <option value="description">Description</option>
//           <option value="question">Question</option>
//         </select>
//         <button
//           className="mt-4 p-2 bg-black text-white rounded"
//           onClick={saveChanges}
//         >
//           Save Changes
//         </button>
//       </div>
//     </DndProvider>
//   );
// };


// export default ExploreScreenPage;