import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [studentId, setStudentId] = useState('');
  const [coachId, setCoachId] = useState('');
  const router = useRouter();
  const goToStudent = () => {router.push(`/students/${studentId}`)};
  const goToCoach = () => {router.push(`/coaches/${coachId}`)};

  return (
    <main>
      <label>
        Student ID:
        <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)}/>
      </label>
      <button onClick={goToStudent}>Student</button>
      <br/><br/>
      <label>
        Coach ID:
        <input type="text" value={coachId} onChange={e => setCoachId(e.target.value)}/>
      </label>
      <button onClick={goToCoach}>Coach</button>
    </main>
  );
}
