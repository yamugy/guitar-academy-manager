import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Pagination from './components/Pagination';
import MobileStudentList from './components/MobileStudentList';
import './App.css';

const CLIENT_ID = '875475466731-sb6kg6aht5580taicfbua01evpumlk1e.apps.googleusercontent.com';

function App() {
  const [students, setStudents] = useState(() => {
    const storedStudents = localStorage.getItem('students');
    return storedStudents ? JSON.parse(storedStudents) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    try {
      localStorage.setItem('students', JSON.stringify(students));
    } catch (error) {
      console.error('학생 데이터 저장 중 오류 발생:', error);
      alert('학생 데이터를 저장하는 중 오류가 발생했습니다. 브라우저 저장소가 가득 찼을 수 있습니다.');
    }
  }, [students]);

  const handleAddStudent = (student) => {
    const existingStudent = students.find(s => s.name === student.name && s.email === student.email);
    if (existingStudent) {
      alert('이미 등록된 학생입니다.');
    } else {
      setStudents([...students, { 
        ...student, 
        id: Date.now(), 
        lessons: [], 
        paymentStatus: '미결제',
        lastPaymentAmount: null,
        lastPaymentDate: null,
        paymentHistory: []
      }]);
    }
  };

  const handleUpdateStudent = (id, updatedInfo) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, ...updatedInfo } : student
    ));
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('정말로 이 학생을 삭제하시겠습니까?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const handleAddLesson = (studentId, newLesson) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, lessons: [...(student.lessons || []), newLesson] }
        : student
    ));
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="app-container">
        <h1 className="app-title">기타 아카데미 매니저</h1>
        <StudentForm onAddStudent={handleAddStudent} />
        {isMobile ? (
          <MobileStudentList
            students={students}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
            onAddLesson={handleAddLesson}
          />
        ) : (
          <StudentList
            students={students}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
            onAddLesson={handleAddLesson}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
