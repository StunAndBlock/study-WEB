// import React, { useEffect, useState } from 'react';

// const MechanicsPage = () => {
//   const [mechanics, setMechanics] = useState([]);
//   const [carBrands, setCarBrands] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     carBrands: [],
//   });
//   const [newCarBrand, setNewCarBrand] = useState(''); // Для нового бренда

//   // Загружаем механиков и марки автомобилей
//   useEffect(() => {
//     fetch('http://localhost:3000/api/mechanics')
//       .then((res) => res.json())
//       .then((data) => setMechanics(data))
//       .catch((err) => console.error(err));

//     fetch('http://localhost:3000/api/brands')
//       .then((res) => res.json())
//       .then((data) => setCarBrands(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCarBrandChange = (e) => {
//     const { options } = e.target;
//     const selectedBrands = [];
//     for (let i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//         selectedBrands.push(options[i].value);
//       }
//     }
//     setFormData({ ...formData, carBrands: selectedBrands });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch('http://localhost:3000/api/mechanics', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => res.json())
//       .then((newMechanic) => setMechanics([...mechanics, newMechanic]))
//       .catch((err) => console.error(err));
//   };

//   const handleAddCarBrand = (e) => {
//     e.preventDefault();
//     if (!newCarBrand) return;

//     // Отправляем запрос для добавления нового бренда
//     fetch('http://localhost:3000/api/brands', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: newCarBrand }),
//     })
//       .then((res) => res.json())
//       .then((brand) => {
//         setCarBrands([...carBrands, brand]); // Добавляем новый бренд в список
//         setNewCarBrand(''); // Очищаем поле ввода
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div>
//       <h1>Mechanics</h1>
//       <ul>
//         {mechanics.map((mechanic) => (
//           <li key={mechanic.id}>
//             {mechanic.name} ({mechanic.carBrands.join(', ')})
//           </li>
//         ))}
//       </ul>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           placeholder="Name"
//         />
//         <select
//           multiple
//           name="carBrands"
//           value={formData.carBrands}
//           onChange={handleCarBrandChange}
//         >
//           {carBrands.map((brand) => (
//             <option key={brand.id} value={brand.name}>
//               {brand.name}
//             </option>
//           ))}
//         </select>
//         <button type="submit">Add Mechanic</button>
//       </form>

//       <h2>Add New Car Brand</h2>
//       <form onSubmit={handleAddCarBrand}>
//         <input
//           type="text"
//           value={newCarBrand}
//           onChange={(e) => setNewCarBrand(e.target.value)}
//           placeholder="New Car Brand"
//         />
//         <button type="submit">Add Car Brand</button>
//       </form>
//     </div>
//   );
// };

// export default MechanicsPage;



import React, { useEffect, useState } from 'react';

const MechanicsPage = () => {
  const [mechanics, setMechanics] = useState([]);
  const [carBrands, setCarBrands] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    carBrands: [],
  });
  const [newCarBrand, setNewCarBrand] = useState(''); // Для нового бренда
  const [isEditing, setIsEditing] = useState(false); // Флаг для редактирования
  const [editingId, setEditingId] = useState(null); // ID механика для редактирования

  // Загружаем механиков и марки автомобилей
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCarBrandChange = (e) => {
    const { options } = e.target;
    const selectedBrands = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedBrands.push(options[i].value);
      }
    }
    setFormData({ ...formData, carBrands: selectedBrands });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      fetch(`http://localhost:3000/api/mechanics/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((updatedMechanic) => {
          setMechanics(
            mechanics.map((mechanic) =>
              mechanic.id === updatedMechanic.id ? updatedMechanic : mechanic
            )
          );
          resetForm();
        })
        .catch((err) => console.error(err));
    } else {
      fetch('http://localhost:3000/api/mechanics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((newMechanic) => {
          setMechanics([...mechanics, newMechanic]);
          resetForm();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleAddCarBrand = (e) => {
    e.preventDefault();
    if (!newCarBrand) return;

    // Отправляем запрос для добавления нового бренда
    fetch('http://localhost:3000/api/brands', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCarBrand }),
    })
      .then((res) => res.json())
      .then((brand) => {
        setCarBrands([...carBrands, brand]); // Добавляем новый бренд в список
        setNewCarBrand(''); // Очищаем поле ввода
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/mechanics/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setMechanics(mechanics.filter((mechanic) => mechanic.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (mechanic) => {
    setFormData({
      name: mechanic.name,
      carBrands: mechanic.carBrands,
    });
    setIsEditing(true);
    setEditingId(mechanic.id);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      carBrands: [],
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div>
      <h1>Mechanics</h1>
      <ul>
        {mechanics.map((mechanic) => (
          <li key={mechanic.id}>
            {mechanic.name} ({mechanic.carBrands.join(', ')})
            <button onClick={() => handleEdit(mechanic)}>Edit</button>
            <button onClick={() => handleDelete(mechanic.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>{isEditing ? 'Edit Mechanic' : 'Add Mechanic'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <select
          multiple
          name="carBrands"
          value={formData.carBrands}
          onChange={handleCarBrandChange}
        >
          {carBrands.map((brand) => (
            <option key={brand.id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
        <button type="submit">{isEditing ? 'Update Mechanic' : 'Add Mechanic'}</button>
      </form>

      <h2>Add New Car Brand</h2>
      <form onSubmit={handleAddCarBrand}>
        <input
          type="text"
          value={newCarBrand}
          onChange={(e) => setNewCarBrand(e.target.value)}
          placeholder="New Car Brand"
        />
        <button type="submit">Add Car Brand</button>
      </form>
    </div>
  );
};

export default MechanicsPage;