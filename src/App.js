import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [students, setStudents] = useState(() => {
    const storedStudents = localStorage.getItem('students');
    return storedStudents ? JSON.parse(storedStudents) : [];
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (student) => {
    const existingStudent = students.find(s => s.name === student.name && s.email === student.email);
    if (existingStudent) {
      alert('이미 등록된 학생입니다.');
    } else {
      setStudents([...students, { ...student, id: Date.now() }]);
    }
  };

  const handleUpdateStudent = (id, updatedStudent) => {
    setStudents(students.map(student => student.id === id ? updatedStudent : student));
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div>
      <StudentForm onAddStudent={handleAddStudent} />
      <StudentList
        students={students}
        onDeleteStudent={handleDeleteStudent}
        onUpdateStudent={handleUpdateStudent}
      />
    </div>
  );
}

export default App;
