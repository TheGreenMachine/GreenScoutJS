import "./App.css";
import { AuthProvider } from "./provider/authProvider";
import Routes from "./routes";

function App() {
  const accounts = [
    {
      
    },
  ];

  return (
    <AuthProvider>
      <Routes accounts={accounts} />
    </AuthProvider>
  );
}

export default App;
