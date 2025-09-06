import bcrypt from "bcryptjs";

// Pre-computed password hashes for "password123"
const HASHED_STUDENT_PASSWORD = "$2a$10$o0KZ6X4iDtlHsVszUyxy4uNdGG6vFOVnbT2G44M0NeisuhVSaXoKC";
const HASHED_FACULTY_PASSWORD = "$2a$10$o0KZ6X4iDtlHsVszUyxy4uNdGG6vFOVnbT2G44M0NeisuhVSaXoKC";

export const users = [
  {
    id: 1,
    email: "student@example.com",
    password_hash: HASHED_STUDENT_PASSWORD,
    first_name: "John",
    last_name: "Doe",
    role: "student",
    student_id: "CS001",
    department: "Computer Science",
    created_at: "2025-09-05T10:00:00Z",
    updated_at: "2025-09-05T10:00:00Z"
  },
  {
    id: 2,
    email: "faculty@university.edu",
    password_hash: HASHED_FACULTY_PASSWORD,
    first_name: "Dr. Jane",
    last_name: "Professor",
    role: "faculty",
    faculty_id: "F001",
    department: "Computer Science",
    created_at: "2025-09-05T10:00:00Z",
    updated_at: "2025-09-05T10:00:00Z"
  },
  {
    id: 3,
    email: "pitambersingh379@gmail.com",
    password_hash: HASHED_STUDENT_PASSWORD,
    first_name: "Pitamber",
    last_name: "Singh",
    role: "student",
    student_id: "CS002",
    department: "Computer Science",
    created_at: "2025-09-05T16:52:44Z",
    updated_at: "2025-09-05T16:52:44Z"
  },
  {
    id: 4,
    email: "alice.chen@university.edu",
    password_hash: HASHED_STUDENT_PASSWORD,
    first_name: "Alice",
    last_name: "Chen",
    role: "student",
    student_id: "EE003",
    department: "Electrical Engineering",
    created_at: "2025-08-15T10:00:00Z",
    updated_at: "2025-08-15T10:00:00Z"
  },
  {
    id: 5,
    email: "bob.wilson@university.edu",
    password_hash: HASHED_STUDENT_PASSWORD,
    first_name: "Bob",
    last_name: "Wilson",
    role: "student",
    student_id: "BUS004",
    department: "Business Administration",
    created_at: "2025-08-20T14:00:00Z",
    updated_at: "2025-08-20T14:00:00Z"
  }
];

export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};

export const getUserById = (id: number) => {
  return users.find((user) => user.id === id);
};

