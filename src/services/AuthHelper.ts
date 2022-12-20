const getCurentUser = () => {
  const userStorage: string | null = localStorage.getItem("user");
  const userObj = userStorage ? JSON.parse(userStorage) : "";

  return userObj.username;
};

export { getCurentUser };
