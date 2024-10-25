import React, { useState } from 'react';
import '../App.css';

function StudentList({ students, onUpdateStudent, onDeleteStudent, onAddLesson }) {
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editingLessonIndex, setEditingLessonIndex] = useState(null);
  const [lessonDate, setLessonDate] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [editingLesson, setEditingLesson] = useState(null);
  const [newLessonDate, setNewLessonDate] = useState('');
  const [newLessonContent, setNewLessonContent] = useState('');
  const [editingPayment, setEditingPayment] = useState(null);
  const [addingPayment, setAddingPayment] = useState(null);

  const handleEditLesson = (studentId, lessonIndex) => {
    const student = students.find(s => s.id === studentId);
    const lesson = student.lessons[lessonIndex];
    setEditingStudentId(studentId);
    setEditingLessonIndex(lessonIndex);
    setLessonDate(lesson.date);
    setLessonContent(lesson.content);
  };

  const handleUpdateLesson = (studentId, lessonIndex, updatedLesson) => {
    onUpdateStudent(studentId, {
      lessons: students.find(s => s.id === studentId).lessons.map((lesson, index) =>
        index === lessonIndex ? updatedLesson : lesson
      )
    });
    setEditingStudentId(null);
    setEditingLessonIndex(null);
  };

  const handleAddLesson = (studentId) => {
    setEditingLesson({ studentId, isNew: true });
    setNewLessonDate(new Date().toISOString().split('T')[0]);
    setNewLessonContent('');
  };

  const handleSaveNewLesson = () => {
    if (editingLesson && editingLesson.isNew) {
      const newLesson = {
        date: newLessonDate,
        content: newLessonContent,
      };
      onAddLesson(editingLesson.studentId, newLesson);
      setEditingLesson(null);
      setNewLessonDate('');
      setNewLessonContent('');
    }
  };

  const handleDeleteLesson = (studentId, lessonIndex) => {
    if (window.confirm('정말로 이 수업을 삭제하시겠습니까?')) {
      const updatedStudent = students.find(student => student.id === studentId);
      if (updatedStudent) {
        const updatedLessons = updatedStudent.lessons.filter((_, index) => index !== lessonIndex);
        onUpdateStudent(studentId, { ...updatedStudent, lessons: updatedLessons });
      }
    }
  };

  const handlePaymentChange = (studentId, field, value) => {
    onUpdateStudent(studentId, { [field]: value });
  };

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

  const handleDeletePayment = (studentId, index) => {
    if (window.confirm('정말로 이 결제 내역을 삭제하시겠습니까?')) {
      const student = students.find(s => s.id === studentId);
      const updatedPayments = student.payments.filter((_, i) => i !== index);
      onUpdateStudent(studentId, { payments: updatedPayments });
    }
  };

  return (
    <div>
      <table className="student-table">
        <thead>
          <tr>
            <th className="name-cell">이름</th>
            <th className="phone-cell">전화번호</th>
            <th className="email-cell">이메일</th>
            <th className="payment-cell">결제일</th>
            <th className="lesson-cell">수업 내역</th>
            <th className="action-cell">작업</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="name-cell" title={student.name}>{student.name}</td>
              <td className="phone-cell" title={student.phone}>{student.phone}</td>
              <td className="email-cell" title={student.email}>{student.email}</td>
              <td className="payment-cell">
                <div className="payment-info">
                  {student.payments && student.payments.map((payment, index) => (
                    <div key={index} className="payment-item">
                      <span>{payment.date}: {payment.amount}원</span>
                      <button onClick={() => handleDeletePayment(student.id, index)}>삭제</button>
                    </div>
                  ))}
                  {addingPayment === student.id ? (
                    <div className="payment-add-form">
                      <input
                        type="date"
                        id={`payment-date-${student.id}`}
                        defaultValue={new Date().toISOString().split('T')[0]}
                      />
                      <input
                        type="number"
                        id={`payment-amount-${student.id}`}
                        placeholder="금액"
                      />
                      <button onClick={() => handleSavePayment(student.id)}>저장</button>
                      <button onClick={() => setAddingPayment(null)}>취소</button>
                    </div>
                  ) : (
                    <button onClick={() => handleAddPayment(student.id)}>입금</button>
                  )}
                </div>
              </td>
              <td className="lesson-cell">
                {student.lessons && student.lessons.map((lesson, index) => (
                  <div key={index} className="lesson-item">
                    {editingStudentId === student.id && editingLessonIndex === index ? (
                      <div className="lesson-edit-form">
                        <input
                          type="date"
                          value={lessonDate}
                          onChange={(e) => setLessonDate(e.target.value)}
                        />
                        <input
                          type="text"
                          value={lessonContent}
                          onChange={(e) => setLessonContent(e.target.value)}
                        />
                        <button className="save-button" onClick={() => handleUpdateLesson(student.id, index, { date: lessonDate, content: lessonContent })}>
                          저장
                        </button>
                        <button className="cancel-button" onClick={() => {
                          setEditingStudentId(null);
                          setEditingLessonIndex(null);
                        }}>
                          취소
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="lesson-content">{lesson.date}: {lesson.content}</span>
                        <button className="edit-button" onClick={() => handleEditLesson(student.id, index)}>수정</button>
                        <button className="edit-button delete-lesson-button" onClick={() => handleDeleteLesson(student.id, index)}>삭제</button>
                      </>
                    )}
                  </div>
                ))}
                {editingLesson && editingLesson.studentId === student.id && editingLesson.isNew && (
                  <div>
                    <input
                      type="date"
                      value={newLessonDate}
                      onChange={(e) => setNewLessonDate(e.target.value)}
                    />
                    <input
                      type="text"
                      value={newLessonContent}
                      onChange={(e) => setNewLessonContent(e.target.value)}
                      placeholder="수업 내용"
                    />
                    <button onClick={handleSaveNewLesson}>저장</button>
                    <button onClick={() => setEditingLesson(null)}>취소</button>
                  </div>
                )}
                <button className="add-lesson-button" onClick={() => handleAddLesson(student.id)}>수업 추가</button>
              </td>
              <td className="action-cell">
                <button className="delete-button" onClick={() => onDeleteStudent(student.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
