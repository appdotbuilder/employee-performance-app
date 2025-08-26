import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Dashboard({ auth }: Props) {
    const user = auth.user;
    const isAdmin = user.role === 'admin';

    return (
        <div className="min-vh-100 bg-light">
            <Head title="Dashboard" />
            
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
                <div className="container">
                    <Link className="navbar-brand fw-bold" href="/">
                        📊 Penilaian Kinerja Karyawan
                    </Link>
                    
                    <div className="ms-auto d-flex align-items-center gap-3">
                        <span className="text-white">
                            Halo, {user.name}
                        </span>
                        <div className="dropdown">
                            <button 
                                className="btn btn-outline-light btn-sm dropdown-toggle" 
                                type="button" 
                                data-bs-toggle="dropdown"
                            >
                                Menu
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" href="/">
                                        🏠 Home
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link 
                                        className="dropdown-item" 
                                        href="/logout" 
                                        method="post" 
                                        as="button"
                                    >
                                        🚪 Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h1 className="h2 mb-1">
                                    Dashboard {isAdmin ? '👨‍💼 Admin' : '👨‍💻 Karyawan'}
                                </h1>
                                <p className="text-muted">
                                    Selamat datang, {user.name}!
                                </p>
                            </div>
                        </div>

                        {/* Admin Dashboard */}
                        {isAdmin && (
                            <>
                                <div className="row g-4 mb-4">
                                    <div className="col-md-6 col-lg-3">
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-body text-center">
                                                <div className="text-primary mb-3" style={{ fontSize: '3rem' }}>
                                                    👥
                                                </div>
                                                <h5 className="card-title">Manajemen Karyawan</h5>
                                                <p className="card-text text-muted small">
                                                    Kelola data karyawan dan divisi
                                                </p>
                                                <Link 
                                                    href="/employees" 
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Kelola
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-lg-3">
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-body text-center">
                                                <div className="text-success mb-3" style={{ fontSize: '3rem' }}>
                                                    📊
                                                </div>
                                                <h5 className="card-title">Indikator KPI</h5>
                                                <p className="card-text text-muted small">
                                                    Atur indikator dan bobot penilaian
                                                </p>
                                                <Link 
                                                    href="/kpi-indicators" 
                                                    className="btn btn-success btn-sm"
                                                >
                                                    Kelola
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-lg-3">
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-body text-center">
                                                <div className="text-warning mb-3" style={{ fontSize: '3rem' }}>
                                                    ⭐
                                                </div>
                                                <h5 className="card-title">Penilaian Kinerja</h5>
                                                <p className="card-text text-muted small">
                                                    Buat dan kelola penilaian karyawan
                                                </p>
                                                <Link 
                                                    href="/performance-assessments" 
                                                    className="btn btn-warning btn-sm"
                                                >
                                                    Kelola
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-lg-3">
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-body text-center">
                                                <div className="text-info mb-3" style={{ fontSize: '3rem' }}>
                                                    💼
                                                </div>
                                                <h5 className="card-title">Manajemen Pekerjaan</h5>
                                                <p className="card-text text-muted small">
                                                    Kelola pekerjaan dan progress
                                                </p>
                                                <Link 
                                                    href="/jobs" 
                                                    className="btn btn-info btn-sm"
                                                >
                                                    Kelola
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 shadow-sm">
                                    <div className="card-header bg-primary text-white">
                                        <h5 className="mb-0">📈 Laporan Kinerja</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">
                                            Lihat laporan kinerja lengkap dari semua karyawan dengan 
                                            analisis KPI dan progress pekerjaan.
                                        </p>
                                        <Link 
                                            href="/reports/performance" 
                                            className="btn btn-primary"
                                        >
                                            📊 Lihat Laporan
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Employee Dashboard */}
                        {!isAdmin && (
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="card border-0 shadow-sm">
                                        <div className="card-header bg-success text-white">
                                            <h5 className="mb-0">📊 Kinerja Saya</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">
                                                Lihat laporan kinerja Anda termasuk nilai KPI 
                                                dan progress pekerjaan yang sedang dikerjakan.
                                            </p>
                                            <Link 
                                                href="/my-performance" 
                                                className="btn btn-success"
                                            >
                                                📈 Lihat Kinerja Saya
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-lg-4">
                                    <div className="card border-0 shadow-sm">
                                        <div className="card-body text-center">
                                            <div className="text-info mb-3" style={{ fontSize: '4rem' }}>
                                                👨‍💻
                                            </div>
                                            <h5>Selamat Bekerja!</h5>
                                            <p className="text-muted small">
                                                Terus tingkatkan kinerja Anda untuk 
                                                mencapai target yang optimal.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}