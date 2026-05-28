/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { ContactLink } from "@/components/ContactLink";

interface PaymentTableProps {
  page: number;
  rows: any[];
  pageSize: number;
}

function formatCurrency(amount: number | null | undefined) {
  if (amount == null) return "—";
  return `₹${(amount / 100).toLocaleString("en-IN")}`;
}

function formatDate(date: string | Date | null | undefined) {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const PaymentTable = ({ page, rows, pageSize }: PaymentTableProps) => {
  const startIndex = (page - 1) * pageSize;
  const router = useRouter();

  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Gateway payment ID</TableHead>
            <TableHead>Gateway order ID</TableHead>
            <TableHead className="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row: any, index: number) => {
              const rowNumber = startIndex + index + 1;
              const p = row.payment;
              const o = row.order;
              const u = row.user;

              return (
                <TableRow key={p?.id ?? rowNumber}>
                  <TableCell className="font-medium">{rowNumber}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDate(p?.createdAt)}
                  </TableCell>
                  <TableCell>{u?.name ?? "—"}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={u?.email}>
                    <ContactLink type="email" value={u?.email} />
                  </TableCell>
                  <TableCell className="font-mono text-xs max-w-[120px] truncate" title={o?.id}>
                    {o?.id ?? "—"}
                  </TableCell>
                  <TableCell>{formatCurrency(p?.paymentAmount)}</TableCell>
                  <TableCell className="capitalize">{p?.paymentMethod ?? "—"}</TableCell>
                  <TableCell className="capitalize">{p?.paymentStatus ?? "—"}</TableCell>
                  <TableCell className="font-mono text-xs max-w-[140px] truncate" title={p?.paymentId}>
                    {p?.paymentId ?? "—"}
                  </TableCell>
                  <TableCell className="font-mono text-xs max-w-[140px] truncate" title={p?.paymentOrderId}>
                    {p?.paymentOrderId ?? "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      type="button"
                      onClick={() => router.push(`/admin/order/${o?.id}`)}
                      className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                      aria-label="View order"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={11} className="h-24 text-center text-gray-600">
                No purchase payments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTable;
