import { useEffect } from "react";

function GoodbyeComponent({ steps }) {
  console.log(steps);
  const { setName } = steps;
  const date = new Date();
  const formattedDate = date.toLocaleString();
  const username = setName ? setName.value : "unknown name";

  useEffect(() => {
    console.log("use effectzou");
    const historic = JSON.parse(localStorage.getItem("historic"));
    const newRegister = {
      username: username,
      date: formattedDate,
    };
    if (historic) {
      console.log("entrou no if");
      console.log(historic);
      console.log(newRegister);
      localStorage.setItem(
        "historic",
        JSON.stringify([...historic, newRegister])
      );
      console.log(JSON.parse(localStorage.getItem("historic")));
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
          <tbody>
            <tr>
              <td>Username</td>
              <td>Date</td>
            </tr>
            <tr>
              <td>{username}</td>
              <td>{formattedDate}</td>
            </tr>
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
