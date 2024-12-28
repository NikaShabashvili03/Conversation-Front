import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useMemo } from "react";
import Loader from "./components/Loader";
import LoginPage from "./pages/auth/LoginPage";
import Aside from "./components/Aside";
import ConversationPage from "./pages/conversation/ConversationPage";
import ConversationIdPage from "./pages/conversation/[id]/ConversationIdPage";
import { ConversationContext } from "./context/ConversationContext";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  const { status } = useAuth();

  const isLoading = useMemo(() => status === 'loading' || status === 'idle', [status]);

  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <Routes>
        <Route
          path="/auth/login"
          element={<LoginPage />}
        />
        <Route
          path="/auth/register"
          element={<RegisterPage />}
        />
        <Route element={<Aside/>}>
          <Route path="/" element={<div>Hello</div>}/>
          <Route path="/conversation" element={
              <ConversationContext>
                <ConversationPage/>
              </ConversationContext>
          }>
            <Route path="/conversation/:id" element={<ConversationIdPage/>}/>
          </Route>
        </Route>
        
    </Routes>
  )
}

export default App
