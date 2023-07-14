import { useEffect } from "react";

function GoodbyeComponent({ steps }) {
  const { setName } = steps;
  const date = new Date();
  const formattedDate = date.toLocaleString();
  const username = setName ? setName.value : "unknown name";

  const historic = JSON.parse(localStorage.getItem("historic"));

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

  const exportHistoric = () => {
    console.log(steps);
  };

  return (
    <>
      <p>
        Farewall, then. I gonna export our conversation, for you to remember me
        forever.
      </p>
      <div style={{ width: "100%" }}>
        <h3>Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {historic.map((register) => (
              <tr key={register.date}>
                <td>{register.username}</td>
                <td>{register.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={exportHistoric}>
          Export in CSV
        </button>
      </div>
    </>
  );
}

export default GoodbyeComponent;
