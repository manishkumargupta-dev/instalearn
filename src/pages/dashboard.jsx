import React from "react";
import { useContext } from "react";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";

function Dashboard() {
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const user = firebase.auth().currentUser;
  return (
    <div>
      <h1>Welcome {user.displayName}</h1>
      <div>
        <button
          className="bg-blue-medium text-white p-2 px-4 mt-5 font-semibold"
          type="button"
          title="Sign Out"
          onClick={() => {
            firebase.auth().signOut();
            history.push(ROUTES.LOGIN);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              firebase.auth().signOut();
              history.push(ROUTES.LOGIN);
            }
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
