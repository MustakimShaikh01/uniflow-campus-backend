import { faculty } from "../data/faculty.js";

export const getFaculty = (req, res) => {
  const { department } = req.query;

  if (department) {
    const filtered = faculty.filter(
      (f) => f.department.toLowerCase() === department.toLowerCase()
    );
    return res.json(filtered);
  }

  res.json(faculty);
};
