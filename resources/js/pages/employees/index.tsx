import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Employee {
    id: number;
    name: string;
    division: string;
    user_id: number | null;
    created_at: string;
    updated_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
    } | null;
}

interface PaginatedEmployees {
    data: Employee[];
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
    employees: PaginatedEmployees;
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function EmployeesIndex({ employees, auth }: Props) {
    return (
        <div className="min-vh-100 bg-light">
            <Head title="Manajemen Karyawan" />
            
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
                        <h1 className="h2 mb-1">👥 Manajemen Karyawan</h1>
                        <p className="text-muted">
                            Kelola data karyawan dan informasi divisi
                        </p>
                    </div>
                    <Link 
                        href="/employees/create" 
                        className="btn btn-primary"
                    >
                        ➕ Tambah Karyawan
                    </Link>
                </div>

                {/* Table */}
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-0">
                        {employees.data.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nama</th>
                                            <th scope="col">Divisi</th>
                                            <th scope="col">User Account</th>
                                            <th scope="col">Bergabung</th>
                                            <th scope="col">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.data.map((employee, index) => (
                                            <tr key={employee.id}>
                                                <th scope="row">
                                                    {(employees.current_page - 1) * employees.per_page + index + 1}
                                                </th>
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
                                                    {employee.user ? (
                                                        <span className="text-success small">
                                                            ✅ {employee.user.email}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted small">
                                                            ❌ Tidak ada
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <small className="text-muted">
                                                        {new Date(employee.created_at).toLocaleDateString('id-ID')}
                                                    </small>
                                                </td>
                                                <td>
                                                    <div className="btn-group btn-group-sm">
                                                        <Link 
                                                            href={`/employees/${employee.id}`}
                                                            className="btn btn-outline-primary"
                                                            title="Lihat Detail"
                                                        >
                                                            👁️
                                                        </Link>
                                                        <Link 
                                                            href={`/employees/${employee.id}/edit`}
                                                            className="btn btn-outline-warning"
                                                            title="Edit"
                                                        >
                                                            ✏️
                                                        </Link>
                                                        <Link 
                                                            href={`/employees/${employee.id}`}
                                                            method="delete"
                                                            as="button"
                                                            className="btn btn-outline-danger"
                                                            title="Hapus"
                                                            onBefore={() => confirm('Apakah Anda yakin ingin menghapus karyawan ini?')}
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
                                    👥
                                </div>
                                <h5 className="text-muted">Belum ada data karyawan</h5>
                                <p className="text-muted small">
                                    Mulai dengan menambahkan karyawan pertama Anda
                                </p>
                                <Link 
                                    href="/employees/create" 
                                    className="btn btn-primary"
                                >
                                    ➕ Tambah Karyawan
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {employees.data.length > 0 && employees.last_page > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        <nav>
                            <ul className="pagination">
                                {employees.links.map((link, index) => (
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
                    Menampilkan {employees.data.length} dari {employees.total} karyawan
                </div>
            </div>
        </div>
    );
}