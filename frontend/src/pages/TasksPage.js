
import React, { useEffect, useState } from 'react';

const MechanicsPage = () => {
  const [mechanics, setMechanics] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [carBrands, setCarBrands] = useState([]);
  const [formData, setFormData] = useState({
    mechanicId: '',
    carBrand: '',
    operation: '',
    complexity: 1,
  });
  const [error, setError] = useState('');
  const [taskToReassign, setTaskToReassign] = useState(null); 
  const [newMechanicId, setNewMechanicId] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null); // Добавлено для удаления задачи

  useEffect(() => {
    fetch('http://localhost:3000/api/mechanics')
      .then((res) => res.json())
      .then((data) => setMechanics(data))
      .catch((err) => console.error(err));

    fetch('http://localhost:3000/api/brands')
      .then((res) => res.json())
      .then((data) => setCarBrands(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (formData.mechanicId) {
      fetch(`http://localhost:3000/api/mechanics/${formData.mechanicId}/tasks`)
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((err) => console.error(err));
    }
  }, [formData.mechanicId]);

  const calculateTotalComplexity = (mechanicId) => {
    return tasks
      .filter((task) => task.mechanicId === parseInt(mechanicId))
      .reduce((sum, task) => sum + task.complexity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();

    if (!formData.mechanicId || !formData.carBrand || !formData.operation || !formData.complexity) {
      setError('Please fill in all fields');
      return;
    }

    const mechanic = mechanics.find((m) => m.id === parseInt(formData.mechanicId));
    if (!mechanic) {
      setError('Mechanic not found');
      return;
    }

    if (!mechanic.carBrands.includes(formData.carBrand)) {
      setError('This mechanic does not work with this car brand');
      return;
    }

    const totalComplexity = calculateTotalComplexity(formData.mechanicId);

    if (totalComplexity + parseInt(formData.complexity) > 10) {
      setError('Total complexity of tasks for this mechanic cannot exceed 10');
      return;
    }

    fetch(`http://localhost:3000/api/mechanics/${formData.mechanicId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setError('');
      })
      .catch((err) => {
        setError('Error adding task');
        console.error(err);
      });
  };

  const handleDeleteTask = (taskId, mechanicId) => {
    fetch(`http://localhost:3000/api/mechanics/${mechanicId}/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
          setError('');
        } else {
          setError('Error deleting task');
        }
      })
      .catch((err) => {
        setError('Error deleting task');
        console.error(err);
      });
  };

  const handleReassignTask = () => {
    if (!newMechanicId) {
      setError('Please select a mechanic to reassign the task');
      return;
    }

    const newMechanic = mechanics.find((m) => m.id === parseInt(newMechanicId));
    if (!newMechanic) {
      setError('Mechanic not found');
      return;
    }

    if (!newMechanic.carBrands.includes(taskToReassign.carBrand)) {
      setError('This mechanic does not work with this car brand');
      return;
    }

    const totalComplexity = calculateTotalComplexity(newMechanicId);

    if (totalComplexity + taskToReassign.complexity > 10) {
      setError('Total complexity of tasks for this mechanic cannot exceed 10');
      return;
    }

    fetch(`http://localhost:3000/api/mechanics/${newMechanicId}/tasks/${taskToReassign.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mechanicId: newMechanicId }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks
            .filter((task) => task.id !== taskToReassign.id)
            .concat(updatedTask)
        );
        setTaskToReassign(null);
        setNewMechanicId('');
        setError('');
      })
      .catch((err) => {
        setError('Error reassigning task');
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Mechanics</h1>
      <form onSubmit={handleSubmitTask}>
        <select name="mechanicId" onChange={handleInputChange} value={formData.mechanicId}>
          <option value="">Select Mechanic</option>
          {mechanics.map((mechanic) => (
            <option key={mechanic.id} value={mechanic.id}>
              {mechanic.name}
            </option>
          ))}
        </select>

        <select name="carBrand" onChange={handleInputChange} value={formData.carBrand}>
          <option value="">Select Car Brand</option>
          {carBrands.map((brand) => (
            <option key={brand.id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="operation"
          value={formData.operation}
          onChange={handleInputChange}
          placeholder="Operation Name"
        />

        <select name="complexity" value={formData.complexity} onChange={handleInputChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Tasks for Mechanic</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.operation} ({task.carBrand}) - Difficulty: {task.complexity}
            <button onClick={() => handleDeleteTask(task.id, task.mechanicId)}>Delete</button>
            <button onClick={() => setTaskToReassign(task)}>Reassign</button>
            {/* {taskToReassign?.id === task.id && (
              <div>
                <h3>Reassign Task</h3>
                <select onChange={(e) => setNewMechanicId(e.target.value)} value={newMechanicId}>
                  <option value="">Select New Mechanic</option>
                  {mechanics.map((mechanic) => (
                    <option key={mechanic.id} value={mechanic.id}>
                      {mechanic.name}
                    </option>
                  ))}
                </select>
                <button onClick={handleReassignTask}>Reassign</button>
              </div>
            )} */
              taskToReassign?.id === task.id && (
                <div>
                  <h3>Reassign Task</h3>
                  <select
                    onChange={(e) => setNewMechanicId(e.target.value)}
                    value={newMechanicId}
                  >
                    <option value="">Select New Mechanic</option>
                    {mechanics
                      .filter((mechanic) => mechanic.id !== taskToReassign.mechanicId) // Исключаем текущего механика
                      .map((mechanic) => (
                        <option key={mechanic.id} value={mechanic.id}>
                          {mechanic.name}
                        </option>
                      ))}
                  </select>
                  <button onClick={handleReassignTask}>Reassign</button>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MechanicsPage;