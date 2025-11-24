import { students } from "../data/students.js";

export const getStudents = (req, res) => {
  const sort = (req.query.sort || "").toString().toLowerCase();
  if (sort === "asc" || sort === "desc") {
    return res.json(sortStudentsByRoll(students, sort));
  }

  res.json(students);
};

export const getStudentById = (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
};

export const createStudent = (req, res) => {
  const { name, rollNo, department, year } = req.body;
  const newStudent = {
    id: students.length + 1,
    name,
    rollNo,
    department,
    year,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
};


// Helper function for TASK-15
export const sortStudentsByRoll = (arr = [], sortOrder = "") => {
  const order = String(sortOrder || "").toLowerCase();
  if (order !== "asc" && order !== "desc") return Array.isArray(arr) ? [...arr] : [];

  const dir = order === "asc" ? 1 : -1;

  return [...arr].sort((a, b) => {
    const na = Number(a?.rollNo);
    const nb = Number(b?.rollNo);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) return (na - nb) * dir;
    return String(a?.rollNo ?? "").localeCompare(String(b?.rollNo ?? "")) * dir;
  });
};
