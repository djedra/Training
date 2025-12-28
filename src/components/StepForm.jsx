import { useState } from 'react';

function StepForm({ onSubmit, formData, setFormData, editingId, setEditingId }) {
  const [errors, setErrors] = useState({ date: '', distance: '' });

  const validateDate = (date) => {
    const pattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
    if (!pattern.test(date)) return 'Формат: ДД.ММ.ГГГГ';
    
    const [day, month, year] = date.split('.');
    const dateObj = new Date(`${year}-${month}-${day}`);

    if (isNaN(dateObj.getTime())) return 'Некорректная дата';
    return '';
  };

  const validateDistance = (distance) => {
    if (!distance) return 'Введите расстояние';
    if (isNaN(distance) || parseFloat(distance) <= 0) return 'Должно быть число > 0';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'date') {
      setErrors({ ...errors, date: validateDate(value) });
    } else if (name === 'distance') {
      setErrors({ ...errors, distance: validateDistance(value) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dateError = validateDate(formData.date);
    const distanceError = validateDistance(formData.distance);

    setErrors({ date: dateError, distance: distanceError });

    if (!dateError && !distanceError) {
      onSubmit(formData, editingId);
      setEditingId(null);
      setFormData({ date: '', distance: '' });
    }
  };

  return (
    <form className="step-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">
            Дата (ДД.ММ.ГГГГ)
          </label>
          <input
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="ДД.ММ.ГГГГ"
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <div className="error-message">{errors.date}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="distance">
            Пройдено км
          </label>
          <input
            id="distance"
            name="distance"
            type="number"
            step="0.1"
            min="0.1"
            value={formData.distance}
            onChange={handleChange}
            placeholder="Километры"
            className={errors.distance ? 'error' : ''}
          />
          {errors.distance && <div className="error-message">{errors.distance}</div>}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {editingId ? 'Обновить' : 'Добавить'}
          </button>
          {editingId && (
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setEditingId(null);
                setFormData({ date: '', distance: '' });
              }}
            >
              Отмена
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default StepForm;