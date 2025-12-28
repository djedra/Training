import { useState } from 'react';

import StepForm from './components/StepForm';
import StepList from './components/StepList';

function App() {
  const [steps, setSteps] = useState([]);
  const [formData, setFormData] = useState({ date: '', distance: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (data, id) => {
    if (id) {
      setSteps(steps.map(item => 
        item.id === id 
          ? { 
            ...item, 
            date: data.date, 
            distance: parseFloat(data.distance) 
          } 
          : item
      ));
    
    } else {
      const existingIndex = steps.findIndex(item => 
        item.date === data.date
      );
      
      if (existingIndex >= 0) {
        setSteps(steps.map((item, index) => 
          index === existingIndex 
            ? { 
              ...item, 
              distance: item.distance + parseFloat(data.distance) 
            } 
            : item
        ));

      } else {
        const newItem = { 
          id: Date.now(), 
          date: data.date, 
          distance: parseFloat(data.distance) 
        };

        setSteps([
          ...steps, 
          newItem
        ]);
      }
    }

    setSteps(prevSteps => 
      [...prevSteps].sort((a, b) => 
        new Date(b.date.split('.').reverse().join('-')) - 
        new Date(a.date.split('.').reverse().join('-'))
      )
    );
  };

  const handleDelete = (id) => {
    setSteps(steps.filter(item => 
      item.id !== id
    ));
  };

  const handleEdit = (item) => {
    setFormData({ 
      date: item.date, 
      distance: item.distance.toString() 
    });
    
    setEditingId(item.id);
  };

  return (
    <div className="container">
      <StepForm 
        onSubmit={handleSubmit} 
        formData={formData} 
        setFormData={setFormData}
        editingId={editingId}
        setEditingId={setEditingId}
      />
      <StepList 
        data={steps} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
      />
    </div>
  );
}

export default App;