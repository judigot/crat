import axios from "axios";

interface Props {
  payload?: { [key: string]: string };
}

const accessToken: string = localStorage.getItem("accessToken") || "";

const User = (props: Props) => {
  const user = props.payload;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        (res: {
          data: { [key: string]: boolean };
          status: number;
          statusText: string;
        }) => {
          // const data: { [key: string]: boolean } = res.data;
          if (res.status === 200 && res.statusText === "OK") {
            localStorage.removeItem("accessToken");
            window.location.reload();
          }
        }
      )
      .catch((error) => {
        // Fail
        console.log(error);
      })
      .finally(() => {
        // Finally
      });
  };

  return (
    <>
      <h1>Welcome back, {user?.username}</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input type="submit" value="Log Out" />
      </form>
    </>
  );
};
export default User;
