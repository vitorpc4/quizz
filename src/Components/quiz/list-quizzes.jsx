"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChartNoAxesCombined,
  Link,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import { useRouter } from "next/navigation";
import instance from "@/http";
import { toast } from "sonner";
import ConfirmationDelete from "../confirmation-delete";

export default function ListQuizzes({ quizzes, deletedQuiz }) {
  const router = useRouter();
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const deleteQuiz = async (id) => {
    const response = await instance.delete(`/quiz/${id}`);

    if (response.status === 204) {
      toast.success("Quiz deletado com sucesso", {
        duration: 2000,
      });
      deletedQuiz();
    } else {
      toast.error("Erro ao deletar quiz", {
        duration: 2000,
      });
    }
  };

  const generateLink = (id) => {
    const link = `${window.location.origin}/take-quiz/${id}`;

    navigator.clipboard.writeText(link).then(
      () => {
        toast.success("Link copiado para a área de transferência", {
          duration: 2000,
        });
      },
      (err) => {
        toast.error("Erro ao copiar o link", {
          duration: 2000,
        });
      }
    );
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      id: "evaluation",
      header: "Avaliação",
      // TODO: Botão funciona, mas precisar melhor a usabilidade como por exemplo habilitar o click do meio ou o ctrl + click para abrir em nova aba
      cell: ({ row }) => {
        const quiz = row.original;
        return (
          <Button
            variant="ghost"
            onClick={() => router.push(`/evaluation/${quiz.id}`)}
          >
            <ChartNoAxesCombined />
          </Button>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const quiz = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/quiz/${quiz.id}`)}
                className="flex justify-center items-center"
              >
                <Pencil />
              </DropdownMenuItem>

              <ConfirmationDelete
                key="delete"
                setDelete={() => deleteQuiz(quiz.id)}
              />

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => generateLink(quiz.id)}>
                <Link />
                Gerar Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: quizzes,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="rounded-md border p-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
