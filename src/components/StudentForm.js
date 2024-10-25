import React, { useState } from 'react';

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      name,
      phone,
      email,
      lessons: []
    };
    onAddStudent(studentData);
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h2>학생 등록</h2>
      <label htmlFor="name">이름:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="phone">전화번호:</label>
      <input
        id="phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <label htmlFor="email">이메일:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">등록</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default StudentForm;
