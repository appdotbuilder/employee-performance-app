import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

interface PerformanceData {
    id: number;
    name: string;
    division: string;
    total_kpi_score: number;
    average_job_progress: number;
    jobs_count: number;
    assessments_count: number;
}

interface Props {
    reportData: PerformanceData[];
    divisions: string[];
    filters: {
        division?: string;
    };
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function PerformanceReportsIndex({ reportData, divisions, filters, auth }: Props) {
    const handleFilterChange = (division: string) => {
        router.get('/reports/performance', 
            division === '' ? {} : { division },
            { preserveState: true, preserveScroll: true }
        );
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-success';
        if (score >= 80) return 'text-info';
        if (score >= 70) return 'text-warning';
        return 'text-danger';
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 90) return 'bg-success';
        if (progress >= 70) return 'bg-info';
        if (progress >= 50) return 'bg-warning';
        return 'bg-danger';
    };

    return (
        <div className="min-vh-100 bg-light">
            <Head title="Laporan Kinerja" />
            
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
                <div className="container">
                    <Link className="navbar-brand fw-bold" href="/">
                        📊 Penilaian Kinerja Karyawan
                    </Link>
                    
                    <div className="ms-auto d-flex align-items-center gap-3">
                        <Link href="/dashboard" className="btn btn-outline-light btn-sm">
                            🏠 Dashboard
                        </Link>
                        <span className="text-white">{auth.user.name}</span>
                    </div>
                </div>
            </nav>

            <div className="container py-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="h2 mb-1">📈 Laporan Kinerja</h1>
                        <p className="text-muted">
                            Analisis kinerja karyawan berdasarkan KPI dan progress pekerjaan
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body">
                        <h6 className="card-title mb-3">🔍 Filter Laporan</h6>
                        <div className="row align-items-end">
                            <div className="col-md-4">
                                <label className="form-label small">Divisi</label>
                                <select 
                                    className="form-select form-select-sm"
                                    value={filters.division || ''}
                                    onChange={(e) => handleFilterChange(e.target.value)}
                                >
                                    <option value="">Semua Divisi</option>
                                    {divisions.map((division) => (
                                        <option key={division} value={division}>
                                            {division}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="row g-3 mb-4">
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center">
                                <h3 className="text-primary mb-1">{reportData.length}</h3>
                                <small className="text-muted">👥 Total Karyawan</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center">
                                <h3 className="text-success mb-1">
                                    {reportData.length > 0 ? 
                                        Math.round(reportData.reduce((sum, emp) => sum + emp.total_kpi_score, 0) / reportData.length) : 0
                                    }
                                </h3>
                                <small className="text-muted">📊 Rata-rata KPI</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center">
                                <h3 className="text-info mb-1">
                                    {reportData.length > 0 ? 
                                        Math.round(reportData.reduce((sum, emp) => sum + emp.average_job_progress, 0) / reportData.length) : 0
                                    }%
                                </h3>
                                <small className="text-muted">💼 Rata-rata Progress</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center">
                                <h3 className="text-warning mb-1">
                                    {reportData.reduce((sum, emp) => sum + emp.jobs_count, 0)}
                                </h3>
                                <small className="text-muted">📋 Total Pekerjaan</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Table */}
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">📊 Tabel Kinerja Karyawan</h5>
                    </div>
                    <div className="card-body p-0">
                        {reportData.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nama Karyawan</th>
                                            <th scope="col">Divisi</th>
                                            <th scope="col">Total KPI Score</th>
                                            <th scope="col">Rata-rata Progress Pekerjaan</th>
                                            <th scope="col">Jumlah Pekerjaan</th>
                                            <th scope="col">Jumlah Penilaian</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData
                                            .sort((a, b) => b.total_kpi_score - a.total_kpi_score)
                                            .map((employee, index) => (
                                            <tr key={employee.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2" 
                                                             style={{ width: '32px', height: '32px' }}>
                                                            <span className="text-primary fw-bold small">
                                                                {employee.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <span className="fw-medium">{employee.name}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge bg-info text-dark">
                                                        {employee.division}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`fw-bold ${getScoreColor(employee.total_kpi_score)}`}>
                                                        {employee.total_kpi_score.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="progress me-2" style={{ width: '80px', height: '20px' }}>
                                                            <div 
                                                                className={`progress-bar ${getProgressColor(employee.average_job_progress)}`}
                                                                style={{ width: `${employee.average_job_progress}%` }}
                                                            />
                                                        </div>
                                                        <small className="fw-medium">
                                                            {employee.average_job_progress.toFixed(1)}%
                                                        </small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge bg-secondary">
                                                        {employee.jobs_count} pekerjaan
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge bg-primary">
                                                        {employee.assessments_count} penilaian
                                                    </span>
                                                </td>
                                                <td>
                                                    {employee.total_kpi_score >= 80 ? (
                                                        <span className="badge bg-success">Excellent</span>
                                                    ) : employee.total_kpi_score >= 70 ? (
                                                        <span className="badge bg-info text-dark">Good</span>
                                                    ) : employee.total_kpi_score >= 60 ? (
                                                        <span className="badge bg-warning text-dark">Average</span>
                                                    ) : (
                                                        <span className="badge bg-danger">Needs Improvement</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <div className="text-muted" style={{ fontSize: '4rem' }}>
                                    📊
                                </div>
                                <h5 className="text-muted">Tidak ada data kinerja</h5>
                                <p className="text-muted small">
                                    {filters.division 
                                        ? `Tidak ada karyawan di divisi "${filters.division}"`
                                        : 'Belum ada data karyawan atau penilaian'
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Legend */}
                <div className="card border-0 shadow-sm mt-4">
                    <div className="card-body">
                        <h6 className="card-title mb-3">📋 Keterangan</h6>
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="small mb-2">Status KPI:</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    <span className="badge bg-success">Excellent (≥80)</span>
                                    <span className="badge bg-info text-dark">Good (70-79)</span>
                                    <span className="badge bg-warning text-dark">Average (60-69)</span>
                                    <span className="badge bg-danger">Needs Improvement (&lt;60)</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h6 className="small mb-2">Progress Pekerjaan:</h6>
                                <p className="small text-muted mb-0">
                                    Menunjukkan rata-rata persentase penyelesaian dari semua 
                                    pekerjaan yang ditugaskan kepada karyawan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}