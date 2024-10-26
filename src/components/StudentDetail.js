import React, { useState, useEffect } from 'react';
import './StudentDetail.css';

function StudentDetail({ student, onClose, onAddLesson, onUpdateStudent }) {
  const [newLesson, setNewLesson] = useState({ date: '', content: '' });
  const [localStudent, setLocalStudent] = useState(student);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [editingPaymentIndex, setEditingPaymentIndex] = useState(null);
  const [editingPayment, setEditingPayment] = useState({ date: '', amount: '' });

  useEffect(() => {
    console.log('StudentDetail rendered', localStudent);
  }, [localStudent]);

  const handleAddLesson = () => {
    if (newLesson.date && newLesson.content) {
      const updatedStudent = {
        ...localStudent,
        lessons: [...(localStudent.lessons || []), newLesson].sort((a, b) => new Date(b.date) - new Date(a.date))
      };
      onAddLesson(student.id, newLesson);
      onUpdateStudent(student.id, updatedStudent);
      setLocalStudent(updatedStudent);
      setNewLesson({ date: '', content: '' });
    } else {
      alert('날짜와 수업 내용을 모두 입력해주세요.');
    }
  };

  const handleDeleteLesson = (index) => {
    if (window.confirm('이 수업 내역을 삭제하시겠습니까?')) {
      const updatedLessons = localStudent.lessons.filter((_, i) => i !== index);
      const updatedStudent = { ...localStudent, lessons: updatedLessons };
      onUpdateStudent(student.id, updatedStudent);
      setLocalStudent(updatedStudent);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (paymentAmount && paymentDate) {
      const newPayment = {
        amount: parseInt(paymentAmount, 10), // 문자열을 숫자로 변환
        date: paymentDate
      };
      const updatedStudent = {
        ...localStudent,
        paymentStatus: '결제완료',
        lastPaymentAmount: paymentAmount,
        lastPaymentDate: paymentDate,
        paymentHistory: [...(localStudent.paymentHistory || []), newPayment]
      };
      onUpdateStudent(student.id, updatedStudent);
      setLocalStudent(updatedStudent);
      setPaymentAmount('');
      setPaymentDate('');
    } else {
      alert('결제 금액과 날짜를 모두 입력해주세요.');
    }
  };

  const handleEditPayment = (index) => {
    setEditingPaymentIndex(index);
    setEditingPayment(localStudent.paymentHistory[index]);
  };

  const handleUpdatePayment = () => {
    if (editingPayment.date && editingPayment.amount) {
      const updatedPaymentHistory = [...localStudent.paymentHistory];
      updatedPaymentHistory[editingPaymentIndex] = editingPayment;
      
      const updatedStudent = {
        ...localStudent,
        paymentHistory: updatedPaymentHistory,
        lastPaymentAmount: editingPayment.amount,
        lastPaymentDate: editingPayment.date
      };
      
      onUpdateStudent(student.id, updatedStudent);
      setLocalStudent(updatedStudent);
      setEditingPaymentIndex(null);
      setEditingPayment({ date: '', amount: '' });
    } else {
      alert('날짜와 금액을 모두 입력해주세요.');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{localStudent.name} 상세 정보</h2>
        <div className="student-info">
          <p>전화번호: {localStudent.phone}</p>
          <p>이메일: {localStudent.email}</p>
        </div>

        <div className="section payment-section">
          <h3>결제 정보</h3>
          <div className="payment-info">
            <p>
              결제 상태: 
              <span className={`payment-status ${localStudent.paymentStatus === '결제완료' ? 'paid' : 'unpaid'}`}>
                {localStudent.paymentStatus || '미결제'}
              </span>
            </p>
            {localStudent.lastPaymentAmount && (
              <p>최근 결제: {localStudent.lastPaymentAmount}원 ({localStudent.lastPaymentDate})</p>
            )}
          </div>
          <form onSubmit={handlePaymentSubmit} className="payment-form">
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="결제 금액"
            />
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
            <button type="submit">결제 입력</button>
          </form>

          <h4>결제 내역</h4>
          <table className="payment-history">
            <thead>
              <tr>
                <th>날짜</th>
                <th>금액</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {localStudent.paymentHistory && localStudent.paymentHistory.length > 0 ? (
                localStudent.paymentHistory.map((payment, index) => (
                  <tr key={index}>
                    {editingPaymentIndex === index ? (
                      <>
                        <td>
                          <input
                            type="date"
                            value={editingPayment.date}
                            onChange={(e) => setEditingPayment({...editingPayment, date: e.target.value})}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editingPayment.amount}
                            onChange={(e) => setEditingPayment({...editingPayment, amount: e.target.value})}
                          />
                        </td>
                        <td>
                          <button onClick={handleUpdatePayment}>저장</button>
                          <button onClick={() => setEditingPaymentIndex(null)}>취소</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{payment.date}</td>
                        <td>{payment.amount.toLocaleString()}원</td>
                        <td>
                          <button onClick={() => handleEditPayment(index)}>수정</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">결제 내역이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="section lesson-section">
          <h3>수업 내역</h3>
          <ul className="lesson-history">
            {localStudent.lessons && localStudent.lessons.length > 0 ? (
              localStudent.lessons.map((lesson, index) => (
                <li key={index}>
                  {lesson.date}: {lesson.content}
                  <button onClick={() => handleDeleteLesson(index)} className="delete-lesson-btn">삭제</button>
                </li>
              ))
            ) : (
              <li>수업 내역이 없습니다.</li>
            )}
          </ul>
          <div className="add-lesson-form">
            <input
              type="date"
              value={newLesson.date}
              onChange={(e) => setNewLesson({...newLesson, date: e.target.value})}
            />
            <input
              type="text"
              value={newLesson.content}
              onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
              placeholder="수업 내용"
            />
            <button onClick={handleAddLesson} className="add-btn">수업 추가</button>
          </div>
        </div>

        <button onClick={onClose} className="close-btn">닫기</button>
        <button onClick={() => {
          const updatedStudent = { ...localStudent, paymentStatus: '미결제' };
          onUpdateStudent(student.id, updatedStudent);
          setLocalStudent(updatedStudent);
        }} className="change-payment-status-btn">
          미결제로 변경
        </button>
      </div>
    </div>
  );
}

export default StudentDetail;
