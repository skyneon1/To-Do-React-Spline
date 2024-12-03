import React, { useState, useRef } from 'react';

function App() {
  const [task, setTask] = useState("");
  const [listItem, setListItem] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setListItem([...listItem, { text: task, isEditing: false }]);
      setTask("");
    }
  };

  const handleDelete = (index) => {
    const updatedList = listItem.filter((_, i) => i !== index);
    setListItem(updatedList);
  };

  const handleEdit = (index) => {
    const updatedList = [...listItem];
    updatedList[index].isEditing = !updatedList[index].isEditing;
    setListItem(updatedList);
  };

  const handleSave = (index, editedTask) => {
    const updatedList = [...listItem];
    updatedList[index].text = editedTask;
    updatedList[index].isEditing = false;
    setListItem(updatedList);
  };

  const handleClearAll = () => {
    setListItem([]);
  };

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <iframe
        src="https://my.spline.design/clonerwavescopy-22975f0659d7a905bc2fe838627c4c3b/"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        title="3D Spline Model"
      />

      <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0)', zIndex: 1 }}>
        <h1 className="text-4xl font-semibold my-6 text-teal-600">To Do List</h1>
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="px-4 py-2 text-lg border-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="px-4 py-2 text-lg bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 transition-all"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>

        <div className="flex justify-center items-center w-full">
          {listItem.length > 0 ? (
            <ul className="space-y-4 w-full max-w-md">
              {listItem.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-4 py-2 bg-white border-2 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {item.isEditing ? (
                    <input
                      type="text"
                      className="px-4 py-2 text-lg border-2 rounded-lg w-full mr-4"
                      defaultValue={item.text}
                      onBlur={(e) => handleSave(index, e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <span className="text-lg">{item.text}</span>
                  )}
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 hover:text-blue-700 transition-all"
                    >
                      {item.isEditing ? "Save" : "Edit"}
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-500">No tasks to display</p>
          )}
        </div>

        <div className="mt-6">
          {listItem.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
            >
              Clear All Tasks
            </button>
          )}
        </div>

        <div className="mt-4 text-xl">
          {listItem.length} {listItem.length === 1 ? "task" : "tasks"} remaining
        </div>
      </div>

      <audio
        ref={audioRef}
        autoPlay
        loop
        src="/bg.mp3"
        volume="0.5"
      />
      
      <button
        onClick={handleMute}
        className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded-full"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
}

export default App;
