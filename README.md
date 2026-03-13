Operix 

Operix is a startup operations platform designed to streamline task management, payroll automation, and financial forecasting.
It enables teams to manage workflows, automate salary slips, monitor activity logs, and analyze company burn rate using machine learning.

The platform provides role-based dashboards for Admins, Managers, and Employees with real-time collaboration features.

Features:

  Task Management:
    Kanban-based task tracking
    Drag-and-drop workflow updates
    Real-time task updates using Socket.io
    Task assignment by managers
    
  Payroll Automation:
    Monthly payroll generation via cron jobs
    Automatic salary slip generation
    Dynamic PDF creation
    Email delivery of salary slips
    
  Company Communication:
    Internal messaging inbox
    Admin announcements
    Activity timeline (audit logs)
    
  Google Calendar Integration:
    OAuth authentication
    Automatic creation of task deadlines
    Reminder integration with Google Calendar API
    
  Financial Analytics:
    Burn rate prediction using machine learning
    Expense-based cash runway forecasting
    Interactive charts for financial analysis
    
  Role-Based Access:
    The system supports three roles:
      Admin-Manage users, payroll, announcements, system logs
      Manager-Assign tasks and monitor team progress
      Employee-Manage assigned tasks and view salary slips
      
Tech Stack:

  Frontend:
    React
    Vite
    Socket.io Client
    Chart.js
    
  Backend:
    Node.js
    Express.js
    MongoDB
    JWT Authentication
    Nodemailer
    PDFKit
    
  Machine Learning Service:
    Flask
    Python
    HuggingFace / Forecasting Model
    
  External APIs:
    Google Calendar API
    Google OAuth 2.0

Real-Time System:
Operix uses Socket.io to enable real-time updates across the platform.
Events include:
  Task creation
  Task updates
  Task deletion
  Payroll notifications
  System announcements
This allows dashboards to update instantly without refreshing the page.

Project Highlights:
  Microservice architecture separating backend and ML service
  Real-time system with WebSockets
  Automated payroll generation
  Machine learning powered financial forecasting
  OAuth integration with Google services

Future Improvements:
  Mobile application
  Advanced financial analytics
  AI budgeting assistant
  Stripe payment integration
  Multi-company workspace support

Author
Parth Gandhi

GitHub:
https://github.com/parthgandhi22
