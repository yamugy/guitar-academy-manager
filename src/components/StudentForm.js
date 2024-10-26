import React, { useState } from 'react';
import './StudentForm.css';

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent({ name, phone, email, lessons: [], payments: [] });
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="student-form-container">
      <h2>학생 등록</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="전화번호"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
          />
        </div>
        <button type="submit" className="submit-btn">등록하기</button>
      </form>
    </div>
  );
}

export default StudentForm;
