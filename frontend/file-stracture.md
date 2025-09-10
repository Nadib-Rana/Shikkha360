Here’s a **complete and production-grade TypeScript React frontend file structure** for your **School Management System** (with everything online, integrated with Google Classroom API). This structure includes all essential files, folders, and conventions to scale easily.

---

## **Frontend (React + TypeScript + Vite or CRA)**

```
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico

├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   └── default-avatar.png
│   │   ├── icons/
│   │   │   ├── bell.svg
│   │   │   └── calendar.svg
│   │   └── styles/
│   │       ├── globals.css
│   │       └── tailwind.css (if using Tailwind)

│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── InputField.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Pagination.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── dashboard/
│   │   │   ├── AttendanceCard.tsx
│   │   │   ├── AssignmentCard.tsx
│   │   │   └── UpcomingClassCard.tsx
│   │   └── forms/
│   │       ├── LoginForm.tsx
│   │       ├── RegisterForm.tsx
│   │       └── AssignmentForm.tsx

│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── dashboard/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── TeacherDashboard.tsx
│   │   │   └── StudentDashboard.tsx
│   │   ├── assignments/
│   │   │   ├── AssignmentList.tsx
│   │   │   ├── AssignmentDetails.tsx
│   │   │   └── SubmitAssignment.tsx
│   │   ├── classes/
│   │   │   ├── ClassList.tsx
│   │   │   ├── ClassDetails.tsx
│   │   │   └── ClassSchedule.tsx
│   │   ├── profile/
│   │   │   ├── UserProfile.tsx
│   │   │   └── EditProfile.tsx
│   │   └── NotFound.tsx

│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   ├── useGoogleClassroom.ts
│   │   └── usePagination.ts

│   ├── services/
│   │   ├── api/
│   │   │   ├── axiosConfig.ts
│   │   │   ├── authService.ts
│   │   │   ├── assignmentService.ts
│   │   │   ├── classroomService.ts
│   │   │   ├── attendanceService.ts
│   │   │   └── userService.ts
│   │   └── google/
│   │       └── googleClassroomAPI.ts

│   ├── store/
│   │   ├── index.ts
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── assignmentSlice.ts
│   │   │   ├── classSlice.ts
│   │   │   └── userSlice.ts

│   ├── types/
│   │   ├── auth.d.ts
│   │   ├── assignment.d.ts
│   │   ├── classroom.d.ts
│   │   ├── user.d.ts
│   │   └── index.d.ts

│   ├── utils/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── validators.ts

│   ├── App.tsx
│   ├── main.tsx
│   ├── routes.tsx
│   └── env.d.ts

├── .env
├── tsconfig.json
├── package.json
└── vite.config.ts (or webpack.config.js if CRA)
```

---

### **Key Features of This Structure**

1. **Separation of concerns** – Components are modularized (common, layout, dashboard, forms).
2. **Role-based pages** – Admin, Teacher, and Student dashboards.
3. **Services layer** – Centralized API calls with TypeScript support.
4. **Hooks** – Reusable logic (authentication, Google Classroom integration, pagination).
5. **Store (Redux Toolkit)** – Manages global state (auth, assignments, classes).
6. **Type definitions (`types/`)** – Strong TypeScript typing across the app.
7. **Google Classroom integration** – Through `services/google/googleClassroomAPI.ts`.
8. **Environment variables (`.env`)** – For API keys and secrets.
9. **Authentication & protected routes** – Role-based route guards via `ProtectedRoute.tsx`.

---
?
```
mkdir -p public src/{assets/{images,styles},components/{common,layout,dashboard,forms},features/{auth/{components,hooks,services},students/{components,hooks,services},teachers/{components,hooks,services},classes/{components,hooks,services},assignments/{components,hooks,services},google-classroom/{components,hooks,services}},hooks,pages/{auth,dashboard,assignments,classes,profile},routes,services/{api,google},store/slices,types,utils}

touch public/{index.html,manifest.json,favicon.ico}
touch src/assets/images/{logo.png,default-avatar.png}
touch src/assets/styles/{globals.css,tailwind.css}
touch src/components/common/{Button.tsx,InputField.tsx,Loader.tsx,Modal.tsx,Pagination.tsx}
touch src/components/layout/{Navbar.tsx,Sidebar.tsx,Footer.tsx,ProtectedRoute.tsx}
touch src/components/dashboard/{AttendanceCard.tsx,AssignmentCard.tsx,UpcomingClassCard.tsx}
touch src/components/forms/{LoginForm.tsx,RegisterForm.tsx,AssignmentForm.tsx}
touch src/features/auth/components/{LoginForm.tsx,RegisterForm.tsx}
touch src/features/auth/hooks/useAuth.ts
touch src/features/auth/services/authService.ts
touch src/features/students/components/{StudentList.tsx,StudentProfile.tsx}
touch src/features/students/hooks/useStudent.ts
touch src/features/students/services/studentService.ts
touch src/features/teachers/components/{TeacherList.tsx,TeacherProfile.tsx}
touch src/features/teachers/hooks/useTeacher.ts
touch src/features/teachers/services/teacherService.ts
touch src/features/classes/components/{ClassList.tsx,ClassSchedule.tsx}
touch src/features/classes/hooks/useClass.ts
touch src/features/classes/services/classService.ts
touch src/features/assignments/components/{AssignmentList.tsx,SubmitAssignment.tsx}
touch src/features/assignments/hooks/useAssignment.ts
touch src/features/assignments/services/assignmentService.ts
touch src/features/google-classroom/components/CourseList.tsx
touch src/features/google-classroom/hooks/useGoogleClassroom.ts
touch src/features/google-classroom/services/googleClassroomAPI.ts
touch src/hooks/{useAuth.ts,useFetch.ts,usePagination.ts}
touch src/pages/auth/{Login.tsx,Register.tsx}
touch src/pages/dashboard/{AdminDashboard.tsx,TeacherDashboard.tsx,StudentDashboard.tsx}
touch src/pages/assignments/{AssignmentListPage.tsx,SubmitAssignmentPage.tsx}
touch src/pages/classes/{ClassListPage.tsx,ClassSchedulePage.tsx}
touch src/pages/profile/{UserProfile.tsx,EditProfile.tsx}
touch src/pages/NotFound.tsx
touch src/routes/AppRoutes.tsx
touch src/services/api/{axiosConfig.ts,authService.ts,assignmentService.ts,classService.ts,studentService.ts,teacherService.ts}
touch src/services/google/googleClassroomAPI.ts
touch src/store/index.ts
touch src/store/slices/{authSlice.ts,assignmentSlice.ts,classSlice.ts,studentSlice.ts,teacherSlice.ts}
touch src/types/{auth.d.ts,assignment.d.ts,class.d.ts,student.d.ts,teacher.d.ts,index.d.ts}
touch src/utils/{constants.ts,helpers.ts,validators.ts}
touch src/{App.tsx,main.tsx,vite-env.d.ts}
touch .env tsconfig.json package.json vite.config.ts
```