import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import studentRoutes from './routes/student.routes';
import teacherRoutes from './routes/teacher.routes';
import attendanceRoutes from './routes/attendance.routes';
import examRoutes from './routes/exam.routes';
import feeRoutes from './routes/fee.routes';
import messageRoutes from './routes/message.routes';
import subjectRoutes from './routes/subject.routes'

const app = express();
app.use(cors());
app.use(express.json())

app.use('/users', userRoutes);
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/exams', examRoutes);
app.use('/fees', feeRoutes);
app.use('/messages', messageRoutes);
app.use('/subjects', subjectRoutes)

export default app;