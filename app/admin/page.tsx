"use client";

import { useEffect, useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { Database, LayoutGrid, ShieldCheck, Trash2, Users } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

type AdminRole = "dev" | "normal";

type SessionUser = {
  id: string;
  username: string;
  role: AdminRole;
};

type InquiryRecord = {
  id: string;
  first_name: string;
  email: string;
  mobile_number: string | null;
  service: string;
  message: string | null;
  created_at: string;
  updated_at: string;
};

type StatusResponse = {
  hasUsers: number;
  user: SessionUser | null;
  currentInquiryTable: InquiryTableName | null;
};

type InquiryTablesResponse = {
  development?: InquiryRecord[];
  production?: InquiryRecord[];
  [key: string]: InquiryRecord[] | undefined;
};

type InquiryTableName = "project_inquiries_dev" | "project_inquiries_production";

type FeedbackState = {
  type: "success" | "error";
  message: string;
};

type DashboardMetrics = {
  total: number;
  development: number;
  production: number;
};

type FormState = {
  username: string;
  password: string;
  role: AdminRole;
};

const emptyForm = (role: AdminRole = "dev"): FormState => ({
  username: "",
  password: "",
  role,
});

function InquiryTable({
  title,
  rows,
  table,
  onDelete,
  deletingId,
}: {
  title: string;
  rows: InquiryRecord[];
  table?: InquiryTableName;
  onDelete?: (table: InquiryTableName, id: string) => void;
  deletingId?: string | null;
}) {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const visibleRows = rows.slice(startIndex, startIndex + pageSize);
  const firstRowIndex = rows.length ? startIndex + 1 : 0;
  const lastRowIndex = Math.min(startIndex + pageSize, rows.length);

  const pageNumbers = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set<number>([1, totalPages, safeCurrentPage]);
    if (safeCurrentPage > 2) pages.add(safeCurrentPage - 1);
    if (safeCurrentPage < totalPages - 1) pages.add(safeCurrentPage + 1);

    return Array.from(pages).sort((left, right) => left - right);
  })();

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);
  };

  return (
    <div className="overflow-hidden rounded-sm border border-[#E6D6C5] bg-white shadow-sm">
      <div className="border-b border-[#E6D6C5] bg-[#F5F1EC] px-5 py-4">
        <h3 className="font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-[#1F3F5B]">{title}</h3>
        <p className="mt-1 text-sm text-[#8A8A8A]">{rows.length} submitted inquiries</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white text-[#8A8A8A]">
            <tr>
              <th className="px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em]">Name</th>
              <th className="px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em]">Email</th>
              <th className="px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em]">Mobile</th>
              <th className="px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em]">Service</th>
              <th className="px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em]">Message</th>
              <th className="px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em]">Created</th>
              {onDelete ? <th className="px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em]">Action</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6D6C5] bg-white">
            {visibleRows.length ? (
              visibleRows.map((row) => (
                <tr key={row.id} className="align-top">
                  <td className="px-5 py-4 font-medium text-[#1F3F5B]">{row.first_name}</td>
                  <td className="px-5 py-4 text-[#2B2B2B]">{row.email}</td>
                  <td className="px-5 py-4 text-[#2B2B2B]">{row.mobile_number ?? "-"}</td>
                  <td className="px-5 py-4 text-[#2B2B2B]">{row.service}</td>
                  <td className="px-5 py-4 text-[#2B2B2B]">{row.message ?? "-"}</td>
                  <td className="px-5 py-4 text-[#2B2B2B]">{new Date(row.created_at).toLocaleString()}</td>
                  {onDelete && table ? (
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => onDelete(table, row.id)}
                        disabled={deletingId === row.id}
                        className="inline-flex items-center gap-2 rounded-sm border border-[#E6D6C5] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8A1F1F] transition-colors hover:border-[#8A1F1F] hover:bg-[#FDF2F2] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 size={14} />
                        {deletingId === row.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-5 py-8 text-center text-[#8A8A8A]" colSpan={onDelete ? 7 : 6}>
                  No inquiries submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {rows.length > 0 ? (
        <div className="flex flex-col gap-4 border-t border-[#E6D6C5] bg-[#FBF8F4] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#1F3F5B]">
            <span className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8A8A]">Total {rows.length}</span>
            <label className="inline-flex items-center gap-2 rounded-full border border-[#E6D6C5] bg-white px-3 py-2">
              <span className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A8A8A]">Page size</span>
              <select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))} className="bg-transparent text-sm outline-none">
                {[10, 20, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}/page
                  </option>
                ))}
              </select>
            </label>
            <span className="text-[#8A8A8A]">
              Showing {firstRowIndex}-{lastRowIndex} of {rows.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1}
              className="rounded-full border border-[#E6D6C5] bg-white px-3 py-2 text-sm text-[#1F3F5B] transition-colors hover:bg-[#F5F1EC] disabled:cursor-not-allowed disabled:opacity-50"
            >
              ←
            </button>

            {pageNumbers.map((pageNumber, index) => {
              const previousNumber = pageNumbers[index - 1];
              const showGap = index > 0 && previousNumber !== pageNumber - 1;

              return (
                <span key={pageNumber} className="flex items-center gap-2">
                  {showGap ? <span className="px-1 text-[#8A8A8A]">…</span> : null}
                  <button
                    type="button"
                    onClick={() => goToPage(pageNumber)}
                    className={`min-w-10 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                      safeCurrentPage === pageNumber ? "bg-[#1F3F5B] text-white" : "border border-[#E6D6C5] bg-white text-[#1F3F5B] hover:bg-[#F5F1EC]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                </span>
              );
            })}

            <button
              type="button"
              onClick={() => goToPage(safeCurrentPage + 1)}
              disabled={safeCurrentPage === totalPages}
              className="rounded-full border border-[#E6D6C5] bg-white px-3 py-2 text-sm text-[#1F3F5B] transition-colors hover:bg-[#F5F1EC] disabled:cursor-not-allowed disabled:opacity-50"
            >
              →
            </button>

            <label className="ml-2 inline-flex items-center gap-2 rounded-full border border-[#E6D6C5] bg-white px-3 py-2">
              <span className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A8A8A]">Go to</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={safeCurrentPage}
                onChange={(event) => goToPage(Number(event.target.value))}
                className="w-16 bg-transparent text-sm outline-none"
              />
            </label>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function UserForm({
  title,
  description,
  form,
  onChange,
  onSubmit,
  submitLabel,
  disableRoleChange,
}: {
  title: string;
  description: string;
  form: FormState;
  onChange: Dispatch<SetStateAction<FormState>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  disableRoleChange?: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="rounded-sm border border-[#E6D6C5] bg-white p-6 shadow-sm">
      <h3 className="font-playfair text-2xl text-[#1F3F5B]">{title}</h3>
      <p className="mt-2 text-sm text-[#8A8A8A]">{description}</p>
      <div className="mt-6 grid gap-4">
        <input
          value={form.username}
          onChange={(e) => onChange((prev) => ({ ...prev, username: e.target.value }))}
          className="w-full rounded-sm border border-[#E6D6C5] px-4 py-3 text-sm outline-none focus:border-[#B9926B]"
          placeholder="Username"
          required
        />
        <input
          value={form.password}
          onChange={(e) => onChange((prev) => ({ ...prev, password: e.target.value }))}
          className="w-full rounded-sm border border-[#E6D6C5] px-4 py-3 text-sm outline-none focus:border-[#B9926B]"
          type="password"
          placeholder="Password"
          required
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {(["dev", "normal"] as const).map((role) => (
            <label
              key={role}
              className={`flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-sm transition-colors ${
                form.role === role ? "border-[#1F3F5B] bg-[#F5F1EC] text-[#1F3F5B]" : "border-[#E6D6C5] text-[#2B2B2B]"
              } ${disableRoleChange ? "opacity-70" : ""}`}
            >
              <input
                type="radio"
                name={`${title}-role`}
                checked={form.role === role}
                disabled={disableRoleChange}
                onChange={() => onChange((prev) => ({ ...prev, role }))}
              />
              <span>{role === "dev" ? "Dev user" : "Normal user"}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center rounded-sm bg-[#1F3F5B] px-6 py-3 font-montserrat text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#B9926B]"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function ModalShell({
  title,
  description,
  onClose,
  children,
}: {
  title: string;
  description: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-[#1F3F5B]/60 px-4 py-8 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-[#E6D6C5] bg-[#F5F1EC] shadow-[0_24px_80px_rgba(31,63,91,0.3)]">
        <div className="flex items-start justify-between gap-6 border-b border-[#E6D6C5] px-6 py-5 sm:px-8">
          <div>
            <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B9926B]">{title}</p>
            <p className="mt-2 text-sm leading-6 text-[#8A8A8A]">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6D6C5] bg-white text-[#1F3F5B] transition-colors hover:border-[#1F3F5B] hover:bg-[#1F3F5B] hover:text-white"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-6 sm:px-8 sm:py-8">{children}</div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [activeInquiryTab, setActiveInquiryTab] = useState<"development" | "production">("development");
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [loginForm, setLoginForm] = useState<FormState>(emptyForm());
  const [bootstrapForm, setBootstrapForm] = useState<FormState>(emptyForm("dev"));
  const [createUserForm, setCreateUserForm] = useState<FormState>(emptyForm("normal"));
  const [inquiries, setInquiries] = useState<InquiryTablesResponse | null>(null);

  const currentUser = status?.user ?? null;
  const hasUsers = Boolean(status && status.hasUsers > 0);
  const currentInquiryTable = status?.currentInquiryTable ?? null;
  const devDevelopmentInquiries = inquiries?.development ?? [];
  const devProductionInquiries = inquiries?.production ?? [];
  const activeInquiryRows = Object.values(inquiries ?? {}).find((rows): rows is InquiryRecord[] => Array.isArray(rows)) ?? [];
  const metrics: DashboardMetrics = {
    total: devDevelopmentInquiries.length + devProductionInquiries.length,
    development: devDevelopmentInquiries.length,
    production: devProductionInquiries.length,
  };

  const refreshInquiries = async () => {
    const response = await fetch("/api/admin/inquiries");
    const result = (await response.json()) as { success: boolean; data?: InquiryTablesResponse };

    if (response.ok && result.data) {
      setInquiries(result.data);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/admin/status");
        const result = (await response.json()) as { success: boolean; data: StatusResponse };
        setStatus(result.data);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  useEffect(() => {
    const loadInquiries = async () => {
      if (!currentUser) {
        setInquiries(null);
        return;
      }

      await refreshInquiries();
    };

    void loadInquiries();
  }, [currentUser]);

  const updateFeedback = (message: string, type: FeedbackState["type"]) => {
    setFeedback({ message, type });
  };

  const handleAuthSuccess = (user: SessionUser) => {
    setStatus({
      hasUsers: Math.max(status?.hasUsers ?? 0, 1),
      user,
      currentInquiryTable: status?.currentInquiryTable ?? null,
    });
    setFeedback(null);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const result = (await response.json()) as { success: boolean; data?: SessionUser; message?: string };

      if (!response.ok || !result.success || !result.data) {
        updateFeedback(result.message ?? "Unable to sign in.", "error");
        return;
      }

      handleAuthSuccess(result.data);
    } finally {
      setBusy(false);
    }
  };

  const handleBootstrap = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/admin/bootstrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bootstrapForm),
      });
      const result = (await response.json()) as { success: boolean; data?: SessionUser; message?: string };

      if (!response.ok || !result.success || !result.data) {
        updateFeedback(result.message ?? "Unable to create the first user.", "error");
        return;
      }

      handleAuthSuccess(result.data);
      setBootstrapForm(emptyForm("dev"));
    } finally {
      setBusy(false);
    }
  };

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createUserForm),
      });
      const result = (await response.json()) as { success: boolean; message?: string };

      if (!response.ok || !result.success) {
        updateFeedback(result.message ?? "Unable to create user.", "error");
        return;
      }

      updateFeedback("User created successfully.", "success");
      setCreateUserForm(emptyForm("normal"));
      setCreateUserModalOpen(false);
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setStatus({
      hasUsers: status?.hasUsers ?? 1,
      user: null,
      currentInquiryTable: status?.currentInquiryTable ?? null,
    });
    setInquiries(null);
    setFeedback({ type: "success", message: "Signed out." });
  };

  const handleDeleteInquiry = async (table: InquiryTableName, id: string) => {
    if (deletingId) {
      return;
    }

    const confirmed = window.confirm("Delete this inquiry? This cannot be undone.");

    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setFeedback(null);

    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ table }),
      });
      const result = (await response.json()) as { success: boolean; message?: string };

      if (!response.ok || !result.success) {
        setFeedback({ type: "error", message: result.message ?? "Unable to delete inquiry." });
        return;
      }

      await refreshInquiries();
      setFeedback({ type: "success", message: "Inquiry deleted successfully." });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <SiteLayout>
        <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-20 text-[#1F3F5B]">
          Loading admin panel...
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="bg-[#F5F1EC] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <section className="overflow-hidden rounded-[28px] border border-[#E6D6C5] bg-[#1F3F5B] shadow-[0_24px_80px_rgba(31,63,91,0.16)]">
            <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:px-10 lg:py-10">
              <div>
                <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8A97E]">Admin Console</p>
                <h1 className="mt-4 max-w-3xl font-playfair text-4xl leading-tight text-[#F5F1EC] sm:text-5xl lg:text-[64px]">
                  {currentUser?.role === "dev" ? "Dev dashboard for every inquiry" : "Inquiry management panel"}
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#E6D6C5] sm:text-base">
                  {currentUser
                    ? `Signed in as ${currentUser.username}. ${currentUser.role === "dev" ? "You can manage both inquiry tables, delete records, and create users." : "You can view inquiries for the active environment."}`
                    : hasUsers
                      ? "Sign in to review inquiries."
                      : "Create the first user to activate the admin panel."}
                </p>
              </div>

              {currentUser ? (
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    { label: "Role", value: currentUser.role.toUpperCase(), icon: ShieldCheck },
                    { label: "Total inquiries", value: String(metrics.total), icon: Database },
                    { label: "User accounts", value: String(status?.hasUsers ?? 0), icon: Users },
                  ].map((item) => (
                    <div key={item.label} className="rounded-3xl border border-white/10 bg-white/10 p-4 text-[#F5F1EC] backdrop-blur-sm">
                      <div className="flex items-center gap-3 text-[#C8A97E]">
                        <item.icon size={16} />
                        <span className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.16em]">{item.label}</span>
                      </div>
                      <p className="mt-3 font-playfair text-3xl">{item.value}</p>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => void handleLogout()}
                    className="rounded-3xl border border-[#C8A97E] bg-transparent px-4 py-4 text-left font-montserrat text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5F1EC] transition-colors hover:bg-[#C8A97E] hover:text-[#1F3F5B]"
                  >
                    Sign out
                  </button>
                </div>
              ) : null}
            </div>
          </section>

          {feedback ? (
            <div className={`rounded-2xl border px-5 py-4 text-sm ${feedback.type === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`}>
              {feedback.message}
            </div>
          ) : null}

          {!hasUsers ? (
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <UserForm
                title="Bootstrap the first admin"
                description="Create the first dev or normal user. Dev users can manage users and both inquiry tables; normal users can only view inquiries."
                form={bootstrapForm}
                onChange={setBootstrapForm}
                onSubmit={handleBootstrap}
                submitLabel={busy ? "Creating..." : "Create First User"}
              />
              <div className="grid gap-6">
                <div className="rounded-[28px] border border-[#E6D6C5] bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1F3F5B] text-[#C8A97E]">
                      <LayoutGrid size={18} />
                    </div>
                    <div>
                      <h3 className="font-playfair text-2xl text-[#1F3F5B]">Role overview</h3>
                      <p className="text-sm text-[#8A8A8A]">Choose the access level for the first account.</p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#E6D6C5] bg-[#F5F1EC] p-5">
                      <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1F3F5B]">Dev</p>
                      <p className="mt-3 text-sm leading-6 text-[#2B2B2B]">Full control over users, inquiry deletion, and both inquiry tables.</p>
                    </div>
                    <div className="rounded-2xl border border-[#E6D6C5] bg-white p-5">
                      <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1F3F5B]">Normal</p>
                      <p className="mt-3 text-sm leading-6 text-[#2B2B2B]">Can sign in and view the active environment inquiries only.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : !currentUser ? (
            <div className="mx-auto grid max-w-3xl gap-8">
              <form onSubmit={handleLogin} className="rounded-[28px] border border-[#E6D6C5] bg-white p-8 shadow-sm">
                <h2 className="font-playfair text-3xl text-[#1F3F5B]">Sign in</h2>
                <p className="mt-2 text-sm text-[#8A8A8A]">Use a valid username and password from the users table.</p>
                <div className="mt-6 grid gap-4">
                  <input
                    value={loginForm.username}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
                    className="w-full rounded-sm border border-[#E6D6C5] px-4 py-3 text-sm outline-none focus:border-[#B9926B]"
                    placeholder="Username"
                    required
                  />
                  <input
                    value={loginForm.password}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="w-full rounded-sm border border-[#E6D6C5] px-4 py-3 text-sm outline-none focus:border-[#B9926B]"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-sm bg-[#1F3F5B] px-6 py-3 font-montserrat text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#B9926B]"
                >
                  {busy ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </div>
          ) : currentUser.role === "dev" ? (
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Development", value: metrics.development },
                    { label: "Production", value: metrics.production },
                    { label: "Total", value: metrics.total },
                  ].map((item) => (
                    <div key={item.label} className="rounded-3xl border border-[#E6D6C5] bg-white p-5 shadow-sm">
                      <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8A8A]">{item.label}</p>
                      <p className="mt-3 font-playfair text-4xl text-[#1F3F5B]">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[28px] border border-[#E6D6C5] bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1F3F5B] text-[#C8A97E]">
                        <Database size={18} />
                      </div>
                      <div>
                        <h2 className="font-playfair text-3xl text-[#1F3F5B]">Inquiry management</h2>
                        <p className="text-sm text-[#8A8A8A]">Switch between tables to give each set of inquiries more room.</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 rounded-2xl border border-[#E6D6C5] bg-[#F5F1EC] p-2">
                      {([
                        { key: "development" as const, label: "Development", count: devDevelopmentInquiries.length },
                        { key: "production" as const, label: "Production", count: devProductionInquiries.length },
                      ]).map((tab) => (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => setActiveInquiryTab(tab.key)}
                          className={`rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                            activeInquiryTab === tab.key ? "bg-[#1F3F5B] text-white" : "text-[#1F3F5B] hover:bg-white"
                          }`}
                        >
                          {tab.label} ({tab.count})
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    {activeInquiryTab === "development" ? (
                      <InquiryTable
                        title="Development Inquiries"
                        rows={devDevelopmentInquiries}
                        table="project_inquiries_dev"
                        onDelete={handleDeleteInquiry}
                        deletingId={deletingId}
                      />
                    ) : (
                      <InquiryTable
                        title="Production Inquiries"
                        rows={devProductionInquiries}
                        table="project_inquiries_production"
                        onDelete={handleDeleteInquiry}
                        deletingId={deletingId}
                      />
                    )}
                  </div>
                </div>
              </section>

              <aside className="space-y-6">
                <div className="rounded-[28px] border border-[#E6D6C5] bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-playfair text-2xl text-[#1F3F5B]">Create users in a modal</h3>
                      <p className="mt-2 text-sm leading-6 text-[#8A8A8A]">Open the form when needed so the dashboard stays open and spacious.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCreateUserModalOpen(true)}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-sm bg-[#1F3F5B] px-6 py-3 font-montserrat text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#B9926B]"
                  >
                    Create New User
                  </button>
                </div>

                <div className="rounded-[28px] border border-[#E6D6C5] bg-white p-6 shadow-sm">
                  <h3 className="font-playfair text-2xl text-[#1F3F5B]">Access rules</h3>
                  <div className="mt-5 space-y-4 text-sm leading-6 text-[#2B2B2B]">
                    <p>Dev users can view both inquiry tables, delete any inquiry, and create additional users.</p>
                    <p>Normal users can only see inquiries for the active environment and cannot create users.</p>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="space-y-6">
              <InquiryTable
                title="Current Environment Inquiries"
                rows={activeInquiryRows}
                table={currentInquiryTable ?? undefined}
                onDelete={handleDeleteInquiry}
                deletingId={deletingId}
              />
              <div className="rounded-[28px] border border-[#E6D6C5] bg-white p-6 shadow-sm">
                <h3 className="font-playfair text-2xl text-[#1F3F5B]">Normal access</h3>
                <p className="mt-3 text-sm leading-6 text-[#8A8A8A]">
                  This view is full width so inquiries are easier to scan. Normal users can delete records from the active environment table only.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {createUserModalOpen ? (
        <ModalShell
          title="Create new user"
          description="Dev users can create both dev and normal users."
          onClose={() => setCreateUserModalOpen(false)}
        >
          <UserForm
            title="New user details"
            description="Enter the username, password, and role for the new account."
            form={createUserForm}
            onChange={setCreateUserForm}
            onSubmit={handleCreateUser}
            submitLabel={busy ? "Creating..." : "Add User"}
          />
        </ModalShell>
      ) : null}
    </SiteLayout>
  );
}
