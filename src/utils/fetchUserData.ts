export const fetchUserData = async () => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    try {
      const response = await fetch(`http://localhost:3000/users/fetch-data/${userId}`,{
          method: "GET",
        }
      );
      const data = await response.json();
      if(!response.ok) throw new Error(data.message)
      console.log({ data });
      const userData = data.userData;
      //Aqui en verdad deberia guardarlo en useState y hacerlo cada que app renderize por primera vez o cada que edite algo del usuario
      if (userData) {
        localStorage.setItem("username", userData.username);
        localStorage.setItem("email", userData.email);
        localStorage.setItem("profile_pic", userData.profile_pic);
      } else {
        throw new Error("User data not found in response");
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log("An unknown error occurred", error);
    }
  } else alert("UserId not found in localStorage");
};