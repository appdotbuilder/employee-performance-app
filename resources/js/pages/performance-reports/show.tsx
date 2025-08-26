import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Job {
    id: number;
    name: string;
    progress: number;
    description: string | null;
    start_date: string | null;
    due_date: string | null;
    created_at: string;
}

interface Assessment {
    id: number;
    score: number;
    assessment_date: string;
    notes: string | null;
    kpi_indicator: {
        id: number;
        name: string;
        weight: number;
    };
}

interface PerformanceData {
    id: number;
    name: string;
    division: string;
    total_kpi_score: number;
    average_job_progress: number;
    jobs: Job[];
    assessments: Assessment[];
    jobs_count: number;
    assessments_count: number;
}

interface Props {
    performanceData: PerformanceData;
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function MyPerformanceReport({ performanceData, auth }: Props) {
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

    const getPerformanceStatus = (score: number) => {
        if (score >= 80) return { text: 'Excellent', class: 'bg-success' };
        if (score >= 70) return { text: 'Good', class: 'bg-info text-dark' };
        if (score >= 60) return { text: 'Average', class: 'bg-warning text-dark' };
        return { text: 'Needs Improvement', class: 'bg-danger' };
    };

    const status = getPerformanceStatus(performanceData.total_kpi_score);

    return (
        <div className="min-vh-100 bg-light">
            <Head title="Kinerja Saya" />
            
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow">
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
                <div className="mb-4">
                    <h1 className="h2 mb-1">📈 Laporan Kinerja Saya</h1>
                    <p className="text-muted">
                        Analisis kinerja dan progress pekerjaan Anda
                    </p>
                </div>

                {/* Employee Info Card */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-2 text-center">
                                <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto" 
                                     style={{ width: '80px', height: '80px' }}>
                                    <span className="text-success fw-bold" style={{ fontSize: '2rem' }}>
                                        {performanceData.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h4 className="mb-1">{performanceData.name}</h4>
                                <p className="text-muted mb-1">
                                    <strong>Divisi:</strong> {performanceData.division}
                                </p>
                                <span className={`badge ${status.class}`}>
                                    {status.text}
                                </span>
                            </div>
                            <div className="col-md-4">
                                <div className="row text-center">
                                    <div className="col-6">
                                        <h5 className="text-primary mb-1">{performanceData.jobs_count}</h5>
                                        <small className="text-muted">Pekerjaan</small>
                                    </div>
                                    <div className="col-6">
                                        <h5 className="text-success mb-1">{performanceData.assessments_count}</h5>
                                        <small className="text-muted">Penilaian</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Overview */}
                <div className="row g-4 mb-4">
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-primary text-white">
                                <h6 className="mb-0">📊 Skor KPI Total</h6>
                            </div>
                            <div className="card-body text-center">
                                <div className="display-4 fw-bold text-primary mb-3">
                                    {performanceData.total_kpi_score.toFixed(2)}
                                </div>
                                <p className="text-muted">
                                    Nilai ini dihitung berdasarkan bobot setiap indikator KPI
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-info text-dark">
                                <h6 className="mb-0">💼 Rata-rata Progress Pekerjaan</h6>
                            </div>
                            <div className="card-body text-center">
                                <div className="display-4 fw-bold text-info mb-3">
                                    {performanceData.average_job_progress.toFixed(1)}%
                                </div>
                                <div className="progress mx-auto mb-3" style={{ width: '80%', height: '10px' }}>
                                    <div 
                                        className={`progress-bar ${getProgressColor(performanceData.average_job_progress)}`}
                                        style={{ width: `${performanceData.average_job_progress}%` }}
                                    />
                                </div>
                                <p className="text-muted small">
                                    Progress rata-rata dari semua pekerjaan Anda
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KPI Assessments */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-success text-white">
                        <h5 className="mb-0">⭐ Detail Penilaian KPI</h5>
                    </div>
                    <div className="card-body p-0">
                        {performanceData.assessments.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Indikator KPI</th>
                                            <th>Bobot</th>
                                            <th>Nilai</th>
                                            <th>Kontribusi Score</th>
                                            <th>Tanggal Penilaian</th>
                                            <th>Catatan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {performanceData.assessments.map((assessment) => {
                                            const contribution = (assessment.score * assessment.kpi_indicator.weight / 100).toFixed(2);
                                            return (
                                                <tr key={assessment.id}>
                                                    <td className="fw-medium">
                                                        {assessment.kpi_indicator.name}
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-info text-dark">
                                                            {assessment.kpi_indicator.weight}%
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`fw-bold ${getScoreColor(assessment.score)}`}>
                                                            {assessment.score}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-primary fw-medium">
                                                            {contribution}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <small className="text-muted">
                                                            {new Date(assessment.assessment_date).toLocaleDateString('id-ID')}
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <small className="text-muted">
                                                            {assessment.notes || '-'}
                                                        </small>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <div className="text-muted" style={{ fontSize: '3rem' }}>⭐</div>
                                <h6 className="text-muted">Belum ada penilaian KPI</h6>
                            </div>
                        )}
                    </div>
                </div>

                {/* Jobs Progress */}
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-warning text-dark">
                        <h5 className="mb-0">💼 Daftar Pekerjaan</h5>
                    </div>
                    <div className="card-body p-0">
                        {performanceData.jobs.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Nama Pekerjaan</th>
                                            <th>Progress</th>
                                            <th>Tanggal Mulai</th>
                                            <th>Deadline</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {performanceData.jobs.map((job) => (
                                            <tr key={job.id}>
                                                <td>
                                                    <div>
                                                        <div className="fw-medium">{job.name}</div>
                                                        {job.description && (
                                                            <small className="text-muted">
                                                                {job.description}
                                                            </small>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="progress me-2" style={{ width: '100px', height: '20px' }}>
                                                            <div 
                                                                className={`progress-bar ${getProgressColor(job.progress)}`}
                                                                style={{ width: `${job.progress}%` }}
                                                            />
                                                        </div>
                                                        <small className="fw-medium">
                                                            {job.progress}%
                                                        </small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <small className="text-muted">
                                                        {job.start_date ? 
                                                            new Date(job.start_date).toLocaleDateString('id-ID') : 
                                                            '-'
                                                        }
                                                    </small>
                                                </td>
                                                <td>
                                                    <small className="text-muted">
                                                        {job.due_date ? 
                                                            new Date(job.due_date).toLocaleDateString('id-ID') : 
                                                            '-'
                                                        }
                                                    </small>
                                                </td>
                                                <td>
                                                    {job.progress === 100 ? (
                                                        <span className="badge bg-success">Selesai</span>
                                                    ) : job.progress >= 80 ? (
                                                        <span className="badge bg-info text-dark">Hampir Selesai</span>
                                                    ) : job.progress >= 50 ? (
                                                        <span className="badge bg-warning text-dark">Dalam Progress</span>
                                                    ) : (
                                                        <span className="badge bg-danger">Perlu Perhatian</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <div className="text-muted" style={{ fontSize: '3rem' }}>💼</div>
                                <h6 className="text-muted">Belum ada pekerjaan yang ditugaskan</h6>
                            </div>
                        )}
                    </div>
                </div>

                {/* Performance Tips */}
                <div className="card border-0 shadow-sm mt-4">
                    <div className="card-body">
                        <h6 className="card-title text-primary">💡 Tips Meningkatkan Kinerja</h6>
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="list-unstyled small">
                                    <li className="mb-2">
                                        <span className="text-success">✓</span> 
                                        Fokus pada indikator KPI dengan bobot tinggi
                                    </li>
                                    <li className="mb-2">
                                        <span className="text-success">✓</span> 
                                        Update progress pekerjaan secara berkala
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul className="list-unstyled small">
                                    <li className="mb-2">
                                        <span className="text-success">✓</span> 
                                        Komunikasi dengan supervisor tentang kendala
                                    </li>
                                    <li className="mb-2">
                                        <span className="text-success">✓</span> 
                                        Manfaatkan feedback dari penilaian untuk improvement
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}