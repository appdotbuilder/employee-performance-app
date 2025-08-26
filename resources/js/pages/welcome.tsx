import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Props {
    stats?: {
        employees_count: number;
        kpi_indicators_count: number;
        assessments_count: number;
        jobs_count: number;
    };
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth, stats }: Props) {
    return (
        <div className="min-vh-100 bg-light">
            <Head title="Penilaian Kinerja Karyawan" />
            
            {/* Header */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
                <div className="container">
                    <Link className="navbar-brand fw-bold" href="/">
                        📊 Penilaian Kinerja Karyawan
                    </Link>
                    
                    <div className="ms-auto">
                        {auth?.user ? (
                            <div className="d-flex align-items-center gap-3">
                                <span className="text-white">
                                    Halo, {auth.user.name}
                                </span>
                                <Link 
                                    href="/dashboard" 
                                    className="btn btn-light btn-sm"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link 
                                    href="/login" 
                                    className="btn btn-outline-light btn-sm"
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="btn btn-light btn-sm"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-primary text-white py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-4 fw-bold mb-4">
                                🎯 Sistem Penilaian Kinerja Karyawan
                            </h1>
                            <p className="lead mb-4">
                                Aplikasi komprehensif untuk mengelola dan menilai kinerja 
                                karyawan dengan sistem KPI yang terstruktur dan pelaporan 
                                yang mendalam.
                            </p>
                            {!auth?.user && (
                                <div className="d-flex gap-3">
                                    <Link 
                                        href="/login" 
                                        className="btn btn-warning btn-lg px-4"
                                    >
                                        🚀 Mulai Sekarang
                                    </Link>
                                    <Link 
                                        href="/register" 
                                        className="btn btn-outline-light btn-lg px-4"
                                    >
                                        Daftar Gratis
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-6">
                            <div className="text-center">
                                <div className="bg-white bg-opacity-10 rounded-3 p-4 backdrop-blur">
                                    <h3 className="text-warning mb-3">📈 Statistik Sistem</h3>
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <div className="text-center">
                                                <h4 className="text-warning fw-bold mb-1">
                                                    {stats?.employees_count || 0}
                                                </h4>
                                                <small>👥 Karyawan</small>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="text-center">
                                                <h4 className="text-warning fw-bold mb-1">
                                                    {stats?.kpi_indicators_count || 0}
                                                </h4>
                                                <small>📋 Indikator KPI</small>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="text-center">
                                                <h4 className="text-warning fw-bold mb-1">
                                                    {stats?.assessments_count || 0}
                                                </h4>
                                                <small>⭐ Penilaian</small>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="text-center">
                                                <h4 className="text-warning fw-bold mb-1">
                                                    {stats?.jobs_count || 0}
                                                </h4>
                                                <small>💼 Pekerjaan</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-primary">✨ Fitur Utama</h2>
                        <p className="text-muted">
                            Lengkap dan mudah digunakan untuk semua kebutuhan manajemen kinerja
                        </p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="text-primary mb-3" style={{ fontSize: '3rem' }}>
                                        👥
                                    </div>
                                    <h5 className="fw-bold mb-3">Manajemen Karyawan</h5>
                                    <p className="text-muted small">
                                        Kelola data karyawan dengan lengkap, termasuk 
                                        informasi divisi dan sistem user yang terintegrasi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="text-success mb-3" style={{ fontSize: '3rem' }}>
                                        📊
                                    </div>
                                    <h5 className="fw-bold mb-3">Indikator KPI</h5>
                                    <p className="text-muted small">
                                        Buat dan kelola indikator KPI dengan bobot yang 
                                        dapat disesuaikan untuk penilaian yang objektif.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="text-warning mb-3" style={{ fontSize: '3rem' }}>
                                        ⭐
                                    </div>
                                    <h5 className="fw-bold mb-3">Penilaian Kinerja</h5>
                                    <p className="text-muted small">
                                        Sistem penilaian otomatis berdasarkan bobot KPI 
                                        dengan kalkulasi skor yang akurat.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <div className="text-info mb-3" style={{ fontSize: '3rem' }}>
                                        💼
                                    </div>
                                    <h5 className="fw-bold mb-3">Manajemen Pekerjaan</h5>
                                    <p className="text-muted small">
                                        Tracking progress pekerjaan karyawan dengan 
                                        sistem persentase dan deadline yang jelas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-light py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h2 className="fw-bold text-primary mb-4">
                                📈 Keunggulan Sistem
                            </h2>
                            <div className="d-flex gap-3 mb-3">
                                <div className="text-success fs-4">✅</div>
                                <div>
                                    <h6 className="fw-bold mb-1">Otentikasi Multi-Role</h6>
                                    <p className="text-muted mb-0 small">
                                        Sistem login terpisah untuk Admin dan Karyawan 
                                        dengan hak akses yang berbeda.
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex gap-3 mb-3">
                                <div className="text-success fs-4">✅</div>
                                <div>
                                    <h6 className="fw-bold mb-1">Laporan Kinerja Lengkap</h6>
                                    <p className="text-muted mb-0 small">
                                        Dashboard laporan dengan tabel Bootstrap yang 
                                        menampilkan KPI dan progress pekerjaan.
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex gap-3 mb-3">
                                <div className="text-success fs-4">✅</div>
                                <div>
                                    <h6 className="fw-bold mb-1">Kalkulasi Otomatis</h6>
                                    <p className="text-muted mb-0 small">
                                        Sistem menghitung total KPI berdasarkan bobot 
                                        indikator secara otomatis dan real-time.
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex gap-3">
                                <div className="text-success fs-4">✅</div>
                                <div>
                                    <h6 className="fw-bold mb-1">Data Sample Lengkap</h6>
                                    <p className="text-muted mb-0 small">
                                        Dilengkapi dengan data contoh untuk testing 
                                        dan demonstrasi fitur aplikasi.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card border-0 shadow">
                                <div className="card-body">
                                    <h5 className="card-title text-center text-primary mb-4">
                                        🔐 Akses Demo
                                    </h5>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="bg-primary bg-opacity-10 p-3 rounded">
                                                <h6 className="text-primary mb-2">👨‍💼 Admin</h6>
                                                <p className="mb-1 small">
                                                    <strong>Email:</strong> admin@example.com
                                                </p>
                                                <p className="mb-0 small">
                                                    <strong>Password:</strong> password
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="bg-success bg-opacity-10 p-3 rounded">
                                                <h6 className="text-success mb-2">👨‍💻 Karyawan</h6>
                                                <p className="mb-1 small">
                                                    <strong>Email:</strong> john@example.com
                                                </p>
                                                <p className="mb-0 small">
                                                    <strong>Password:</strong> password
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {!auth?.user && (
                                        <div className="text-center mt-3">
                                            <Link 
                                                href="/login" 
                                                className="btn btn-primary btn-sm"
                                            >
                                                Coba Sekarang
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h6 className="fw-bold mb-2">📊 Penilaian Kinerja Karyawan</h6>
                            <p className="text-muted small mb-0">
                                Sistem manajemen kinerja yang komprehensif dan mudah digunakan.
                            </p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <p className="text-muted small mb-0">
                                © 2024 Performance Management System. 
                                Dibuat dengan ❤️ menggunakan Laravel & Bootstrap.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}