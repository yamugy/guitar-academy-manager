import React, { useState } from 'react';
import StudentDetail from './StudentDetail';
import './StudentList.css';

function MobileStudentList({ students, onUpdateStudent, onDeleteStudent, onAddLesson }) {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('정말로 이 학생을 삭제하시겠습니까?')) {
      onDeleteStudent(studentId);
    }
  };

  const handleOpenDetail = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseDetail = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="mobile-student-list">
      {students.map((student) => (
        <div key={student.id} className="mobile-student-card">
          <h3>{student.name}</h3>
          <p>{student.phone}</p>
          <div className="mobile-card-actions">
            <button onClick={() => handleOpenDetail(student)}>상세 정보</button>
            <button onClick={() => handleDeleteStudent(student.id)}>삭제</button>
          </div>
        </div>
      ))}
      {selectedStudent && (
        <StudentDetail 
          student={selectedStudent} 
          onClose={handleCloseDetail}
          onUpdateStudent={onUpdateStudent}
          onAddLesson={onAddLesson}
        />
      )}
    </div>
  );
}

export default MobileStudentList;
