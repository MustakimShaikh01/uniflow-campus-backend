import { students } from "../data/students.js";

export const getStudents = (req, res) => {
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

export const searchStudents = (req, res) => {
  const { name, department, year, rollNo } = req.query;
  if (!name && !department && !year && !rollNo) {
    return res
      .status(400)
      .json({ message: "At least one search parameter is required (name, department, year, or rollNo)" });
  }

  let results = [...students];
  if (name) {
    const searchTerms = name.toLowerCase().trim().split(/\s+/);
    results = results.filter((student) => {
      const studentName = student.name.toLowerCase();
      return searchTerms.every(term => studentName.includes(term));
    });
  }
  if (department) {
    results = results.filter((student) =>
      student.department.toLowerCase().includes(department.toLowerCase())
    );
  }
  if (year) {
    const yearNum = Number(year);
    results = results.filter((student) => student.year === yearNum);
  }
  if (rollNo) {
    results = results.filter((student) =>
      student.rollNo.toLowerCase().includes(rollNo.toLowerCase())
    );
  }
  res.json(results);
};
