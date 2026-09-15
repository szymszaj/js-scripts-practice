import { partners } from "./data.js";

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
