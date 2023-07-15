/* eslint-disable react/jsx-props-no-spreading */

import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import PropTypes from "prop-types";

function GoodbyeComponent({ steps }) {
  const [historicArray, setHistoricArray] = useState([]);
  const { setName } = steps;
  const date = new Date();
  const formattedDate = date.toLocaleString().replace(",", "");
  const username = setName ? setName.value : "unknown name";

  const headers = [
    { label: "Username", key: "username" },
    { label: "Date", key: "date" },
  ];

  useEffect(() => {
    const historic = JSON.parse(localStorage.getItem("historic"));
    const newRegister = {
      username,
      date: formattedDate,
    };
    if (historic) {
      localStorage.setItem(
        "historic",
        JSON.stringify([...historic, newRegister])
      );
      const updatedHistoric = JSON.parse(localStorage.getItem("historic"));
      setHistoricArray(updatedHistoric);
    } else {
      localStorage.setItem("historic", JSON.stringify([newRegister]));
      const updatedHistoric = JSON.parse(localStorage.getItem("historic"));
      setHistoricArray(updatedHistoric);
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
            {historicArray &&
              historicArray.map((register) => (
                <tr key={register.date}>
                  <td>{register.username}</td>
                  <td>{register.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <CSVLink data={historicArray} headers={headers} filename="historic.csv">
          Export to CSV
        </CSVLink>
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
