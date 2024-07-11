import ThemeDefault from "./config/theme/ThemeDefault";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <ThemeDefault>
      <AppRoutes />
    </ThemeDefault>
  );
}

export default App;