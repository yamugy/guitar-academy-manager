import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './StudentList.css'; // 새로운 CSS 파일을 만들어 사용합니다.

function StudentList({ students, onDeleteStudent, onUpdateStudent }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [lessonContent, setLessonContent] = useState('');
  const [editingSchedule, setEditingSchedule] = useState(null);

  const handleDateChange = (date) => {
    setSchedule(date);
  };

  const handleAddSchedule = (student) => {
    if (schedule && lessonContent.trim() !== '') {
      const updatedSchedules = [...student.schedules, { date: schedule, content: lessonContent }];
      onUpdateStudent(student.id, { ...student, schedules: updatedSchedules });
      setSchedule(null);
      setLessonContent('');
      setSelectedStudent(null);
    } else {
      alert('날짜와 수업 내용을 모두 입력해주세요.');
    }
  };

  const handleEditSchedule = (student, scheduleIndex) => {
    setEditingSchedule({ studentId: student.id, index: scheduleIndex });
    setSchedule(new Date(student.schedules[scheduleIndex].date));
    setLessonContent(student.schedules[scheduleIndex].content);
  };

  const handleUpdateSchedule = (student) => {
    if (schedule && lessonContent.trim() !== '') {
      const updatedSchedules = [...student.schedules];
      updatedSchedules[editingSchedule.index] = { date: schedule, content: lessonContent };
      onUpdateStudent(student.id, { ...student, schedules: updatedSchedules });
      setEditingSchedule(null);
      setSchedule(null);
      setLessonContent('');
    } else {
      alert('날짜와 수업 내용을 모두 입력해주세요.');
    }
  };

  return (
    <div>
      <h2>학생 목록</h2>
      {students.length === 0 ? (
        <p>등록된 학생이 없습니다.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>나이</th>
              <th>전화번호</th>
              <th>이메일</th>
              <th>학습 내용</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>
                  {student.schedules.map((schedule, index) => (
                    <div key={index}>
                      <div>{new Date(schedule.date).toLocaleString()}</div>
                      <div>{schedule.content}</div>
                      <button onClick={() => handleEditSchedule(student, index)}>수정</button>
                    </div>
                  ))}
                  {(selectedStudent === student.id || editingSchedule?.studentId === student.id) && (
                    <div className="add-lesson">
                      <div className="date-picker-container">
                        <label htmlFor={`date-picker-${student.id}`}>수업 날짜 선택:</label>
                        <DatePicker
                          id={`date-picker-${student.id}`}
                          selected={schedule}
                          onChange={handleDateChange}
                          showTimeSelect
                          dateFormat="yyyy년 MM월 dd일 HH:mm"
                          placeholderText="날짜와 시간을 선택하세요"
                          className="date-picker-input"
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          timeCaption="시간"
                          locale={ko}
                        />
                      </div>
                      <div className="lesson-content-container">
                        <label htmlFor={`lesson-content-${student.id}`}>수업 내용:</label>
                        <input
                          id={`lesson-content-${student.id}`}
                          type="text"
                          value={lessonContent}
                          onChange={(e) => setLessonContent(e.target.value)}
                          placeholder="수업 내용을 입력하세요"
                        />
                      </div>
                      {editingSchedule ? (
                        <button onClick={() => handleUpdateSchedule(student)}>수정 완료</button>
                      ) : (
                        <button onClick={() => handleAddSchedule(student)}>추가</button>
                      )}
                    </div>
                  )}
                </td>
                <td>
                  <button onClick={() => setSelectedStudent(student.id)}>수업 추가</button>
                  <button onClick={() => onDeleteStudent(student.id)} className="delete-btn">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
