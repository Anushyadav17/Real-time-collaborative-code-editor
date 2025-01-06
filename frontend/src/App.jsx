import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import CreateProjectPage from "./pages/CreateProjectPage";
import JoinProject from "./pages/JoinProject"
import ProjectPage from "./pages/ProjectPage";
import Error from "./pages/Error"
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateRoute from "./components/PrivateRoute"
import ViewProject from "./pages/ViewProject";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/view-project" element={<ViewProject/>} />
        <Route path="/view-project/details" element={<ProjectDetails/>} />
              

        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />

        <Route path="/create-project" element={
          <PrivateRoute>
            <CreateProjectPage/>
          </PrivateRoute>
        } />

        <Route path="/join-project" element={
          <PrivateRoute>
            <JoinProject/>
          </PrivateRoute>
        } />

        <Route path="/project/:projectId" element={
          <ProtectedRoute>
            <ProjectPage/>
          </ProtectedRoute>
        }/>
            
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
