import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface KpiIndicator {
    id: number;
    name: string;
    weight: number;
    created_at: string;
    updated_at: string;
}

interface PaginatedIndicators {
    data: KpiIndicator[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    indicators: PaginatedIndicators;
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function KpiIndicatorsIndex({ indicators, auth }: Props) {
    const totalWeight = indicators.data.reduce((sum, indicator) => sum + Number(indicator.weight), 0);

    return (
        <div className="min-vh-100 bg-light">
            <Head title="Indikator KPI" />
            
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
                        <h1 className="h2 mb-1">📊 Indikator KPI</h1>
                        <p className="text-muted">
                            Kelola indikator dan bobot penilaian kinerja
                        </p>
                    </div>
                    <Link 
                        href="/kpi-indicators/create" 
                        className="btn btn-primary"
                    >
                        ➕ Tambah Indikator
                    </Link>
                </div>

                {/* Weight Summary */}
                {indicators.data.length > 0 && (
                    <div className="alert alert-info mb-4">
                        <div className="d-flex align-items-center">
                            <span className="me-3">📏 Total Bobot: </span>
                            <span className={`fw-bold ${totalWeight === 100 ? 'text-success' : 'text-warning'}`}>
                                {totalWeight.toFixed(2)}%
                            </span>
                            {totalWeight !== 100 && (
                                <small className="text-warning ms-2">
                                    ⚠️ Total bobot harus 100% untuk perhitungan yang akurat
                                </small>
                            )}
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-0">
                        {indicators.data.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nama Indikator</th>
                                            <th scope="col">Bobot</th>
                                            <th scope="col">Visual Bobot</th>
                                            <th scope="col">Dibuat</th>
                                            <th scope="col">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {indicators.data.map((indicator, index) => (
                                            <tr key={indicator.id}>
                                                <th scope="row">
                                                    {(indicators.current_page - 1) * indicators.per_page + index + 1}
                                                </th>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2" 
                                                             style={{ width: '32px', height: '32px' }}>
                                                            <span className="text-success fw-bold small">
                                                                📊
                                                            </span>
                                                        </div>
                                                        <span className="fw-medium">{indicator.name}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge bg-primary fs-6">
                                                        {indicator.weight}%
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="progress" style={{ width: '120px', height: '20px' }}>
                                                        <div 
                                                            className="progress-bar bg-success"
                                                            style={{ width: `${indicator.weight}%` }}
                                                            title={`${indicator.weight}% dari total bobot`}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <small className="text-muted">
                                                        {new Date(indicator.created_at).toLocaleDateString('id-ID')}
                                                    </small>
                                                </td>
                                                <td>
                                                    <div className="btn-group btn-group-sm">
                                                        <Link 
                                                            href={`/kpi-indicators/${indicator.id}`}
                                                            className="btn btn-outline-primary"
                                                            title="Lihat Detail"
                                                        >
                                                            👁️
                                                        </Link>
                                                        <Link 
                                                            href={`/kpi-indicators/${indicator.id}/edit`}
                                                            className="btn btn-outline-warning"
                                                            title="Edit"
                                                        >
                                                            ✏️
                                                        </Link>
                                                        <Link 
                                                            href={`/kpi-indicators/${indicator.id}`}
                                                            method="delete"
                                                            as="button"
                                                            className="btn btn-outline-danger"
                                                            title="Hapus"
                                                            onBefore={() => confirm('Apakah Anda yakin ingin menghapus indikator KPI ini?')}
                                                        >
                                                            🗑️
                                                        </Link>
                                                    </div>
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
                                <h5 className="text-muted">Belum ada indikator KPI</h5>
                                <p className="text-muted small">
                                    Mulai dengan membuat indikator KPI untuk penilaian kinerja
                                </p>
                                <Link 
                                    href="/kpi-indicators/create" 
                                    className="btn btn-primary"
                                >
                                    ➕ Tambah Indikator
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {indicators.data.length > 0 && indicators.last_page > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        <nav>
                            <ul className="pagination">
                                {indicators.links.map((link, index) => (
                                    <li 
                                        key={index}
                                        className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                                    >
                                        {link.url ? (
                                            <Link 
                                                href={link.url}
                                                className="page-link"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span 
                                                className="page-link"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}

                {/* Stats */}
                <div className="text-center text-muted small mt-3">
                    Menampilkan {indicators.data.length} dari {indicators.total} indikator KPI
                </div>

                {/* Guide */}
                <div className="card border-0 shadow-sm mt-4">
                    <div className="card-body">
                        <h6 className="card-title text-success">💡 Panduan Indikator KPI</h6>
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="list-unstyled small">
                                    <li className="mb-2">
                                        <span className="text-success">✓</span> 
                                        Total bobot semua indikator harus 100%
                                    </li>
                                    <li className="mb-2">
                                        <span className="text-success">✓</span> 
                                        Prioritaskan indikator yang paling penting
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul className="list-unstyled small">
                                    <li className="mb-2">
                                        <span className="text-success">✓</span> 
                                        Gunakan nama indikator yang jelas dan mudah dipahami
                                    </li>
                                    <li className="mb-2">
                                        <span className="text-success">✓</span> 
                                        Review dan update bobot secara berkala
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