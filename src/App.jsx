import React, { useState, useEffect } from 'react';
import Card from './components/Card';

const App = () => {
  const [columns, setColumns] = useState({
    todo: [],
    InProgress: [],
    Completed: []
  });

  const [tasks,setTasks] = useState([
    { id: '1', content: 'task-1', status: 'todo' },
    { id: '2', content: 'task-2', status: 'todo' },
    { id: '3', content: 'task-3', status: 'InProgress' },
    { id: '4', content: 'task-4', status: 'InProgress' },
    { id: '5', content: 'task-5', status: 'InProgress' },
    { id: '6', content: 'task-6', status: 'Completed' },
    { id: '7', content: 'task-7', status: 'Completed' },
  ]);

  function addTask(){
    const newTask = {id:tasks.length(), content:value, status:"todo"};
    setTasks([...tasks,newTask])
  }

  // Initialize columns
  useEffect(() => {
    const newColumns = {
      todo: tasks.filter(item => item.status === "todo"),
      InProgress: tasks.filter(item => item.status === "InProgress"),
      Completed: tasks.filter(item => item.status === "Completed")
    };
    setColumns(newColumns);
  }, [tasks]);

  // Handle drag start
  const handleDragStart = (e, taskId, sourceColumn) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceColumn', sourceColumn);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumn = e.dataTransfer.getData('sourceColumn');

    if (sourceColumn === targetColumn) return;

    const taskToMove = columns[sourceColumn].find(task => task.id === taskId);
    if (!taskToMove) return;

    const newSourceColumn = columns[sourceColumn].filter(task => task.id !== taskId);
    const updatedTask = { ...taskToMove, status: targetColumn };
    const newTargetColumn = [...columns[targetColumn], updatedTask];

    setColumns({
      ...columns,
      [sourceColumn]: newSourceColumn,
      [targetColumn]: newTargetColumn
    });
  };

  // Handle task deletion
  const handleDelete = (taskId, columnId) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: prev[columnId].filter(task => task.id !== taskId)
    }));
  };

  const [value,setValue] = useState('');

  return (
    <>
    <div className='w-dvw mt-3 flex justify-center space-x-7'>
      <input onChange={(e)=>setValue(e.target.value)} type="text" className='rounded-md px-3 shadow-lg shadow-gray-300 active:-translate-1 outline-0' placeholder='Task...'/>
      <button 
        onClick={()=>{addTask()}}
        className='
          px-4 py-2
          bg-black
          bg-blend-color-burn
          text-white
          rounded-md
          shadow-black
          hover:shadow-lg
          transform
          transition-all 
          duration-200
          hover:-translate-y-1 
          hover:-translate-x-1 
          cursor-pointer
        '>
        Add</button>
    </div>
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {Object.entries(columns).map(([columnId, tasks]) => (
        <div
          key={columnId}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, columnId)}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px',
            minHeight: '200px'
          }}
        >
          <h2 style={{ textAlign: 'center' }}>{columnId}</h2>
          <div style={{ marginTop: '10px' }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id, columnId)}
              >
                <Card 
                  task={task.content}
                  status={task.status}
                  onDelete={() => handleDelete(task.id, columnId)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default App;