function StepList({ data, onDelete, onEdit }) {
  return (
    <div className="step-list-container">
      <table className="step-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.distance.toFixed(1)}</td>
              <td className="actions">
                <button 
                  onClick={() => onEdit(item)} 
                  className="edit-btn"
                  title="Редактировать"
                >
                  ✎
                </button>
                <button 
                  onClick={() => onDelete(item.id)} 
                  className="delete-btn"
                  title="Удалить"
                >
                  ✘
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="no-data">Нет данных о тренировках</div>
      )}
    </div>
  );
}

export default StepList;