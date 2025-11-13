// In-memory database (replace with real DB in production)
const users = [];

const db = {
  users,
  
  findUserByEmail: (email) => {
    return users.find(user => user.email === email);
  },
  
  createUser: (userData) => {
    const user = {
      id: users.length + 1,
      ...userData,
      createdAt: new Date()
    };
    users.push(user);
    return user;
  },
  
  findUserById: (id) => {
    return users.find(user => user.id === id);
  }
};

module.exports = db;
