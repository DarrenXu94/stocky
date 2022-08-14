const converter = new showdown.Converter();

export const bio = {
  name: "Darren Xu",
  description: `
Hi there,

My name is Darren. I am a full stack developer with a passion for UI development and design. I enjoy crafting intuitive, user-friendly web interfaces that are exciting and easy to use. I've been building all kinds of web things for a while, and I'm always up for new challenges.`,
  links: {
    website: "https://darrenxu.com/",
    linkedIn: "https://www.linkedin.com/in/darren-xu-profile/",
    github: "https://github.com/DarrenXu94",
    blog: "https://blog.darrenxu.com/",
  },
};

export const convertBioToHTML = () => {
  return `<div>
  <h3>${bio.name}</h3>
  ${converter.makeHtml(bio.description)}
  
  </div>`;
};
