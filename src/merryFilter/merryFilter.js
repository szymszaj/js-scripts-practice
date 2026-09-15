const partners = [
  {
    id: 1,
    name: "Anna",
    age: 27,
    city: "New York",
    hobby: ["cooking", "traveling", "yoga"],
    skills: ["cooking", "languages", "music"],
  },
  {
    id: 2,
    name: "Kate",
    age: 31,
    city: "Chicago",
    hobby: ["sports", "reading"],
    skills: ["sports", "programming"],
  },
  {
    id: 3,
    name: "Olivia",
    age: 24,
    city: "Los Angeles",
    hobby: ["music", "photography"],
    skills: ["music", "photography", "cooking"],
  },
  {
    id: 4,
    name: "Maggie",
    age: 29,
    city: "New York",
    hobby: ["traveling", "sports"],
    skills: ["languages", "sports"],
  },
];

const filterPartners = (arr, filters = {}) => {
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

console.log(filterPartners(partners, { minAge: 27 }));

console.log(filterPartners(partners, { city: "New York" }));

console.log(filterPartners(partners, { skills: ["cooking", "sports"] }));

console.log(
  filterPartners(partners, {
    minAge: 24,
    maxAge: 30,
    city: "New York",
    skills: ["languages"],
  }),
);
