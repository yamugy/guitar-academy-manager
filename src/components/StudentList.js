import React, { useState } from 'react';
import StudentDetail from './StudentDetail';
import './StudentList.css';

function StudentList({ students, onUpdateStudent, onDeleteStudent, onAddLesson }) {
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
    <div className="student-grid">
      {students.map((student) => (
        <div key={student.id} className="student-card">
          <div className="card-header">
            <h3>{student.name}</h3>
            <button 
              className="delete-btn" 
              onClick={() => handleDeleteStudent(student.id)}
              title="학생 삭제"
            >
              ×
            </button>
          </div>
          <p>{student.phone}</p>
          <p>{student.email}</p>
          <p>최근 수업: {student.lessons && student.lessons.length > 0 ? student.lessons[student.lessons.length - 1].date : '없음'}</p>
          <div className="card-tags">
            <span className={`tag payment-tag ${student.paymentStatus === '결제완료' ? 'paid' : 'unpaid'}`}>
              {student.paymentStatus || '미결제'}
            </span>
            <span className="tag lesson-tag">{student.lessons && student.lessons.length > 0 ? '수업진행중' : '신규'}</span>
          </div>
          <button className="details-btn" onClick={() => handleOpenDetail(student)}>자세히 보기</button>
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

export default StudentList;
