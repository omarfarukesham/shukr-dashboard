import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-modal";
import { v4 as uuidv4 } from "uuid";

const TemplateConfig = () => {
  const [templates, setTemplates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState("description");

  const addTemplateBlock = () => {
    setTemplates([
      ...templates,
      {
        id: uuidv4(),
        type: selectedBlockType,
        content: "",
        updateContent: (content) => updateTemplateContent(id, content),
      },
    ]);
    setIsModalOpen(false);
  };

  const updateTemplateContent = (id, content) => {
    const updatedTemplates = templates.map((template) =>
      template.id === id ? { ...template, content } : template
    );
    setTemplates(updatedTemplates);
  };

  const removeTemplateBlock = (id) => {
    setTemplates(templates.filter((template) => template.id !== id));
  };

  const saveTemplates = async () => {
    await axios.post("/api/templates/save", {
      templates,
    });
    alert("Templates Saved Successfully!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Template Configuration</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-blue-500 text-white p-2 rounded"
      >
        Add New Template
      </button>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border">Type</th>
            <th className="border">Content</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td className="border">{template.type}</td>
              <td className="border">
                {template.type === "description" ? (
                  <textarea
                    value={template.content}
                    onChange={(e) =>
                      updateTemplateContent(template.id, e.target.value)
                    }
                    placeholder="Enter description"
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <input
                    type="text"
                    value={template.content}
                    onChange={(e) =>
                      updateTemplateContent(template.id, e.target.value)
                    }
                    placeholder="Enter question"
                    className="w-full p-2 border rounded"
                  />
                )}
              </td>
              <td className="border">
                <button
                  onClick={() => removeTemplateBlock(template.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={saveTemplates}
        className="mt-4 bg-green-500 text-white p-2 rounded"
      >
        Save
      </button>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Add New Block</h2>
        <select
          value={selectedBlockType}
          onChange={(e) => setSelectedBlockType(e.target.value)}
        >
          <option value="description">Description</option>
          <option value="question">Question</option>
        </select>
        <button
          onClick={addTemplateBlock}
          className="mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Add Block
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-2 bg-gray-500 text-white p-2 rounded"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default TemplateConfig;
