import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

function AppContent() {
    const location = useLocation();

    const showAbout = ['/', '/login'].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen max-w-full overflow-x-hidden">
            <Header />
            <SubHeader />

            <Routes>
                <Route path="/" element={<MainFeatures />} />
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
                <Route path="/ver/:id" element={<ViewACWrapper />} />
                <Route path="/buscar" element={<SearchAC />} />
                <Route path="/login" element={<Login />} />
            </Routes>

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
