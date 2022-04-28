import axios from "axios";
import { Navigate } from "react-router-dom";

interface Props {
  payload?: any;
}

const User = (props: Props) => {
  if (!props.payload?.isAuth) {
    return <Navigate to="/login" replace />;
  }

  const user = props.payload.userData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer toookeeeen`,
          },
        }
      )
      .then(
        (res: {
          data: { [key: string]: boolean };
          status: number;
          statusText: string;
        }) => {
          const data: { [key: string]: boolean } = res.data;
          if (res.status === 200 && res.statusText === "OK") {
            document.cookie = "accessToken=";
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
      <h1>Welcome back, {user.username}</h1>
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
