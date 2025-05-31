import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import "./App.css";

const GET_DATA = gql`
  query {
    hello
  }
`;

function App() {
  const { data } = useQuery(GET_DATA);

  return <>{data.hello}</>;
}

export default App;
