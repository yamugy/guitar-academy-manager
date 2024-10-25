import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      name,
      age: Number(age),
      phone,
      email,
      schedules: []
    };
    onAddStudent(studentData);
    setName('');
    setAge('');
    setPhone('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>학생 등록</h3>
      <label htmlFor="name">이름:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="age">나이:</label>
      <input
        id="age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
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
      <button type="submit">학생 등록</button>
    </form>
  );
}

export default StudentForm;
