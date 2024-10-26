import React, { useState } from 'react';

function MobileStudentList({ students, onUpdateStudent, onDeleteStudent, onAddLesson }) {
  const [addingPayment, setAddingPayment] = useState(null);
  const [addingLesson, setAddingLesson] = useState(null);

  const handleAddPayment = (studentId) => {
    setAddingPayment(studentId);
  };

  const handleSavePayment = (studentId) => {
    const date = document.getElementById(`payment-date-${studentId}`).value;
    const amount = document.getElementById(`payment-amount-${studentId}`).value;
    if (date && amount) {
      const student = students.find(s => s.id === studentId);
      const newPayment = { date, amount };
      const updatedPayments = [...(student.payments || []), newPayment];
      onUpdateStudent(studentId, { payments: updatedPayments });
      setAddingPayment(null);
    }
  };

  const handleAddLesson = (studentId) => {
    setAddingLesson(studentId);
  };

  const handleSaveLesson = (studentId) => {
    const date = document.getElementById(`lesson-date-${studentId}`).value;
    const content = document.getElementById(`lesson-content-${studentId}`).value;
    if (date && content) {
      const newLesson = { date, content };
      onAddLesson(studentId, newLesson);
      setAddingLesson(null);
    }
  };

  return (
    <div className="mobile-student-list">
      {students.map((student) => (
        <div key={student.id} className="mobile-student-card">
          <h3>{student.name}</h3>
          <p>전화번호: {student.phone}</p>
          <p>이메일: {student.email}</p>
          <div className="mobile-payment-info">
            <h4>결제 정보</h4>
            {student.payments && student.payments.map((payment, index) => (
              <div key={index} className="mobile-payment-item">
                <span>{payment.date}: {payment.amount}원</span>
              </div>
            ))}
            {addingPayment === student.id ? (
              <div className="mobile-payment-add-form">
                <input type="date" id={`payment-date-${student.id}`} />
                <input type="number" id={`payment-amount-${student.id}`} placeholder="금액" />
                <button onClick={() => handleSavePayment(student.id)}>저장</button>
                <button onClick={() => setAddingPayment(null)}>취소</button>
              </div>
            ) : (
              <button onClick={() => handleAddPayment(student.id)}>입금</button>
            )}
          </div>
          <div className="mobile-lesson-info">
            <h4>수업 내역</h4>
            {student.lessons && student.lessons.map((lesson, index) => (
              <div key={index} className="mobile-lesson-item">
                <span>{lesson.date}: {lesson.content}</span>
              </div>
            ))}
            {addingLesson === student.id ? (
              <div className="mobile-lesson-add-form">
                <input type="date" id={`lesson-date-${student.id}`} />
                <input type="text" id={`lesson-content-${student.id}`} placeholder="수업 내용" />
                <button onClick={() => handleSaveLesson(student.id)}>저장</button>
                <button onClick={() => setAddingLesson(null)}>취소</button>
              </div>
            ) : (
              <button onClick={() => handleAddLesson(student.id)}>수업 추가</button>
            )}
          </div>
          <button onClick={() => onDeleteStudent(student.id)}>학생 삭제</button>
        </div>
      ))}
    </div>
  );
}

export default MobileStudentList;
