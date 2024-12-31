# WorkHours Client

This repository contains the **WorkHours Client**, a React-based frontend application designed to manage and track work hours for users. The client communicates with the backend API provided by the **[WorkHours Server](https://github.com/your-username/workhours-server)** repository. 

---

## Features

- **User Login:** Secure login system for users and admin roles.
- **Work Time Management:** 
  - Users can set their work start and end times.
  - Admins can view and modify work hours for all users.
- **Live Time Display:** Displays the current time in Germany, updating in real-time.
- **Role-Based Views:** Separate interfaces for users and admins.
- **Responsive Design:** Designed to work on both desktop and mobile devices.

---

## Prerequisites

To run this project, you will need:
1. **Node.js** and **npm** installed on your machine.
2. The **WorkHours Server** repository. Clone and set up the server using the instructions in its [README file](https://github.com/tomeryul/workhours-server).

---

## Getting Started


### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Ensure that the `WorkHours Server` is running and update any required API URLs in the project configuration.

### Start the Application

```bash
npm start
```

This will start the development server. The application will be accessible at `http://localhost:3001

---

## Screenshots

- Login page (both for users and admin).
<img width="1440" alt="Screenshot 2024-12-31 at 10 21 54" src="https://github.com/user-attachments/assets/6c4f7784-57a4-4257-be86-80406e70630c" />
- Set the start time for a normal user.
<img width="1440" alt="Screenshot 2024-12-31 at 10 22 02" src="https://github.com/user-attachments/assets/6138249b-0f60-48a5-a188-8053eed82001" />
- Set the end time for a normal user.
<img width="1440" alt="Screenshot 2024-12-31 at 10 22 07" src="https://github.com/user-attachments/assets/f44861dc-701a-4f5b-ac6c-aedf3afcb6f6" />
- Viewing the StartTime and the EndTime of the current user loged in.
<img width="1440" alt="Screenshot 2024-12-31 at 10 22 13" src="https://github.com/user-attachments/assets/4abd3f0c-ab06-4919-9e0e-71a750da150c" />
- Admin page.
<img width="1440" alt="Screenshot 2024-12-31 at 10 22 24" src="https://github.com/user-attachments/assets/f84c3913-4687-406c-aa56-33609a55f07a" />
- Viewing all the users StartTime and EndTime (only admin).
<img width="1440" alt="Screenshot 2024-12-31 at 10 22 30" src="https://github.com/user-attachments/assets/d13679b0-2891-4e5b-a35a-f93b1e87e6ac" />
- Modifying StartTime and EndTime for a specific user (only admin).
<img width="1440" alt="Screenshot 2024-12-31 at 10 23 02" src="https://github.com/user-attachments/assets/2823ed59-4177-4903-bfba-f2c31884d7a2" />
- Implement the changes to the chosen user ( only admin).
<img width="1440" alt="Screenshot 2024-12-31 at 10 23 12" src="https://github.com/user-attachments/assets/0b66bbfc-bc6c-486c-a556-6d8dd71486e7" />



---

## Using the Application

1. **Run the Backend:**
   Start the **WorkHours Server** by following its setup instructions.
2. **Login:**
   Use the default credentials defined in the `WorkHours Server` (e.g., `admin@mail.com` for admin access).
3. **Admin Features:**
   - View all users' work hours.
   - Modify work hours for any user.
4. **User Features:**
   - Set your start and end times.
   - View your work hours.

---

## Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

