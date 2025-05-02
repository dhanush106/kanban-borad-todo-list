import React from 'react';

const Card = (props) => {
  const getStatusStyle = () => {
    switch(props.status) {
      case 'todo':
        return 'bg-black text-white';
      case 'InProgress':
        return 'bg-yellow-400 text-black';
      case 'Completed':
        return 'bg-green-400 text-black';
      default:
        return 'bg-gray-400 text-black';
    }
  };

  const getStatusText = () => {
    switch(props.status) {
      case 'todo': return 'Todo';
      case 'InProgress': return 'Progress';
      case 'Completed': return 'Done';
      default: return 'Todo';
    }
  };

  return (
    <div className='bg-gray-100 space-y-7 rounded-md w-80 p-7 m-4 shadow-xl'>
      <div>
        <h1 className='font-medium'>{props.task}</h1>
      </div>
      <div>
        <textarea 
          cols="20" 
          placeholder='Description...' 
          className='outline-0 w-full p-1 border rounded'
        />
      </div>
      <div className='flex justify-around items-center'>
        <p className='flex justify-around items-center'>
          <span className={`rounded-lg px-3 py-1 ${getStatusStyle()}`}>
            {getStatusText()}
          </span>
        </p>
        <button 
          onClick={props.onDelete}
          className='border-2 px-2 py-1 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition-colors'
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default Card;