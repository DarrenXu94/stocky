const converter = new showdown.Converter();

// List your work history
export const history = [
  {
    company: "Pragma Partners",
    role: "Fullstack developer",
    dates: "2021 - Current",
    // Markdown
    description: `
Worked as a fullstack developer in delivering a new platform for millions of users across the country. Feature development included:
- VueJs development
    - Component libraries
    - Assisting feature teams
- .Net RESTful API development`,
  },
];

export const convertHistoryToHTML = (history) => {
  return `<div>
  <h3>${history.company}</h3>
  ${converter.makeHtml(history.description)}
  
  </div>`;
};
