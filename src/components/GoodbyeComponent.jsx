/* eslint-disable react/jsx-props-no-spreading */

import { useEffect } from "react";
import { CSVLink } from "react-csv";
import PropTypes from "prop-types";

function GoodbyeComponent({ steps }) {
  const { setName } = steps;
  const date = new Date();
  const formattedDate = date.toLocaleString().replace(",", "");
  const username = setName ? setName.value : "unknown name";

  const historic = JSON.parse(localStorage.getItem("historic"));

  const headers = [
    { label: "Username", key: "username" },
    { label: "Date", key: "date" },
  ];

  const csvReport = {
    data: historic,
    headers,
    filename: "historic.csv",
  };

  useEffect(() => {
    const newRegister = {
      username,
      date: formattedDate,
    };
    if (historic) {
      localStorage.setItem(
        "historic",
        JSON.stringify([...historic, newRegister])
      );
    } else {
      localStorage.setItem("historic", JSON.stringify([newRegister]));
    }
  }, []);

  return (
    <>
      <p>
        Farewall, then. I gonna export our conversation, for you to remember me
        forever.
      </p>
      <div style={{ width: "100%" }}>
        <h3>Historic</h3>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {historic &&
              historic.map((register) => (
                <tr key={register.date}>
                  <td>{register.username}</td>
                  <td>{register.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <CSVLink {...csvReport}>Export to CSV</CSVLink>
      </div>
    </>
  );
}

GoodbyeComponent.defaultProps = {
  steps: undefined,
};

GoodbyeComponent.propTypes = {
  steps: PropTypes.shape({
    setName: PropTypes.shape({
      value: PropTypes.string,
    }),
  }),
};

export default GoodbyeComponent;
