import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/organisms/Header';
import SubHeader from './components/organisms/SubHeader';
import MainFeatures from './components/organisms/MainFeatures';
import AboutSection from './components/organisms/AboutSection';
import Footer from './components/organisms/Footer';
import RegisterAC from './components/organisms/ManageAC';
import ViewACWrapper from './components/organisms/ViewACWrapper';
import SearchAC from './components/organisms/SearchAC';
import ListAdmin from './components/organisms/ListAdmin';
import Login from './components/organisms/Login';
import AdminUsers from './components/organisms/AdminUsers';
import PrivateRoute from './components/organisms/PrivateRoute';
import AuthRoute from './components/organisms/AuthRoute';
import UserRegister from './components/organisms/UserRegister';
import UserRecovery from './components/organisms/UserRecovery';
import Dashboard from './components/organisms/Dashboard';
import NotFound from './components/organisms/NotFound';

function AppContent() {
    const location = useLocation();

    const showAbout = ['/', '/login'].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen max-w-full overflow-x-hidden">
            <Header />
            <SubHeader />
            <main className="flex-1 flex flex-col">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registerUser" element={<UserRegister />} />
                    <Route path="/recoveryUser" element={<UserRecovery />} />

                    <Route
                        path="/"
                        element={
                            <AuthRoute>
                                <MainFeatures />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <AuthRoute>
                                <Dashboard />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/ver/:id"
                        element={
                            <AuthRoute>
                                <ViewACWrapper />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/buscar"
                        element={
                            <AuthRoute>
                                <SearchAC />
                            </AuthRoute>
                        }
                    />

                    <Route
                        path="/registrar"
                        element={
                            <PrivateRoute>
                                <RegisterAC />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/registrar/:id"
                        element={
                            <PrivateRoute>
                                <RegisterAC />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/listas"
                        element={
                            <PrivateRoute>
                                <ListAdmin />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/usuarios"
                        element={
                            <PrivateRoute>
                                <AdminUsers />
                            </PrivateRoute>
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            {showAbout && <AboutSection />}
            <Footer />
        </div>
    );
}

function App() {
    return (
        <Router>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#111827',
                        color: '#fff',
                    },
                }}
            />
            <AppContent />
        </Router>
    );
}

export default App;
