const partnerki = [
  {
    id: 1,
    name: "Anna",
    age: 27,
    city: "Warszawa",
    hobby: ["gotowanie", "podróże", "joga"],
    skills: ["gotowanie", "języki obce", "muzyka"],
  },
  {
    id: 2,
    name: "Kasia",
    age: 31,
    city: "Kraków",
    hobby: ["sport", "czytanie"],
    skills: ["sport", "programowanie"],
  },
  {
    id: 3,
    name: "Ola",
    age: 24,
    city: "Wrocław",
    hobby: ["muzyka", "fotografia"],
    skills: ["muzyka", "fotografia", "gotowanie"],
  },
  {
    id: 4,
    name: "Magda",
    age: 29,
    city: "Warszawa",
    hobby: ["podróże", "sport"],
    skills: ["języki obce", "sport"],
  },
];

const filterPartnerki = (arr, filters = {}) => {
  return arr.filter((p) => {
    if (filters.minAge !== undefined && p.age < filters.minAge) return false;
    if (filters.maxAge !== undefined && p.age > filters.maxAge) return false;
    if (filters.city && p.city !== filters.city) return false;

    if (filters.skills && filters.skills.length > 0) {
      const hasAllSkills = filters.skills.every((skill) =>
        p.skills.includes(skill),
      );
      if (!hasAllSkills) return false;
    }

    if (filters.hobby && filters.hobby.length > 0) {
      const hasAnyHobby = filters.hobby.some((h) => p.hobby.includes(h));
      if (!hasAnyHobby) return false;
    }

    return true;
  });
};
