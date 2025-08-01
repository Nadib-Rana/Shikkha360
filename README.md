
---

### 🧩 User Roles & Dashboard Features

| **Role**     | **Academic Features**                                                                 | **Administrative Features**                                                | **Communication & Others**                                                  |
|--------------|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|------------------------------------------------------------------------------|
| **Student**  | - View class timetable<br>- Submit assignments<br>- View exam results<br>- Download study materials | - View attendance record<br>- Check fee status & make payments<br>- View health records | - Receive notices & event updates<br>- Message teachers/admin<br>- Access teacher marketplace |
| **Teacher**  | - Manage class timetable<br>- Upload assignments<br>- Enter grades<br>- Share resources | - Mark student attendance<br>- View student performance<br>- Request classroom supplies | - Post notices<br>- Message students/guardians<br>- Sell resources/tutoring via marketplace |
| **Admin**    | - Create/manage classes & subjects<br>- Schedule exams<br>- Approve grades             | - Manage users & roles<br>- Generate timetables<br>- Oversee attendance<br>- Manage fees & payroll<br>- Moderate marketplace & needs board<br>- Manage library & health records | - Post school-wide notices/events<br>- View analytics dashboard<br>- Message all users |
| **Staff**    | *(Not academic)*                                                                      | - Mark attendance<br>- Request leave<br>- View assigned tasks<br>- Access payroll | - View notices/events<br>- Message admin/teachers<br>- Request supplies via needs board |
| **Guardian** | - View child’s timetable, assignments, and results                                     | - Track child’s attendance<br>- Pay fees<br>- View child’s health updates   | - Receive school notices/events<br>- Message teachers/admin<br>- Access shared resources |

---

### 🔍 Notes:
- Each dashboard should be **role-based**, showing only relevant modules.
- You can implement this using **React conditional rendering** + **JWT-based role validation**.
- Consider using **modular components** like `<NoticeBoard />`, `<FeeStatus />`, `<AssignmentPanel />` etc., reused across roles with props.

---