export const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const activities = [
  {
    id: 1,
    student_id: 1,
    title: "Published Research Paper on AI Ethics",
    description: "Co-authored a research paper titled 'Ethical Implications of Large Language Models in Education' published in the International Journal of AI and Ethics",
    category: "Research & Publications",
    date: "2025-08-15",
    impact_level: "High",
    points: 50,
    skills_gained: ["Academic Writing", "Research Methodology", "AI Ethics", "Critical Analysis"],
    status: "approved",
    created_at: "2025-08-15T10:00:00Z",
    updated_at: "2025-08-15T10:00:00Z"
  },
  {
    id: 2,
    student_id: 1,
    title: "Led Debate Team to National Championship",
    description: "Captain of university debate team that won first place at the National Intercollegiate Debate Championship. Led team of 8 members through rigorous training and strategy sessions.",
    category: "Leadership & Extracurricular",
    date: "2025-07-20",
    impact_level: "High",
    points: 45,
    skills_gained: ["Public Speaking", "Critical Thinking", "Team Leadership", "Strategy Planning"],
    status: "approved",
    created_at: "2025-07-20T15:30:00Z",
    updated_at: "2025-07-20T15:30:00Z"
  },
  {
    id: 3,
    student_id: 1,
    title: "Volunteered at Local Food Bank",
    description: "Organized and participated in weekly food distribution drives, serving over 200 families per week. Coordinated volunteer schedules and managed inventory systems.",
    category: "Community Service",
    date: "2025-06-10",
    impact_level: "Medium",
    points: 30,
    skills_gained: ["Community Engagement", "Project Management", "Empathy", "Organization"],
    status: "approved",
    created_at: "2025-06-10T09:00:00Z",
    updated_at: "2025-06-10T09:00:00Z"
  },
  {
    id: 4,
    student_id: 1,
    title: "Completed Google Cloud Professional Certificate",
    description: "Successfully completed the Google Cloud Professional Cloud Architect certification, demonstrating expertise in cloud infrastructure design and management.",
    category: "Professional Development",
    date: "2025-05-25",
    impact_level: "Medium",
    points: 35,
    skills_gained: ["Cloud Computing", "System Architecture", "Google Cloud Platform", "Infrastructure Design"],
    status: "approved",
    created_at: "2025-05-25T14:20:00Z",
    updated_at: "2025-05-25T14:20:00Z"
  },
  {
    id: 5,
    student_id: 1,
    title: "Developed Mobile App for Campus Navigation",
    description: "Created 'CampusGuide' - a React Native app that helps new students navigate campus. App has been downloaded by over 500 students and features real-time location tracking.",
    category: "Projects",
    date: "2025-04-12",
    impact_level: "High",
    points: 55,
    skills_gained: ["Mobile Development", "React Native", "UI/UX Design", "API Integration"],
    status: "approved",
    created_at: "2025-04-12T11:45:00Z",
    updated_at: "2025-04-12T11:45:00Z"
  },
  {
    id: 6,
    student_id: 1,
    title: "Tutored Struggling Students in Mathematics",
    description: "Provided free tutoring sessions for first-year students struggling with calculus and linear algebra. Helped 15 students improve their grades by an average of 1.2 GPA points.",
    category: "Academic Support",
    date: "2025-03-08",
    impact_level: "Medium",
    points: 25,
    skills_gained: ["Teaching", "Patience", "Communication", "Mathematics"],
    status: "approved",
    created_at: "2025-03-08T16:00:00Z",
    updated_at: "2025-03-08T16:00:00Z"
  },
  {
    id: 7,
    student_id: 3,
    title: "Won First Place in Hackathon",
    description: "Led a team of 4 developers to win the annual university hackathon with an innovative fintech solution for student budget management.",
    category: "Competitions & Awards",
    date: "2025-08-20",
    impact_level: "High",
    points: 60,
    skills_gained: ["Team Leadership", "Full-Stack Development", "Problem Solving", "Innovation"],
    status: "approved",
    created_at: "2025-08-20T18:30:00Z",
    updated_at: "2025-08-20T18:30:00Z"
  },
  {
    id: 8,
    student_id: 3,
    title: "Internship at Microsoft Azure Team",
    description: "Completed a 12-week software engineering internship with Microsoft's Azure team, working on cloud infrastructure optimization tools.",
    category: "Professional Development",
    date: "2025-07-15",
    impact_level: "High",
    points: 70,
    skills_gained: ["Cloud Computing", "Software Engineering", "C#", "Azure Services"],
    status: "approved",
    created_at: "2025-07-15T12:00:00Z",
    updated_at: "2025-07-15T12:00:00Z"
  },
  {
    id: 9,
    student_id: 4,
    title: "Organized University Tech Conference",
    description: "Planned and executed the annual 'Future Tech Summit' with over 500 attendees, 20 speakers, and 15 tech company sponsors.",
    category: "Leadership & Extracurricular",
    date: "2025-06-30",
    impact_level: "High",
    points: 65,
    skills_gained: ["Event Management", "Networking", "Sponsorship", "Public Relations"],
    status: "approved",
    created_at: "2025-06-30T08:00:00Z",
    updated_at: "2025-06-30T08:00:00Z"
  },
  {
    id: 10,
    student_id: 4,
    title: "Built IoT Smart Home System",
    description: "Designed and implemented a complete IoT smart home automation system using Arduino, Raspberry Pi, and custom mobile app for control.",
    category: "Projects",
    date: "2025-05-18",
    impact_level: "Medium",
    points: 40,
    skills_gained: ["IoT Development", "Hardware Programming", "Mobile Development", "System Integration"],
    status: "approved",
    created_at: "2025-05-18T13:30:00Z",
    updated_at: "2025-05-18T13:30:00Z"
  },
  {
    id: 11,
    student_id: 5,
    title: "Started Student Investment Club",
    description: "Founded and led the university's first student investment club, managing a portfolio of $10,000 and achieving 15% returns in the first semester.",
    category: "Leadership & Extracurricular",
    date: "2025-08-01",
    impact_level: "High",
    points: 50,
    skills_gained: ["Financial Analysis", "Leadership", "Investment Strategy", "Risk Management"],
    status: "approved",
    created_at: "2025-08-01T10:30:00Z",
    updated_at: "2025-08-01T10:30:00Z"
  },
  {
    id: 12,
    student_id: 5,
    title: "Completed Digital Marketing Certification",
    description: "Earned Google Digital Marketing and E-commerce Professional Certificate, demonstrating expertise in digital marketing strategies and analytics.",
    category: "Professional Development",
    date: "2025-07-10",
    impact_level: "Medium",
    points: 30,
    skills_gained: ["Digital Marketing", "SEO", "Social Media Marketing", "Analytics"],
    status: "approved",
    created_at: "2025-07-10T14:45:00Z",
    updated_at: "2025-07-10T14:45:00Z"
  }
];

export const getActivitiesByStudent = (userId: number) => {
  return activities.filter((activity) => activity.student_id === userId);
};

export const getStudentStats = (userId: number) => {
  const userActivities = getActivitiesByStudent(userId);
  const approvedActivities = userActivities.filter(a => a.status === 'approved');
  const pendingActivities = userActivities.filter(a => a.status === 'submitted');
  
  return {
    total_activities: userActivities.length,
    total_points: approvedActivities.reduce((sum, a) => sum + a.points, 0),
    approved_activities: approvedActivities.length,
    pending_activities: pendingActivities.length
  };
};
