"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  Users,
  Shield,
} from "lucide-react";

import { mockUsers } from "@/data/mockData";
import PageHeader from "@/Components/dashboard/shared/PageHeader";
import StatCard from "@/Components/dashboard/shared/StatCard";
import StatusBadge from "@/Components/dashboard/shared/StatusBadge";
import SearchFilter from "@/Components/dashboard/shared/SearchFilter";
import EmptyState from "@/Components/dashboard/shared/EmptyState";
import Modal from "@/Components/dashboard/shared/Modal";

export default function AdminUsers() {
  const [users, setUsers] = useState(mockUsers);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const roles = ["Donor", "Volunteer", "Administrator"];
  const statuses = ["Active", "Inactive", "Suspended"];

  // =========================
  // Filter Users
  // =========================
  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.id.toLowerCase().includes(searchValue);

    const matchesRole =
      !roleFilter || user.role === roleFilter;

    const matchesStatus =
      !statusFilter || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // =========================
  // Pagination
  // =========================
  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / itemsPerPage)
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // =========================
  // Statistics
  // =========================
  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const donors = users.filter(
    (user) => user.role === "Donor"
  ).length;

  const volunteers = users.filter(
    (user) => user.role === "Volunteer"
  ).length;

  const admins = users.filter(
    (user) => user.role === "Administrator"
  ).length;

  // =========================
  // Clear Filters
  // =========================
  const handleClear = () => {
    setSearch("");
    setRoleFilter("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  // =========================
  // Toggle Role
  // Donor <-> Volunteer
  // =========================
  const handleToggleRole = () => {
    if (!selectedUser) return;

    if (selectedUser.role === "Administrator") {
      return;
    }

    const newRole =
      selectedUser.role === "Donor"
        ? "Volunteer"
        : "Donor";

    const updatedUser = {
      ...selectedUser,
      role: newRole,
    };

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id
          ? updatedUser
          : user
      )
    );

    setSelectedUser(updatedUser);
  };

  // =========================
  // Toggle Status
  // Active <-> Suspended
  // =========================
  const handleToggleStatus = () => {
    if (!selectedUser) return;

    const newStatus =
      selectedUser.status === "Active"
        ? "Suspended"
        : "Active";

    const updatedUser = {
      ...selectedUser,
      status: newStatus,
    };

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id
          ? updatedUser
          : user
      )
    );

    setSelectedUser(updatedUser);
  };

  // =========================
  // Delete User
  // =========================
  const handleDeleteUser = () => {
    if (!selectedUser) return;

    setUsers((prevUsers) =>
      prevUsers.filter(
        (user) => user.id !== selectedUser.id
      )
    );

    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen space-y-7">

      {/* =========================
          Page Header
      ========================= */}
      <PageHeader
        title="All Users"
        subtitle="Manage donors, volunteers and administrators across BloodBridge."
      />

      {/* =========================
          Statistics
      ========================= */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          color="#D62839"
        />

        <StatCard
          title="Active Users"
          value={activeUsers}
          icon={UserCheck}
          color="#16A34A"
        />

        <StatCard
          title="Donors"
          value={donors}
          icon={Shield}
          color="#2563EB"
        />

        <StatCard
          title="Volunteers"
          value={volunteers}
          icon={Users}
          color="#7C3AED"
        />

        <StatCard
          title="Administrators"
          value={admins}
          icon={Shield}
          color="#D62839"
        />
      </section>

      {/* =========================
          Search & Filters
      ========================= */}
      <SearchFilter
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        filters={roleFilter || statusFilter}
        onFilterChange={(key, value) => {
          if (key === "role") {
            setRoleFilter(value);
          }

          if (key === "status") {
            setStatusFilter(value);
          }

          setCurrentPage(1);
        }}
        onClear={handleClear}
      >
        <div className="flex flex-wrap items-center gap-3">

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">
              All Roles
            </option>

            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">
              All Statuses
            </option>

            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </SearchFilter>

      {/* =========================
          Users Table
      ========================= */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">

            <thead>
              <tr className="border-b border-[#F1F5F9] text-[10px] uppercase tracking-wider text-[#94A3B8]">

                <th className="px-5 py-3 font-bold">
                  User
                </th>

                <th className="px-5 py-3 font-bold">
                  Email
                </th>

                <th className="px-5 py-3 font-bold">
                  Blood Group
                </th>

                <th className="px-5 py-3 font-bold">
                  Location
                </th>

                <th className="px-5 py-3 font-bold">
                  Role
                </th>

                <th className="px-5 py-3 font-bold">
                  Status
                </th>

                <th className="px-5 py-3 font-bold">
                  Joined
                </th>

                <th className="px-5 py-3 font-bold">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <EmptyState
                      icon={Users}
                      title="No users found"
                      description="Try adjusting your search or filters to find what you are looking for."
                    />
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#F8FAFC] last:border-0 hover:bg-[#FFF7F8]"
                  >

                    {/* User */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FDECEF] text-sm font-black text-[#D62839]">
                          {user.name.charAt(0)}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-[#111827]">
                            {user.name}
                          </p>

                          <p className="text-[10px] text-[#94A3B8]">
                            {user.id}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4 text-xs text-[#64748B]">
                      {user.email}
                    </td>

                    {/* Blood Group */}
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-black text-[#D62839]">
                        {user.bloodGroup}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4 text-xs text-[#64748B]">
                      {user.location}
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <StatusBadge
                        status={user.role.toLowerCase()}
                      />
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusBadge
                        status={user.status.toLowerCase()}
                      />
                    </td>

                    {/* Joined */}
                    <td className="px-5 py-4 text-xs text-[#94A3B8]">
                      {new Date(
                        user.joined
                      ).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#FFF4F5] hover:text-[#D62839]"
                        onClick={() =>
                          setSelectedUser(user)
                        }
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </td>

                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>

        {/* =========================
            Pagination
        ========================= */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[#F1F5F9] px-5 py-4">

            <p className="text-xs text-[#94A3B8]">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1)
                  )
                }
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-bold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839] disabled:opacity-50"
              >
                <ChevronLeft size={14} />
                Previous
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-bold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839] disabled:opacity-50"
              >
                Next
                <ChevronRight size={14} />
              </button>

            </div>
          </div>
        )}
      </div>

      {/* =========================
          User Details Modal
      ========================= */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="User Details"
        width="max-w-lg"
      >

        {selectedUser && (
          <div className="space-y-5">

            {/* User Header */}
            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FDECEF] text-xl font-black text-[#D62839]">
                {selectedUser.name.charAt(0)}
              </div>

              <div>
                <h3 className="text-lg font-black text-[#111827]">
                  {selectedUser.name}
                </h3>

                <p className="text-sm text-[#64748B]">
                  {selectedUser.email}
                </p>
              </div>

            </div>

            {/* User Information */}
            <div className="grid grid-cols-2 gap-4">

              {/* User ID */}
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">
                  User ID
                </p>

                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {selectedUser.id}
                </p>
              </div>

              {/* Blood Group */}
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">
                  Blood Group
                </p>

                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {selectedUser.bloodGroup}
                </p>
              </div>

              {/* Location */}
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">
                  Location
                </p>

                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {selectedUser.location}
                </p>
              </div>

              {/* Role */}
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">
                  Role
                </p>

                <div className="mt-1">
                  <StatusBadge
                    status={selectedUser.role.toLowerCase()}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">
                  Status
                </p>

                <div className="mt-1">
                  <StatusBadge
                    status={selectedUser.status.toLowerCase()}
                  />
                </div>
              </div>

              {/* Joined */}
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">
                  Joined
                </p>

                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {new Date(
                    selectedUser.joined
                  ).toLocaleDateString()}
                </p>
              </div>

            </div>

            {/* =========================
                Action Buttons
            ========================= */}
            <div className="grid grid-cols-1 gap-3 border-t border-[#F1F5F9] pt-5 sm:grid-cols-2">

              {/* Make Donor / Volunteer */}
              {selectedUser.role !== "Administrator" && (
                <button
                  type="button"
                  onClick={handleToggleRole}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1D4ED8]"
                >
                  <UserCheck size={16} />

                  {selectedUser.role === "Donor"
                    ? "Make Volunteer"
                    : "Make Donor"}
                </button>
              )}

              {/* Block / Activate */}
              <button
                type="button"
                onClick={handleToggleStatus}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                  selectedUser.status === "Active"
                    ? "border border-red-200 bg-white text-red-600 hover:border-red-400 hover:bg-red-50"
                    : "bg-[#16A34A] text-white hover:bg-[#15803D]"
                }`}
              >

                {selectedUser.status === "Active" ? (
                  <>
                    <UserX size={16} />
                    Block User
                  </>
                ) : (
                  <>
                    <UserCheck size={16} />
                    Activate User
                  </>
                )}

              </button>

              {/* Edit */}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839]"
              >
                <Pencil size={16} />
                Edit
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={handleDeleteUser}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 transition-colors hover:border-red-400 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>
        )}

      </Modal>
    </div>
  );
}